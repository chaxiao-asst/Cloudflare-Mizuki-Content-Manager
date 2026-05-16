import { createRouter } from './routes';
import { GitHubClient } from './github';
import { remapContentPath } from './utils';
import * as pages from './pages';
import { SHARED_CSS } from './styles';

const PAGE_MAP: Record<string, string> = {
  '': pages.homePage,
  'dashboard': pages.dashboardPage,
  'diary': pages.diaryPage,
  'friends': pages.friendsPage,
  'projects': pages.projectsPage,
  'skills': pages.skillsPage,
  'timeline': pages.timelinePage,
  'devices': pages.devicesPage,
  'posts': pages.postsPage,
  'anime': pages.animePage,
  'albums': pages.albumsPage,
  'about': pages.aboutPage,
};

export interface Env {
  GH_TOKEN: string;
  GH_REPO_OWNER: string;
  GH_REPO_NAME: string;
  ENABLE_CONTENT_SYNC?: string;
  CONTENT_REPO_OWNER?: string;
  CONTENT_REPO_NAME?: string;
}

const HEADER = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mizuki Content Manager</title>
<style>${SHARED_CSS}</style>
</head>
<body>
<div class="container">
<div class="header">
<h1>Mizuki Content Manager</h1>
<p>管理博客内容 — GitHub API</p>
</div>
<div class="nav">
<ul>
<li><a href="/" class="nav-link" data-page="home">站点</a></li>
<li><a href="/dashboard" class="nav-link" data-page="dashboard">总览</a></li>
<li><a href="/diary" class="nav-link" data-page="diary">日记</a></li>
<li><a href="/friends" class="nav-link" data-page="friends">友链</a></li>
<li><a href="/projects" class="nav-link" data-page="projects">项目</a></li>
<li><a href="/skills" class="nav-link" data-page="skills">技能</a></li>
<li><a href="/timeline" class="nav-link" data-page="timeline">时间线</a></li>
<li><a href="/devices" class="nav-link" data-page="devices">设备</a></li>
<li><a href="/posts" class="nav-link" data-page="posts">文章</a></li>
<li><a href="/anime" class="nav-link" data-page="anime">番剧</a></li>
<li><a href="/albums" class="nav-link" data-page="albums">相册</a></li>
<li><a href="/about" class="nav-link" data-page="about">关于</a></li>
</ul>
</div>
<div id="msgBox"></div>
<div class="modal-overlay confirm-modal" id="confirmModal">
<div class="modal-content">
<div style="margin-bottom:10px;">
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="oklch(0.55 0.18 20)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto;display:block;">
<path d="M12 9v2m0 4h.01"></path>
<circle cx="12" cy="12" r="10"></circle>
</svg>
</div>
<h3>确认删除</h3>
<p id="confirmMessage">确定要删除吗？</p>
<div class="btn-group">
<button class="btn btn-secondary" onclick="confirmCancel()">取消</button>
<button class="btn btn-danger" onclick="confirmOK()">确定删除</button>
</div>
</div>
</div>
<script>
function showMsg(msg, type) {
  type = type || 'error';
  var className = type === 'error' ? 'error-msg' : 'success-msg';
  var box = document.getElementById('msgBox');
  box.innerHTML = '<div class="' + className + '">' + msg + '</div>';
  setTimeout(function() { box.innerHTML = ''; }, 3000);
}
async function api(method, path, body) {
  try {
    var opts = { method: method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    var res = await fetch(window.location.origin + path, opts);
    var json = await res.json();
    if (!json.success) throw new Error(json.message || '操作失败');
    return json;
  } catch (e) {
    showMsg(e.message);
    throw e;
  }
}
var confirmCallback = null;
function showConfirmModal(message, callback) {
  document.getElementById('confirmMessage').textContent = message;
  confirmCallback = callback;
  document.getElementById('confirmModal').classList.add('active');
}
function confirmOK() {
  if (confirmCallback) confirmCallback();
  document.getElementById('confirmModal').classList.remove('active');
  confirmCallback = null;
}
function confirmCancel() {
  document.getElementById('confirmModal').classList.remove('active');
  confirmCallback = null;
}
document.getElementById('confirmModal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('confirmModal')) confirmCancel();
});
</script>`;

const FOOTER = '</div></body></html>';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) {
      const githubClient = new GitHubClient({
        token: env.GH_TOKEN,
        owner: env.GH_REPO_OWNER,
        repo: env.GH_REPO_NAME,
      });
      let contentClient: GitHubClient | undefined;
      if (env.ENABLE_CONTENT_SYNC === 'true' && env.CONTENT_REPO_OWNER && env.CONTENT_REPO_NAME) {
        contentClient = new GitHubClient(
          {
            token: env.GH_TOKEN,
            owner: env.CONTENT_REPO_OWNER,
            repo: env.CONTENT_REPO_NAME,
          },
          remapContentPath
        );
      }
      const router = createRouter(githubClient, contentClient);
      return router.handle(request);
    }
    const path = url.pathname.slice(1).split('?')[0].split('/')[0] || '';
    const pageContent = PAGE_MAP[path] || PAGE_MAP[''];
    const html = HEADER + pageContent + FOOTER;
    return new Response(html, { headers: { 'Content-Type': 'text/html' } });
  }
};