import { Router } from 'itty-router';
import { GitHubClient } from '../github';
import { parseFrontmatter, generateFrontmatter } from '../utils';

async function getPostFile(githubClient: GitHubClient, name: string) {
  try {
    const file = await githubClient.getFile(`src/content/posts/${name}/index.md`);
    return { file, path: `src/content/posts/${name}/index.md` };
  } catch {
    const file = await githubClient.getFile(`src/content/posts/${name}.md`);
    return { file, path: `src/content/posts/${name}.md` };
  }
}

function normalizePostMeta(meta: Record<string, unknown>): Record<string, unknown> {
  const now = new Date().toISOString().split('T')[0];
  return {
    title: meta.title || '',
    description: meta.description || '',
    published: meta.published || now,
    pubDate: meta.pubDate || meta.published || now,
    date: meta.date || meta.published || now,
    updated: meta.updated || '',
    draft: meta.draft !== undefined ? meta.draft : false,
    permalink: meta.permalink || '',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    category: meta.category || '',
    pinned: meta.pinned !== undefined ? meta.pinned : false,
    author: meta.author || '',
    image: meta.image || '',
    licenseName: meta.licenseName || '',
    licenseUrl: meta.licenseUrl || '',
    sourceLink: meta.sourceLink || '',
    encrypted: meta.encrypted !== undefined ? meta.encrypted : false,
    password: meta.password || '',
    passwordHint: meta.passwordHint || '',
    comment: meta.comment !== undefined ? meta.comment : true,
    share: meta.share !== undefined ? meta.share : false,
    shareLink: meta.shareLink || '',
    alias: meta.alias || '',
    priority: meta.priority !== undefined ? meta.priority : undefined,
    ...meta
  };
}

export function createPostsRouter(githubClient: GitHubClient) {
  const router = Router();

  router.get('/api/posts', async () => {
    try {
      const files = await githubClient.listFiles('src/content/posts');
      const posts: Array<{ name: string; meta: Record<string, unknown> }> = [];

      for (const file of files) {
        if (file.type === 'dir') {
          const postFile = await githubClient.getFile(`src/content/posts/${file.name}/index.md`);
          const { meta } = parseFrontmatter(postFile.content);
          posts.push({ name: file.name, meta: normalizePostMeta(meta) });
        } else if (file.type === 'file' && file.name.endsWith('.md')) {
          const postFile = await githubClient.getFile(`src/content/posts/${file.name}`);
          const { meta } = parseFrontmatter(postFile.content);
          const name = file.name.replace('.md', '');
          posts.push({ name, meta: normalizePostMeta(meta) });
        }
      }

      posts.sort((a, b) => {
        const dateA = new Date(a.meta.published as string || '');
        const dateB = new Date(b.meta.published as string || '');
        return dateB.getTime() - dateA.getTime();
      });

      return Response.json({ success: true, data: posts });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.get('/api/posts/:name', async (request) => {
    try {
      const rawName = request.params?.name || '';
      const name = decodeURIComponent(rawName);
      const { file, path } = await getPostFile(githubClient, name);
      const { meta, body } = parseFrontmatter(file.content);
      return Response.json({ success: true, data: { meta, content: body, path } });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.post('/api/posts', async (request) => {
    try {
      const { name, meta, content, scheme } = await request.json<{ name: string; meta: Record<string, unknown>; content: string; scheme?: string }>();
      const normalizedMeta = normalizePostMeta(meta);
      const frontmatter = generateFrontmatter(normalizedMeta, content);
      const filePath = scheme === 'single'
        ? `src/content/posts/${name}.md`
        : `src/content/posts/${name}/index.md`;
      await githubClient.createFile(filePath, frontmatter, `Create post ${name}`);
      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.put('/api/posts/:name', async (request) => {
    try {
      const rawName = request.params?.name || '';
      const name = decodeURIComponent(rawName);
      const { meta, content } = await request.json<{ meta: Record<string, unknown>; content: string }>();
      const normalizedMeta = normalizePostMeta(meta);
      const { file, path } = await getPostFile(githubClient, name);
      const frontmatter = generateFrontmatter(normalizedMeta, content);
      await githubClient.updateFile(path, frontmatter, `Update post ${name}`, file.sha);
      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.delete('/api/posts/:name', async (request) => {
    try {
      const rawName = request.params?.name || '';
      const name = decodeURIComponent(rawName);
      const { file, path } = await getPostFile(githubClient, name);
      await githubClient.deleteFile(path, `Delete post ${name}`, file.sha);
      return Response.json({ success: true });
    } catch (error) {
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  return router;
}