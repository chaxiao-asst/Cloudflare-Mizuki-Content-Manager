export const dashboardPage = `
<div class="content">
<h2>数据总览</h2>
<div class="card-grid" id="dashboardCards"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.querySelector('.nav-link[data-page="dashboard"]')?.classList.add('active');
  loadDashboard();
});

async function loadDashboard() {
  const cards = document.getElementById('dashboardCards');
  const endpoints = ['diary', 'friends', 'projects', 'skills', 'timeline', 'devices', 'posts', 'anime', 'albums'];
  const titles = { diary: '日记', friends: '友链', projects: '项目', skills: '技能', timeline: '时间线', devices: '设备', posts: '文章', anime: '番剧', albums: '相册' };
  cards.innerHTML = endpoints.map(k => '<div class="card"><h3>' + titles[k] + '</h3><p>加载中...</p></div>').join('');
  for (let i = 0; i < endpoints.length; i++) {
    try {
      const res = await api('GET', '/api/' + endpoints[i]);
      const count = Array.isArray(res.data) ? res.data.length : Object.keys(res.data || {}).length;
      cards.children[i].innerHTML = '<h3>' + titles[endpoints[i]] + '</h3><p>共 ' + count + ' 条记录</p>';
    } catch { cards.children[i].innerHTML = '<h3>' + titles[endpoints[i]] + '</h3><p>加载失败</p>'; }
  }
}
</script>`;