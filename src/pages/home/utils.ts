export const SHARED_JS = `
function escAttr(s){return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function updateFaviconPreview() {
  const logoVal = document.getElementById('modal-navbar-logo').value;
  const preview = document.getElementById('modal-favicon-preview');
  const text = document.getElementById('modal-favicon-text');
  if (logoVal) {
    preview.innerHTML = '<img src="' + logoVal + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML=\\'\\\\u26a0\\\\uFE0F\\'">';
    text.textContent = '已设置网站图标';
  } else {
    preview.innerHTML = '<span style="font-size:16px;">\\ud83c\\udf10</span>';
    text.textContent = '未设置 — 将使用默认图标';
  }
}

function closeModal(event) {
  if (event && event.target !== event.currentTarget) return;
  document.getElementById('cfg-overlay').classList.remove('active');
  currentModal = '';
}

async function saveModal() {
  try {
    applyModalChanges();
    await api('PUT', '/api/config', currentConfig);
    updateAllSummaries();
    closeModal();
    showMsg('保存成功', 'success');
  } catch (e) { showMsg('保存失败: ' + e.message); }
}

async function saveConfig() {
  try { await api('PUT', '/api/config', currentConfig); showMsg('配置保存成功', 'success'); }
  catch (e) { showMsg('保存配置失败: ' + e.message); }
}

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
  html += '<div class="icon-sets-header"><h3>\\ud83d\\udcda Iconify \\u56fe\\u6807\\u96c6</h3><button onclick="closeIconSets()">\\u2715</button></div>';
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
  if (overlay) {
    overlay.remove();
  }
}

window.navBarLinksData = [];
let dragSrcIdx = null;

function loadNavBarConfig(links) { const linksArr = (typeof links === 'object' && links !== null && !Array.isArray(links) && links.links) ? links.links : links; window.navBarLinksData = Array.isArray(linksArr) ? linksArr : []; }

function renderNavBarLinks() {
  const container = document.getElementById('modal-navLinks-container');
  if (!container) return;
  container.innerHTML = '';
  const links = window.navBarLinksData;
  if (links.length === 0) { container.innerHTML = '<div class="empty-state">\\u6682\\u65e0\\u5bfc\\u822a\\u94fe\\u63a5\\uff0c\\u8bf7\\u70b9\\u51fb\\u4e0b\\u65b9\\u6309\\u94ae\\u6dfb\\u52a0</div>'; return; }

  const presetNames = { Home: '首页', Archive: '归档' };

  links.forEach(function(link, idx) {
    const item = document.createElement('div');
    item.className = 'nav-link-item';
    item.setAttribute('draggable', 'true');
    item.setAttribute('data-idx', idx);

    const isPresetObj = typeof link === 'object' && link !== null && '_lp' in link;
    const isPreset = typeof link === 'string' || isPresetObj;
    const presetName = isPresetObj ? link._lp : (typeof link === 'string' ? link : '');
    const hasChildren = !isPreset && Array.isArray(link.children);
    const typeLabel = isPreset ? '预设' : (hasChildren ? '下拉菜单' : '普通链接');
    const typeClass = isPreset ? 'preset' : (hasChildren ? 'parent' : 'leaf');
    const displayName = isPreset ? (presetNames[presetName] || presetName) : (link.name || '未命名');

    const header = document.createElement('div');
    header.className = 'nav-link-header';
    header.innerHTML = '<span class="drag-handle">\\u2630</span>' +
      '<span class="link-type ' + typeClass + '">' + typeLabel + '</span>' +
      '<span class="link-name">' + escAttr(displayName) + '</span>' +
      '<span class="link-actions"><button type="button" class="btn-danger btn-sm" data-action="delete">删除</button></span>';

    header.addEventListener('click', function(e) {
      const btn = e.target.closest('button');
      if (btn && btn.getAttribute('data-action') === 'delete') { removeNavLink(idx); return; }
      item.classList.toggle('expanded');
    });

    item.appendChild(header);

    item.addEventListener('dragstart', function(e) {
      dragSrcIdx = idx;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', function() { item.classList.remove('dragging'); dragSrcIdx = null; document.querySelectorAll('.nav-link-item.drag-over').forEach(el => el.classList.remove('drag-over')); });
    item.addEventListener('dragover', function(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; item.classList.add('drag-over'); });
    item.addEventListener('dragleave', function() { item.classList.remove('drag-over'); });
    item.addEventListener('drop', function(e) {
      e.preventDefault();
      item.classList.remove('drag-over');
      if (dragSrcIdx === null || dragSrcIdx === idx) return;
      const moved = window.navBarLinksData.splice(dragSrcIdx, 1)[0];
      window.navBarLinksData.splice(idx, 0, moved);
      dragSrcIdx = null;
      renderNavBarLinks();
    });

    if (!isPreset) {
      const body = document.createElement('div');
      body.className = 'nav-link-body';

      const fg = document.createElement('div');
      fg.className = 'form-grid';

      const nameGroup = document.createElement('div');
      nameGroup.className = 'form-group';
      nameGroup.innerHTML = '<label>名称（支持中文）</label>';
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'nl-name';
      nameInput.value = link.name || '';
      nameInput.placeholder = '支持中文命名';
      nameInput.addEventListener('input', function() { link.name = this.value; header.querySelector('.link-name').textContent = link.name || '未命名'; });
      nameGroup.appendChild(nameInput);

      const urlGroup = document.createElement('div');
      urlGroup.className = 'form-group';
      urlGroup.innerHTML = '<label>URL</label>';
      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.className = 'nl-url';
      urlInput.value = link.url || '';
      urlInput.addEventListener('input', function() { link.url = this.value; });
      urlGroup.appendChild(urlInput);

      const iconGroup = document.createElement('div');
      iconGroup.className = 'form-group';
      iconGroup.innerHTML = '<label>图标 iconify 图标集格式</label>';
      const iconInput = document.createElement('input');
      iconInput.type = 'text';
      iconInput.className = 'nl-icon';
      iconInput.value = link.icon || '';
      iconInput.placeholder = '图标集:图标名 (如 material-symbols:home)';
      iconInput.addEventListener('input', function() { link.icon = this.value; });
      iconGroup.appendChild(iconInput);

      const extGroup = document.createElement('div');
      extGroup.className = 'form-group';
      extGroup.innerHTML = '<label>外部链接</label>';
      const extSelect = document.createElement('select');
      extSelect.className = 'nl-external';
      extSelect.innerHTML = '<option value="false"' + (!link.external ? ' selected' : '') + '>否</option><option value="true"' + (link.external ? ' selected' : '') + '>是</option>';
      extSelect.addEventListener('change', function() { link.external = this.value === 'true'; });
      extGroup.appendChild(extSelect);

      fg.appendChild(nameGroup);
      fg.appendChild(urlGroup);
      fg.appendChild(iconGroup);
      fg.appendChild(extGroup);
      body.appendChild(fg);

      if (hasChildren) {
        const cs = document.createElement('div');
        cs.style.marginTop = '16px';
        cs.innerHTML = '<h4 style="font-size:13px;margin:0 0 8px 0;">子菜单项</h4>';
        const cc = document.createElement('div');
        cc.className = 'nl-children';
        link.children.forEach(function(child) { cc.appendChild(createChildItem(child)); });
        cs.appendChild(cc);
        const addBtn = document.createElement('button');
        addBtn.type = 'button'; addBtn.className = 'btn-primary btn-sm'; addBtn.textContent = '+ 添加子链接';
        addBtn.addEventListener('click', function() { link.children.push({ name: '', url: '', icon: '' }); cc.appendChild(createChildItem(link.children[link.children.length - 1])); });
        cs.appendChild(addBtn);
        body.appendChild(cs);
      } else {
        const wrap = document.createElement('div'); wrap.style.marginTop = '12px';
        const convBtn = document.createElement('button'); convBtn.type = 'button'; convBtn.className = 'btn-primary btn-sm'; convBtn.textContent = '转为下拉菜单';
        convBtn.addEventListener('click', function() { link.children = []; renderNavBarLinks(); });
        wrap.appendChild(convBtn); body.appendChild(wrap);
      }

      item.appendChild(body);
    }
    container.appendChild(item);
  });
}

function createChildItem(child) {
  const ci = document.createElement('div'); ci.className = 'nav-child-item';
  const fg = document.createElement('div');
  fg.className = 'form-grid';

  const nameGroup = document.createElement('div');
  nameGroup.className = 'form-group';
  nameGroup.innerHTML = '<label>名称（支持中文）</label>';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'nc-name';
  nameInput.value = child.name || '';
  nameInput.addEventListener('input', function() { child.name = this.value; });
  nameGroup.appendChild(nameInput);

  const urlGroup = document.createElement('div');
  urlGroup.className = 'form-group';
  urlGroup.innerHTML = '<label>URL</label>';
  const urlInput = document.createElement('input');
  urlInput.type = 'text';
  urlInput.className = 'nc-url';
  urlInput.value = child.url || '';
  urlInput.addEventListener('input', function() { child.url = this.value; });
  urlGroup.appendChild(urlInput);

  const iconGroup = document.createElement('div');
  iconGroup.className = 'form-group';
  iconGroup.innerHTML = '<label>图标 iconify 图标集格式</label>';
  const iconInput = document.createElement('input');
  iconInput.type = 'text';
  iconInput.className = 'nc-icon';
  iconInput.value = child.icon || '';
  iconInput.placeholder = '图标集:图标名 (如 material-symbols:home)';
  iconInput.addEventListener('input', function() { child.icon = this.value; });
  iconGroup.appendChild(iconInput);

  const extGroup = document.createElement('div');
  extGroup.className = 'form-group';
  extGroup.innerHTML = '<label>外部链接</label>';
  const extSelect = document.createElement('select');
  extSelect.className = 'nc-external';
  extSelect.innerHTML = '<option value="false"' + (!child.external ? ' selected' : '') + '>否</option><option value="true"' + (child.external ? ' selected' : '') + '>是</option>';
  extSelect.addEventListener('change', function() { child.external = this.value === 'true'; });
  extGroup.appendChild(extSelect);

  fg.appendChild(nameGroup);
  fg.appendChild(urlGroup);
  fg.appendChild(iconGroup);
  fg.appendChild(extGroup);
  ci.appendChild(fg);

  const rmBtn = document.createElement('button'); rmBtn.type = 'button'; rmBtn.className = 'btn-danger btn-sm'; rmBtn.textContent = '移除'; rmBtn.style.marginTop = '8px';
  rmBtn.addEventListener('click', function() {
    const parentChildren = ci.parentElement;
    if (parentChildren) {
      const items = Array.from(parentChildren.children);
      const ciIdx = items.indexOf(ci);
      if (ciIdx > -1) {
        const linkIdx = ci.closest('.nav-link-item')?.getAttribute('data-idx');
        if (linkIdx !== null && linkIdx !== undefined) {
          const link = window.navBarLinksData[parseInt(linkIdx)];
          if (link && Array.isArray(link.children)) link.children.splice(ciIdx, 1);
        }
      }
    }
    ci.remove();
  });
  ci.appendChild(rmBtn);
  return ci;
}

function addNavLink() { window.navBarLinksData.push({ name: '', url: '', icon: '' }); renderNavBarLinks(); const c = document.getElementById('modal-navLinks-container'); if (c?.lastElementChild) c.lastElementChild.classList.add('expanded'); }
function addNavPreset(preset) { window.navBarLinksData.push(preset); renderNavBarLinks(); }
function removeNavLink(idx) { window.navBarLinksData.splice(idx, 1); renderNavBarLinks(); }

function isValidIcon(icon) {
  if (!icon) return false;
  if (icon.startsWith('http://') || icon.startsWith('https://')) return false;
  const allowedSets = ['material-symbols', 'fa7-brands', 'fa7-regular', 'fa7-solid', 'mdi', 'simple-icons'];
  const parts = icon.split(':');
  if (parts.length !== 2) return false;
  return allowedSets.includes(parts[0]);
}

function collectNavBarLinks() {
  const links = window.navBarLinksData || []; const result = [];
  links.forEach(function(link) {
    if (typeof link === 'string') { result.push({ _lp: link }); return; }
    if (typeof link === 'object' && link !== null && '_lp' in link) { result.push(link); return; }
    const item = { name: link.name || '', url: link.url || '' };
    if (link.icon && isValidIcon(link.icon)) item.icon = link.icon;
    if (link.external === true) item.external = true;
    else if (link.external === false) item.external = false;
    if (Array.isArray(link.children)) {
      const children = link.children.filter(function(c) { return c.name || c.url; }).map(function(c) { const ch = { name: c.name || '', url: c.url || '' }; if (c.icon && isValidIcon(c.icon)) ch.icon = c.icon; if (c.external === true) ch.external = true; else if (c.external === false) ch.external = false; return ch; });
      if (children.length > 0) item.children = children;
    }
    result.push(item);
  });
  return result;
}

let sidebarDragItem = null;

function addSidebarComponent(sidebar) {
  const select = document.getElementById('modal-sidebar-add-' + sidebar);
  const type = select.value;
  if (!type) return;

  const container = document.getElementById('sidebar-' + sidebar + '-container');
  const emptyState = container.querySelector('.empty-state');
  if (emptyState) emptyState.remove();

  const componentNames = { profile: '个人资料', announcement: '公告', categories: '分类', tags: '标签', 'site-stats': '站点统计', calendar: '日历', 'card-toc': '卡片目录', 'music-sidebar': '音乐播放器' };

  const item = document.createElement('div');
  item.className = 'sidebar-component-item';
  item.setAttribute('draggable', 'true');
  item.setAttribute('data-sidebar', sidebar);
  item.setAttribute('data-type', type);
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragend', handleDragEnd);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('dragenter', handleDragEnter);
  item.addEventListener('dragleave', handleDragLeave);
  item.addEventListener('drop', handleDrop);
  item.innerHTML = '<span class="drag-handle">\\u22ee\\u22ee</span><span>' + (componentNames[type] || type) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(&quot;' + type + '&quot;, &quot;' + sidebar + '&quot;)">移除</button>';
  container.appendChild(item);

  select.querySelector('option[value="' + type + '"]').remove();
  select.value = '';
}

function removeSidebarComponent(type, sidebar) {
  const container = document.getElementById('sidebar-' + sidebar + '-container');
  const item = container.querySelector('.sidebar-component-item[data-type="' + type + '"]');
  if (item) {
    item.remove();
    const select = document.getElementById('modal-sidebar-add-' + sidebar);
    const componentNames = { profile: '个人资料', announcement: '公告', categories: '分类', tags: '标签', 'site-stats': '站点统计', calendar: '日历', 'card-toc': '卡片目录', 'music-sidebar': '音乐播放器' };
    const option = document.createElement('option');
    option.value = type;
    option.textContent = componentNames[type] || type;
    select.appendChild(option);
  }

  if (container.querySelectorAll('.sidebar-component-item').length === 0) {
    container.innerHTML = '<div class="empty-state">暂无组件</div>';
  }
}

function handleDragStart(event) {
  sidebarDragItem = event.currentTarget;
  sidebarDragItem.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(event) {
  sidebarDragItem.classList.remove('dragging');
  sidebarDragItem = null;
  document.querySelectorAll('.sidebar-component-item').forEach(item => {
    item.classList.remove('drag-over');
  });
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(event) {
  event.preventDefault();
  const target = event.currentTarget;
  if (target && target !== sidebarDragItem) {
    target.classList.add('drag-over');
  }
}

function handleDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleDrop(event) {
  event.preventDefault();
  event.stopPropagation();
  const targetItem = event.currentTarget;
  targetItem.classList.remove('drag-over');

  if (!sidebarDragItem || sidebarDragItem === targetItem) return;

  const draggedSidebar = sidebarDragItem.dataset.sidebar;
  const targetSidebar = targetItem.dataset.sidebar;
  const draggedType = sidebarDragItem.dataset.type;
  const targetContainer = targetItem.parentElement;

  if (draggedSidebar !== targetSidebar) {
    sidebarDragItem.remove();

    const draggedContainer = document.getElementById('sidebar-' + draggedSidebar + '-container');
    const draggedSelect = document.getElementById('modal-sidebar-add-' + draggedSidebar);
    const optionToRemove = draggedSelect.querySelector('option[value="' + draggedType + '"]');
    if (optionToRemove) {
      optionToRemove.remove();
    }

    const targetSelect = document.getElementById('modal-sidebar-add-' + targetSidebar);
    const componentNames = { profile: '个人资料', announcement: '公告', categories: '分类', tags: '标签', 'site-stats': '站点统计', calendar: '日历', 'card-toc': '卡片目录', 'music-sidebar': '音乐播放器' };
    const option = document.createElement('option');
    option.value = draggedType;
    option.textContent = componentNames[draggedType] || draggedType;
    targetSelect.appendChild(option);

    sidebarDragItem.dataset.sidebar = targetSidebar;

    if (draggedContainer.querySelectorAll('.sidebar-component-item').length === 0) {
      draggedContainer.innerHTML = '<div class="empty-state">暂无组件</div>';
    }
  }

  targetContainer.insertBefore(sidebarDragItem, targetItem);

  const emptyState = targetContainer.querySelector('.empty-state');
  if (emptyState) {
    emptyState.remove();
  }
}

function handleContainerDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function handleContainerDrop(event) {
  event.preventDefault();
  if (!sidebarDragItem) return;
  const container = event.currentTarget;
  const sidebarName = container.id.replace('sidebar-', '').replace('-container', '');
  const draggedSidebar = sidebarDragItem.dataset.sidebar;
  const draggedType = sidebarDragItem.dataset.type;

  if (draggedSidebar !== sidebarName) {
    sidebarDragItem.remove();
    const draggedContainer = document.getElementById('sidebar-' + draggedSidebar + '-container');
    const draggedSelect = document.getElementById('modal-sidebar-add-' + draggedSidebar);
    const optionToRemove = draggedSelect.querySelector('option[value="' + draggedType + '"]');
    if (optionToRemove) optionToRemove.remove();

    const targetSelect = document.getElementById('modal-sidebar-add-' + sidebarName);
    const componentNames = { profile: '个人资料', announcement: '公告', categories: '分类', tags: '标签', 'site-stats': '站点统计', calendar: '日历', 'card-toc': '卡片目录', 'music-sidebar': '音乐播放器' };
    const option = document.createElement('option');
    option.value = draggedType;
    option.textContent = componentNames[draggedType] || draggedType;
    targetSelect.appendChild(option);

    sidebarDragItem.dataset.sidebar = sidebarName;

    if (draggedContainer.querySelectorAll('.sidebar-component-item').length === 0) {
      draggedContainer.innerHTML = '<div class="empty-state">暂无组件</div>';
    }
  }

  container.appendChild(sidebarDragItem);
  const emptyState = container.querySelector('.empty-state');
  if (emptyState) emptyState.remove();

  document.querySelectorAll('.sidebar-component-item').forEach(item => {
    item.classList.remove('drag-over');
  });
}

function addProfileLink() {
  const container = document.getElementById('profile-links-container');
  const emptyState = container.querySelector('.empty-state');
  if (emptyState) emptyState.remove();
  
  const idx = container.querySelectorAll('.nav-child-item').length;
  const item = document.createElement('div');
  item.className = 'nav-child-item';
  item.innerHTML = '<div class="form-grid">' +
    '<div class="form-group"><label>链接名称</label><input type="text" class="profile-link-name" data-idx="' + idx + '" placeholder="如: GitHub"></div>' +
    '<div class="form-group"><label>图标 iconify 图标集格式</label><input type="text" class="profile-link-icon" data-idx="' + idx + '" placeholder="图标集:图标名 (如 material-symbols:home)"></div>' +
    '<div class="form-group"><label>URL</label><input type="text" class="profile-link-url" data-idx="' + idx + '" placeholder="https://"></div>' +
    '</div>' +
    '<button type="button" class="btn-danger btn-sm" onclick="removeProfileLink(' + idx + ')">移除</button>';
  container.appendChild(item);
}

function removeProfileLink(idx) {
  const container = document.getElementById('profile-links-container');
  const items = container.querySelectorAll('.nav-child-item');
  if (items[idx]) {
    items[idx].remove();
    container.querySelectorAll('.nav-child-item').forEach(function(el, i) {
      el.querySelector('.profile-link-name')?.setAttribute('data-idx', i);
      el.querySelector('.profile-link-icon')?.setAttribute('data-idx', i);
      el.querySelector('.profile-link-url')?.setAttribute('data-idx', i);
    });
  }
  if (container.querySelectorAll('.nav-child-item').length === 0) {
    container.innerHTML = '<div class="empty-state">暂无链接</div>';
  }
}

let musicSongsData = [];

function loadMusicSongs(songs) { musicSongsData = Array.isArray(songs) ? songs : []; }

function addMusicSong() {
  musicSongsData.push({ title: '', artist: '', url: '', cover: '', duration: 0 });
  renderMusicSongs();
}

function removeMusicSong(idx) {
  musicSongsData.splice(idx, 1);
  renderMusicSongs();
}

function renderMusicSongs() {
  const container = document.getElementById('music-songs-container');
  if (!container) return;
  container.innerHTML = '';
  if (musicSongsData.length === 0) {
    container.innerHTML = '<div class="empty-state">暂无本地音乐，请添加</div>';
    return;
  }
  musicSongsData.forEach(function(song, idx) {
    const item = document.createElement('div');
    item.className = 'music-song-item';
    item.setAttribute('data-idx', idx);
    
    const formGrid1 = document.createElement('div');
    formGrid1.className = 'form-grid';
    formGrid1.style.gridTemplateColumns = '1fr 1fr 1fr';
    
    const titleGroup = document.createElement('div');
    titleGroup.className = 'form-group';
    titleGroup.innerHTML = '<label>歌曲标题</label><input type="text" class="music-song-title" data-idx="' + idx + '" value="' + escAttr(song.title || '') + '" placeholder="歌曲标题">';
    formGrid1.appendChild(titleGroup);
    
    const artistGroup = document.createElement('div');
    artistGroup.className = 'form-group';
    artistGroup.innerHTML = '<label>艺术家</label><input type="text" class="music-song-artist" data-idx="' + idx + '" value="' + escAttr(song.artist || '') + '" placeholder="艺术家/歌手">';
    formGrid1.appendChild(artistGroup);
    
    const urlGroup = document.createElement('div');
    urlGroup.className = 'form-group';
    urlGroup.innerHTML = '<label>音频URL</label><input type="text" class="music-song-url" data-idx="' + idx + '" value="' + escAttr(song.url || '') + '" placeholder="assets/music/song.mp3">';
    formGrid1.appendChild(urlGroup);
    
    const formGrid2 = document.createElement('div');
    formGrid2.className = 'form-grid';
    formGrid2.style.gridTemplateColumns = '1fr 1fr';
    
    const coverGroup = document.createElement('div');
    coverGroup.className = 'form-group';
    coverGroup.innerHTML = '<label>封面URL</label><input type="text" class="music-song-cover" data-idx="' + idx + '" value="' + escAttr(song.cover || '') + '" placeholder="assets/music/cover.jpg">';
    formGrid2.appendChild(coverGroup);
    
    const durationGroup = document.createElement('div');
    durationGroup.className = 'form-group';
    durationGroup.innerHTML = '<label>时长(秒)</label><input type="number" class="music-song-duration" data-idx="' + idx + '" value="' + (song.duration || '') + '" placeholder="240">';
    formGrid2.appendChild(durationGroup);
    
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-danger btn-sm';
    btn.textContent = '移除';
    btn.onclick = function() { removeMusicSong(idx); };
    
    item.appendChild(formGrid1);
    item.appendChild(formGrid2);
    item.appendChild(btn);
    container.appendChild(item);
  });
}

function collectMusicSongs() {
  return musicSongsData.map(function(song) {
    return {
      title: song.title || '',
      artist: song.artist || '',
      url: song.url || '',
      cover: song.cover || '',
      duration: parseInt(song.duration) || 0
    };
  }).filter(function(song) { return song.title || song.url; });
}

function initAnnouncementModal() {
  const linkEnable = document.getElementById('modal-announcement-linkEnable');
  const linkFields = document.getElementById('modal-announcement-linkFields');
  if (linkEnable && linkFields) {
    linkFields.style.display = linkEnable.checked ? 'block' : 'none';
    linkEnable.addEventListener('change', function() {
      linkFields.style.display = this.checked ? 'block' : 'none';
    });
  }
}
`;