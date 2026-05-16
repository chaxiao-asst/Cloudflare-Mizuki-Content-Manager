export const devicesPage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>设备管理</h2>
<button type="button" class="btn btn-primary" onclick="openDeviceModal()">新建</button>
<input type="text" id="deviceSearchFilter" placeholder="搜索设备..." oninput="filterDevices()">
</div>
<div class="page-cards-area">
<div class="card-grid" id="devicesCards"></div>
</div>
<div id="devicesStats" class="page-stats"></div>
</div>

<div class="modal" id="deviceModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="deviceModalTitle">新建</h2>
      <button class="close-btn" onclick="closeDeviceModal()">&times;</button>
    </div>
    <form id="deviceForm" class="form-group">
      <input type="hidden" name="oldCategory" id="deviceOldCategory">
      <input type="hidden" name="oldName" id="deviceOldName">
      <div class="form-grid">
        <div class="form-group"><label>分类</label><input type="text" name="category" id="deviceCategory" required placeholder="如：手机、电脑..."></div>
        <div class="form-group"><label>名称</label><input type="text" name="name" id="deviceName" required></div>
        <div class="form-group"><label>图片URL</label><input type="text" name="image" id="deviceImage" placeholder="图片URL或相对路径"></div>
        <div class="form-group"><label>规格</label><input type="text" name="specs" id="deviceSpecs" placeholder="核心配置..."></div>
        <div class="form-group"><label>详情链接</label><input type="text" name="link" id="deviceLink" placeholder="链接URL或相对路径"></div>
      </div>
      <div class="form-group"><label>描述</label><textarea name="description" id="deviceDescription" placeholder="设备描述..."></textarea></div>
      <button type="submit" class="btn btn-primary">保存设备</button>
      <button type="button" class="btn btn-success" onclick="clearDeviceForm(); closeDeviceModal()">取消</button>
    </form>
  </div>
</div>
<script>
async function loadDevices() {
  const res = await api('GET', '/api/devices');
  window.devicesData = res.data || {};
  filterDevices();
}

function filterDevices() {
  var searchTerm = (document.getElementById('deviceSearchFilter')?.value || '').toLowerCase();
  var container = document.getElementById('devicesCards');
  if (!window.devicesData || Object.keys(window.devicesData).length === 0) return;
  var data = window.devicesData;
  container.innerHTML = '';
  var totalCount = 0; var totalAll = 0; var catCounts = {};
  Object.keys(data).forEach(function(category) {
    var devices = data[category];
    var filtered = devices.filter(function(d) {
      return !searchTerm || (d.name && d.name.toLowerCase().indexOf(searchTerm) !== -1) || (d.specs && d.specs.toLowerCase().indexOf(searchTerm) !== -1);
    });
    totalAll += devices.length;
    if (filtered.length === 0) return;
    totalCount += filtered.length;
    catCounts[category] = filtered.length;
    var section = document.createElement('div');
    section.className = 'device-section';
    section.innerHTML = '<h3 class="device-category-title">' + category + '</h3><div class="card-grid">';
    filtered.forEach(function(d) {
      var card = document.createElement('div');
      card.className = 'card device-card';
      card.innerHTML = '<h4>' + d.name + '</h4>' +
        (d.image ? '<img src="' + d.image + '" style="width:100%;max-height:150px;object-fit:cover;border-radius:8px;margin:10px 0;" alt="' + d.name + '">' : '') +
        '<p>' + (d.description || '暂无描述') + '</p>' +
        (d.specs ? '<div style="font-size:0.85rem;">规格: ' + d.specs + '</div>' : '') +
        '<div class="card-actions">' +
        (d.link ? '<a href="' + d.link + '" target="_blank" class="btn btn-sm btn-primary">详情</a>' : '') +
        '<button class="btn btn-sm btn-primary">编辑</button>' +
        '<button class="btn btn-sm btn-danger">删除</button>' +
        '</div>';
      var buttons = card.querySelectorAll('button');
      var editBtn = buttons[0]; var deleteBtn = buttons[1];
      editBtn.addEventListener('click', function() { editDevice(category, d.name); });
      deleteBtn.addEventListener('click', function() { deleteDevice(category, d.name); });
      section.querySelector('.card-grid').appendChild(card);
    });
    container.appendChild(section);
  });
  if (totalCount === 0) {
    container.innerHTML = searchTerm ? '<p class="empty-state">没有匹配 "' + searchTerm + '" 的设备</p>' : '<p class="empty-state">暂无设备数据</p>';
  }
  var catDetail = Object.keys(catCounts).sort().map(function(c) { return c + ': ' + catCounts[c]; }).join(' | ');
  document.getElementById('devicesStats').innerHTML = '共 ' + Object.keys(catCounts).length + ' 个分类，' + totalCount + ' 台设备' + (searchTerm && totalCount !== totalAll ? '（全部 ' + totalAll + ' 台）' : '') + ' | ' + catDetail;
}

function openDeviceModal() {
  document.getElementById('deviceModalTitle').textContent = '新建';
  clearDeviceForm();
  document.getElementById('deviceModal').classList.add('active');
}

function closeDeviceModal() {
  document.getElementById('deviceModal').classList.remove('active');
}

document.getElementById('deviceForm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = {
    category: document.getElementById('deviceCategory').value,
    device: {
      name: document.getElementById('deviceName').value,
      image: document.getElementById('deviceImage').value,
      specs: document.getElementById('deviceSpecs').value,
      description: document.getElementById('deviceDescription').value,
      link: document.getElementById('deviceLink').value
    }
  };
  
  const oldCategory = document.getElementById('deviceOldCategory').value;
  const oldName = document.getElementById('deviceOldName').value;
  
  if (oldCategory && oldName) {
    await api('PUT', '/api/devices/' + encodeURIComponent(oldCategory) + '/' + encodeURIComponent(oldName), data);
  } else {
    await api('POST', '/api/devices', data);
  }
  showMsg('保存成功', 'success');
  loadDevices();
  clearDeviceForm();
  closeDeviceModal();
});

function clearDeviceForm() {
  document.getElementById('deviceOldCategory').value = '';
  document.getElementById('deviceOldName').value = '';
  document.getElementById('deviceCategory').value = '';
  document.getElementById('deviceName').value = '';
  document.getElementById('deviceImage').value = '';
  document.getElementById('deviceSpecs').value = '';
  document.getElementById('deviceDescription').value = '';
  document.getElementById('deviceLink').value = '';
}

async function editDevice(category, name) {
  document.getElementById('deviceModalTitle').textContent = '编辑设备';
  document.getElementById('deviceOldCategory').value = category;
  document.getElementById('deviceOldName').value = name;
  document.getElementById('deviceCategory').value = category;
  
  const data = window.devicesData || {};
  const devices = data[category] || [];
  const device = devices.find(d => d.name === name);
  
  if (device) {
    document.getElementById('deviceName').value = device.name;
    document.getElementById('deviceImage').value = device.image || '';
    document.getElementById('deviceSpecs').value = device.specs || '';
    document.getElementById('deviceDescription').value = device.description || '';
    document.getElementById('deviceLink').value = device.link || '';
  }
  
  document.getElementById('deviceModal').classList.add('active');
}

async function deleteDevice(category, name) {
  showConfirmModal('确定要删除设备 "' + name + '" 吗？', async function() {
    await api('DELETE', '/api/devices/' + encodeURIComponent(category) + '/' + encodeURIComponent(name));
    showMsg('删除成功', 'success');
    loadDevices();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.nav-link[data-page="devices"]')?.classList.add('active');
  loadDevices();
});
</script>`;