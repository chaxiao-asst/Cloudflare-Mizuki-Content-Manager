export const timelinePage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>时间线管理</h2>
<button type="button" class="btn btn-primary" onclick="openTimelineModal()">新建</button>
<select id="timelineTypeFilter" onchange="filterTimeline()">
  <option value="">全部类型</option>
</select>
</div>
<div class="page-cards-area">
<div class="timeline" id="timelineCards"></div>
</div>
<div id="timelineStats" class="page-stats"></div>
</div>

<div class="modal" id="timelineModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="timelineModalTitle">新建</h2>
      <button class="close-btn" onclick="closeTimelineModal()">&times;</button>
    </div>
    <form id="timelineForm" class="form-group">
      <input type="hidden" name="id" id="timelineId">
      <div class="form-grid">
        <div class="form-group"><label>事件ID</label><input type="text" name="id" id="timelineTid" required></div>
        <div class="form-group"><label>标题</label><input type="text" name="title" id="timelineTitle" required></div>
        <div class="form-group"><label>类型</label><input type="text" name="typeInput" id="timelineTypeInput" list="timelineTypeList" placeholder="选择或输入新类型" autocomplete="off">
          <datalist id="timelineTypeList"></datalist></div>
        <div class="form-group"><label>开始日期</label><input type="date" name="startDate" id="timelineStartDate" required></div>
        <div class="form-group"><label>结束日期</label><input type="date" name="endDate" id="timelineEndDate"></div>
        <div class="form-group"><label>地点</label><input type="text" name="location" id="timelineLocation" placeholder="北京、上海..."></div>
        <div class="form-group"><label>组织/机构</label><input type="text" name="organization" id="timelineOrganization" placeholder="公司、学校..."></div>
        <div class="form-group"><label>职位</label><input type="text" name="position" id="timelinePosition" placeholder="前端开发工程师..."></div>
        <div class="form-group"><label>相关技能</label><textarea name="skills" id="timelineSkills" placeholder="每行一个技能" rows="2"></textarea></div>
        <div class="form-group"><label>成就</label><textarea name="achievements" id="timelineAchievements" placeholder="每行一个成就" rows="2"></textarea></div>
        <div class="form-group"><label>图标</label><input type="text" name="icon" id="timelineIcon" placeholder="material-symbols:school"></div>
        <div class="form-group"><label>主题颜色</label><input type="color" name="color" id="timelineColor" value="#059669"></div>
      </div>
      <div class="form-group"><label>描述</label><textarea name="description" id="timelineDescription" placeholder="事件详细描述..."></textarea></div>
      <div class="form-group"><label>相关链接（JSON格式）</label><textarea name="links" id="timelineLinks" placeholder='[{"name":"链接名称","url":"https://...","type":"website"}]'></textarea></div>
      <div class="form-group"><div class="boolean-switch"><input type="checkbox" name="featured" id="timelineFeatured"><label for="timelineFeatured">置顶</label></div></div>
      <button type="submit" class="btn btn-primary">保存时间线</button>
      <button type="button" class="btn btn-success" onclick="clearTimelineForm(); closeTimelineModal()">取消</button>
    </form>
  </div>
</div>
<script>
const defaultTimelineTypes = ['education', 'work', 'project', 'achievement'];
const timelineTypeNames = { education: '教育', work: '工作', project: '项目', achievement: '成就' };
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.nav-link[data-page="timeline"]')?.classList.add('active');
  loadTimeline();
});
async function loadTimeline() {
  const res = await api('GET', '/api/timeline');
  const container = document.getElementById('timelineCards');
  
  if (!res.data || res.data.length === 0) {
    container.innerHTML = '<p class="empty-state">暂无时间线数据</p>';
    document.getElementById('timelineStats').innerHTML = '';
    document.getElementById('timelineTypeFilter').innerHTML = '<option value="">全部类型</option>';
    document.getElementById('timelineTypeList').innerHTML = '';
    return;
  }
  
  const allTypes = new Set(defaultTimelineTypes);
  res.data.forEach(function(t) { if (t.type) allTypes.add(t.type); });
  const sortedTypes = Array.from(allTypes).sort(function(a, b) {
    const aIsDefault = defaultTimelineTypes.includes(a);
    const bIsDefault = defaultTimelineTypes.includes(b);
    if (aIsDefault && !bIsDefault) return -1;
    if (!aIsDefault && bIsDefault) return 1;
    return (timelineTypeNames[a] || a).localeCompare(timelineTypeNames[b] || b);
  });
  
  window.timelineData = res.data;
  window.timelineTypeMap = timelineTypeNames;
  window.timelineTypes = sortedTypes;
  
  const filterSelect = document.getElementById('timelineTypeFilter');
  filterSelect.innerHTML = '<option value="">全部类型</option>';
  sortedTypes.forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = t;
    opt.textContent = timelineTypeNames[t] || t;
    filterSelect.appendChild(opt);
  });
  
  const datalist = document.getElementById('timelineTypeList');
  datalist.innerHTML = '';
  sortedTypes.forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = timelineTypeNames[t] || t;
    datalist.appendChild(opt);
  });
  
  filterTimeline();
}

function filterTimeline() {
  var data = window.timelineData || [];
  var typeMap = window.timelineTypeMap || {};
  var container = document.getElementById('timelineCards');
  var typeFilter = document.getElementById('timelineTypeFilter').value;
  
  var filtered = data.filter(function(t) {
    var matchType = !typeFilter || t.type === typeFilter;
    return matchType;
  });
  
  filtered.sort(function(a, b) {
    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  });
  
  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">没有符合条件的时间线</p>';
  } else {
    var grid = document.createElement('div');
    grid.className = 'timeline-grid';
    
    filtered.forEach(function(t) {
      var dateRange = t.startDate || '';
      if (t.endDate) dateRange += ' ~ ' + t.endDate;
      var typeColor = t.type === 'education' ? '#3b82f6' : t.type === 'work' ? '#10b981' : t.type === 'project' ? '#f59e0b' : '#8b5cf6';
      
      var item = document.createElement('div');
      item.className = 'card timeline-card';
      item.innerHTML = '<div class="timeline-content" style="border-left: 3px solid ' + typeColor + ';">' +
        '<div style="display:flex;justify-content:space-between;align-items:start;">' +
        '<h3 style="margin:0 0 5px">' + t.title + '</h3>' +
        '<span class="badge badge-info">' + (typeMap[t.type] || t.type) + '</span>' +
        '</div>' +
        '<p style="font-size:0.9rem;margin:5px 0;">' + (t.description || '暂无描述') + '</p>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;">' +
        '<span style="font-size:0.85rem;">' + dateRange + '</span>' +
        '<span style="font-size:0.85rem;">' + (t.organization || '无') + '</span>' +
        '<span style="font-size:0.85rem;">' + (t.position || '无') + '</span>' +
        '</div>' +
        '<div class="card-actions">' +
        '<button class="btn btn-sm btn-primary">编辑</button>' +
        '<button class="btn btn-sm btn-danger">删除</button>' +
        '</div>' +
        '</div>';
      
      var editBtn = item.querySelector('.btn-primary');
      var deleteBtn = item.querySelector('.btn-danger');
      editBtn.addEventListener('click', function() { editTimeline(t.id); });
      deleteBtn.addEventListener('click', function() { deleteTimeline(t.id); });
      
      grid.appendChild(item);
    });
    
    container.innerHTML = '';
    container.appendChild(grid);
  }
  
  document.getElementById('timelineStats').innerHTML = '共 ' + filtered.length + ' 个事件' + (filtered.length !== data.length ? '（共 ' + data.length + ' 个）' : '');
}
document.getElementById('timelineForm').addEventListener('submit', async e => {
  e.preventDefault();
  let links = undefined;
  try {
    const linksStr = document.getElementById('timelineLinks').value;
    if (linksStr.trim()) {
      links = JSON.parse(linksStr);
    }
  } catch (err) {
    showMsg('链接格式错误，请检查JSON格式', 'error');
    return;
  }
  var typeInput = document.getElementById('timelineTypeInput').value;
  var typeNames = window.timelineTypeMap || {};
  var typeKey = typeInput;
  for (var key in typeNames) {
    if (typeNames[key] === typeInput) {
      typeKey = key;
      break;
    }
  }
  const data = {
    id: document.getElementById('timelineTid').value,
    title: document.getElementById('timelineTitle').value,
    description: document.getElementById('timelineDescription').value,
    type: typeKey,
    startDate: document.getElementById('timelineStartDate').value,
    endDate: document.getElementById('timelineEndDate').value || undefined,
    location: document.getElementById('timelineLocation').value,
    organization: document.getElementById('timelineOrganization').value,
    position: document.getElementById('timelinePosition').value,
    skills: document.getElementById('timelineSkills').value.split('\\n').map(t => t.trim()).filter(Boolean),
    achievements: document.getElementById('timelineAchievements').value.split('\\n').map(t => t.trim()).filter(Boolean),
    icon: document.getElementById('timelineIcon').value || undefined,
    color: document.getElementById('timelineColor').value || undefined,
    links,
    featured: document.getElementById('timelineFeatured').checked
  };
  const id = document.getElementById('timelineId').value;
  if (id) {
    await api('PUT', \`/api/timeline/\${id}\`, data);
  } else {
    await api('POST', '/api/timeline', data);
  }
  showMsg('保存成功', 'success');
  loadTimeline();
  clearTimelineForm();
  closeTimelineModal();
});
function clearTimelineForm() {
  document.getElementById('timelineId').value = '';
  document.getElementById('timelineTid').value = '';
  document.getElementById('timelineTitle').value = '';
  document.getElementById('timelineDescription').value = '';
  document.getElementById('timelineTypeInput').value = '';
  document.getElementById('timelineStartDate').value = '';
  document.getElementById('timelineEndDate').value = '';
  document.getElementById('timelineLocation').value = '';
  document.getElementById('timelineOrganization').value = '';
  document.getElementById('timelinePosition').value = '';
  document.getElementById('timelineSkills').value = '';
  document.getElementById('timelineAchievements').value = '';
  document.getElementById('timelineIcon').value = '';
  document.getElementById('timelineColor').value = '#059669';
  document.getElementById('timelineLinks').value = '';
  document.getElementById('timelineFeatured').checked = false;
}
function openTimelineModal() {
  document.getElementById('timelineModalTitle').textContent = '新建';
  clearTimelineForm();
  document.getElementById('timelineModal').classList.add('active');
}
function closeTimelineModal() {
  document.getElementById('timelineModal').classList.remove('active');
}
async function editTimeline(id) {
  const res = await api('GET', '/api/timeline');
  const t = res.data.find(x => x.id === id);
  if (!t) return;
  document.getElementById('timelineModalTitle').textContent = '编辑时间线';
  document.getElementById('timelineId').value = t.id;
  document.getElementById('timelineTid').value = t.id;
  document.getElementById('timelineTitle').value = t.title;
  document.getElementById('timelineDescription').value = t.description || '';
  var typeNames = window.timelineTypeMap || {};
  document.getElementById('timelineTypeInput').value = typeNames[t.type] || t.type || '';
  document.getElementById('timelineStartDate').value = t.startDate || '';
  document.getElementById('timelineEndDate').value = t.endDate || '';
  document.getElementById('timelineLocation').value = t.location || '';
  document.getElementById('timelineOrganization').value = t.organization || '';
  document.getElementById('timelinePosition').value = t.position || '';
  document.getElementById('timelineSkills').value = (t.skills || []).join('\\n');
  document.getElementById('timelineAchievements').value = (t.achievements || []).join('\\n');
  document.getElementById('timelineIcon').value = t.icon || '';
  document.getElementById('timelineColor').value = t.color || '#059669';
  document.getElementById('timelineLinks').value = t.links ? JSON.stringify(t.links) : '';
  document.getElementById('timelineFeatured').checked = t.featured || false;
  document.getElementById('timelineModal').classList.add('active');
}
async function deleteTimeline(id) {
  showConfirmModal('确定要删除这个时间线吗？', async function() {
    await api('DELETE', \`/api/timeline/\${id}\`);
    showMsg('删除成功', 'success');
    loadTimeline();
  });
}
document.getElementById('timelineModal').addEventListener('click', e => {
  if (e.target === document.getElementById('timelineModal')) {
    closeTimelineModal();
  }
});
</script>`;