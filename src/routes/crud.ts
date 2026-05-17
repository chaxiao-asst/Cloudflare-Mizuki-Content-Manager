import { Router } from 'itty-router';
import { GitHubClient } from '../github';
import { parseTsVariable, updateTsVariable } from '../utils';

interface CrudConfig {
  filePath: string;
  varName: string;
  typeName: string;
  idExtractor?: (item: unknown) => number | string;
  onCreate?: (item: Record<string, unknown>, data: unknown[]) => Record<string, unknown>;
}

export function createCrudRouter(githubClient: GitHubClient, config: CrudConfig) {
  const router = Router();
  const { filePath, varName, typeName, idExtractor, onCreate } = config;

  router.get(`/api/${varName.replace('Data', '').toLowerCase()}`, async () => {
    try {
      const file = await githubClient.getFile(filePath);
      const parseResult = parseTsVariable(file.content, varName);
      if (parseResult === null) {
        return Response.json({ success: false, message: `Variable "${varName}" not found in ${filePath}` }, { status: 500 });
      }
      if (!Array.isArray(parseResult)) {
        const errObj = parseResult as Record<string, unknown>;
        return Response.json({ success: false, message: `Parse error: ${errObj.error || 'unknown'}`, detail: String(errObj.jsonStr || '').substring(0, 300) }, { status: 500 });
      }
      return Response.json({ success: true, data: parseResult });
    } catch (error) {
      return Response.json({ success: false, message: `File error: ${(error as Error).message}` }, { status: 500 });
    }
  });

  router.post(`/api/${varName.replace('Data', '').toLowerCase()}`, async (request) => {
    try {
      const item = await request.json() as Record<string, unknown>;
      const file = await githubClient.getFile(filePath);
      const rawData = parseTsVariable(file.content, varName);
      const data = Array.isArray(rawData) ? rawData as Record<string, unknown>[] : [];

      if (idExtractor) {
        const numericIds = data.map(d => Number(idExtractor(d))).filter(n => isFinite(n));
        if (numericIds.length > 0) {
          item.id = Math.max(...numericIds, 0) + 1;
        }
      }

      const finalItem = onCreate ? onCreate(item, data) : item;
      data.push(finalItem);
      const content = updateTsVariable(file.content, varName, data, typeName);
      await githubClient.updateFile(filePath, content, `Add ${varName} entry`, file.sha);

      return Response.json({ success: true, data: finalItem });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.put(`/api/${varName.replace('Data', '').toLowerCase()}/:id`, async (request) => {
    try {
      const id = request.params?.id || '';
      const item = await request.json() as Record<string, unknown>;
      const file = await githubClient.getFile(filePath);
      const rawData = parseTsVariable(file.content, varName);
      const data = Array.isArray(rawData) ? rawData as Record<string, unknown>[] : [];

      const index = data.findIndex(d => String(idExtractor ? idExtractor(d) : d.id) === String(id));
      if (index === -1) {
        return Response.json({ success: false, message: 'Not found' }, { status: 404 });
      }

      data[index] = { ...data[index], ...item };
      const content = updateTsVariable(file.content, varName, data, typeName);
      await githubClient.updateFile(filePath, content, `Update ${varName} entry`, file.sha);

      return Response.json({ success: true, data: data[index] });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.delete(`/api/${varName.replace('Data', '').toLowerCase()}/:id`, async (request) => {
    try {
      const id = request.params?.id || '';
      const file = await githubClient.getFile(filePath);
      const rawData = parseTsVariable(file.content, varName);
      const data = Array.isArray(rawData) ? rawData as Record<string, unknown>[] : [];

      const index = data.findIndex(d => String(idExtractor ? idExtractor(d) : d.id) === String(id));
      if (index === -1) {
        return Response.json({ success: false, message: 'Not found' }, { status: 404 });
      }

      data.splice(index, 1);
      const content = updateTsVariable(file.content, varName, data, typeName);
      await githubClient.updateFile(filePath, content, `Delete ${varName} entry`, file.sha);

      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  return router;
}