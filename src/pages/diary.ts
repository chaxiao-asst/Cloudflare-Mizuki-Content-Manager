export const diaryPage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>日记管理</h2>
<button type="button" class="btn btn-primary" onclick="openDiaryModal()">新建</button>
<div class="filter-bar">
  <input type="text" id="diarySearchFilter" placeholder="搜索日记..." oninput="filterDiary()">
</div>
</div>
<div class="page-cards-area">
<div id="diaryTagStats" class="tag-stats"></div>
<div class="card-grid" id="diaryCards"></div>
</div>
<div id="diaryStats" class="page-stats"></div>
</div>

<div class="modal" id="diaryModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="diaryModalTitle">新建</h2>
      <button class="close-btn" onclick="closeDiaryModal()">&times;</button>
    </div>
    <form id="diaryForm" class="form-group">
      <input type="hidden" name="id" id="diaryId">
      <div class="form-grid">
        <div class="form-group"><label>日期时间</label><input type="datetime-local" name="date" id="diaryDate" required></div>
        <div class="form-group"><label>心情</label><input type="text" name="mood" id="diaryMood" placeholder="开心/难过/平静..."></div>
        <div class="form-group"><label>地点</label><input type="text" name="location" id="diaryLocation" placeholder="北京、上海..."></div>
        <div class="form-group"><label>标签</label><input type="text" name="tags" id="diaryTags" placeholder="tag1, tag2"></div>
        <div class="form-group"><label>图片</label><input type="text" name="images" id="diaryImages" placeholder="images/diary/1.jpg, images/diary/2.jpg"></div>
      </div>
      <div class="form-group"><label>内容</label><textarea name="content" id="diaryContent" placeholder="今天发生了什么..."></textarea></div>
      <button type="submit" class="btn btn-primary">保存日记</button>
      <button type="button" class="btn btn-success" onclick="clearDiaryForm(); closeDiaryModal()">取消</button>
    </form>
  </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.nav-link[data-page="diary"]')?.classList.add('active');
  loadDiary();
});
async function loadDiary() {
  const res = await api('GET', '/api/diary');
  const container = document.getElementById('diaryCards');
  
  if (!res.data || res.data.length === 0) {
    container.innerHTML = '<p class="empty-state">暂无日记数据</p>';
    document.getElementById('diaryTagStats').innerHTML = '';
    document.getElementById('diaryStats').innerHTML = '';
    return;
  }
  
  window.diaryData = res.data;
  filterDiary();
}

function filterDiary() {
  var data = window.diaryData || [];
  var container = document.getElementById('diaryCards');
  var searchFilter = document.getElementById('diarySearchFilter').value.toLowerCase();
  
  var filtered = data.filter(function(d) {
    var matchSearch = !searchFilter || (d.content || '').toLowerCase().includes(searchFilter) || (d.mood || '').toLowerCase().includes(searchFilter) || (d.location || '').toLowerCase().includes(searchFilter);
    return matchSearch;
  });
  
  var tagCount = {};
  data.forEach(function(d) {
    (d.tags||[]).forEach(function(tag) {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  var tagStatsContainer = document.getElementById('diaryTagStats');
  tagStatsContainer.innerHTML = '';
  if (Object.keys(tagCount).length > 0) {
    var tagDiv = document.createElement('div');
    tagDiv.style.marginBottom = '15px';
    var sortedTags = Object.keys(tagCount).sort(function(a, b) { return tagCount[b] - tagCount[a]; });
    sortedTags.slice(0, 10).forEach(function(tag) {
      var tagSpan = document.createElement('span');
      tagSpan.className = 'badge badge-success';
      tagSpan.style.margin = '3px';
      tagSpan.style.cursor = 'pointer';
      tagSpan.textContent = tag + ' (' + tagCount[tag] + ')';
      tagSpan.addEventListener('click', function() { filterDiaryByTag(tag); });
      tagDiv.appendChild(tagSpan);
    });
    tagStatsContainer.appendChild(tagDiv);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">没有符合条件的日记</p>';
  } else {
    container.innerHTML = '';
    filtered.forEach(function(d) {
      var date = d.date?.split('T')[0] || '未知日期';
      var content = d.content?.substring(0, 100) + (d.content?.length > 100 ? '...' : '');
      var moodBadge = d.mood ? '<span class="badge badge-info">' + d.mood + '</span>' : '';
      var locationBadge = d.location ? '<span class="badge badge-secondary">' + d.location + '</span>' : '';
      var tagsHtml = (d.tags||[]).map(function(t) { return '<span class="badge badge-success">' + t + '</span>'; }).join('');
      
      var card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = '<h3>' + date + '</h3>' +
        '<p>' + content + '</p>' +
        '<div class="card-meta">' + moodBadge + locationBadge + tagsHtml + '</div>' +
        '<div class="card-actions">' +
        '<button class="btn btn-sm btn-primary">编辑</button>' +
        '<button class="btn btn-sm btn-danger">删除</button>' +
        '</div>';
      
      var editBtn = card.querySelector('.btn-primary');
      var deleteBtn = card.querySelector('.btn-danger');
      editBtn.addEventListener('click', function() { editDiary(d.id); });
      deleteBtn.addEventListener('click', function() { deleteDiary(d.id); });
      
      container.appendChild(card);
    });
  }
  
  document.getElementById('diaryStats').innerHTML = '共 ' + filtered.length + ' 篇日记' + (filtered.length !== data.length ? '（共 ' + data.length + ' 篇）' : '');
}

function filterDiaryByTag(tag) {
  document.getElementById('diarySearchFilter').value = tag;
  filterDiary();
}
document.getElementById('diaryForm').addEventListener('submit', async e => {
  e.preventDefault();
  const dateValue = document.getElementById('diaryDate').value;
  const date = new Date(dateValue);
  const data = {
    content: document.getElementById('diaryContent').value,
    date: date.toISOString(),
    mood: document.getElementById('diaryMood').value,
    location: document.getElementById('diaryLocation').value,
    tags: document.getElementById('diaryTags').value.split(',').map(t => t.trim()).filter(Boolean),
    images: document.getElementById('diaryImages').value.split(',').map(t => t.trim()).filter(Boolean)
  };
  const id = document.getElementById('diaryId').value;
  if (id) {
    await api('PUT', \`/api/diary/\${id}\`, data);
  } else {
    await api('POST', '/api/diary', data);
  }
  showMsg('保存成功', 'success');
  loadDiary();
  clearDiaryForm();
  closeDiaryModal();
});
function openDiaryModal() {
  document.getElementById('diaryModalTitle').textContent = '新建';
  clearDiaryForm();
  document.getElementById('diaryModal').classList.add('active');
}
function closeDiaryModal() {
  document.getElementById('diaryModal').classList.remove('active');
}
function clearDiaryForm() {
  document.getElementById('diaryId').value = '';
  document.getElementById('diaryDate').value = '';
  document.getElementById('diaryMood').value = '';
  document.getElementById('diaryLocation').value = '';
  document.getElementById('diaryTags').value = '';
  document.getElementById('diaryImages').value = '';
  document.getElementById('diaryContent').value = '';
}
async function editDiary(id) {
  const res = await api('GET', '/api/diary');
  const d = res.data.find(x => x.id === id);
  if (!d) return;
  document.getElementById('diaryModalTitle').textContent = '编辑日记';
  document.getElementById('diaryId').value = d.id;
  if (d.date) {
    const date = new Date(d.date);
    document.getElementById('diaryDate').value = date.toISOString().slice(0, 16);
  }
  document.getElementById('diaryMood').value = d.mood || '';
  document.getElementById('diaryLocation').value = d.location || '';
  document.getElementById('diaryTags').value = (d.tags||[]).join(', ');
  document.getElementById('diaryImages').value = (d.images||[]).join(', ');
  document.getElementById('diaryContent').value = d.content || '';
  document.getElementById('diaryModal').classList.add('active');
}
async function deleteDiary(id) {
  showConfirmModal('确定要删除这条日记吗？', async function() {
    await api('DELETE', \`/api/diary/\${id}\`);
    showMsg('删除成功', 'success');
    loadDiary();
  });
}
document.getElementById('diaryModal').addEventListener('click', e => {
  if (e.target === document.getElementById('diaryModal')) {
    closeDiaryModal();
  }
});
</script>`;