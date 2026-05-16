import { Router } from 'itty-router';
import { GitHubClient } from './github';
import { createDiaryRouter } from './routes/diary';
import { createFriendsRouter } from './routes/friends';
import { createProjectsRouter } from './routes/projects';
import { createSkillsRouter } from './routes/skills';
import { createTimelineRouter } from './routes/timeline';
import { createDevicesRouter } from './routes/devices';
import { createAnimeRouter } from './routes/anime';
import { createPostsRouter } from './routes/posts';
import { createAlbumsRouter } from './routes/albums';
import { createAboutRouter } from './routes/about';
import { createConfigRouter } from './routes/config';

interface RouteDef {
  method: string;
  path: string;
  handler: (...args: unknown[]) => Response | Promise<Response>;
}

function registerRoutes(router: ReturnType<typeof Router>, routes: RouteDef[]): void {
  for (const { method, path, handler } of routes) {
    const m = method.toLowerCase() as 'get' | 'post' | 'put' | 'delete' | 'all';
    router[m](path, (...args: unknown[]) => handler(...args));
  }
}

export function createRouter(githubClient: GitHubClient, contentClient?: GitHubClient) {
  const router = Router();
  const client = contentClient || githubClient;

  const diaryRouter = createDiaryRouter(client);
  const friendsRouter = createFriendsRouter(client);
  const projectsRouter = createProjectsRouter(client);
  const skillsRouter = createSkillsRouter(client);
  const timelineRouter = createTimelineRouter(client);
  const devicesRouter = createDevicesRouter(client);
  const animeRouter = createAnimeRouter(client, githubClient);
  const postsRouter = createPostsRouter(client);
  const albumsRouter = createAlbumsRouter(client);
  const aboutRouter = createAboutRouter(client);
  const configRouter = createConfigRouter(githubClient);

  const resourceRoutes = [
    { resource: 'diary', router: diaryRouter, methods: ['GET', 'POST', 'PUT', 'DELETE'] as const },
    { resource: 'friends', router: friendsRouter, methods: ['GET', 'POST', 'PUT', 'DELETE'] as const },
    { resource: 'projects', router: projectsRouter, methods: ['GET', 'POST', 'PUT', 'DELETE'] as const },
    { resource: 'skills', router: skillsRouter, methods: ['GET', 'POST', 'PUT', 'DELETE'] as const },
    { resource: 'timeline', router: timelineRouter, methods: ['GET', 'POST', 'PUT', 'DELETE'] as const },
  ];

  for (const { resource, router: r } of resourceRoutes) {
    registerRoutes(router, [
      { method: 'GET', path: `/api/${resource}`, handler: (...args) => r.handle(...args as Parameters<typeof r.handle>) },
      { method: 'POST', path: `/api/${resource}`, handler: (...args) => r.handle(...args as Parameters<typeof r.handle>) },
      { method: 'PUT', path: `/api/${resource}/:id`, handler: (...args) => r.handle(...args as Parameters<typeof r.handle>) },
      { method: 'DELETE', path: `/api/${resource}/:id`, handler: (...args) => r.handle(...args as Parameters<typeof r.handle>) },
    ]);
  }

  registerRoutes(router, [
    { method: 'GET', path: '/api/devices', handler: (...args) => devicesRouter.handle(...args as Parameters<typeof devicesRouter.handle>) },
    { method: 'POST', path: '/api/devices', handler: (...args) => devicesRouter.handle(...args as Parameters<typeof devicesRouter.handle>) },
    { method: 'PUT', path: '/api/devices/:oldCategory/:oldName', handler: (...args) => devicesRouter.handle(...args as Parameters<typeof devicesRouter.handle>) },
    { method: 'DELETE', path: '/api/devices/:category/:name', handler: (...args) => devicesRouter.handle(...args as Parameters<typeof devicesRouter.handle>) },
  ]);

  registerRoutes(router, [
    { method: 'GET', path: '/api/anime/config', handler: (...args) => animeRouter.handle(...args as Parameters<typeof animeRouter.handle>) },
    { method: 'PUT', path: '/api/anime/config', handler: (...args) => animeRouter.handle(...args as Parameters<typeof animeRouter.handle>) },
    { method: 'GET', path: '/api/anime', handler: (...args) => animeRouter.handle(...args as Parameters<typeof animeRouter.handle>) },
    { method: 'GET', path: '/api/anime/:title', handler: (...args) => animeRouter.handle(...args as Parameters<typeof animeRouter.handle>) },
    { method: 'POST', path: '/api/anime', handler: (...args) => animeRouter.handle(...args as Parameters<typeof animeRouter.handle>) },
    { method: 'PUT', path: '/api/anime/:title', handler: (...args) => animeRouter.handle(...args as Parameters<typeof animeRouter.handle>) },
    { method: 'DELETE', path: '/api/anime/:title', handler: (...args) => animeRouter.handle(...args as Parameters<typeof animeRouter.handle>) },
  ]);

  registerRoutes(router, [
    { method: 'GET', path: '/api/posts', handler: (...args) => postsRouter.handle(...args as Parameters<typeof postsRouter.handle>) },
    { method: 'GET', path: '/api/posts/:name', handler: (...args) => postsRouter.handle(...args as Parameters<typeof postsRouter.handle>) },
    { method: 'POST', path: '/api/posts', handler: (...args) => postsRouter.handle(...args as Parameters<typeof postsRouter.handle>) },
    { method: 'PUT', path: '/api/posts/:name', handler: (...args) => postsRouter.handle(...args as Parameters<typeof postsRouter.handle>) },
    { method: 'DELETE', path: '/api/posts/:name', handler: (...args) => postsRouter.handle(...args as Parameters<typeof postsRouter.handle>) },
  ]);

  registerRoutes(router, [
    { method: 'GET', path: '/api/albums', handler: (...args) => albumsRouter.handle(...args as Parameters<typeof albumsRouter.handle>) },
    { method: 'GET', path: '/api/albums/:name', handler: (...args) => albumsRouter.handle(...args as Parameters<typeof albumsRouter.handle>) },
    { method: 'POST', path: '/api/albums', handler: (...args) => albumsRouter.handle(...args as Parameters<typeof albumsRouter.handle>) },
    { method: 'PUT', path: '/api/albums/:name', handler: (...args) => albumsRouter.handle(...args as Parameters<typeof albumsRouter.handle>) },
    { method: 'DELETE', path: '/api/albums/:name', handler: (...args) => albumsRouter.handle(...args as Parameters<typeof albumsRouter.handle>) },
  ]);

  router.get('/api/about', (...args) => aboutRouter.handle(...args as Parameters<typeof aboutRouter.handle>));
  router.put('/api/about', (...args) => aboutRouter.handle(...args as Parameters<typeof aboutRouter.handle>));

  router.get('/api/config', (...args) => configRouter.handle(...args as Parameters<typeof configRouter.handle>));
  router.put('/api/config', (...args) => configRouter.handle(...args as Parameters<typeof configRouter.handle>));

  router.get('/', () => {
    const endpoints: Record<string, { methods: string[]; path: string; description: string }> = {
      diary: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/diary', description: 'Manage diary entries' },
      friends: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/friends', description: 'Manage friends/links' },
      projects: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/projects', description: 'Manage projects' },
      skills: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/skills', description: 'Manage skills' },
      timeline: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/timeline', description: 'Manage timeline events' },
      devices: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/devices', description: 'Manage devices' },
      posts: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/posts', description: 'Manage blog posts' },
      anime: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/anime', description: 'Manage anime entries' },
      albums: { methods: ['GET', 'POST', 'PUT', 'DELETE'], path: '/api/albums', description: 'Manage photo albums' },
      about: { methods: ['GET', 'PUT'], path: '/api/about', description: 'Manage about page content' },
      config: { methods: ['GET', 'PUT'], path: '/api/config', description: 'Manage site configuration' },
    };

    return Response.json({
      success: true,
      message: 'Mizuki Content Manager API',
      endpoints,
      usage: 'Send requests to /api/{resource} with appropriate method'
    });
  });

  router.all('*', () => Response.json({ success: false, message: 'Route not found' }, { status: 404 }));

  return router;
}