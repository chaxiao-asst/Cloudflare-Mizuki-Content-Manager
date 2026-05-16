export const albumsPage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>相册管理</h2>
<button type="button" class="btn btn-primary" onclick="openAlbumModal()">新建</button>
<input type="text" id="albumSearchInput" placeholder="搜索相册..." oninput="filterAlbums()">
<select id="albumModeFilter" onchange="filterAlbums()">
  <option value="">全部模式</option>
  <option value="local">本地模式</option>
  <option value="external">外链模式</option>
</select>
<select id="albumTagFilter" onchange="filterAlbums()">
  <option value="">全部标签</option>
</select>
</div>
<div class="page-cards-area">
<div class="card-grid" id="albumsCards"></div>
</div>
<div id="albumsStats" class="page-stats"></div>
</div>

<div class="modal" id="albumModal">
  <div class="modal-content" style="min-width:750px;max-width:900px;">
    <div class="modal-header">
      <h2 id="albumModalTitle">新建</h2>
      <button class="close-btn" onclick="closeAlbumModal()">&times;</button>
    </div>
    <div class="tab-nav">
      <button class="tab-btn active" data-tab="basic" onclick="switchAlbumTab('basic')">基础信息</button>
      <button class="tab-btn" data-tab="photos" onclick="switchAlbumTab('photos')">图片列表</button>
    </div>
    <form id="albumForm" class="form-group">
      <input type="hidden" name="oldName" id="albumOldName">
      <div class="tab-panel active" id="tab-album-basic">
        <div class="form-grid">
          <div class="form-group"><label>相册名称 *</label><input type="text" name="name" id="albumName" required></div>
          <div class="form-group"><label>相册标题</label><input type="text" name="title" id="albumTitle" placeholder="显示标题，不填则使用名称"></div>
          <div class="form-group"><label>模式</label><select name="mode" id="albumMode" onchange="onModeChange()">
            <option value="">本地模式</option>
            <option value="external">外链模式</option>
          </select></div>
          <div class="form-group"><label>布局方式</label><select name="layout" id="albumLayout">
            <option value="grid">网格 (Grid)</option>
            <option value="masonry">瀑布流 (Masonry)</option>
          </select></div>
          <div class="form-group"><label>列数</label><input type="number" name="columns" id="albumColumns" min="1" max="6" value="3" placeholder="默认3"></div>
          <div class="form-group"><label>创建日期</label><input type="date" name="date" id="albumDate"></div>
          <div class="form-group"><label>拍摄地点</label><input type="text" name="location" id="albumLocation" placeholder="如: 日本京都"></div>
          <div class="form-group"><label>相册封面</label><input type="text" name="cover" id="albumCover" placeholder="图片URL或相对路径"></div>
        </div>
        <div class="form-group"><label>标签</label><input type="text" name="tags" id="albumTags" placeholder="用逗号分隔，如: 旅行, 京都, 夏天"></div>
        <div class="form-group"><label>相册描述</label><textarea name="description" id="albumDescription" placeholder="相册描述..." rows="2"></textarea></div>
        <div class="form-group">
          <div class="boolean-switch"><input type="checkbox" name="hidden" id="albumHidden"><label for="albumHidden">隐藏相册（不在前台列表显示）</label></div>
        </div>
      </div>
      <div class="tab-panel" id="tab-album-photos">
        <div style="display:flex;gap:10px;margin-bottom:15px;">
          <button type="button" class="btn btn-sm btn-primary" onclick="addPhotoRow()">+ 添加图片</button>
          <button type="button" class="btn btn-sm btn-info" onclick="openBatchAddModal()">批量添加</button>
        </div>
        <div class="form-group">
          <label>图片列表</label>
          <div id="photoListContainer"></div>
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
        <button type="button" class="btn btn-success" onclick="clearAlbumForm(); closeAlbumModal()">取消</button>
        <button type="submit" class="btn btn-primary">💾 保存相册</button>
      </div>
    </form>
  </div>
</div>

<div class="modal" id="albumDetailModal">
  <div class="modal-content modal-large">
    <div class="modal-header">
      <h2 id="albumDetailTitle">相册详情</h2>
      <button class="close-btn" onclick="closeAlbumDetailModal()">&times;</button>
    </div>
    <div id="albumDetailContent"></div>
  </div>
</div>

<div class="modal" id="photoEditModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2 id="photoEditModalTitle">编辑照片</h2>
      <button class="close-btn" onclick="closePhotoEditModal()">&times;</button>
    </div>
    <form id="photoEditForm" class="form-group">
      <div class="form-grid">
        <div class="form-group"><label>图片链接 *</label><input type="text" name="pSrc" id="peSrc" required placeholder="图片URL"></div>
        <div class="form-group"><label>缩略图链接</label><input type="text" name="pThumbnail" id="peThumbnail" placeholder="缩略图URL"></div>
        <div class="form-group"><label>替代文本</label><input type="text" name="pAlt" id="peAlt" placeholder="alt文本"></div>
        <div class="form-group"><label>图片标题</label><input type="text" name="pTitle" id="peTitle" placeholder="图片标题"></div>
        <div class="form-group"><label>拍摄日期</label><input type="date" name="pDate" id="peDate"></div>
        <div class="form-group"><label>拍摄地点</label><input type="text" name="pLocation" id="peLocation" placeholder="拍摄地点"></div>
        <div class="form-group"><label>宽度</label><input type="number" name="pWidth" id="peWidth" placeholder="px"></div>
        <div class="form-group"><label>高度</label><input type="number" name="pHeight" id="peHeight" placeholder="px"></div>
        <div class="form-group"><label>相机型号</label><input type="text" name="pCamera" id="peCamera" placeholder="如: Canon EOS R5"></div>
        <div class="form-group"><label>镜头信息</label><input type="text" name="pLens" id="peLens" placeholder="如: RF 24-70mm"></div>
      </div>
      <div class="form-group"><label>图片描述</label><textarea name="pDescription" id="peDescription" placeholder="图片描述..." rows="2"></textarea></div>
      <div class="form-group"><label>图片标签</label><input type="text" name="pTags" id="peTags" placeholder="用逗号分隔"></div>
      <div class="form-group">
        <label>拍摄参数</label>
        <div class="form-grid" style="margin-top:8px;">
          <div class="form-group"><label>光圈</label><input type="text" name="pAperture" id="peAperture" placeholder="如: f/8"></div>
          <div class="form-group"><label>快门</label><input type="text" name="pShutter" id="peShutter" placeholder="如: 1/125"></div>
          <div class="form-group"><label>ISO</label><input type="number" name="pIso" id="peIso" placeholder="如: 200"></div>
          <div class="form-group"><label>焦距</label><input type="text" name="pFocal" id="peFocal" placeholder="如: 35mm"></div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">保存照片</button>
      <button type="button" class="btn btn-success" onclick="closePhotoEditModal()">取消</button>
    </form>
  </div>
</div>

<div class="lightbox" id="lightbox">
  <div class="lightbox-close" onclick="closeLightbox()">&times;</div>
  <button class="lightbox-prev" onclick="lightboxPrev()">&#10094;</button>
  <img id="lightboxImage" src="" alt="">
  <button class="lightbox-next" onclick="lightboxNext()">&#10095;</button>
  <div class="lightbox-info" id="lightboxInfo"></div>
</div>

<div class="modal" id="batchAddModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>批量添加图片</h2>
      <button class="close-btn" onclick="closeBatchAddModal()">&times;</button>
    </div>
    <div class="form-group">
      <label>图片链接</label>
      <textarea id="batchUrlsInput" placeholder="https://example.com/image.jpg" rows="8"></textarea>
      <p style="font-size:12px;color:#666;margin-top:8px;">提示：每行输入一个图片链接</p>
    </div>
    <button type="button" class="btn btn-primary" onclick="batchAddPhotos()">添加图片</button>
    <button type="button" class="btn btn-success" onclick="closeBatchAddModal()">取消</button>
  </div>
</div>

<script>
window.albumsData = [];
window.lightboxPhotos = [];
window.lightboxIndex = 0;
window.editingPhotoIndex = -1;

function switchAlbumTab(name) {
  document.querySelectorAll('#albumModal .tab-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('#albumForm .tab-panel').forEach(function(p) { p.classList.remove('active'); });
  document.querySelector('#albumModal .tab-btn[data-tab="' + name + '"]').classList.add('active');
  document.getElementById('tab-album-' + name).classList.add('active');
}

async function loadAlbums() {
  const res = await api('GET', '/api/albums');
  window.albumsData = res.data || [];
  updateTagFilter();
  filterAlbums();
}

function updateTagFilter() {
  var tagSet = new Set();
  window.albumsData.forEach(function(a) {
    if (Array.isArray(a.info && a.info.tags)) {
      a.info.tags.forEach(function(t) { tagSet.add(t); });
    }
  });
  var select = document.getElementById('albumTagFilter');
  select.innerHTML = '<option value="">全部标签</option>';
  Array.from(tagSet).sort().forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    select.appendChild(opt);
  });
}

function filterAlbums() {
  var data = window.albumsData || [];
  var container = document.getElementById('albumsCards');
  var searchQuery = document.getElementById('albumSearchInput').value.toLowerCase();
  var modeFilter = document.getElementById('albumModeFilter').value;
  var tagFilter = document.getElementById('albumTagFilter').value;

  var filtered = data.filter(function(a) {
    var info = a.info || {};
    var matchSearch = !searchQuery ||
      (a.name && a.name.toLowerCase().indexOf(searchQuery) !== -1) ||
      (info.title && info.title.toLowerCase().indexOf(searchQuery) !== -1) ||
      (info.description && info.description.toLowerCase().indexOf(searchQuery) !== -1) ||
      (info.location && info.location.toLowerCase().indexOf(searchQuery) !== -1);
    var albumMode = info.mode === 'external' ? 'external' : 'local';
    var matchMode = !modeFilter || albumMode === modeFilter;
    var matchTag = !tagFilter || (Array.isArray(info.tags) && info.tags.indexOf(tagFilter) !== -1);
    return matchSearch && matchMode && matchTag;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">没有符合条件的相册</p>';
  } else {
    container.innerHTML = '';

    filtered.forEach(function(a) {
      var info = a.info || {};
      var imageCount = (info.photos || []).length;
      var coverUrl = info.cover || (info.photos && info.photos.length > 0 ? info.photos[0].src : '');
      var albumMode = info.mode === 'external' ? 'external' : 'local';

      var card = document.createElement('div');
      card.className = 'card album-card';

      var coverHtml = coverUrl
        ? '<div class="album-cover"><img src="' + coverUrl + '" alt="' + (info.title || a.name) + '"></div>'
        : '<div class="album-cover-placeholder">📷</div>';

      var tagsHtml = '';
      if (Array.isArray(info.tags)) {
        tagsHtml = info.tags.map(function(t) {
          return '<span class="album-tag">' + t + '</span>';
        }).join('');
      }

      card.innerHTML = coverHtml +
        '<div class="card-content">' +
        '<h4>' + (info.title || a.name) + '</h4>' +
        (info.description ? '<p style="font-size:0.9rem;color:#666;margin:6px 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + info.description + '</p>' : '') +
        '<div class="album-meta">' +
        '<span class="badge badge-info">' + imageCount + ' 张图片</span>' +
        '<span class="badge ' + (albumMode === 'external' ? 'badge-warning' : 'badge-success') + '">' + (albumMode === 'external' ? '外链' : '本地') + '</span>' +
        (info.hidden ? '<span class="badge badge-secondary">隐藏</span>' : '') +
        (info.date ? '<span class="badge badge-secondary">' + info.date + '</span>' : '') +
        (info.location ? '<span class="badge badge-secondary">📍 ' + info.location + '</span>' : '') +
        '</div>' +
        (tagsHtml ? '<div class="album-meta" style="margin-top:6px;">' + tagsHtml + '</div>' : '') +
        '<div class="album-card-actions">' +
        '<button class="btn btn-sm btn-primary">详情</button>' +
        '<button class="btn btn-sm btn-success">编辑</button>' +
        '<button class="btn btn-sm btn-danger">删除</button>' +
        '</div>' +
        '</div>';

      var detailBtn = card.querySelectorAll('button')[0];
      var editBtn = card.querySelectorAll('button')[1];
      var deleteBtn = card.querySelectorAll('button')[2];
      detailBtn.addEventListener('click', function() { viewAlbumDetail(a.name); });
      editBtn.addEventListener('click', function() { editAlbum(a.name); });
      deleteBtn.addEventListener('click', function() { deleteAlbum(a.name); });

      container.appendChild(card);
    });
  }

  var totalImages = data.reduce(function(sum, a) { return sum + ((a.info && a.info.photos) ? a.info.photos.length : 0); }, 0);
  var hiddenCount = data.filter(function(a) { return a.info && a.info.hidden; }).length;
  var externalCount = data.filter(function(a) { return a.info && a.info.mode === 'external'; }).length;
  var localCount = data.length - externalCount;
  document.getElementById('albumsStats').innerHTML = '共 ' + filtered.length + ' 个相册' +
    (filtered.length !== data.length ? '（共 ' + data.length + ' 个）' : '') +
    ' | 本地: ' + localCount + ' | 外链: ' + externalCount +
    ' | 隐藏: ' + hiddenCount +
    '，总计 ' + totalImages + ' 张图片';
}

function viewAlbumDetail(name) {
  var album = window.albumsData.find(function(a) { return a.name === name; });
  if (!album) return;
  var info = album.info || {};

  document.getElementById('albumDetailTitle').textContent = info.title || name;

  var coverHtml = info.cover
    ? '<img src="' + info.cover + '" class="detail-cover" alt="' + (info.title || name) + '">'
    : '';

  var albumMode = info.mode === 'external' ? '外链模式' : '本地模式';
  var layoutText = info.layout === 'masonry' ? '瀑布流' : '网格';

  var html = coverHtml +
    '<div class="detail-grid">' +
    '<div class="detail-item"><label>模式</label><span>' + albumMode + '</span></div>' +
    '<div class="detail-item"><label>布局</label><span>' + layoutText + (info.columns ? ' (' + info.columns + '列)' : '') + '</span></div>' +
    '<div class="detail-item"><label>日期</label><span>' + (info.date || '-') + '</span></div>' +
    '<div class="detail-item"><label>地点</label><span>' + (info.location || '-') + '</span></div>' +
    '<div class="detail-item"><label>照片数</label><span>' + ((info.photos || []).length) + ' 张</span></div>' +
    '<div class="detail-item"><label>隐藏</label><span>' + (info.hidden ? '是' : '否') + '</span></div>' +
    '</div>' +
    (info.description ? '<p style="color:#666;margin-bottom:15px;">' + info.description + '</p>' : '');

  if (Array.isArray(info.tags) && info.tags.length > 0) {
    html += '<div class="album-meta" style="margin-bottom:15px;">' +
      info.tags.map(function(t) { return '<span class="album-tag">' + t + '</span>'; }).join('') +
      '</div>';
  }

  if (info.photos && info.photos.length > 0) {
    html += '<h3 style="margin-bottom:10px;">照片列表</h3><div class="photo-grid">';
    info.photos.forEach(function(p, idx) {
      var thumbSrc = p.thumbnail || p.src;
      html += '<img src="' + thumbSrc + '" class="photo-thumb" alt="' + (p.alt || p.title || '') + '" data-idx="' + idx + '">';
    });
    html += '</div>';
  }

  document.getElementById('albumDetailContent').innerHTML = html;

  document.querySelectorAll('#albumDetailContent .photo-thumb').forEach(function(img) {
    img.addEventListener('click', function() {
      var idx = parseInt(this.getAttribute('data-idx'));
      openLightbox(info.photos, idx);
    });
  });

  document.getElementById('albumDetailModal').classList.add('active');
}

function closeAlbumDetailModal() {
  document.getElementById('albumDetailModal').classList.remove('active');
}

function openLightbox(photos, startIndex) {
  window.lightboxPhotos = photos || [];
  window.lightboxIndex = startIndex || 0;
  showLightboxPhoto();
  document.getElementById('lightbox').classList.add('active');
}

function showLightboxPhoto() {
  var photos = window.lightboxPhotos;
  var idx = window.lightboxIndex;
  if (!photos || idx < 0 || idx >= photos.length) return;
  var photo = photos[idx];
  document.getElementById('lightboxImage').src = photo.src;
  var infoParts = [];
  infoParts.push((idx + 1) + ' / ' + photos.length);
  if (photo.title) infoParts.push(photo.title);
  if (photo.date) infoParts.push(photo.date);
  if (photo.location) infoParts.push('📍 ' + photo.location);
  document.getElementById('lightboxInfo').textContent = infoParts.join('  |  ');
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
}

function lightboxPrev() {
  if (window.lightboxIndex > 0) {
    window.lightboxIndex--;
    showLightboxPhoto();
  }
}

function lightboxNext() {
  if (window.lightboxIndex < window.lightboxPhotos.length - 1) {
    window.lightboxIndex++;
    showLightboxPhoto();
  }
}

document.addEventListener('keydown', function(e) {
  if (!document.getElementById('lightbox').classList.contains('active')) return;
  if (e.key === 'ArrowLeft') lightboxPrev();
  if (e.key === 'ArrowRight') lightboxNext();
  if (e.key === 'Escape') closeLightbox();
});

function onModeChange() {
  var mode = document.getElementById('albumMode').value;
  var photosSection = document.getElementById('photosSection');
  if (mode === 'external') {
    photosSection.style.display = 'block';
  } else {
    photosSection.style.display = 'block';
  }
}

function addPhotoRow(photoData) {
  var container = document.getElementById('photoListContainer');
  var row = document.createElement('div');
  row.className = 'photo-row';

  var srcInput = document.createElement('input');
  srcInput.type = 'text';
  srcInput.placeholder = '图片URL';
  srcInput.className = 'photo-src';
  if (photoData && photoData.src) srcInput.value = photoData.src;

  var altInput = document.createElement('input');
  altInput.type = 'text';
  altInput.placeholder = '替代文本(可选)';
  altInput.className = 'photo-alt';
  if (photoData && photoData.alt) altInput.value = photoData.alt;

  var editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'btn btn-sm btn-primary';
  editBtn.textContent = '详情';
  editBtn.addEventListener('click', function() {
    var rowEl = this.parentElement;
    var rows = Array.from(container.querySelectorAll('.photo-row'));
    var rowIndex = rows.indexOf(rowEl);
    openPhotoEditModal(rowIndex);
  });

  var removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn btn-sm btn-danger';
  removeBtn.textContent = '移除';
  removeBtn.addEventListener('click', function() {
    container.removeChild(row);
  });

  row.appendChild(srcInput);
  row.appendChild(altInput);
  row.appendChild(editBtn);
  row.appendChild(removeBtn);
  container.appendChild(row);
}

function collectPhotos() {
  var rows = document.querySelectorAll('#photoListContainer .photo-row');
  var photos = [];
  rows.forEach(function(row) {
    var src = row.querySelector('.photo-src').value.trim();
    if (!src) return;
    var photo = { src: src };
    var alt = row.querySelector('.photo-alt').value.trim();
    if (alt) photo.alt = alt;

    var storedData = row.getAttribute('data-photo');
    if (storedData) {
      try {
        var parsed = JSON.parse(storedData);
        Object.keys(parsed).forEach(function(k) {
          if (k !== 'src' && k !== 'alt' && parsed[k] !== undefined && parsed[k] !== '') {
            photo[k] = parsed[k];
          }
        });
      } catch(e) {}
    }

    if (alt) photo.alt = alt;
    photos.push(photo);
  });
  return photos;
}

function openPhotoEditModal(rowIndex) {
  window.editingPhotoIndex = rowIndex;
  var rows = document.querySelectorAll('#photoListContainer .photo-row');
  var row = rows[rowIndex];
  if (!row) return;

  var storedData = row.getAttribute('data-photo');
  var photo = {};
  if (storedData) {
    try { photo = JSON.parse(storedData); } catch(e) {}
  }
  photo.src = photo.src || row.querySelector('.photo-src').value;
  photo.alt = photo.alt || row.querySelector('.photo-alt').value;

  document.getElementById('peSrc').value = photo.src || '';
  document.getElementById('peThumbnail').value = photo.thumbnail || '';
  document.getElementById('peAlt').value = photo.alt || '';
  document.getElementById('peTitle').value = photo.title || '';
  document.getElementById('peDate').value = photo.date || '';
  document.getElementById('peLocation').value = photo.location || '';
  document.getElementById('peWidth').value = photo.width || '';
  document.getElementById('peHeight').value = photo.height || '';
  document.getElementById('peCamera').value = photo.camera || '';
  document.getElementById('peLens').value = photo.lens || '';
  document.getElementById('peDescription').value = photo.description || '';
  document.getElementById('peTags').value = Array.isArray(photo.tags) ? photo.tags.join(', ') : '';
  if (photo.settings) {
    document.getElementById('peAperture').value = photo.settings.aperture || '';
    document.getElementById('peShutter').value = photo.settings.shutter || '';
    document.getElementById('peIso').value = photo.settings.iso || '';
    document.getElementById('peFocal').value = photo.settings.focal || '';
  }

  document.getElementById('photoEditModalTitle').textContent = '编辑照片 #' + (rowIndex + 1);
  document.getElementById('photoEditModal').classList.add('active');
}

function closePhotoEditModal() {
  document.getElementById('photoEditModal').classList.remove('active');
  window.editingPhotoIndex = -1;
}

document.getElementById('photoEditForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var idx = window.editingPhotoIndex;
  if (idx < 0) return;

  var photo = {
    src: document.getElementById('peSrc').value.trim(),
    thumbnail: document.getElementById('peThumbnail').value.trim() || undefined,
    alt: document.getElementById('peAlt').value.trim() || undefined,
    title: document.getElementById('peTitle').value.trim() || undefined,
    date: document.getElementById('peDate').value || undefined,
    location: document.getElementById('peLocation').value.trim() || undefined,
    width: parseInt(document.getElementById('peWidth').value) || undefined,
    height: parseInt(document.getElementById('peHeight').value) || undefined,
    camera: document.getElementById('peCamera').value.trim() || undefined,
    lens: document.getElementById('peLens').value.trim() || undefined,
    description: document.getElementById('peDescription').value.trim() || undefined,
    tags: document.getElementById('peTags').value.split(',').map(function(t) { return t.trim(); }).filter(Boolean)
  };

  var aperture = document.getElementById('peAperture').value.trim();
  var shutter = document.getElementById('peShutter').value.trim();
  var iso = parseInt(document.getElementById('peIso').value);
  var focal = document.getElementById('peFocal').value.trim();
  if (aperture || shutter || iso || focal) {
    photo.settings = {};
    if (aperture) photo.settings.aperture = aperture;
    if (shutter) photo.settings.shutter = shutter;
    if (iso) photo.settings.iso = iso;
    if (focal) photo.settings.focal = focal;
  }

  var rows = document.querySelectorAll('#photoListContainer .photo-row');
  var row = rows[idx];
  if (row) {
    row.querySelector('.photo-src').value = photo.src;
    row.querySelector('.photo-alt').value = photo.alt || '';
    row.setAttribute('data-photo', JSON.stringify(photo));
  }

  closePhotoEditModal();
  showMsg('照片信息已更新', 'success');
});

function openAlbumModal() {
  document.getElementById('albumModalTitle').textContent = '新建';
  clearAlbumForm();
  switchAlbumTab('basic');
  document.getElementById('albumModal').classList.add('active');
}

function closeAlbumModal() {
  document.getElementById('albumModal').classList.remove('active');
}

document.getElementById('albumForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  var photos = collectPhotos();

  var info = {
    title: document.getElementById('albumTitle').value || document.getElementById('albumName').value,
    cover: document.getElementById('albumCover').value || undefined,
    description: document.getElementById('albumDescription').value || undefined,
    mode: document.getElementById('albumMode').value || undefined,
    hidden: document.getElementById('albumHidden').checked || undefined,
    date: document.getElementById('albumDate').value || undefined,
    location: document.getElementById('albumLocation').value || undefined,
    tags: document.getElementById('albumTags').value.split(',').map(function(t) { return t.trim(); }).filter(Boolean),
    layout: document.getElementById('albumLayout').value || undefined,
    columns: parseInt(document.getElementById('albumColumns').value) || undefined,
    photos: photos
  };

  Object.keys(info).forEach(function(k) {
    if (info[k] === undefined || info[k] === null || info[k] === '' || (Array.isArray(info[k]) && info[k].length === 0)) {
      delete info[k];
    }
  });

  try {
    var oldName = document.getElementById('albumOldName').value;
    if (oldName) {
      await api('PUT', '/api/albums/' + encodeURIComponent(oldName), info);
    } else {
      await api('POST', '/api/albums', { name: document.getElementById('albumName').value, info: info });
    }
    showMsg('保存成功', 'success');
    loadAlbums();
    clearAlbumForm();
    closeAlbumModal();
  } catch(e) {}
});

function clearAlbumForm() {
  document.getElementById('albumOldName').value = '';
  document.getElementById('albumName').value = '';
  document.getElementById('albumTitle').value = '';
  document.getElementById('albumCover').value = '';
  document.getElementById('albumDescription').value = '';
  document.getElementById('albumMode').value = '';
  document.getElementById('albumHidden').checked = false;
  document.getElementById('albumDate').value = '';
  document.getElementById('albumLocation').value = '';
  document.getElementById('albumTags').value = '';
  document.getElementById('albumLayout').value = 'grid';
  document.getElementById('albumColumns').value = '3';
  document.getElementById('photoListContainer').innerHTML = '';
}

async function editAlbum(name) {
  var res = await api('GET', '/api/albums/' + encodeURIComponent(name));
  var data = res.data;
  if (!data) return;

  document.getElementById('albumModalTitle').textContent = '编辑相册';
  document.getElementById('albumOldName').value = name;
  document.getElementById('albumName').value = name;
  document.getElementById('albumTitle').value = data.title || '';
  document.getElementById('albumCover').value = data.cover || '';
  document.getElementById('albumDescription').value = data.description || '';
  document.getElementById('albumMode').value = data.mode || '';
  document.getElementById('albumHidden').checked = !!data.hidden;
  document.getElementById('albumDate').value = data.date || '';
  document.getElementById('albumLocation').value = data.location || '';
  document.getElementById('albumTags').value = (data.tags || []).join(', ');
  document.getElementById('albumLayout').value = data.layout || 'grid';
  document.getElementById('albumColumns').value = data.columns || 3;

  var container = document.getElementById('photoListContainer');
  container.innerHTML = '';
  if (data.photos && data.photos.length > 0) {
    data.photos.forEach(function(p) {
      addPhotoRow(p);
      var row = container.lastElementChild;
      var storedPhoto = Object.assign({}, p);
      row.setAttribute('data-photo', JSON.stringify(storedPhoto));
    });
  }

  switchAlbumTab('basic');
  document.getElementById('albumModal').classList.add('active');
}

async function deleteAlbum(name) {
  showConfirmModal('确定要删除相册 "' + name + '" 吗？', async function() {
    await api('DELETE', '/api/albums/' + encodeURIComponent(name));
    showMsg('删除成功', 'success');
    loadAlbums();
  });
}

document.getElementById('albumModal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('albumModal')) closeAlbumModal();
});

document.getElementById('albumDetailModal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('albumDetailModal')) closeAlbumDetailModal();
});

document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

function openBatchAddModal() {
  document.getElementById('batchUrlsInput').value = '';
  document.getElementById('batchAddModal').classList.add('active');
}

function closeBatchAddModal() {
  document.getElementById('batchAddModal').classList.remove('active');
}

function batchAddPhotos() {
  var input = document.getElementById('batchUrlsInput');
  var urls = input.value.trim().split('\\n');
  
  var addedCount = 0;
  urls.forEach(function(url) {
    url = url.trim();
    if (url) {
      addPhotoRow({ src: url });
      addedCount++;
    }
  });
  
  if (addedCount > 0) {
    showMsg('成功添加 ' + addedCount + ' 张图片', 'success');
  } else {
    showMsg('没有添加任何图片', 'warning');
  }
  
  closeBatchAddModal();
}

document.getElementById('batchAddModal').addEventListener('click', function(e) {
  if (e.target === document.getElementById('batchAddModal')) closeBatchAddModal();
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.nav-link[data-page="albums"]')?.classList.add('active');
  loadAlbums();
});
</script>`;