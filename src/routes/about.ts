import { Router } from 'itty-router';
import { GitHubClient } from '../github';

export function createAboutRouter(githubClient: GitHubClient) {
  const router = Router();

  router.get('/api/about', async () => {
    try {
      const file = await githubClient.getFile('src/content/spec/about.md');
      return Response.json({ success: true, data: file.content });
    } catch {
      return Response.json({ success: true, data: '' });
    }
  });

  router.put('/api/about', async (request) => {
    try {
      const body = await request.json() as Record<string, unknown>;
      const content = (body.content as string) || '';
      const file = await githubClient.getFile('src/content/spec/about.md').catch(() => null);
      if (file) {
        await githubClient.updateFile('src/content/spec/about.md', content, 'Update about content', file.sha);
      } else {
        await githubClient.createFile('src/content/spec/about.md', content, 'Create about content');
      }
      return Response.json({ success: true, message: '保存成功' });
    } catch (error) {
      return Response.json({ success: false, message: '保存失败: ' + (error as Error).message });
    }
  });

  return router;
}
