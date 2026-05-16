import { Router } from 'itty-router';
import { GitHubClient } from '../github';
import type { AlbumInfo } from '../types';

export function createAlbumsRouter(githubClient: GitHubClient) {
  const router = Router();

  router.get('/api/albums', async () => {
    try {
      const files = await githubClient.listFiles('public/images/albums');
      const dirs = files.filter(f => f.type === 'dir');
      const albums: Array<{ name: string; info: AlbumInfo }> = [];

      for (const dir of dirs) {
        try {
          const infoFile = await githubClient.getFile(`public/images/albums/${dir.name}/info.json`);
          const info = JSON.parse(infoFile.content) as AlbumInfo;
          albums.push({ name: dir.name, info });
        } catch {
          albums.push({ name: dir.name, info: { title: dir.name } });
        }
      }

      return Response.json({ success: true, data: albums });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.get('/api/albums/:name', async (request) => {
    try {
      const name = decodeURIComponent(request.params?.name || '');
      const file = await githubClient.getFile(`public/images/albums/${name}/info.json`);
      const info = JSON.parse(file.content) as AlbumInfo;
      return Response.json({ success: true, data: info });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.post('/api/albums', async (request) => {
    try {
      const { name, info } = await request.json<{ name: string; info: AlbumInfo }>();
      const jsonContent = JSON.stringify(info, null, 2);
      await githubClient.createFile(`public/images/albums/${name}/info.json`, jsonContent, `Create album ${name}`);
      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.put('/api/albums/:name', async (request) => {
    try {
      const name = decodeURIComponent(request.params?.name || '');
      const info = await request.json<AlbumInfo>();
      const file = await githubClient.getFile(`public/images/albums/${name}/info.json`);
      const jsonContent = JSON.stringify(info, null, 2);
      await githubClient.updateFile(`public/images/albums/${name}/info.json`, jsonContent, `Update album ${name}`, file.sha);
      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.delete('/api/albums/:name', async (request) => {
    try {
      const name = decodeURIComponent(request.params?.name || '');
      const file = await githubClient.getFile(`public/images/albums/${name}/info.json`);
      await githubClient.deleteFile(`public/images/albums/${name}/info.json`, `Delete album ${name}`, file.sha);
      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  return router;
}