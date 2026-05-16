export const animePage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>番剧管理</h2>
<button type="button" class="btn btn-primary" onclick="openAnimeModal()">新建番剧</button>
<input type="text" id="animeSearchInput" placeholder="搜索番剧..." onkeyup="filterAnime()">
<select id="animeStatusFilter" onchange="filterAnime()">
  <option value="">全部状态</option>
  <option value="watching">追看中</option>
  <option value="completed">已完结</option>
  <option value="planned">想看</option>
</select>
<select id="animeSortBy" onchange="filterAnime()">
  <option value="title">按名称排序</option>
  <option value="rating">按评分排序</option>
  <option value="year">按年份排序</option>
</select>
<select id="animeGenreFilter" onchange="filterAnime()">
  <option value="">全部类型</option>
</select>
</div>
<div class="page-cards-area">
<div class="card-grid" id="animeCards"></div>
</div>
<div id="animeStats" class="page-stats"></div>
</div>

<div class="modal" id="animeModal">
  <div class="modal-content modal-large">
    <div class="modal-header">
      <h2 id="animeModalTitle">新建</h2>
      <button class="close-btn" onclick="closeAnimeModal()">&times;</button>
    </div>
    <form id="animeForm" class="form-group">
      <input type="hidden" name="oldName" id="animeOldName">
      <div class="form-grid">
        <div class="form-group"><label>名称 *</label><input type="text" name="title" id="animeTitle" required></div>
        <div class="form-group"><label>封面</label><input type="text" name="cover" id="animeCover" placeholder="图片URL或相对路径"></div>
        <div class="form-group"><label>状态 *</label><select name="status" id="animeStatus">
          <option value="watching">追看中</option>
          <option value="completed">已完结</option>
          <option value="planned">想看</option>
        </select></div>
        <div class="form-group"><label>评分</label><input type="number" name="rating" id="animeRating" min="0" max="10" step="0.1" placeholder="0-10"></div>
        <div class="form-group"><label>年份</label><input type="text" name="year" id="animeYear" placeholder="如: 2024"></div>
        <div class="form-group"><label>集数信息</label><input type="text" name="episodes" id="animeEpisodes" placeholder="如: 12 episodes"></div>
        <div class="form-group"><label>已看集数</label><input type="number" name="progress" id="animeProgress" min="0" placeholder="已看集数"></div>
        <div class="form-group"><label>总集数</label><input type="number" name="totalEpisodes" id="animeTotalEpisodes" min="0" placeholder="总集数"></div>
        <div class="form-group"><label>制作公司</label><input type="text" name="studio" id="animeStudio" placeholder="如: 京都动画"></div>
        <div class="form-group"><label>观看链接</label><input type="text" name="link" id="animeLink" placeholder="如: https://www.bilibili.com/bangumi/media/md123456"></div>
        <div class="form-group"><label>开始观看日期</label><input type="month" name="startDate" id="animeStartDate"></div>
        <div class="form-group"><label>完成日期</label><input type="month" name="endDate" id="animeEndDate"></div>
      </div>
      <div class="form-group"><label>类型标签</label><input type="text" name="genre" id="animeGenre" placeholder="用逗号分隔，如: 日常, 治愈, 校园"></div>
      <div class="form-group"><label>简介</label><textarea name="description" id="animeDescription" placeholder="番剧简介..." rows="3"></textarea></div>
      <button type="submit" class="btn btn-primary">保存番剧</button>
      <button type="button" class="btn btn-success" onclick="clearAnimeForm(); closeAnimeModal();">取消</button>
    </form>
  </div>
</div>

<div class="modal" id="animeDetailModal">
  <div class="modal-content modal-large">
    <div class="modal-header">
      <h2 id="animeDetailTitle">番剧详情</h2>
      <button class="close-btn" onclick="closeAnimeDetailModal()">&times;</button>
    </div>
    <div id="animeDetailContent"></div>
  </div>
</div>

<script>
window.animeData = [];

async function loadAnime() {
  const res = await api('GET', '/api/anime');
  window.animeData = res.data || [];
  updateGenreFilter();
  filterAnime();
}

function updateGenreFilter() {
  const genreSet = new Set();
  window.animeData.forEach(function(a) {
    if (Array.isArray(a.genre)) {
      a.genre.forEach(function(g) { genreSet.add(g); });
    }
  });
  const select = document.getElementById('animeGenreFilter');
  select.innerHTML = '<option value="">全部类型</option>';
  Array.from(genreSet).sort().forEach(function(g) {
    select.innerHTML += '<option value="' + g + '">' + g + '</option>';
  });
}

function filterAnime() {
  let data = window.animeData || [];
  const container = document.getElementById('animeCards');
  const searchQuery = document.getElementById('animeSearchInput').value.toLowerCase();
  const statusFilter = document.getElementById('animeStatusFilter').value;
  const sortBy = document.getElementById('animeSortBy').value;
  const genreFilter = document.getElementById('animeGenreFilter').value;
  
  let filtered = data.filter(function(a) {
    const matchSearch = !searchQuery || (a.title && a.title.toLowerCase().indexOf(searchQuery) !== -1);
    const matchStatus = !statusFilter || a.status === statusFilter;
    const matchGenre = !genreFilter || (Array.isArray(a.genre) && a.genre.indexOf(genreFilter) !== -1);
    return matchSearch && matchStatus && matchGenre;
  });
  
  filtered.sort(function(a, b) {
    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === 'year') {
      return (b.year || '').localeCompare(a.year || '');
    } else {
      return (a.title || '').localeCompare(b.title || '');
    }
  });
  
  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">没有符合条件的番剧</p>';
  } else {
    container.innerHTML = '';
    
    filtered.forEach(function(a) {
      const card = document.createElement('div');
      card.className = 'card anime-card';
      
      const coverHtml = a.cover 
        ? '<img src="' + a.cover + '" class="anime-cover" alt="' + (a.title || '') + '">'
        : '<div class="anime-cover-placeholder">🎬</div>';
      
      const progressPercent = a.totalEpisodes > 0 ? Math.min(100, ((a.progress || 0) / a.totalEpisodes) * 100) : 0;
      const progressBar = a.totalEpisodes > 0 
        ? '<div class="progress-bar"><div class="progress-bar-fill" style="width: ' + progressPercent + '%"></div></div>'
        : '';
      
      let genreTags = '';
      if (Array.isArray(a.genre)) {
        genreTags = a.genre.map(function(g) {
          return '<span class="anime-genre-tag">' + g + '</span>';
        }).join('');
      }
      
      card.innerHTML = coverHtml +
        '<h3>' + (a.title || '') + '</h3>' +
        '<div class="card-meta">' +
        '<span class="badge badge-info">' + getStatusText(a.status) + '</span>' +
        (a.rating ? '<span class="badge badge-success">⭐ ' + a.rating + '</span>' : '') +
        (a.year ? '<span class="badge badge-secondary">' + a.year + '</span>' : '') +
        '</div>' +
        '<div style="font-size:0.85rem;color:#888;margin-top:8px;">' +
        (a.progress || a.totalEpisodes ? '<div>进度: ' + (a.progress || 0) + '/' + (a.totalEpisodes || '?') + '</div>' : '') +
        (a.studio ? '<div>制作: ' + a.studio + '</div>' : '') +
        '</div>' +
        progressBar +
        (genreTags ? '<div class="anime-meta">' + genreTags + '</div>' : '') +
        (a.description ? '<p style="margin-top:8px;font-size:0.9rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + a.description + '</p>' : '') +
        '<div class="anime-card-actions">' +
        '<button class="btn btn-sm btn-primary">详情</button>' +
        '<button class="btn btn-sm btn-success">编辑</button>' +
        '<button class="btn btn-sm btn-danger">删除</button>' +
        '</div>';
      
      const detailBtn = card.querySelectorAll('button')[0];
      const editBtn = card.querySelectorAll('button')[1];
      const deleteBtn = card.querySelectorAll('button')[2];
      detailBtn.addEventListener('click', function() { viewAnimeDetail(a.title); });
      editBtn.addEventListener('click', function() { editAnime(a.title); });
      deleteBtn.addEventListener('click', function() { deleteAnime(a.title); });
      
      container.appendChild(card);
    });
  }
  
  const statusCount = { watching: 0, completed: 0, planned: 0 };
  let totalRating = 0, ratingCount = 0;
  data.forEach(function(a) { 
    statusCount[a.status] = (statusCount[a.status] || 0) + 1;
    if (a.rating) {
      totalRating += a.rating;
      ratingCount++;
    }
  });
  const avgRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : '-';
  document.getElementById('animeStats').innerHTML = '共 ' + filtered.length + ' 部番剧' +
    (filtered.length !== data.length ? '（共 ' + data.length + ' 部）' : '') +
    ' | 追看中: ' + (statusCount.watching || 0) + 
    ' | 已完结: ' + (statusCount.completed || 0) + 
    ' | 想看: ' + (statusCount.planned || 0) +
    ' | 平均评分: ' + avgRating;
}

function getStatusText(status) {
  const map = { watching: '追看中', completed: '已完结', planned: '想看' };
  return map[status] || status;
}

function openAnimeModal() {
  document.getElementById('animeModalTitle').textContent = '新建';
  clearAnimeForm();
  document.getElementById('animeModal').classList.add('active');
}

function closeAnimeModal() {
  document.getElementById('animeModal').classList.remove('active');
}

function viewAnimeDetail(title) {
  const anime = window.animeData.find(function(a) { return a.title === title; });
  if (!anime) return;
  
  document.getElementById('animeDetailTitle').textContent = anime.title || '番剧详情';
  
  const coverHtml = anime.cover 
    ? '<img src="' + anime.cover + '" class="detail-cover" alt="' + (anime.title || '') + '">'
    : '';
  
  const progressPercent = anime.totalEpisodes > 0 ? Math.min(100, ((anime.progress || 0) / anime.totalEpisodes) * 100) : 0;
  const progressBar = anime.totalEpisodes > 0 
    ? '<div class="progress-bar"><div class="progress-bar-fill" style="width: ' + progressPercent + '%"></div></div>'
    : '';
  
  let genreTags = '';
  if (Array.isArray(anime.genre)) {
    genreTags = anime.genre.map(function(g) {
      return '<span class="anime-genre-tag">' + g + '</span>';
    }).join('');
  }
  
  let html = coverHtml +
    '<div class="detail-grid">' +
    '<div class="detail-item"><label>状态</label><span>' + getStatusText(anime.status) + '</span></div>' +
    '<div class="detail-item"><label>评分</label><span>⭐ ' + (anime.rating || '-') + '</span></div>' +
    '<div class="detail-item"><label>年份</label><span>' + (anime.year || '-') + '</span></div>' +
    '<div class="detail-item"><label>集数</label><span>' + (anime.episodes || '-') + '</span></div>' +
    '<div class="detail-item"><label>制作公司</label><span>' + (anime.studio || '-') + '</span></div>' +
    '<div class="detail-item"><label>进度</label><span>' + (anime.progress || 0) + '/' + (anime.totalEpisodes || '?') + '</span></div>' +
    '<div class="detail-item"><label>开始观看</label><span>' + (anime.startDate || '-') + '</span></div>' +
    '<div class="detail-item"><label>完成日期</label><span>' + (anime.endDate || '-') + '</span></div>' +
    '</div>' +
    progressBar +
    (genreTags ? '<div class="anime-meta" style="margin:16px 0;">' + genreTags + '</div>' : '') +
    (anime.description ? '<div><label style="font-size:12px;color:#888;">简介</label><p style="margin-top:8px;line-height:1.6;">' + anime.description + '</p></div>' : '') +
    (anime.link ? '<div style="margin-top:16px;"><a href="' + anime.link + '" target="_blank" class="btn btn-primary">🔗 前往观看</a></div>' : '');
  
  document.getElementById('animeDetailContent').innerHTML = html;
  document.getElementById('animeDetailModal').classList.add('active');
}

function closeAnimeDetailModal() {
  document.getElementById('animeDetailModal').classList.remove('active');
}

document.getElementById('animeForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const genreText = document.getElementById('animeGenre').value;
  const data = {
    title: document.getElementById('animeTitle').value,
    cover: document.getElementById('animeCover').value,
    status: document.getElementById('animeStatus').value,
    rating: parseFloat(document.getElementById('animeRating').value) || 0,
    year: document.getElementById('animeYear').value,
    episodes: document.getElementById('animeEpisodes').value,
    studio: document.getElementById('animeStudio').value,
    link: document.getElementById('animeLink').value,
    progress: parseInt(document.getElementById('animeProgress').value) || 0,
    totalEpisodes: parseInt(document.getElementById('animeTotalEpisodes').value) || 0,
    startDate: document.getElementById('animeStartDate').value,
    endDate: document.getElementById('animeEndDate').value || null,
    genre: genreText.split(',').map(function(t) { return t.trim(); }).filter(function(x) { return x; }),
    description: document.getElementById('animeDescription').value
  };
  
  const oldName = document.getElementById('animeOldName').value;
  if (oldName) {
    await api('PUT', '/api/anime/' + encodeURIComponent(oldName), data);
  } else {
    await api('POST', '/api/anime', data);
  }
  showMsg('保存成功', 'success');
  loadAnime();
  clearAnimeForm();
  closeAnimeModal();
});

function clearAnimeForm() {
  document.getElementById('animeOldName').value = '';
  document.getElementById('animeTitle').value = '';
  document.getElementById('animeCover').value = '';
  document.getElementById('animeStatus').value = 'watching';
  document.getElementById('animeRating').value = '';
  document.getElementById('animeYear').value = '';
  document.getElementById('animeEpisodes').value = '';
  document.getElementById('animeStudio').value = '';
  document.getElementById('animeLink').value = '';
  document.getElementById('animeProgress').value = '';
  document.getElementById('animeTotalEpisodes').value = '';
  document.getElementById('animeStartDate').value = '';
  document.getElementById('animeEndDate').value = '';
  document.getElementById('animeGenre').value = '';
  document.getElementById('animeDescription').value = '';
}

async function editAnime(title) {
  const res = await api('GET', '/api/anime/' + encodeURIComponent(title));
  const data = res.data;
  if (!data) return;
  
  document.getElementById('animeModalTitle').textContent = '编辑番剧';
  document.getElementById('animeOldName').value = title;
  document.getElementById('animeTitle').value = data.title || '';
  document.getElementById('animeCover').value = data.cover || '';
  document.getElementById('animeStatus').value = data.status || 'watching';
  document.getElementById('animeRating').value = data.rating || '';
  document.getElementById('animeYear').value = data.year || '';
  document.getElementById('animeEpisodes').value = data.episodes || '';
  document.getElementById('animeStudio').value = data.studio || '';
  document.getElementById('animeLink').value = data.link || '';
  document.getElementById('animeProgress').value = data.progress || '';
  document.getElementById('animeTotalEpisodes').value = data.totalEpisodes || '';
  document.getElementById('animeStartDate').value = data.startDate || '';
  document.getElementById('animeEndDate').value = data.endDate || '';
  document.getElementById('animeGenre').value = (data.genre || []).join(', ');
  document.getElementById('animeDescription').value = data.description || '';
  document.getElementById('animeModal').classList.add('active');
}

async function deleteAnime(title) {
  showConfirmModal('确定要删除番剧 "' + title + '" 吗？', async function() {
    await api('DELETE', '/api/anime/' + encodeURIComponent(title));
    showMsg('删除成功', 'success');
    loadAnime();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.nav-link[data-page="anime"]')?.classList.add('active');
  loadAnime();
});
</script>`;