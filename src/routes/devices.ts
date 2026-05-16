import { Router } from 'itty-router';
import { GitHubClient } from '../github';
import { parseTsVariable, updateTsVariable } from '../utils';
import type { DeviceCategory } from '../types';

export function createDevicesRouter(githubClient: GitHubClient) {
  const router = Router();

  router.get('/api/devices', async () => {
    try {
      const file = await githubClient.getFile('src/data/devices.ts');
      const parseResult = parseTsVariable(file.content, 'devicesData');
      if (parseResult && typeof parseResult === 'object' && 'error' in parseResult) {
        return Response.json({ success: false, message: String(parseResult.error) }, { status: 500 });
      }
      const data = parseResult && typeof parseResult === 'object' && !Array.isArray(parseResult) ? parseResult : {};
      return Response.json({ success: true, data });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.post('/api/devices', async (request) => {
    try {
      const { category, device } = await request.json<{ category: string; device: { name: string; image: string; specs: string; description: string; link: string } }>();
      const file = await githubClient.getFile('src/data/devices.ts');
      const data = parseTsVariable(file.content, 'devicesData') as DeviceCategory || {};

      if (!data[category]) {
        data[category] = [];
      }
      data[category].push(device);

      const content = updateTsVariable(file.content, 'devicesData', data, 'DeviceCategory');
      await githubClient.updateFile('src/data/devices.ts', content, `Add device ${device.name}`, file.sha);

      return Response.json({ success: true, data: device });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.put('/api/devices/:oldCategory/:oldName', async (request) => {
    try {
      const oldCategory = request.params?.oldCategory || '';
      const oldName = decodeURIComponent(request.params?.oldName || '');
      const { category, device } = await request.json<{ category: string; device: { name: string; image: string; specs: string; description: string; link: string } }>();

      const file = await githubClient.getFile('src/data/devices.ts');
      const data = parseTsVariable(file.content, 'devicesData') as DeviceCategory || {};

      if (!data[oldCategory]) {
        return Response.json({ success: false, message: 'Old category not found' }, { status: 404 });
      }

      const index = data[oldCategory].findIndex(d => d.name === oldName);
      if (index === -1) {
        return Response.json({ success: false, message: 'Device not found' }, { status: 404 });
      }

      data[oldCategory].splice(index, 1);
      if (data[oldCategory].length === 0) {
        delete data[oldCategory];
      }

      if (!data[category]) {
        data[category] = [];
      }
      data[category].push(device);

      const content = updateTsVariable(file.content, 'devicesData', data, 'DeviceCategory');
      await githubClient.updateFile('src/data/devices.ts', content, `Update device ${device.name}`, file.sha);

      return Response.json({ success: true, data: device });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.delete('/api/devices/:category/:name', async (request) => {
    try {
      const category = request.params?.category || '';
      const name = decodeURIComponent(request.params?.name || '');
      const file = await githubClient.getFile('src/data/devices.ts');
      const data = parseTsVariable(file.content, 'devicesData') as DeviceCategory || {};

      if (!data[category]) {
        return Response.json({ success: false, message: 'Category not found' }, { status: 404 });
      }

      const index = data[category].findIndex(d => d.name === name);
      if (index === -1) {
        return Response.json({ success: false, message: 'Device not found' }, { status: 404 });
      }

      data[category].splice(index, 1);
      if (data[category].length === 0) {
        delete data[category];
      }

      const content = updateTsVariable(file.content, 'devicesData', data, 'DeviceCategory');
      await githubClient.updateFile('src/data/devices.ts', content, `Delete device ${name}`, file.sha);

      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  return router;
}