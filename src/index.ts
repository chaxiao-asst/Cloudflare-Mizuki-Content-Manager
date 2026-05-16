import { createRouter } from './routes';
import { GitHubClient } from './github';
import { remapContentPath } from './utils';
import * as pages from './pages';

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
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f5f5f5;color:#333}
.container{max-width:1400px;margin:0 auto;padding:20px}
.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:20px;border-radius:12px;margin-bottom:20px;box-shadow:0 4px 20px rgba(102,126,234,0.3)}
.header h1{font-size:1.8rem;margin-bottom:5px}
.header p{opacity:0.9;font-size:0.9rem}
.nav{background:white;padding:15px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);margin-bottom:20px}
.nav ul{list-style:none;display:flex;flex-wrap:wrap;gap:8px}
.nav li{margin:0}
.nav a{padding:10px 20px;background:#e8e8e8;border-radius:8px;text-decoration:none;color:#333;font-size:0.95rem;font-weight:500;transition:all 0.2s;display:block}
.nav a:hover{background:#ddd}
.nav a.active{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white}
.content{background:white;border-radius:12px;padding:25px;box-shadow:0 2px 10px rgba(0,0,0,0.05)}
.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:15px;margin-bottom:20px}
.form-group{margin-bottom:15px}
.form-group label{display:block;font-weight:500;margin-bottom:6px;color:#555;font-size:0.9rem}
.form-group input,.form-group select,.form-group textarea{width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:8px;font-size:0.95rem;transition:border-color 0.2s}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{outline:none;border-color:#667eea}
.form-group textarea{resize:vertical;min-height:80px}
.form-group input[list]{position:relative;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;background-size:16px;padding-right:36px}
.form-group input[list]:focus{outline:none;border-color:#667eea}
.form-group input[list]::-webkit-calendar-picker-indicator{display:none}
.modal-content{min-width:500px}
.modal-content .form-grid{grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}
.btn{padding:10px 20px;border:none;border-radius:8px;font-size:0.95rem;cursor:pointer;font-weight:500;transition:all 0.2s}
.btn-primary{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(102,126,234,0.4)}
.btn-danger{background:#ff4757;color:white}
.btn-danger:hover{background:#ff3344}
.btn-success{background:#2ed573;color:white}
.btn-success:hover{background:#26c064}
.btn-sm{padding:6px 12px;font-size:0.85rem}
.table-wrapper{overflow-x:auto;margin-top:20px}
table{width:100%;border-collapse:collapse;min-width:600px}
th,td{padding:12px 15px;text-align:left;border-bottom:1px solid #eee}
th{background:#f8f9fa;font-weight:600;color:#555;font-size:0.9rem}
tr:hover{background:#f8f9fa}
.actions{display:flex;gap:8px}
.badge{padding:4px 10px;border-radius:20px;font-size:0.8rem;font-weight:500}
.badge-success{background:#d4edda;color:#155724}
.badge-warning{background:#fff3cd;color:#856404}
.badge-info{background:#d1ecf1;color:#0c5460}
.badge-secondary{background:#e2e3e5;color:#383d41}
.loading{text-align:center;padding:40px;color:#666}
.error-msg{background:#ff4757;color:white;padding:15px;border-radius:8px;margin-bottom:20px}
.success-msg{background:#2ed573;color:white;padding:15px;border-radius:8px;margin-bottom:20px}
.info-row{display:flex;gap:20px;margin-bottom:15px;flex-wrap:wrap}
.info-item{background:#f8f9fa;padding:12px 18px;border-radius:8px;flex:1;min-width:200px}
.info-item label{font-size:0.8rem;color:#666;display:block;margin-bottom:4px}
.info-item span{font-weight:600;font-size:1.1rem}
.empty-state{text-align:center;padding:60px 20px;color:#999}
.card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px;margin-top:20px}
.card{background:#f8f9fa;border-radius:10px;padding:18px;border:1px solid #eee;transition:all 0.2s}
.card:hover{box-shadow:0 4px 12px rgba(0,0,0,0.08);transform:translateY(-2px)}
.card h3{margin-bottom:10px;color:#333}
.card p{color:#666;font-size:0.9rem;margin-bottom:8px}
.card .meta{font-size:0.85rem;color:#888;margin-top:8px;padding-top:8px;border-top:1px solid #eee}
.card-meta{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.card-actions{margin-top:15px;display:flex;gap:8px}
.skill-card{padding:15px}
.skill-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.skill-header h4{margin:0;font-size:1rem}
.skill-desc{color:#666;font-size:0.9rem;margin:8px 0}
.skill-progress{height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;margin:10px 0}
.skill-progress-bar{height:100%;border-radius:4px;transition:width 0.3s ease}
.skill-meta{font-size:0.85rem;color:#888;display:flex;gap:10px}
.filter-bar{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.filter-bar select,.filter-bar input{padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-size:0.9rem}
.filter-bar input{flex:1;min-width:150px}
.stats-bar{text-align:center;color:#888;font-size:0.9rem;margin-top:20px;padding-top:15px;border-top:1px solid #eee}
.timeline{padding:0}
.timeline-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:15px}
.timeline-card{padding:15px}
.timeline-content{background:#f9fafb;padding:15px;border-radius:8px}
.friend-card{padding:20px}
.friend-header{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.friend-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover}
.friend-header h3{margin:0;font-size:1.1rem}
.friend-desc{color:#666;font-size:0.9rem;margin:8px 0;line-height:1.5}
.device-section{margin-bottom:30px}
.device-category-title{color:#333;font-size:1.1rem;margin-bottom:15px;padding-bottom:8px;border-bottom:2px solid #10b981}
.device-card{padding:15px}
.device-card h4{margin:0 0 8px;font-size:1rem}

.modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);justify-content:center;align-items:center;z-index:1000;padding:20px}
.modal.active{display:flex}
.modal-content{background:white;border-radius:12px;padding:25px;max-width:600px;width:100%;max-height:90vh;overflow-y:auto;position:relative}
.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.modal-header h2{font-size:1.3rem;margin:0}
.close-btn{background:none;border:none;font-size:1.5rem;cursor:pointer;color:#666;padding:5px 10px}
.close-btn:hover{color:#333}
.modal-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);justify-content:center;align-items:center;z-index:1000}
.modal-overlay.active{display:flex}
.confirm-modal .modal-content{text-align:center;max-width:450px;width:90%}
.confirm-modal .modal-content p{margin-bottom:25px;font-size:16px;color:#555}
.confirm-modal .btn-group{display:flex;gap:12px;justify-content:center}
.tab-nav{display:flex;gap:4px;border-bottom:2px solid #eee;margin-bottom:20px}
.tab-btn{padding:10px 20px;background:none;border:none;border-bottom:3px solid transparent;cursor:pointer;font-size:0.95rem;font-weight:500;color:#888;transition:all 0.2s}
.tab-btn:hover{color:#667eea}
.tab-btn.active{color:#667eea;border-bottom-color:#667eea}
.tab-panel{display:none}
.tab-panel.active{display:block}
.help-nav .btn-sm{padding:6px 14px;font-size:0.85rem}
.help-section h3{color:#333;margin:15px 0 10px}
.help-section h4{color:#555;margin:12px 0 8px}
.help-section table{font-size:0.85rem}
.help-section ul,.help-section ol{margin:8px 0;padding-left:20px}
.help-section li{margin:4px 0}
.help-section code{background:#eee;padding:2px 6px;border-radius:4px;font-size:0.85rem}
.help-section pre{background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto}
.btn-secondary{background:#e8e8e8;color:#555}
.btn-secondary:hover{background:#ddd}
.icon-sets-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:2000;display:flex;justify-content:center;align-items:center;padding:20px}
.icon-sets-modal{background:white;border-radius:12px;max-width:400px;width:100%;max-height:80vh;overflow:hidden;display:flex;flex-direction:column}
.icon-sets-header{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #eee}
.icon-sets-header h3{margin:0;font-size:1rem}
.icon-sets-header button{background:none;border:none;font-size:1.2rem;cursor:pointer;color:#888}
.icon-sets-body{padding:12px;overflow-y:auto;max-height:60vh}
.icon-set-item{display:block;padding:10px 14px;color:#374151;text-decoration:none;font-size:14px;border-radius:6px;transition:all 0.15s;border:1px solid transparent}
.icon-set-item:hover{background:#f3f4f6;border-color:#e5e7eb;color:#667eea}
.page-layout{display:flex;flex-direction:column;max-height:calc(100vh - 175px);overflow:hidden}
.page-toolbar{flex-shrink:0;padding-bottom:10px;border-bottom:1px solid #eee;margin-bottom:0}
.page-toolbar h2{margin-bottom:12px}
.page-toolbar .filter-bar{margin-bottom:0}
.page-cards-area{flex:1;overflow-y:auto;min-height:0;padding:12px 0;scrollbar-width:thin;scrollbar-color:#d1d5db transparent}
.page-cards-area::-webkit-scrollbar{width:6px}
.page-cards-area::-webkit-scrollbar-track{background:transparent}
.page-cards-area::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}
.page-stats{flex-shrink:0;text-align:center;color:#888;font-size:0.9rem;padding-top:12px;border-top:1px solid #eee}
@media(max-width:768px){.page-layout{max-height:calc(100vh - 150px)}}
@media(max-width:480px){.page-layout{max-height:calc(100vh - 140px)}}
.page-cards-area .card-grid{margin-top:0}
.page-cards-area .empty-state{padding:40px 20px}
</style>
</head>
<body>
<div class="container">
<div class="header">
<h1>Mizuki Content Manager</h1>
<p>管理博客内容 - 通过 GitHub API</p>
</div>
<div class="nav">
<ul>
<li><a href="/" class="nav-link" data-page="home">站点</a></li>
<li><a href="/dashboard" class="nav-link" data-page="dashboard">Dashboard</a></li>
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
<svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto;display:block;">
<path d="M12 9v2m0 4h.01"></path>
<circle cx="12" cy="12" r="10"></circle>
</svg>
</div>
<h3 style="text-align:center;margin-bottom:10px;color:#333;">确认删除</h3>
<p id="confirmMessage">确定要删除吗？</p>
<div class="btn-group">
<button class="btn btn-success" onclick="confirmCancel()">取消</button>
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