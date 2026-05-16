import { Router } from 'itty-router';
import { GitHubClient } from '../github';
import { parseTsVariable, updateTsVariable } from '../utils';
import type { AnimeItem } from '../types';

export function createAnimeRouter(contentClient: GitHubClient, codeClient: GitHubClient) {
  const router = Router();

  router.get('/api/anime', async () => {
    try {
      const file = await contentClient.getFile('src/data/anime.ts');
      const parseResult = parseTsVariable(file.content, 'localAnimeList');
      const data = Array.isArray(parseResult) ? parseResult : [];
      return Response.json({ success: true, data });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.get('/api/anime/:title', async (request) => {
    try {
      const title = decodeURIComponent(request.params?.title || '');
      const file = await contentClient.getFile('src/data/anime.ts');
      const data = parseTsVariable(file.content, 'localAnimeList') as AnimeItem[] || [];

      const item = data.find(a => a.title === title);
      if (!item) {
        return Response.json({ success: false, message: 'Anime not found' }, { status: 404 });
      }

      return Response.json({ success: true, data: item });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.post('/api/anime', async (request) => {
    try {
      const item = await request.json<AnimeItem>();
      const file = await contentClient.getFile('src/data/anime.ts');
      const data = parseTsVariable(file.content, 'localAnimeList') as AnimeItem[] || [];

      data.push(item);
      const content = updateTsVariable(file.content, 'localAnimeList', data, 'AnimeItem[]');
      await contentClient.updateFile('src/data/anime.ts', content, `Add anime ${item.title}`, file.sha);

      return Response.json({ success: true, data: item });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.put('/api/anime/:title', async (request) => {
    try {
      const title = decodeURIComponent(request.params?.title || '');
      const item = await request.json<AnimeItem>();
      const file = await contentClient.getFile('src/data/anime.ts');
      const data = parseTsVariable(file.content, 'localAnimeList') as AnimeItem[] || [];

      const index = data.findIndex(a => a.title === title);
      if (index === -1) {
        return Response.json({ success: false, message: 'Anime not found' }, { status: 404 });
      }

      data[index] = { ...data[index], ...item };
      const content = updateTsVariable(file.content, 'localAnimeList', data, 'AnimeItem[]');
      await contentClient.updateFile('src/data/anime.ts', content, `Update anime ${title}`, file.sha);

      return Response.json({ success: true, data: data[index] });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.delete('/api/anime/:title', async (request) => {
    try {
      const title = decodeURIComponent(request.params?.title || '');
      const file = await contentClient.getFile('src/data/anime.ts');
      const data = parseTsVariable(file.content, 'localAnimeList') as AnimeItem[] || [];

      const index = data.findIndex(a => a.title === title);
      if (index === -1) {
        return Response.json({ success: false, message: 'Anime not found' }, { status: 404 });
      }

      data.splice(index, 1);
      const content = updateTsVariable(file.content, 'localAnimeList', data, 'AnimeItem[]');
      await contentClient.updateFile('src/data/anime.ts', content, `Delete anime ${title}`, file.sha);

      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.get('/api/anime/config', async () => {
    try {
      const file = await codeClient.getFile('src/config.ts');
      const parseResult = parseTsVariable(file.content, 'animeConfig');
      const data = parseResult && typeof parseResult === 'object' ? parseResult : {};
      return Response.json({ success: true, data });
    } catch (error) {
      return Response.json({ success: true, data: {} });
    }
  });

  router.put('/api/anime/config', async (request) => {
    try {
      const config = await request.json();
      let file;
      try {
        file = await codeClient.getFile('src/config.ts');
      } catch {
        const initialContent = 'export const animeConfig = {};';
        await codeClient.createFile('src/config.ts', initialContent, 'Create config file');
        file = await codeClient.getFile('src/config.ts');
      }
      const content = updateTsVariable(file.content, 'animeConfig', config, 'Record<string, unknown>');
      await codeClient.updateFile('src/config.ts', content, 'Update anime config', file.sha);
      return Response.json({ success: true, data: config });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  return router;
}