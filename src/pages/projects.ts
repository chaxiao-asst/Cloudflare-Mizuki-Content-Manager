export const projectsPage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>项目管理</h2>
<button type="button" class="btn btn-primary" onclick="openProjectModal()">新建</button>
<select id="projectCategoryFilter" onchange="filterProjects()">
  <option value="">全部分类</option>
</select>
<select id="projectStatusFilter" onchange="filterProjects()">
  <option value="">全部状态</option>
  <option value="completed">已完成</option>
  <option value="in-progress">进行中</option>
  <option value="planned">已计划</option>
</select>
</div>
<div class="page-cards-area">
<div class="card-grid" id="projectsCards"></div>
</div>
<div id="projectsStats" class="page-stats"></div>
</div>

<div class="modal" id="projectModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="projectModalTitle">新建</h2>
      <button class="close-btn" onclick="closeProjectModal()">&times;</button>
    </div>
    <form id="projectForm" class="form-group">
      <input type="hidden" name="id" id="projectId">
      <div class="form-grid">
        <div class="form-group"><label>项目ID</label><input type="text" name="id" id="projectPid" required></div>
        <div class="form-group"><label>标题</label><input type="text" name="title" id="projectTitle" required></div>
        <div class="form-group"><label>分类</label><input type="text" name="categoryInput" id="projectCategoryInput" list="projectCategoryList" placeholder="选择或输入新分类" autocomplete="off">
          <datalist id="projectCategoryList"></datalist></div>
        <div class="form-group"><label>状态</label><select name="status" id="projectStatus"><option value="completed">已完成</option><option value="in-progress">进行中</option><option value="planned">已计划</option></select></div>
        <div class="form-group"><label>技术栈</label><textarea name="techStack" id="projectTechStack" placeholder="每行一个技术" rows="2"></textarea></div>
        <div class="form-group"><label>封面图片URL</label><input type="text" name="image" id="projectImage" placeholder="/assets/projects/cover.png"></div>
        <div class="form-group"><label>Demo网址</label><input type="text" name="liveDemo" id="projectLiveDemo" placeholder="URL或相对路径"></div>
        <div class="form-group"><label>源码地址</label><input type="text" name="sourceCode" id="projectSourceCode" placeholder="URL或相对路径"></div>
        <div class="form-group"><label>项目主页</label><input type="text" name="visitUrl" id="projectVisitUrl" placeholder="URL或相对路径"></div>
        <div class="form-group"><label>开始日期</label><input type="date" name="startDate" id="projectStartDate"></div>
        <div class="form-group"><label>结束日期</label><input type="date" name="endDate" id="projectEndDate"></div>
        <div class="form-group"><label>标签</label><textarea name="tags" id="projectTags" placeholder="每行一个标签" rows="2"></textarea></div>
      </div>
      <div class="form-group"><label>描述</label><textarea name="description" id="projectDescription" placeholder="项目详细描述..."></textarea></div>
      <div class="form-group"><div class="boolean-switch"><input type="checkbox" name="featured" id="projectFeatured"><label for="projectFeatured">置顶项目</label></div></div>
      <button type="submit" class="btn btn-primary">保存项目</button>
      <button type="button" class="btn btn-success" onclick="clearProjectForm(); closeProjectModal()">取消</button>
    </form>
  </div>
</div>
<script>
const defaultCategories = ['web', 'mobile', 'desktop', 'other'];
const categoryNames = { web: '网页应用', mobile: '移动应用', desktop: '桌面应用', other: '其它' };
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.nav-link[data-page="projects"]')?.classList.add('active');
  loadProjects();
});
async function loadProjects() {
  const res = await api('GET', '/api/projects');
  const container = document.getElementById('projectsCards');
  const statusMap = { completed: '已完成', 'in-progress': '进行中', planned: '已计划' };
  
  if (!res.data || res.data.length === 0) {
    container.innerHTML = '<p class="empty-state">暂无项目数据</p>';
    document.getElementById('projectsStats').innerHTML = '';
    document.getElementById('projectCategoryFilter').innerHTML = '<option value="">全部分类</option>';
    document.getElementById('projectCategoryList').innerHTML = '';
    return;
  }
  
  const allCategories = new Set(defaultCategories);
  res.data.forEach(function(p) { if (p.category) allCategories.add(p.category); });
  const sortedCategories = Array.from(allCategories).sort(function(a, b) {
    const aIsDefault = defaultCategories.includes(a);
    const bIsDefault = defaultCategories.includes(b);
    if (aIsDefault && !bIsDefault) return -1;
    if (!aIsDefault && bIsDefault) return 1;
    return (categoryNames[a] || a).localeCompare(categoryNames[b] || b);
  });
  
  window.projectsData = res.data;
  window.projectsStatusMap = statusMap;
  window.allCategories = sortedCategories;
  window.categoryNames = categoryNames;
  
  const filterSelect = document.getElementById('projectCategoryFilter');
  filterSelect.innerHTML = '<option value="">全部分类</option>';
  sortedCategories.forEach(function(cat) {
    var opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = categoryNames[cat] || cat;
    filterSelect.appendChild(opt);
  });
  
  const datalist = document.getElementById('projectCategoryList');
  datalist.innerHTML = '';
  sortedCategories.forEach(function(cat) {
    var opt = document.createElement('option');
    opt.value = categoryNames[cat] || cat;
    datalist.appendChild(opt);
  });
  
  filterProjects();
}

function filterProjects() {
  var data = window.projectsData || [];
  var statusMap = window.projectsStatusMap || {};
  var categoryNames = window.categoryNames || {};
  var container = document.getElementById('projectsCards');
  var categoryFilter = document.getElementById('projectCategoryFilter').value;
  var statusFilter = document.getElementById('projectStatusFilter').value;
  
  var filtered = data.filter(function(p) {
    var matchCategory = !categoryFilter || p.category === categoryFilter;
    var matchStatus = !statusFilter || p.status === statusFilter;
    return matchCategory && matchStatus;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">没有符合条件的项目</p>';
  } else {
    container.innerHTML = '';
    filtered.forEach(function(p) {
      var statusClass = p.status === 'completed' ? 'badge-success' : p.status === 'in-progress' ? 'badge-warning' : 'badge-secondary';
      var description = p.description?.substring(0, 80) + (p.description?.length > 80 ? '...' : '');
      var techStackHtml = (p.techStack||[]).slice(0, 3).map(function(t) { return '<span class="badge badge-success">' + t + '</span>'; }).join('');
      
      var card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = '<h3>' + p.title + '</h3>' +
        '<p>' + description + '</p>' +
        '<div class="card-meta">' +
        '<span class="badge badge-info">' + (categoryNames[p.category] || p.category) + '</span>' +
        '<span class="badge ' + statusClass + '">' + (statusMap[p.status] || p.status) + '</span>' +
        techStackHtml +
        '</div>' +
        '<div class="card-actions">' +
        '<button class="btn btn-sm btn-primary">编辑</button>' +
        '<button class="btn btn-sm btn-danger">删除</button>' +
        '</div>';
      
      var editBtn = card.querySelector('.btn-primary');
      var deleteBtn = card.querySelector('.btn-danger');
      editBtn.addEventListener('click', function() { editProject(p.id); });
      deleteBtn.addEventListener('click', function() { deleteProject(p.id); });
      
      container.appendChild(card);
    });
  }
  
  document.getElementById('projectsStats').innerHTML = '共 ' + filtered.length + ' 个项目' + (filtered.length !== data.length ? '（共 ' + data.length + ' 个）' : '');
}
document.getElementById('projectForm').addEventListener('submit', async e => {
  e.preventDefault();
  var categoryInput = document.getElementById('projectCategoryInput').value;
  var categoryNames = window.categoryNames || {};
  var categoryKey = categoryInput;
  for (var key in categoryNames) {
    if (categoryNames[key] === categoryInput) {
      categoryKey = key;
      break;
    }
  }
  const data = {
    id: document.getElementById('projectPid').value,
    title: document.getElementById('projectTitle').value,
    description: document.getElementById('projectDescription').value,
    image: document.getElementById('projectImage').value,
    category: categoryKey,
    techStack: document.getElementById('projectTechStack').value.split('\\n').map(t => t.trim()).filter(Boolean),
    status: document.getElementById('projectStatus').value,
    liveDemo: document.getElementById('projectLiveDemo').value,
    sourceCode: document.getElementById('projectSourceCode').value,
    startDate: document.getElementById('projectStartDate').value,
    endDate: document.getElementById('projectEndDate').value,
    featured: document.getElementById('projectFeatured').checked,
    tags: document.getElementById('projectTags').value.split('\\n').map(t => t.trim()).filter(Boolean),
    visitUrl: document.getElementById('projectVisitUrl').value
  };
  const id = document.getElementById('projectId').value;
  if (id) {
    await api('PUT', \`/api/projects/\${id}\`, data);
  } else {
    await api('POST', '/api/projects', data);
  }
  showMsg('保存成功', 'success');
  loadProjects();
  clearProjectForm();
  closeProjectModal();
});
function openProjectModal() {
  document.getElementById('projectModalTitle').textContent = '新建';
  clearProjectForm();
  document.getElementById('projectModal').classList.add('active');
}
function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
}
function clearProjectForm() {
  document.getElementById('projectId').value = '';
  document.getElementById('projectPid').value = '';
  document.getElementById('projectTitle').value = '';
  document.getElementById('projectDescription').value = '';
  document.getElementById('projectImage').value = '';
  document.getElementById('projectCategoryInput').value = '';
  document.getElementById('projectTechStack').value = '';
  document.getElementById('projectStatus').value = 'completed';
  document.getElementById('projectLiveDemo').value = '';
  document.getElementById('projectSourceCode').value = '';
  document.getElementById('projectStartDate').value = '';
  document.getElementById('projectEndDate').value = '';
  document.getElementById('projectFeatured').checked = false;
  document.getElementById('projectTags').value = '';
  document.getElementById('projectVisitUrl').value = '';
}
async function editProject(id) {
  const res = await api('GET', '/api/projects');
  const p = res.data.find(x => x.id === id);
  if (!p) return;
  document.getElementById('projectModalTitle').textContent = '编辑项目';
  document.getElementById('projectId').value = p.id;
  document.getElementById('projectPid').value = p.id;
  document.getElementById('projectTitle').value = p.title;
  document.getElementById('projectDescription').value = p.description || '';
  document.getElementById('projectImage').value = p.image || '';
  var categoryNames = window.categoryNames || {};
  document.getElementById('projectCategoryInput').value = categoryNames[p.category] || p.category || '';
  document.getElementById('projectTechStack').value = (p.techStack||[]).join('\\n');
  document.getElementById('projectStatus').value = p.status;
  document.getElementById('projectLiveDemo').value = p.liveDemo || '';
  document.getElementById('projectSourceCode').value = p.sourceCode || '';
  document.getElementById('projectStartDate').value = p.startDate || '';
  document.getElementById('projectEndDate').value = p.endDate || '';
  document.getElementById('projectFeatured').checked = p.featured || false;
  document.getElementById('projectTags').value = (p.tags||[]).join('\\n');
  document.getElementById('projectVisitUrl').value = p.visitUrl || '';
  document.getElementById('projectModal').classList.add('active');
}
async function deleteProject(id) {
  showConfirmModal('确定要删除这个项目吗？', async function() {
    await api('DELETE', \`/api/projects/\${id}\`);
    showMsg('删除成功', 'success');
    loadProjects();
  });
}
document.getElementById('projectModal').addEventListener('click', e => {
  if (e.target === document.getElementById('projectModal')) {
    closeProjectModal();
  }
});
</script>`;