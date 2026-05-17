export const skillsPage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>技能管理</h2>
<button type="button" class="btn btn-primary" onclick="openSkillModal()">新建</button>
<select id="skillCategoryFilter" onchange="filterSkills()">
  <option value="">全部分类</option>
</select>
<select id="skillLevelFilter" onchange="filterSkills()">
  <option value="">全部水平</option>
  <option value="beginner">初级</option>
  <option value="intermediate">中级</option>
  <option value="advanced">高级</option>
  <option value="expert">专家</option>
</select>
</div>
<div class="page-cards-area">
<div class="card-grid" id="skillsCards"></div>
</div>
<div id="skillsStats" class="page-stats"></div>
</div>

<div class="modal" id="skillModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="skillModalTitle">新建</h2>
      <button class="close-btn" onclick="closeSkillModal()">&times;</button>
    </div>
    <form id="skillForm" class="form-group">
      <input type="hidden" name="id" id="skillId">
      <div class="form-grid">
        <div class="form-group"><label>技能ID</label><input type="text" name="id" id="skillSid" required></div>
        <div class="form-group"><label>名称</label><input type="text" name="name" id="skillName" required></div>
        <div class="form-group"><label>分类</label><input type="text" name="categoryInput" id="skillCategoryInput" list="skillCategoryList" placeholder="选择或输入新分类" autocomplete="off">
          <datalist id="skillCategoryList"></datalist></div>
        <div class="form-group"><label>熟练度</label><select name="level" id="skillLevel"><option value="beginner">初级</option><option value="intermediate">中级</option><option value="advanced">高级</option><option value="expert">专家</option></select></div>
        <div class="form-group"><label>图标 <button type="button" class="btn btn-sm btn-secondary" onclick="showIconSets()" style="margin-left:8px;padding:4px 10px;font-size:0.8rem;">📚 图标集</button></label><input type="text" name="icon" id="skillIcon" placeholder="logos-javascript"></div>
        <div class="form-group"><label>主题颜色</label><input type="color" name="color" id="skillColor" value="#F7DF1E"></div>
        <div class="form-group"><label>经验（年）</label><input type="number" name="expYears" id="skillExpYears" value="0" min="0"></div>
        <div class="form-group"><label>经验（月）</label><input type="number" name="expMonths" id="skillExpMonths" value="0" min="0" max="11"></div>
        <div class="form-group"><label>相关项目</label><textarea name="projects" id="skillProjects" placeholder="每行一个项目" rows="2"></textarea></div>
        <div class="form-group"><label>证书</label><textarea name="certifications" id="skillCertifications" placeholder="每行一个证书" rows="2"></textarea></div>
      </div>
      <div class="form-group"><label>描述</label><textarea name="description" id="skillDescription" placeholder="技能描述..."></textarea></div>
      <button type="submit" class="btn btn-primary">保存技能</button>
      <button type="button" class="btn btn-success" onclick="clearSkillForm(); closeSkillModal()">取消</button>
    </form>
  </div>
</div>
<script>
const defaultSkillCategories = ['frontend', 'backend', 'database', 'tools', 'other'];
const skillCategoryNames = { frontend: '前端', backend: '后端', database: '数据库', tools: '工具', other: '其它' };
function showIconSets() {
  const iconSets = [
    { name: 'material-symbols', url: 'https://icon-sets.iconify.design/material-symbols' },
    { name: 'fa7-brands', url: 'https://icon-sets.iconify.design/fa7-brands' },
    { name: 'fa7-regular', url: 'https://icon-sets.iconify.design/fa7-regular' },
    { name: 'fa7-solid', url: 'https://icon-sets.iconify.design/fa7-solid' },
    { name: 'mdi', url: 'https://icon-sets.iconify.design/mdi' },
    { name: 'simple-icons', url: 'https://icon-sets.iconify.design/simple-icons' }
  ];
  let html = '<div class="icon-sets-modal">';
  html += '<div class="icon-sets-header"><h3>📚 Iconify 图标集</h3><button onclick="closeIconSets()">✕</button></div>';
  html += '<div class="icon-sets-body">';
  iconSets.forEach(function(set) {
    html += '<a href="' + set.url + '" target="_blank" class="icon-set-item">' + set.name + '</a>';
  });
  html += '</div></div>';
  const overlay = document.createElement('div');
  overlay.className = 'icon-sets-overlay';
  overlay.innerHTML = html;
  overlay.onclick = closeIconSets;
  document.body.appendChild(overlay);
}
function closeIconSets() {
  const overlay = document.querySelector('.icon-sets-overlay');
  if (overlay) overlay.remove();
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.nav-link[data-page="skills"]')?.classList.add('active');
  loadSkills();
});
async function loadSkills() {
  const res = await api('GET', '/api/skills');
  const container = document.getElementById('skillsCards');
  const levelMap = { beginner: '初级', intermediate: '中级', advanced: '高级', expert: '专家' };
  const levelPercent = { beginner: 25, intermediate: 50, advanced: 75, expert: 100 };
  
  if (!res.data || res.data.length === 0) {
    container.innerHTML = '<p class="empty-state">暂无技能数据</p>';
    document.getElementById('skillsStats').innerHTML = '';
    document.getElementById('skillCategoryFilter').innerHTML = '<option value="">全部分类</option>';
    document.getElementById('skillCategoryList').innerHTML = '';
    return;
  }
  
  const allCategories = new Set(defaultSkillCategories);
  res.data.forEach(function(s) { if (s.category) allCategories.add(s.category); });
  const sortedCategories = Array.from(allCategories).sort(function(a, b) {
    const aIsDefault = defaultSkillCategories.includes(a);
    const bIsDefault = defaultSkillCategories.includes(b);
    if (aIsDefault && !bIsDefault) return -1;
    if (!aIsDefault && bIsDefault) return 1;
    return (skillCategoryNames[a] || a).localeCompare(skillCategoryNames[b] || b);
  });
  
  window.skillsData = res.data;
  window.skillsLevelMap = levelMap;
  window.skillsLevelPercent = levelPercent;
  window.skillsCategoryNames = skillCategoryNames;
  window.skillCategories = sortedCategories;
  
  const filterSelect = document.getElementById('skillCategoryFilter');
  filterSelect.innerHTML = '<option value="">全部分类</option>';
  sortedCategories.forEach(function(cat) {
    var opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = skillCategoryNames[cat] || cat;
    filterSelect.appendChild(opt);
  });
  
  const datalist = document.getElementById('skillCategoryList');
  datalist.innerHTML = '';
  sortedCategories.forEach(function(cat) {
    var opt = document.createElement('option');
    opt.value = skillCategoryNames[cat] || cat;
    datalist.appendChild(opt);
  });
  
  filterSkills();
}

function filterSkills() {
  var data = window.skillsData || [];
  var categoryNames = window.skillsCategoryNames || {};
  var levelMap = window.skillsLevelMap || {};
  var levelPercent = window.skillsLevelPercent || {};
  var container = document.getElementById('skillsCards');
  var categoryFilter = document.getElementById('skillCategoryFilter').value;
  var levelFilter = document.getElementById('skillLevelFilter').value;
  
  var filtered = data.filter(function(s) {
    var matchCategory = !categoryFilter || s.category === categoryFilter;
    var matchLevel = !levelFilter || s.level === levelFilter;
    return matchCategory && matchLevel;
  });
  
  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">没有符合条件的技能</p>';
  } else {
    container.innerHTML = '';
    filtered.forEach(function(s) {
      var experience = (s.experience?.years || 0) + '年' + (s.experience?.months || 0) + '月';
      var percent = levelPercent[s.level] || 50;
      
      var card = document.createElement('div');
      card.className = 'card skill-card';
      card.innerHTML = '<div class="skill-header">' +
        '<span class="badge" style="background-color:' + (s.color || '#ccc') + '">●</span> ' +
        '<span style="font-weight:600;">' + s.name + '</span>' +
        '<span class="badge badge-info">' + (levelMap[s.level] || s.level) + '</span>' +
        '</div>' +
        '<p class="skill-desc">' + (s.description || '暂无描述') + '</p>' +
        '<div class="skill-progress">' +
        '<div class="skill-progress-bar" style="width:' + percent + '%;background-color:' + (s.color || '#4ade80') + '"></div>' +
        '</div>' +
        '<div class="skill-meta">' +
        '<span>' + experience + '</span>' +
        '<span style="margin-left:10px;">' + (categoryNames[s.category] || s.category) + '</span>' +
        '</div>' +
        '<div class="card-actions">' +
        '<button class="btn btn-sm btn-primary">编辑</button>' +
        '<button class="btn btn-sm btn-danger">删除</button>' +
        '</div>';
      
      var editBtn = card.querySelector('.btn-primary');
      var deleteBtn = card.querySelector('.btn-danger');
      editBtn.addEventListener('click', function() { editSkill(s.id); });
      deleteBtn.addEventListener('click', function() { deleteSkill(s.id); });
      
      container.appendChild(card);
    });
  }
  
  var totalYears = 0; var totalMonths = 0;
  data.forEach(function(s) { totalYears += s.experience?.years || 0; totalMonths += s.experience?.months || 0; });
  totalYears += Math.floor(totalMonths / 12); totalMonths = totalMonths % 12;
  var expStr = totalYears > 0 || totalMonths > 0 ? ' | 总经验: ' + totalYears + '年' + totalMonths + '月' : '';
  var catCounts = {}; data.forEach(function(s) { var c = s.category || 'other'; catCounts[c] = (catCounts[c] || 0) + 1; });
  var catDetails = Object.keys(catCounts).sort(function(a,b) { return catCounts[b] - catCounts[a]; }).map(function(c) { return (categoryNames[c] || c) + ': ' + catCounts[c]; }).join(' | ');
  document.getElementById('skillsStats').innerHTML = '共 ' + filtered.length + ' 项技能' + (filtered.length !== data.length ? '（全部 ' + data.length + ' 项）' : '') + expStr + ' | ' + catDetails;
}
document.getElementById('skillForm').addEventListener('submit', async e => {
  e.preventDefault();
  var categoryInput = document.getElementById('skillCategoryInput').value;
  var categoryNames = window.skillsCategoryNames || {};
  var categoryKey = categoryInput;
  for (var key in categoryNames) {
    if (categoryNames[key] === categoryInput) {
      categoryKey = key;
      break;
    }
  }
  const data = {
    id: document.getElementById('skillSid').value,
    name: document.getElementById('skillName').value,
    description: document.getElementById('skillDescription').value,
    icon: document.getElementById('skillIcon').value,
    category: categoryKey,
    level: document.getElementById('skillLevel').value,
    experience: {
      years: parseInt(document.getElementById('skillExpYears').value) || 0,
      months: parseInt(document.getElementById('skillExpMonths').value) || 0
    },
    color: document.getElementById('skillColor').value,
    projects: document.getElementById('skillProjects').value.split('\n').map(t => t.trim()).filter(Boolean),
    certifications: document.getElementById('skillCertifications').value.split('\n').map(t => t.trim()).filter(Boolean)
  };
  const id = document.getElementById('skillId').value;
  if (id) {
    await api('PUT', \`/api/skills/\${id}\`, data);
  } else {
    await api('POST', '/api/skills', data);
  }
  showMsg('保存成功', 'success');
  loadSkills();
  clearSkillForm();
  closeSkillModal();
});
function openSkillModal() {
  document.getElementById('skillModalTitle').textContent = '新建';
  clearSkillForm();
  document.getElementById('skillModal').classList.add('active');
}
function closeSkillModal() {
  document.getElementById('skillModal').classList.remove('active');
}
function clearSkillForm() {
  document.getElementById('skillId').value = '';
  document.getElementById('skillSid').value = '';
  document.getElementById('skillName').value = '';
  document.getElementById('skillDescription').value = '';
  document.getElementById('skillIcon').value = '';
  document.getElementById('skillCategoryInput').value = '';
  document.getElementById('skillLevel').value = 'intermediate';
  document.getElementById('skillExpYears').value = '0';
  document.getElementById('skillExpMonths').value = '0';
  document.getElementById('skillColor').value = '#F7DF1E';
  if (document.getElementById('skillLevelFilter')) document.getElementById('skillLevelFilter').value = '';
  document.getElementById('skillProjects').value = '';
  document.getElementById('skillCertifications').value = '';
}
async function editSkill(id) {
  const res = await api('GET', '/api/skills');
  const s = res.data.find(x => x.id === id);
  if (!s) return;
  document.getElementById('skillModalTitle').textContent = '编辑技能';
  document.getElementById('skillId').value = s.id;
  document.getElementById('skillSid').value = s.id;
  document.getElementById('skillName').value = s.name;
  document.getElementById('skillDescription').value = s.description || '';
  document.getElementById('skillIcon').value = s.icon || '';
  var categoryNames = window.skillsCategoryNames || {};
  document.getElementById('skillCategoryInput').value = categoryNames[s.category] || s.category || '';
  document.getElementById('skillLevel').value = s.level;
  document.getElementById('skillExpYears').value = s.experience?.years || 0;
  document.getElementById('skillExpMonths').value = s.experience?.months || 0;
  document.getElementById('skillColor').value = s.color || '#F7DF1E';
  document.getElementById('skillProjects').value = (s.projects || []).join('\n');
  document.getElementById('skillCertifications').value = (s.certifications || []).join('\n');
  document.getElementById('skillModal').classList.add('active');
}
async function deleteSkill(id) {
  showConfirmModal('确定要删除这个技能吗？', async function() {
    await api('DELETE', \`/api/skills/\${id}\`);
    showMsg('删除成功', 'success');
    loadSkills();
  });
}
document.getElementById('skillModal').addEventListener('click', e => {
  if (e.target === document.getElementById('skillModal')) {
    closeSkillModal();
  }
});
</script>`;