export const homePage = `
<div class="content" id="configSection">
<h2>站点管理</h2>

<div class="card-grid">
  <div class="config-card" onclick="openModal('basic')">
    <div class="card-header">
      <div class="card-icon">📋</div>
      <h3 class="card-title">基础信息</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">标题：</span><span class="summary-value" id="summary-basic-title">-</span></div>
      <div class="card-summary-item"><span class="summary-label">副标题：</span><span class="summary-value" id="summary-basic-subtitle">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('navLinks')">
    <div class="card-header">
      <div class="card-icon">🔗</div>
      <h3 class="card-title">导航栏</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">链接数：</span><span class="summary-value" id="summary-navLinks-count">0</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('featurePages')">
    <div class="card-header">
      <div class="card-icon">📑</div>
      <h3 class="card-title">特色页面</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">已启用：</span><span class="summary-value" id="summary-featurePages-count">0</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('layout')">
    <div class="card-header">
      <div class="card-icon">📐</div>
      <h3 class="card-title">布局</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">布局：</span><span class="summary-value" id="summary-layout-mode">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('banner')">
    <div class="card-header">
      <div class="card-icon">🎨</div>
      <h3 class="card-title">横幅模式</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">主标题：</span><span class="summary-value" id="summary-banner-title">-</span></div>
      <div class="card-summary-item"><span class="summary-label">打字机效果：</span><span class="summary-badge" id="summary-banner-typewriter">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('fullscreen')">
    <div class="card-header">
      <div class="card-icon">🌄</div>
      <h3 class="card-title">全屏模式</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">轮播：</span><span class="summary-badge" id="summary-fullscreen-carousel">-</span></div>
      <div class="card-summary-item" id="summary-fullscreen-interval-row"><span class="summary-label">间隔：</span><span class="summary-value" id="summary-fullscreen-interval">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('anime')">
    <div class="card-header">
      <div class="card-icon">📺</div>
      <h3 class="card-title">番剧配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">数据模式：</span><span class="summary-value" id="summary-anime-mode">-</span></div>
      <div class="card-summary-item" id="summary-anime-bangumi-row" style="display:none"><span class="summary-label">Bangumi用户：</span><span class="summary-value" id="summary-anime-bangumi">-</span></div>
      <div class="card-summary-item" id="summary-anime-bilibili-row" style="display:none"><span class="summary-label">Bilibili用户：</span><span class="summary-value" id="summary-anime-bilibili">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('sidebarLayout')">
    <div class="card-header">
      <div class="card-icon">📍</div>
      <h3 class="card-title">基础位置配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">左侧栏组件：</span><span class="summary-value" id="summary-sidebarLayout-left">-</span></div>
      <div class="card-summary-item"><span class="summary-label">右侧栏组件：</span><span class="summary-value" id="summary-sidebarLayout-right">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('profile')">
    <div class="card-header">
      <div class="card-icon">👤</div>
      <h3 class="card-title">个人资料</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">名称：</span><span class="summary-value" id="summary-profile-name">-</span></div>
      <div class="card-summary-item"><span class="summary-label">链接数：</span><span class="summary-value" id="summary-profile-links">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('announcement')">
    <div class="card-header">
      <div class="card-icon">📢</div>
      <h3 class="card-title">公告配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">标题：</span><span class="summary-value" id="summary-announcement-title">-</span></div>
      <div class="card-summary-item"><span class="summary-label">可关闭：</span><span class="summary-value" id="summary-announcement-closable">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('categories')">
    <div class="card-header">
      <div class="card-icon">📁</div>
      <h3 class="card-title">组件</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">定位方式：</span><span class="summary-value" id="summary-categories-position">-</span></div>
      <div class="card-summary-item"><span class="summary-label">折叠阈值：</span><span class="summary-value" id="summary-categories-threshold">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('music-player')">
    <div class="card-header">
      <div class="card-icon">🎵</div>
      <h3 class="card-title">音乐播放器配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">状态：</span><span class="summary-value" id="summary-music-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">模式：</span><span class="summary-value" id="summary-music-mode">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('sakura')">
    <div class="card-header">
      <div class="card-icon">🌸</div>
      <h3 class="card-title">樱花飘落特效</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">状态：</span><span class="summary-value" id="summary-sakura-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">樱花数量：</span><span class="summary-value" id="summary-sakura-num">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('pio')">
    <div class="card-header">
      <div class="card-icon">💬</div>
      <h3 class="card-title">Live2D 看板娘</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">状态：</span><span class="summary-value" id="summary-pio-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">位置：</span><span class="summary-value" id="summary-pio-position">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('umami')">
    <div class="card-header">
      <div class="card-icon">📈</div>
      <h3 class="card-title">Umami 统计</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">分享链接：</span><span class="summary-value" id="summary-umami-url">-</span></div>
      <div class="card-summary-item"><span class="summary-label">网站ID：</span><span class="summary-value" id="summary-umami-id">-</span></div>
    </div>
  </div>

  <div class="config-card" onclick="openModal('post-layout')">
    <div class="card-header">
      <div class="card-icon">📝</div>
      <h3 class="card-title">文章布局</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">上次编辑：</span><span class="summary-value" id="summary-lastmod-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">评论系统：</span><span class="summary-value" id="summary-comment-system">-</span></div>
    </div>
  </div>

</div>

<div class="cfg-overlay" id="cfg-overlay" onclick="closeModal(event)">
  <div class="cfg-dialog" onclick="event.stopPropagation()">
    <div class="cfg-dialog-header">
      <h2 id="cfg-title">配置</h2>
      <button class="cfg-close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="cfg-dialog-body" id="cfg-body"></div>
    <div class="cfg-dialog-footer">
      <button class="btn-primary" onclick="showIconSets()" id="iconify-footer-btn" style="display:none;">📚 图标集</button>
      <button class="btn-cancel" onclick="closeModal()">取消</button>
      <button class="btn-save" onclick="saveModal()">保存</button>
    </div>
  </div>
</div>

<script>
function escAttr(s){return String(s||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

let currentConfig = {};
let currentModal = '';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.querySelector('.nav-link[data-page="home"]')?.classList.add('active');
  loadConfig();
});

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
  if (overlay) {
    overlay.remove();
  }
}

async function loadConfig() {
  try {
    const res = await api('GET', '/api/config');
    currentConfig = res.data || {};
    updateAllSummaries();
    loadNavBarConfig(currentConfig.navBarLinks || []);
    loadMusicSongs(currentConfig.musicPlayerConfig?.local?.songs || []);
  } catch (e) {
    showMsg('加载配置失败: ' + e.message);
  }
}

function updateAllSummaries() {
  const config = currentConfig;
  document.getElementById('summary-basic-title').textContent = config.title || '-';
  document.getElementById('summary-basic-subtitle').textContent = config.subtitle || '-';

  document.getElementById('summary-navLinks-count').textContent = (config.navBarLinks || []).length;

  const featurePages = config.featurePages || {};
  const enabledCount = Object.values(featurePages).filter(v => v).length;
  document.getElementById('summary-featurePages-count').textContent = enabledCount + ' / 8';

  const layoutMode = config.postListLayout?.defaultMode || 'list';
  document.getElementById('summary-layout-mode').textContent = layoutMode === 'list' ? '列表模式' : '网格模式';

  document.getElementById('summary-banner-title').textContent = config.banner?.homeText?.title || '-';
  const tw = document.getElementById('summary-banner-typewriter');
  if (config.banner?.homeText?.typewriter?.enable) { tw.textContent = '已启用'; tw.className = 'summary-badge success'; }
  else { tw.textContent = '已关闭'; tw.className = 'summary-badge'; }

  const cb = document.getElementById('summary-fullscreen-carousel');
  if (config.fullscreenWallpaper?.carousel?.enable) {
    cb.textContent = '已启用'; cb.className = 'summary-badge success';
    document.getElementById('summary-fullscreen-interval-row').style.display = 'flex';
    document.getElementById('summary-fullscreen-interval').textContent = (config.fullscreenWallpaper?.carousel?.interval || 5) + '秒';
  } else { cb.textContent = '已关闭'; cb.className = 'summary-badge'; document.getElementById('summary-fullscreen-interval-row').style.display = 'none'; }

  const am = document.getElementById('summary-anime-mode');
  const modeMap = { local: '本地模式', bangumi: 'Bangumi模式', bilibili: 'Bilibili模式' };
  am.textContent = modeMap[config.anime?.mode] || '本地模式';

  const anCfg = config.anime || {};
  const abRow = document.getElementById('summary-anime-bangumi-row');
  const abVal = document.getElementById('summary-anime-bangumi');
  const alRow = document.getElementById('summary-anime-bilibili-row');
  const alVal = document.getElementById('summary-anime-bilibili');
  if (anCfg.mode === 'bangumi' && anCfg.bangumi?.userId) {
    abRow.style.display = 'flex'; abVal.textContent = anCfg.bangumi.userId;
  } else { abRow.style.display = 'none'; }
  if (anCfg.mode === 'bilibili' && anCfg.bilibili?.vmid) {
    alRow.style.display = 'flex'; alVal.textContent = anCfg.bilibili.vmid;
  } else { alRow.style.display = 'none'; }

  const sl = config.sidebarLayoutConfig;
  if (sl && sl.components) {
    document.getElementById('summary-sidebarLayout-left').textContent = (sl.components.left || []).length + ' 个组件';
    document.getElementById('summary-sidebarLayout-right').textContent = (sl.components.right || []).length + ' 个组件';
  } else {
    document.getElementById('summary-sidebarLayout-left').textContent = '未配置';
    document.getElementById('summary-sidebarLayout-right').textContent = '未配置';
  }

  const pf = config.profileConfig;
  if (pf) {
    document.getElementById('summary-profile-name').textContent = pf.name || '未设置';
    document.getElementById('summary-profile-links').textContent = (pf.links || []).length + ' 个链接';
  } else {
    document.getElementById('summary-profile-name').textContent = '未配置';
    document.getElementById('summary-profile-links').textContent = '0 个链接';
  }

  const an = config.announcementConfig;
  if (an) {
    document.getElementById('summary-announcement-title').textContent = an.title || '未设置';
    document.getElementById('summary-announcement-closable').textContent = an.closable ? '是' : '否';
  } else {
    document.getElementById('summary-announcement-title').textContent = '未配置';
    document.getElementById('summary-announcement-closable').textContent = '-';
  }

  if (sl && sl.properties) {
    const catProp = sl.properties.find(p => p.type === 'categories');
    if (catProp) {
      document.getElementById('summary-categories-position').textContent = catProp.position === 'sticky' ? '粘性定位' : (catProp.position === 'top' ? '顶部固定' : catProp.position || '-');
      document.getElementById('summary-categories-threshold').textContent = catProp.responsive?.collapseThreshold !== undefined ? catProp.responsive.collapseThreshold : '未设置';
    } else {
      document.getElementById('summary-categories-position').textContent = '未配置';
      document.getElementById('summary-categories-threshold').textContent = '-';
    }
  } else {
    document.getElementById('summary-categories-position').textContent = '未配置';
    document.getElementById('summary-categories-threshold').textContent = '-';
  }

  const mp = config.musicPlayerConfig;
  if (mp) {
    document.getElementById('summary-music-enable').textContent = mp.enable ? '已启用' : '已禁用';
    document.getElementById('summary-music-mode').textContent = mp.mode === 'local' ? '本地模式' : (mp.mode === 'meting' ? 'Meting API模式' : mp.mode || '-');
  } else {
    document.getElementById('summary-music-enable').textContent = '未配置';
    document.getElementById('summary-music-mode').textContent = '-';
  }

  const sakura = config.sakuraConfig;
  if (sakura) {
    document.getElementById('summary-sakura-enable').textContent = sakura.enable ? '已启用' : '已禁用';
    document.getElementById('summary-sakura-num').textContent = sakura.sakuraNum !== undefined ? sakura.sakuraNum : '未设置';
  } else {
    document.getElementById('summary-sakura-enable').textContent = '未配置';
    document.getElementById('summary-sakura-num').textContent = '-';
  }

  const pio = config.pioConfig;
  if (pio) {
    document.getElementById('summary-pio-enable').textContent = pio.enable ? '已启用' : '已禁用';
    document.getElementById('summary-pio-position').textContent = pio.position === 'left' ? '左侧' : (pio.position === 'right' ? '右侧' : pio.position || '-');
  } else {
    document.getElementById('summary-pio-enable').textContent = '未配置';
    document.getElementById('summary-pio-position').textContent = '-';
  }

  const umami = config.umamiConfig;
  if (umami) {
    document.getElementById('summary-umami-url').textContent = umami.shareUrl ? '已配置' : '未配置';
    document.getElementById('summary-umami-id').textContent = umami.websiteId ? '已配置' : '未配置';
  } else {
    document.getElementById('summary-umami-url').textContent = '未配置';
    document.getElementById('summary-umami-id').textContent = '-';
  }

  document.getElementById('summary-lastmod-enable').textContent = config.showLastModified ? '已启用' : '已禁用';
  document.getElementById('summary-comment-system').textContent = config.commentConfig?.system || '未配置';
}

function openModal(id) {
  currentModal = id;
  const modal = document.getElementById('cfg-overlay');
  const title = document.getElementById('cfg-title');
  const body = document.getElementById('cfg-body');
  const titles = {
    basic: '📋 基础信息', navLinks: '🔗 导航栏',
    featurePages: '📑 特色页面', layout: '📐 布局',
    banner: '🎨 横幅模式', fullscreen: '🌄 全屏模式',
    anime: '📺 番剧配置', sidebarLayout: '📍 基础位置配置', profile: '👤 个人资料', announcement: '📢 公告配置', categories: '📁 组件', 'music-player': '🎵 音乐播放器配置', sakura: '🌸 樱花飘落特效', pio: '💬 Live2D 看板娘', umami: '📈 Umami 统计', 'post-layout': '📝 文章布局'
  };
  title.innerHTML = titles[id] || '配置';
  body.innerHTML = getModalContent(id);
  if (id === 'navLinks') renderNavBarLinks();
  if (id === 'announcement') initAnnouncementModal();
  modal.classList.add('active');
  const iconBtn = document.getElementById('iconify-footer-btn');
  if (iconBtn) {
    iconBtn.style.display = (id === 'navLinks' || id === 'profile') ? 'block' : 'none';
  }
}

function getModalContent(id) {
  const config = currentConfig;

  if (id === 'basic') {
    return \`<div class="config-section">
      <h4>站点基本信息</h4>
      <div class="config-row">
        <div class="config-item"><label>网站标题</label><input type="text" id="modal-basic-title" value="\${escAttr(config.title)}"></div>
        <div class="config-item"><label>网站副标题</label><input type="text" id="modal-basic-subtitle" value="\${escAttr(config.subtitle)}"></div>
        <div class="config-item"><label>站点URL</label><input type="text" id="modal-basic-siteURL" value="\${escAttr(config.siteURL)}"></div>
        <div class="config-item"><label>站点开始日期</label><input type="date" id="modal-basic-siteStartDate" value="\${config.siteStartDate || ''}"></div>
        <div class="config-item"><label>语言</label><select id="modal-basic-lang">
          <option value="zh_CN"\${config.lang === 'zh_CN' ? ' selected' : ''}>简体中文</option>
          <option value="zh_TW"\${config.lang === 'zh_TW' ? ' selected' : ''}>繁体中文</option>
          <option value="en"\${config.lang === 'en' ? ' selected' : ''}>English</option>
          <option value="ja"\${config.lang === 'ja' ? ' selected' : ''}>日本語</option></select></div>
        <div class="config-item"><label>时区</label><select id="modal-basic-timeZone">
          \${Array.from({length: 25}, (_, i) => i - 12).map(tz => '<option value="' + tz + '"' + (parseInt(config.timeZone) === tz ? ' selected' : '') + '>UTC' + (tz >= 0 ? '+' : '') + tz + '</option>').join('')}</select></div>
        <div class="config-item"><label>主题色相</label><input type="number" id="modal-basic-themeHue" min="0" max="360" value="\${config.themeColor?.hue || ''}"></div>
        <div class="config-item"><label>固定主题色</label><div class="boolean-switch">
          <input type="checkbox" id="modal-basic-themeFixed"\${config.themeColor?.fixed ? ' checked' : ''}><label for="modal-basic-themeFixed">隐藏主题色选择器</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>Logo配置</h4>
      <div class="config-row">
        <div class="config-item"><label>显示模式</label><select id="modal-navbar-mode">
          <option value="text-icon"\${config.navbarTitle?.mode !== 'logo' ? ' selected' : ''}>图标+文本</option>
          <option value="logo"\${config.navbarTitle?.mode === 'logo' ? ' selected' : ''}>仅显示Logo</option></select></div>
        <div class="config-item"><label>标题文本</label><input type="text" id="modal-navbar-text" value="\${escAttr(config.navbarTitle?.text)}" placeholder="支持中文"></div>
        <div class="config-item"><label>图标路径（支持外链）</label><input type="url" id="modal-navbar-icon" value="\${escAttr(config.navbarTitle?.icon)}" placeholder="图标名或外链URL"></div>
        <div class="config-item"><label>Logo路径（支持外链）</label><input type="url" id="modal-navbar-logo" value="\${escAttr(config.navbarTitle?.logo)}" placeholder="Logo图片外链URL"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>页脚配置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用页脚</label><div class="boolean-switch">
          <input type="checkbox" id="modal-footer-enable"\${config.footer?.enable ? ' checked' : ''}><label for="modal-footer-enable">启用页脚</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="grid-column:1/-1"><label>页脚内容 (HTML)</label>
          <textarea id="modal-footer-customHtml" rows="6" placeholder="例如: &lt;p&gt;备案号：&lt;a href='https://beian.miit.gov.cn/'&gt;粤ICP备2023000000号&lt;/a&gt;&lt;/p&gt;" style="width:100%;padding:10px;border-radius:6px;font-size:14px;font-family:monospace;">\${config.footer?.customHtml || ''}</textarea>
        </div>
      </div>
    </div>\`;
  }

  if (id === 'navbar') {
    return \`<div class="config-section"><div class="config-row">
      <div class="config-item"><label>显示模式</label><select id="modal-navbar-mode">
        <option value="text-icon"\${config.navbarTitle?.mode !== 'logo' ? ' selected' : ''}>图标+文本</option>
        <option value="logo"\${config.navbarTitle?.mode === 'logo' ? ' selected' : ''}>仅显示Logo</option></select></div>
      <div class="config-item"><label>标题文本</label><input type="text" id="modal-navbar-text" value="\${escAttr(config.navbarTitle?.text)}" placeholder="支持中文"></div>
      <div class="config-item"><label>图标路径（支持外链）</label><input type="url" id="modal-navbar-icon" value="\${escAttr(config.navbarTitle?.icon)}" placeholder="图标名或外链URL"></div>
      <div class="config-item"><label>Logo路径（支持外链）</label><input type="url" id="modal-navbar-logo" value="\${escAttr(config.navbarTitle?.logo)}" placeholder="Logo图片外链URL"></div>
    </div></div>\`;
  }

  if (id === 'navLinks') {
    return \`<div class="config-section">
      <p style="font-size:13px;margin-bottom:12px;">配置博客顶部导航栏的链接结构，支持拖拽排序</p>
      <div id="modal-navLinks-container"></div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
        <button type="button" class="btn-primary" onclick="addNavLink()">+ 添加链接</button>
        <button type="button" class="btn-primary" onclick="addNavPreset('Home')">+ 首页预设</button>
        <button type="button" class="btn-primary" onclick="addNavPreset('Archive')">+ 归档预设</button>
      </div>
    </div>\`;
  }

  if (id === 'featurePages') {
    return \`<div class="config-section"><div class="feature-pages-grid">
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-anime"\${config.featurePages?.anime ? ' checked' : ''}><label for="modal-fp-anime">番剧页面</label></div>
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-diary"\${config.featurePages?.diary ? ' checked' : ''}><label for="modal-fp-diary">日记页面</label></div>
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-friends"\${config.featurePages?.friends ? ' checked' : ''}><label for="modal-fp-friends">友链页面</label></div>
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-projects"\${config.featurePages?.projects ? ' checked' : ''}><label for="modal-fp-projects">项目页面</label></div>
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-skills"\${config.featurePages?.skills ? ' checked' : ''}><label for="modal-fp-skills">技能页面</label></div>
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-timeline"\${config.featurePages?.timeline ? ' checked' : ''}><label for="modal-fp-timeline">时间线页面</label></div>
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-albums"\${config.featurePages?.albums ? ' checked' : ''}><label for="modal-fp-albums">相册页面</label></div>
      <div class="feature-page-item"><input type="checkbox" id="modal-fp-devices"\${config.featurePages?.devices ? ' checked' : ''}><label for="modal-fp-devices">设备页面</label></div>
    </div></div>\`;
  }

  if (id === 'layout') {
    return \`<div class="config-section">
      <h4>首页布局</h4>
      <div class="config-row">
        <div class="config-item"><label>默认布局模式</label><select id="modal-layout-mode">
          <option value="list"\${config.postListLayout?.defaultMode !== 'grid' ? ' selected' : ''}>列表模式（单列）</option>
          <option value="grid"\${config.postListLayout?.defaultMode === 'grid' ? ' selected' : ''}>网格模式（双列）</option></select></div>
        <div class="config-item"><label>允许用户切换布局</label><div class="boolean-switch">
          <input type="checkbox" id="modal-layout-allowSwitch"\${config.postListLayout?.allowSwitch ? ' checked' : ''}><label for="modal-layout-allowSwitch">启用切换</label></div></div>
        <div class="config-item"><label>使用新标签样式</label><div class="boolean-switch">
          <input type="checkbox" id="modal-layout-tagNewStyle"\${config.tagStyle?.useNewStyle ? ' checked' : ''}><label for="modal-layout-tagNewStyle">悬停高亮样式</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>整体布局</h4>
      <div class="config-row">
        <div class="config-item"><label>默认壁纸模式</label><select id="modal-wallpaper-mode">
          <option value="banner"\${config.wallpaperMode?.defaultMode !== 'fullscreen' && config.wallpaperMode?.defaultMode !== 'none' ? ' selected' : ''}>顶部横幅</option>
          <option value="fullscreen"\${config.wallpaperMode?.defaultMode === 'fullscreen' ? ' selected' : ''}>全屏壁纸</option>
          <option value="none"\${config.wallpaperMode?.defaultMode === 'none' ? ' selected' : ''}>无壁纸</option></select></div>
        <div class="config-item"><label>布局切换按钮显示</label><select id="modal-wallpaper-showSwitch">
          <option value="off"\${config.wallpaperMode?.showModeSwitchOnMobile === 'off' ? ' selected' : ''}>不显示</option>
          <option value="mobile"\${config.wallpaperMode?.showModeSwitchOnMobile === 'mobile' ? ' selected' : ''}>仅移动端</option>
          <option value="desktop"\${config.wallpaperMode?.showModeSwitchOnMobile === 'desktop' ? ' selected' : ''}>仅桌面端</option>
          <option value="both"\${config.wallpaperMode?.showModeSwitchOnMobile === 'both' ? ' selected' : ''}>所有设备</option></select></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>页面自动缩放</h4>
      <div class="config-row">
        <div class="config-item"><label>启用自动缩放</label><div class="boolean-switch">
          <input type="checkbox" id="modal-scaling-enable"\${config.pageScaling?.enable ? ' checked' : ''}><label for="modal-scaling-enable">开启页面自动缩放功能</label></div></div>
        <div class="config-item"><label>目标宽度 (px)</label><input type="number" id="modal-scaling-targetWidth" min="1000" max="4000" value="\${config.pageScaling?.targetWidth || 2000}">
          <p style="font-size:12px;margin-top:6px;">当页面宽度低于此值时开始缩放</p></div>
      </div>
    </div>\`;
  }

  if (id === 'wallpaper') {
    return \`<div class="config-section"><div class="config-row">
      <div class="config-item"><label>默认壁纸模式</label><select id="modal-wallpaper-mode">
        <option value="banner"\${config.wallpaperMode?.defaultMode !== 'fullscreen' && config.wallpaperMode?.defaultMode !== 'none' ? ' selected' : ''}>顶部横幅</option>
        <option value="fullscreen"\${config.wallpaperMode?.defaultMode === 'fullscreen' ? ' selected' : ''}>全屏壁纸</option>
        <option value="none"\${config.wallpaperMode?.defaultMode === 'none' ? ' selected' : ''}>无壁纸</option></select></div>
      <div class="config-item"><label>布局切换按钮显示</label><select id="modal-wallpaper-showSwitch">
        <option value="off"\${config.wallpaperMode?.showModeSwitchOnMobile === 'off' ? ' selected' : ''}>不显示</option>
        <option value="mobile"\${config.wallpaperMode?.showModeSwitchOnMobile === 'mobile' ? ' selected' : ''}>仅移动端</option>
        <option value="desktop"\${config.wallpaperMode?.showModeSwitchOnMobile === 'desktop' ? ' selected' : ''}>仅桌面端</option>
        <option value="both"\${config.wallpaperMode?.showModeSwitchOnMobile === 'both' ? ' selected' : ''}>所有设备</option></select></div>
    </div></div>\`;
  }

  if (id === 'banner') {
    return \`<div class="config-section"><h4>图片设置（支持外链URL）</h4><div class="config-row">
      <div class="config-item" style="grid-column:1/-1"><label>桌面端横幅图片（每行一个URL）</label>
        <textarea id="modal-banner-desktop" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(config.banner?.src?.desktop || []).join('\\n')}</textarea></div>
      <div class="config-item" style="grid-column:1/-1"><label>移动端横幅图片（每行一个URL）</label>
        <textarea id="modal-banner-mobile" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(config.banner?.src?.mobile || []).join('\\n')}</textarea></div>
      <div class="config-item"><label>图片定位</label><select id="modal-banner-position">
        <option value="top"\${config.banner?.position === 'top' ? ' selected' : ''}>顶部</option>
        <option value="center"\${config.banner?.position !== 'top' && config.banner?.position !== 'bottom' ? ' selected' : ''}>居中</option>
        <option value="bottom"\${config.banner?.position === 'bottom' ? ' selected' : ''}>底部</option></select></div>
    </div></div>
    <div class="config-section"><h4>轮播设置</h4><div class="config-row">
      <div class="config-item"><label>启用轮播</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-carousel"\${config.banner?.carousel?.enable ? ' checked' : ''}><label for="modal-banner-carousel">自动切换图片</label></div></div>
      <div class="config-item"><label>轮播间隔（秒）</label><input type="number" id="modal-banner-interval" min="1" max="60" value="\${config.banner?.carousel?.interval || 3}"></div>
    </div></div>
    <div class="config-section"><h4>水波纹效果</h4><div class="config-row">
      <div class="config-item"><label>启用水波纹</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-waves"\${config.banner?.waves?.enable ? ' checked' : ''}><label for="modal-banner-waves">显示水波纹动画</label></div></div>
      <div class="config-item"><label>性能模式</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-wavesPerf"\${config.banner?.waves?.performanceMode ? ' checked' : ''}><label for="modal-banner-wavesPerf">减少动画复杂度</label></div></div>
      <div class="config-item"><label>移动端禁用</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-wavesMobile"\${config.banner?.waves?.mobileDisable ? ' checked' : ''}><label for="modal-banner-wavesMobile">移动端不显示</label></div></div>
    </div></div>
    <div class="config-section"><h4>主页文本</h4><div class="config-row">
      <div class="config-item"><label>显示文本</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-textEnable"\${config.banner?.homeText?.enable ? ' checked' : ''}><label for="modal-banner-textEnable">在横幅上显示文本</label></div></div>
      <div class="config-item"><label>主标题（支持中文）</label><input type="text" id="modal-banner-textTitle" value="\${escAttr(config.banner?.homeText?.title)}" placeholder="支持中文标题"></div>
      <div class="config-item" style="grid-column:1/-1"><label>副标题（每行一个，支持中文）</label>
        <textarea id="modal-banner-textSubtitle" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(config.banner?.homeText?.subtitle || []).join('\\n')}</textarea></div>
    </div>
    <div class="config-row" style="margin-top:8px;">
      <div class="config-item"><label>启用打字机效果</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-typewriter"\${config.banner?.homeText?.typewriter?.enable ? ' checked' : ''}><label for="modal-banner-typewriter">逐字显示副标题</label></div></div>
      <div class="config-item"><label>打字速度（毫秒）</label><input type="number" id="modal-banner-typeSpeed" min="10" max="500" value="\${config.banner?.homeText?.typewriter?.speed || 100}"></div>
      <div class="config-item"><label>删除速度（毫秒）</label><input type="number" id="modal-banner-typeDeleteSpeed" min="10" max="200" value="\${config.banner?.homeText?.typewriter?.deleteSpeed || 50}"></div>
      <div class="config-item"><label>暂停时间（毫秒）</label><input type="number" id="modal-banner-typePauseTime" min="500" max="5000" value="\${config.banner?.homeText?.typewriter?.pauseTime || 2000}"></div>
    </div></div>
    <div class="config-section"><h4>导航栏透明模式</h4><div class="config-row">
      <div class="config-item"><label>透明模式</label><select id="modal-banner-navbarTransparent">
        <option value="semi"\${config.banner?.navbar?.transparentMode === 'semi' ? ' selected' : ''}>半透明</option>
        <option value="full"\${config.banner?.navbar?.transparentMode === 'full' ? ' selected' : ''}>完全透明</option>
        <option value="semifull"\${config.banner?.navbar?.transparentMode !== 'semi' && config.banner?.navbar?.transparentMode !== 'full' ? ' selected' : ''}>动态透明</option></select></div>
    </div></div>\`;
  }

  if (id === 'fullscreen') {
    return \`<div class="config-section"><h4>图片设置（支持外链URL）</h4><div class="config-row">
      <div class="config-item" style="grid-column:1/-1"><label>桌面端壁纸（每行一个URL）</label>
        <textarea id="modal-fullscreen-desktop" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(config.fullscreenWallpaper?.src?.desktop || []).join('\\n')}</textarea></div>
      <div class="config-item" style="grid-column:1/-1"><label>移动端壁纸（每行一个URL）</label>
        <textarea id="modal-fullscreen-mobile" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(config.fullscreenWallpaper?.src?.mobile || []).join('\\n')}</textarea></div>
      <div class="config-item"><label>图片定位</label><select id="modal-fullscreen-position">
        <option value="top"\${config.fullscreenWallpaper?.position === 'top' ? ' selected' : ''}>顶部</option>
        <option value="center"\${config.fullscreenWallpaper?.position !== 'top' && config.fullscreenWallpaper?.position !== 'bottom' ? ' selected' : ''}>居中</option>
        <option value="bottom"\${config.fullscreenWallpaper?.position === 'bottom' ? ' selected' : ''}>底部</option></select></div>
    </div></div>
    <div class="config-section"><h4>轮播设置</h4><div class="config-row">
      <div class="config-item"><label>启用轮播</label><div class="boolean-switch">
        <input type="checkbox" id="modal-fullscreen-carousel"\${config.fullscreenWallpaper?.carousel?.enable ? ' checked' : ''}><label for="modal-fullscreen-carousel">自动切换壁纸</label></div></div>
      <div class="config-item"><label>轮播间隔（秒）</label><input type="number" id="modal-fullscreen-interval" min="1" max="60" value="\${config.fullscreenWallpaper?.carousel?.interval || 5}"></div>
    </div></div>
    <div class="config-section"><h4>视觉效果</h4><div class="config-row">
      <div class="config-item"><label>层级 (zIndex)</label><input type="number" id="modal-fullscreen-zIndex" min="-10" max="10" value="\${config.fullscreenWallpaper?.zIndex || -1}"></div>
      <div class="config-item"><label>透明度</label><input type="number" id="modal-fullscreen-opacity" min="0" max="1" step="0.1" value="\${config.fullscreenWallpaper?.opacity || 0.8}"></div>
      <div class="config-item"><label>模糊程度 (px)</label><input type="number" id="modal-fullscreen-blur" min="0" max="20" value="\${config.fullscreenWallpaper?.blur || 1}"></div>
    </div></div>\`;
  }

  if (id === 'footer') {
    return \`<div class="config-section"><div class="config-row">
      <div class="config-item"><label>启用页脚</label><div class="boolean-switch">
        <input type="checkbox" id="modal-footer-enable"\${config.footer?.enable ? ' checked' : ''}><label for="modal-footer-enable">启用页脚</label></div></div>
    </div>
    <div class="config-row" style="margin-top:8px;">
      <div class="config-item" style="grid-column:1/-1"><label>页脚内容 (HTML)</label>
        <textarea id="modal-footer-customHtml" rows="6" placeholder="例如: &lt;p&gt;备案号：&lt;a href='https://beian.miit.gov.cn/'&gt;粤ICP备2023000000号&lt;/a&gt;&lt;/p&gt;" style="width:100%;padding:10px;border-radius:6px;font-size:14px;font-family:monospace;">\${config.footer?.customHtml || ''}</textarea>
      </div>
    </div></div>\`;
  }

  if (id === 'pageScaling') {
    return \`<div class="config-section"><div class="config-row">
      <div class="config-item"><label>启用自动缩放</label><div class="boolean-switch">
        <input type="checkbox" id="modal-scaling-enable"\${config.pageScaling?.enable ? ' checked' : ''}><label for="modal-scaling-enable">开启页面自动缩放功能</label></div></div>
      <div class="config-item"><label>目标宽度 (px)</label><input type="number" id="modal-scaling-targetWidth" min="1000" max="4000" value="\${config.pageScaling?.targetWidth || 2000}">
        <p style="font-size:12px;margin-top:6px;">当页面宽度低于此值时开始缩放</p></div>
    </div></div>\`;
  }

  if (id === 'anime') {
    return \`<div class="config-section"><div class="config-row">
      <div class="config-item" style="grid-column:1/-1"><label>数据模式</label>
        <select id="modal-anime-mode" style="width:100%;padding:10px;border-radius:8px;">
          <option value="local"\${config.anime?.mode === 'local' ? ' selected' : ''}>本地模式 - 手动管理番剧数据</option>
          <option value="bangumi"\${config.anime?.mode === 'bangumi' ? ' selected' : ''}>Bangumi模式 - 自动从Bangumi API同步</option>
          <option value="bilibili"\${config.anime?.mode === 'bilibili' ? ' selected' : ''}>Bilibili模式 - 自动从Bilibili API同步</option>
        </select>
        <p style="font-size:12px;margin-top:6px;">选择番剧数据来源：本地手动管理、Bangumi自动同步或Bilibili自动同步观看记录</p>
      </div>
    </div>
    <div class="config-section" style="margin-top:16px;padding:16px;border-radius:8px;">
      <h4 style="margin:0 0 12px 0;">Bangumi 配置</h4>
      <div class="config-row">
        <div class="config-item"><label>Bangumi用户ID</label><input type="text" id="modal-anime-bangumiId" value="\${config.anime?.bangumi?.userId || ''}" placeholder="例如: 12345 或 sai">
          <p style="font-size:12px;margin-top:6px;">访问 https://bgm.tv 登录 → 个人主页 → URL 中数字部分即为用户 ID</p></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:16px;padding:16px;border-radius:8px;">
      <h4 style="margin:0 0 12px 0;">Bilibili 配置</h4>
      <div class="config-row">
        <div class="config-item"><label>Bilibili用户ID (vmid)</label><input type="text" id="modal-anime-bilibiliVmid" value="\${config.anime?.bilibili?.vmid || ''}" placeholder="例如: 1129280784">
          <p style="font-size:12px;margin-top:6px;">访问 https://space.bilibili.com 登录 → 个人空间 → URL 中数字部分即为用户 ID</p></div>
        <div class="config-item"><label>开发环境获取数据</label><div class="boolean-switch">
          <input type="checkbox" id="modal-anime-fetchOnDev"\${config.anime?.bilibili?.fetchOnDev ? ' checked' : ''}><label for="modal-anime-fetchOnDev">在开发环境获取数据</label></div>
          <p style="font-size:12px;margin-top:6px;">建议保持关闭，避免开发时频繁请求 API</p></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>封面镜像源</label><input type="text" id="modal-anime-coverMirror" value="\${config.anime?.bilibili?.coverMirror || ''}" placeholder="如: https://images.weserv.nl/?url=">
          <p style="font-size:12px;margin-top:6px;">可选，用于加速封面图片加载</p></div>
        <div class="config-item"><label>使用WebP格式</label><div class="boolean-switch">
          <input type="checkbox" id="modal-anime-useWebp"\${(config.anime?.bilibili?.useWebp !== undefined ? config.anime.bilibili.useWebp : true) ? ' checked' : ''}><label for="modal-anime-useWebp">使用WebP格式</label></div>
          <p style="font-size:12px;margin-top:6px;">建议保持开启以获得更好的性能</p></div>
      </div>
      <div style="padding:12px;border-radius:6px;margin-top:12px;">
        <h4 style="margin:0 0 6px 0;">SESSDATA 环境变量</h4>
        <p style="margin:0;font-size:0.85rem;line-height:1.6;">
          用于获取详细观看进度，需在部署平台配置环境变量 <code>BILI_SESSDATA</code>。<br>
          获取：登录B站 → F12 → 应用程序 → Cookie → 找到 sessdata 值。<br>
          <strong>Vercel/Netlify/Cloudflare Pages</strong> 等平台的环境变量设置中添加即可。
        </p>
      </div>
    </div></div>\`;
  }

  if (id === 'sidebarLayout') {
    const sl = config.sidebarLayoutConfig || { properties: [], components: { left: [], right: [], drawer: [] }, defaultAnimation: { enable: true, baseDelay: 0, increment: 50 }, responsive: { breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 } } };
    const componentTypes = ['profile', 'announcement', 'categories', 'tags', 'site-stats', 'calendar', 'card-toc', 'music-sidebar'];
    const componentNames = { profile: '个人资料', announcement: '公告', categories: '分类', tags: '标签', 'site-stats': '站点统计', calendar: '日历', 'card-toc': '卡片目录', 'music-sidebar': '音乐播放器' };

    const leftItems = (sl.components.left || []).map((c, idx) => '<div class="sidebar-component-item" draggable="true" data-sidebar="left" data-type="' + c + '" data-index="' + idx + '" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)" ondragover="handleDragOver(event)" ondrop="handleDrop(event)"><span class="drag-handle">⋮⋮</span><span>' + (componentNames[c] || c) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(&quot;' + c + '&quot;, &quot;left&quot;)">移除</button></div>').join('');
    const rightItems = (sl.components.right || []).map((c, idx) => '<div class="sidebar-component-item" draggable="true" data-sidebar="right" data-type="' + c + '" data-index="' + idx + '" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)" ondragover="handleDragOver(event)" ondrop="handleDrop(event)"><span class="drag-handle">⋮⋮</span><span>' + (componentNames[c] || c) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(&quot;' + c + '&quot;, &quot;right&quot;)">移除</button></div>').join('');
    const drawerItems = (sl.components.drawer || []).map((c, idx) => '<div class="sidebar-component-item" draggable="true" data-sidebar="drawer" data-type="' + c + '" data-index="' + idx + '" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)" ondragover="handleDragOver(event)" ondrop="handleDrop(event)"><span class="drag-handle">⋮⋮</span><span>' + (componentNames[c] || c) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(&quot;' + c + '&quot;, &quot;drawer&quot;)">移除</button></div>').join('');

    return \`<div class="config-section">
      <h4>左侧栏组件</h4>
      <p style="font-size:12px;margin-bottom:12px;">拖拽排序，控制在左侧栏显示的组件</p>
      <div id="sidebar-left-container" class="sidebar-components-container">\${leftItems || '<div class="empty-state">暂无组件</div>'}</div>
      <div style="margin-top:12px;">
        <select id="modal-sidebar-add-left" style="width:100%;padding:10px;border-radius:8px;margin-bottom:8px;">
          <option value="">选择要添加的组件...</option>
          \${componentTypes.filter(t => !(sl.components.left || []).includes(t)).map(t => '<option value="' + t + '">' + (componentNames[t] || t) + '</option>').join('')}
        </select>
        <button type="button" class="btn-primary" onclick="addSidebarComponent('left')" style="width:100%;">+ 添加到左侧栏</button>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>右侧栏组件</h4>
      <p style="font-size:12px;margin-bottom:12px;">拖拽排序，控制在右侧栏显示的组件</p>
      <div id="sidebar-right-container" class="sidebar-components-container">\${rightItems || '<div class="empty-state">暂无组件</div>'}</div>
      <div style="margin-top:12px;">
        <select id="modal-sidebar-add-right" style="width:100%;padding:10px;border-radius:8px;margin-bottom:8px;">
          <option value="">选择要添加的组件...</option>
          \${componentTypes.filter(t => !(sl.components.right || []).includes(t)).map(t => '<option value="' + t + '">' + (componentNames[t] || t) + '</option>').join('')}
        </select>
        <button type="button" class="btn-primary" onclick="addSidebarComponent('right')" style="width:100%;">+ 添加到右侧栏</button>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>抽屉模式组件（移动端）</h4>
      <p style="font-size:12px;margin-bottom:12px;">控制在移动端抽屉菜单中显示的组件</p>
      <div id="sidebar-drawer-container" class="sidebar-components-container">\${drawerItems || '<div class="empty-state">暂无组件</div>'}</div>
      <div style="margin-top:12px;">
        <select id="modal-sidebar-add-drawer" style="width:100%;padding:10px;border-radius:8px;margin-bottom:8px;">
          <option value="">选择要添加的组件...</option>
          \${componentTypes.filter(t => !(sl.components.drawer || []).includes(t)).map(t => '<option value="' + t + '">' + (componentNames[t] || t) + '</option>').join('')}
        </select>
        <button type="button" class="btn-primary" onclick="addSidebarComponent('drawer')" style="width:100%;">+ 添加到抽屉模式</button>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>默认动画配置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用动画</label><div class="boolean-switch">
          <input type="checkbox" id="modal-sidebar-animEnable"\${sl.defaultAnimation?.enable !== false ? ' checked' : ''}><label for="modal-sidebar-animEnable">启用组件加载动画</label></div></div>
        <div class="config-item"><label>基础延迟（毫秒）</label><input type="number" id="modal-sidebar-animBaseDelay" min="0" max="1000" value="\${sl.defaultAnimation?.baseDelay || 0}"></div>
        <div class="config-item"><label>递增延迟（毫秒）</label><input type="number" id="modal-sidebar-animIncrement" min="0" max="500" value="\${sl.defaultAnimation?.increment || 50}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>响应式断点配置</h4>
      <div class="config-row">
        <div class="config-item"><label>移动端断点（px）</label><input type="number" id="modal-sidebar-mobileBp" min="0" max="2000" value="\${sl.responsive?.breakpoints?.mobile || 768}"></div>
        <div class="config-item"><label>平板端断点（px）</label><input type="number" id="modal-sidebar-tabletBp" min="0" max="2000" value="\${sl.responsive?.breakpoints?.tablet || 1280}"></div>
        <div class="config-item"><label>桌面端断点（px）</label><input type="number" id="modal-sidebar-desktopBp" min="0" max="2000" value="\${sl.responsive?.breakpoints?.desktop || 1280}"></div>
      </div>
    </div>\`;
  }

  if (id === 'profile') {
    const pf = config.profileConfig || { avatar: '', name: '', bio: '', typewriter: { enable: true, speed: 80 }, links: [] };
    const sl = config.sidebarLayoutConfig || { properties: [] };
    const profileProp = sl.properties.find(p => p.type === 'profile') || { position: 'top', animationDelay: 0 };
    const linksHtml = (pf.links || []).map((link, idx) => \`<div class="nav-child-item">
      <div class="form-grid">
        <div class="form-group"><label>链接名称</label><input type="text" class="profile-link-name" data-idx="\${idx}" value="\${escAttr(link.name)}" placeholder="如: GitHub"></div>
        <div class="form-group"><label>图标 iconify 图标集格式</label><input type="text" class="profile-link-icon" data-idx="\${idx}" value="\${escAttr(link.icon)}" placeholder="图标集:图标名 (如 material-symbols:home)"></div>
        <div class="form-group"><label>URL</label><input type="text" class="profile-link-url" data-idx="\${idx}" value="\${escAttr(link.url)}" placeholder="https://"></div>
      </div>
      <button type="button" class="btn-danger btn-sm" onclick="removeProfileLink(\${idx})">移除</button>
    </div>\`).join('');

    return \`<div class="config-section">
      <h4>基本信息</h4>
      <p style="font-size:12px;margin-bottom:8px;">头像支持本地路径或在线链接（https://）</p>
      <div class="config-row">
        <div class="config-item"><label>头像</label><input type="text" id="modal-profile-avatar" value="\${escAttr(pf.avatar)}" placeholder="assets/images/avatar.webp 或 https://example.com/avatar.webp"></div>
        <div class="config-item"><label>名称</label><input type="text" id="modal-profile-name" value="\${escAttr(pf.name)}" placeholder="您的名称"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="grid-column:1/-1"><label>个人简介</label>
          <textarea id="modal-profile-bio" rows="3" style="width:100%;padding:10px;border-radius:8px;font-size:14px;">\${escAttr(pf.bio)}</textarea>
        </div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>打字机效果</h4>
      <div class="config-row">
        <div class="config-item"><label>启用打字机效果</label><div class="boolean-switch">
          <input type="checkbox" id="modal-profile-typewriter"\${pf.typewriter?.enable !== false ? ' checked' : ''}><label for="modal-profile-typewriter">逐字显示个人简介</label></div></div>
        <div class="config-item"><label>打字速度（毫秒）</label><input type="number" id="modal-profile-typeSpeed" min="10" max="500" value="\${pf.typewriter?.speed || 80}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>布局设置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-profile-position">
          <option value="top"\${profileProp.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${profileProp.position === 'sticky' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-profile-delay" min="0" max="1000" value="\${profileProp.animationDelay || 0}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>社交媒体链接</h4>
      <p style="font-size:12px;margin-bottom:12px;">添加您的社交媒体链接，图标使用 Iconify 格式</p>
      <div id="profile-links-container">\${linksHtml || '<div class="empty-state">暂无链接</div>'}</div>
      <div style="margin-top:12px;">
        <button type="button" class="btn-primary" onclick="addProfileLink()">+ 添加链接</button>
      </div>
    </div>\`;
  }

  if (id === 'announcement') {
    const an = config.announcementConfig || { title: '', content: '', closable: true, link: { enable: false, text: '', url: '', external: false } };
    const sl = config.sidebarLayoutConfig || { properties: [] };
    const announcementProp = sl.properties.find(p => p.type === 'announcement') || { position: 'top', animationDelay: 50 };
    
    return \`<div class="config-section">
      <h4>公告内容</h4>
      <div class="config-row">
        <div class="config-item"><label>公告标题</label><input type="text" id="modal-announcement-title" value="\${escAttr(an.title)}" placeholder="如: 网站公告"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="grid-column:1/-1"><label>公告内容</label>
          <textarea id="modal-announcement-content" rows="4" style="width:100%;padding:10px;border-radius:8px;font-size:14px;">\${escAttr(an.content)}</textarea>
        </div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>允许关闭</label><div class="boolean-switch">
          <input type="checkbox" id="modal-announcement-closable"\${an.closable !== false ? ' checked' : ''}><label for="modal-announcement-closable">显示关闭按钮</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>链接设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用链接</label><div class="boolean-switch">
          <input type="checkbox" id="modal-announcement-linkEnable"\${an.link?.enable ? ' checked' : ''}><label for="modal-announcement-linkEnable">在公告中显示链接</label></div></div>
      </div>
      <div id="modal-announcement-linkFields" style="margin-top:12px;">
        <div class="config-row">
          <div class="config-item"><label>链接文本</label><input type="text" id="modal-announcement-linkText" value="\${escAttr(an.link?.text || '')}" placeholder="如: 查看详情"></div>
          <div class="config-item"><label>链接URL</label><input type="text" id="modal-announcement-linkUrl" value="\${escAttr(an.link?.url || '')}" placeholder="https://"></div>
          <div class="config-item"><label>外部链接</label><div class="boolean-switch">
            <input type="checkbox" id="modal-announcement-linkExternal"\${an.link?.external ? ' checked' : ''}><label for="modal-announcement-linkExternal">在新标签页打开</label></div></div>
        </div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>布局设置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-announcement-position">
          <option value="top"\${announcementProp.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${announcementProp.position === 'sticky' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-announcement-delay" min="0" max="1000" value="\${announcementProp.animationDelay || 50}"></div>
      </div>
    </div>\`;
  }

  if (id === 'categories') {
    const sl = config.sidebarLayoutConfig || { properties: [] };
    const catProp = sl.properties.find(p => p.type === 'categories') || { position: 'sticky', animationDelay: 150, responsive: { collapseThreshold: 5 } };
    const tagsProp = sl.properties.find(p => p.type === 'tags') || { position: 'top', animationDelay: 250, responsive: { collapseThreshold: 20 } };
    const siteStatsProp = sl.properties.find(p => p.type === 'site-stats') || { position: 'top', animationDelay: 200 };
    const cardTocProp = sl.properties.find(p => p.type === 'card-toc') || { position: 'sticky', animationDelay: 200 };
    const calendarProp = sl.properties.find(p => p.type === 'calendar') || { position: 'top', animationDelay: 250 };
    
    return \`<div class="config-section">
      <h4>分类组件配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-categories-position">
          <option value="top"\${catProp.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${catProp.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-categories-delay" min="0" max="1000" value="\${catProp.animationDelay || 150}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>折叠阈值</label><input type="number" id="modal-categories-threshold" min="-1" max="999" value="\${catProp.responsive?.collapseThreshold !== undefined ? catProp.responsive.collapseThreshold : 5}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">当分类数量超过此阈值时自动折叠；设置为 -1 禁用折叠功能</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>标签组件配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-tags-position">
          <option value="top"\${tagsProp.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${tagsProp.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-tags-delay" min="0" max="1000" value="\${tagsProp.animationDelay || 250}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>折叠阈值</label><input type="number" id="modal-tags-threshold" min="-1" max="999" value="\${tagsProp.responsive?.collapseThreshold !== undefined ? tagsProp.responsive.collapseThreshold : 20}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">当标签数量超过此阈值时自动折叠；设置为 -1 禁用折叠功能</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>卡片目录配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-cardToc-position">
          <option value="top"\${cardTocProp.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${cardTocProp.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-cardToc-delay" min="0" max="1000" value="\${cardTocProp.animationDelay || 200}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>日历组件配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-calendar-position">
          <option value="top"\${calendarProp.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${calendarProp.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-calendar-delay" min="0" max="1000" value="\${calendarProp.animationDelay || 250}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">移动端不显示日历组件</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>站点统计配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-siteStats-position">
          <option value="top"\${siteStatsProp.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${siteStatsProp.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-siteStats-delay" min="0" max="1000" value="\${siteStatsProp.animationDelay || 200}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>站点开始日期</label><input type="date" id="modal-siteStats-startDate" value="\${config.siteStartDate || ''}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">设置博客开始运行的日期，站点统计组件会根据这个日期计算运行天数</p>
    </div>\`;
  }



  if (id === 'music-player') {
    const mp = config.musicPlayerConfig || { enable: true, mode: 'meting', meting_api: 'https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r', id: '', server: 'netease', type: 'playlist', local: { songs: [] } };
    const sl = config.sidebarLayoutConfig || { properties: [] };
    const musicSidebarProp = sl.properties.find(p => p.type === 'music-sidebar') || { position: 'sticky', animationDelay: 100 };
    const localSongs = mp.local?.songs || [];
    const songsHtml = localSongs.map((song, idx) => \`<div class="music-song-item" data-idx="\${idx}">
      <div class="form-grid" style="grid-template-columns: 1fr 1fr 1fr;">
        <div class="form-group"><label>歌曲标题</label><input type="text" class="music-song-title" data-idx="\${idx}" value="\${escAttr(song.title || '')}" placeholder="歌曲标题"></div>
        <div class="form-group"><label>艺术家</label><input type="text" class="music-song-artist" data-idx="\${idx}" value="\${escAttr(song.artist || '')}" placeholder="艺术家/歌手"></div>
        <div class="form-group"><label>音频URL</label><input type="text" class="music-song-url" data-idx="\${idx}" value="\${escAttr(song.url || '')}" placeholder="assets/music/song.mp3"></div>
      </div>
      <div class="form-grid" style="grid-template-columns: 1fr 1fr;">
        <div class="form-group"><label>封面URL</label><input type="text" class="music-song-cover" data-idx="\${idx}" value="\${escAttr(song.cover || '')}" placeholder="assets/music/cover.jpg"></div>
        <div class="form-group"><label>时长(秒)</label><input type="number" class="music-song-duration" data-idx="\${idx}" value="\${song.duration || ''}" placeholder="240"></div>
      </div>
      <button type="button" class="btn-danger btn-sm" onclick="removeMusicSong(\${idx})">移除</button>
    </div>\`).join('');
    
    return \`<div class="config-section">
      <h4>基础设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用播放器</label><div class="boolean-switch">
          <input type="checkbox" id="modal-music-enable"\${mp.enable ? ' checked' : ''}><label for="modal-music-enable">启用音乐播放器功能</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>播放模式</label><select id="modal-music-mode">
          <option value="meting"\${mp.mode === 'meting' ? ' selected' : ''}>Meting API模式（网易云音乐等）</option>
          <option value="local"\${mp.mode === 'local' ? ' selected' : ''}>本地模式</option></select></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">推荐使用Meting API模式，可以播放网易云音乐、QQ音乐等平台的在线音乐</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>界面设置</h4>
      <div class="config-row">
        <div class="config-item"><label>悬浮播放器</label><div class="boolean-switch">
          <input type="checkbox" id="modal-music-floating"\${mp.showFloatingPlayer !== false ? ' checked' : ''}><label for="modal-music-floating">显示悬浮播放器</label></div></div>
        <div class="config-item"><label>悬浮入口模式</label><select id="modal-music-entryMode">
          <option value="fab"\${mp.floatingEntryMode === 'fab' ? ' selected' : ''}>集成到FAB按钮组</option>
          <option value="default"\${mp.floatingEntryMode !== 'fab' ? ' selected' : ''}>独立悬浮播放器</option></select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>定位方式</label><select id="modal-music-position">
          <option value="sticky"\${musicSidebarProp.position === 'sticky' ? ' selected' : ''}>粘性定位</option>
          <option value="top"\${musicSidebarProp.position === 'top' ? ' selected' : ''}>顶部固定</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-music-delay" min="0" max="1000" value="\${musicSidebarProp.animationDelay || 100}"></div>
      </div>
    </div>
    <div id="modal-music-metingFields" style="margin-top:20px;">
      <div class="config-section">
        <h4>Meting API 设置</h4>
        <div class="config-row">
          <div class="config-item"><label>Meting API 地址</label><input type="text" id="modal-music-api" value="\${escAttr(mp.meting_api || '')}" placeholder="https://"></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>音乐源</label><select id="modal-music-server">
            <option value="netease"\${mp.server === 'netease' ? ' selected' : ''}>网易云音乐</option>
            <option value="tencent"\${mp.server === 'tencent' ? ' selected' : ''}>QQ音乐</option>
            <option value="kugou"\${mp.server === 'kugou' ? ' selected' : ''}>酷狗音乐</option>
            <option value="xiami"\${mp.server === 'xiami' ? ' selected' : ''}>虾米音乐</option>
            <option value="baidu"\${mp.server === 'baidu' ? ' selected' : ''}>百度音乐</option></select></div>
          <div class="config-item"><label>类型</label><select id="modal-music-type">
            <option value="playlist"\${mp.type === 'playlist' ? ' selected' : ''}>歌单</option>
            <option value="song"\${mp.type === 'song' ? ' selected' : ''}>单曲</option>
            <option value="album"\${mp.type === 'album' ? ' selected' : ''}>专辑</option>
            <option value="artist"\${mp.type === 'artist' ? ' selected' : ''}>艺术家</option></select></div>
          <div class="config-item"><label>ID</label><input type="text" id="modal-music-id" value="\${escAttr(mp.id || '')}" placeholder="歌单/歌曲ID"></div>
        </div>
        <p style="font-size:12px;margin-top:8px;">从音乐平台分享链接中获取ID，如 https://music.163.com/playlist?id=123456789 中的 123456789</p>
      </div>
    </div>
    <div id="modal-music-localFields" style="margin-top:20px;">
      <div class="config-section">
        <h4>本地音乐列表</h4>
        <p style="font-size:12px;margin-bottom:12px;">添加本地音乐文件，需要将音乐文件放置在项目的 public 目录下</p>
        <div id="music-songs-container">\${songsHtml || '<div class="empty-state">暂无本地音乐，请添加</div>'}</div>
        <div style="margin-top:12px;">
          <button type="button" class="btn-primary" onclick="addMusicSong()">+ 添加歌曲</button>
        </div>
      </div>
    </div>\`;
  }

  if (id === 'sakura') {
    const sakura = config.sakuraConfig || { enable: false, sakuraNum: 21, limitTimes: -1, size: { min: 0.5, max: 1.1 }, opacity: { min: 0.3, max: 0.9 }, speed: { horizontal: { min: -1.7, max: -1.2 }, vertical: { min: 1.5, max: 2.2 }, rotation: 0.03, fadeSpeed: 0.03 }, zIndex: 100 };
    
    return \`<div class="config-section">
      <h4>基础设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用特效</label><div class="boolean-switch">
          <input type="checkbox" id="modal-sakura-enable"\${sakura.enable ? ' checked' : ''}><label for="modal-sakura-enable">启用樱花飘落特效</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>樱花数量</label><input type="number" id="modal-sakura-num" min="1" max="100" value="\${sakura.sakuraNum || 21}"></div>
        <div class="config-item"><label>越界限制次数</label><input type="number" id="modal-sakura-limit" value="\${sakura.limitTimes !== undefined ? sakura.limitTimes : -1}" placeholder="-1为无限循环"></div>
        <div class="config-item"><label>层级 (zIndex)</label><input type="number" id="modal-sakura-zindex" min="1" max="9999" value="\${sakura.zIndex || 100}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>尺寸设置</h4>
      <div class="config-row">
        <div class="config-item"><label>最小尺寸倍数</label><input type="number" id="modal-sakura-size-min" step="0.1" min="0.1" max="2" value="\${sakura.size?.min !== undefined ? sakura.size.min : 0.5}"></div>
        <div class="config-item"><label>最大尺寸倍数</label><input type="number" id="modal-sakura-size-max" step="0.1" min="0.1" max="2" value="\${sakura.size?.max !== undefined ? sakura.size.max : 1.1}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>透明度设置</h4>
      <div class="config-row">
        <div class="config-item"><label>最小不透明度</label><input type="number" id="modal-sakura-opacity-min" step="0.1" min="0" max="1" value="\${sakura.opacity?.min !== undefined ? sakura.opacity.min : 0.3}"></div>
        <div class="config-item"><label>最大不透明度</label><input type="number" id="modal-sakura-opacity-max" step="0.1" min="0" max="1" value="\${sakura.opacity?.max !== undefined ? sakura.opacity.max : 0.9}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>速度设置</h4>
      <div class="config-row">
        <div class="config-item"><label>水平速度最小值</label><input type="number" id="modal-sakura-h-min" step="0.1" value="\${sakura.speed?.horizontal?.min !== undefined ? sakura.speed.horizontal.min : -1.7}"></div>
        <div class="config-item"><label>水平速度最大值</label><input type="number" id="modal-sakura-h-max" step="0.1" value="\${sakura.speed?.horizontal?.max !== undefined ? sakura.speed.horizontal.max : -1.2}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>垂直速度最小值</label><input type="number" id="modal-sakura-v-min" step="0.1" min="0" value="\${sakura.speed?.vertical?.min !== undefined ? sakura.speed.vertical.min : 1.5}"></div>
        <div class="config-item"><label>垂直速度最大值</label><input type="number" id="modal-sakura-v-max" step="0.1" min="0" value="\${sakura.speed?.vertical?.max !== undefined ? sakura.speed.vertical.max : 2.2}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>旋转速度</label><input type="number" id="modal-sakura-rotation" step="0.01" min="0" value="\${sakura.speed?.rotation !== undefined ? sakura.speed.rotation : 0.03}"></div>
        <div class="config-item"><label>消失速度</label><input type="number" id="modal-sakura-fade" step="0.01" min="0" max="1" value="\${sakura.speed?.fadeSpeed !== undefined ? sakura.speed.fadeSpeed : 0.03}"></div>
      </div>
    </div>\`;
  }

  if (id === 'pio') {
    const pio = config.pioConfig || { enable: true, models: ["/pio/models/pio/model.json"], position: "left", width: 280, height: 250, mode: "draggable", hiddenOnMobile: true, dialog: { welcome: "Welcome to Mizuki Website!", touch: ["What are you doing?", "Stop touching me!", "HENTAI!", "Don't bully me like that!"], home: "Click here to go back to homepage!", skin: ["Want to see my new outfit?", "The new outfit looks great~"], close: "QWQ See you next time~", link: "https://github.com/matsuzaka-yuki/Mizuki" } };
    
    return \`<div class="config-section">
      <h4>基础设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用看板娘</label><div class="boolean-switch">
          <input type="checkbox" id="modal-pio-enable"\${pio.enable ? ' checked' : ''}><label for="modal-pio-enable">启用 Live2D 看板娘</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>位置</label><select id="modal-pio-position">
          <option value="left"\${pio.position === 'left' ? ' selected' : ''}>左侧</option>
          <option value="right"\${pio.position === 'right' ? ' selected' : ''}>右侧</option></select></div>
        <div class="config-item"><label>模式</label><select id="modal-pio-mode">
          <option value="draggable"\${pio.mode === 'draggable' ? ' selected' : ''}>可拖拽</option>
          <option value="fixed"\${pio.mode === 'fixed' ? ' selected' : ''}>固定位置</option></select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>宽度</label><input type="number" id="modal-pio-width" min="100" max="500" value="\${pio.width || 280}"></div>
        <div class="config-item"><label>高度</label><input type="number" id="modal-pio-height" min="100" max="500" value="\${pio.height || 250}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>移动端隐藏</label><div class="boolean-switch">
          <input type="checkbox" id="modal-pio-mobile"\${pio.hiddenOnMobile ? ' checked' : ''}><label for="modal-pio-mobile">在移动设备上隐藏看板娘</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>模型路径</h4>
      <div class="config-row">
        <div class="config-item" style="width:100%;"><label>模型路径（JSON格式）</label><input type="text" id="modal-pio-models" value="\${escAttr(pio.models?.join(', ') || '/pio/models/pio/model.json')}" placeholder="多个路径用逗号分隔"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">将模型文件放置在 public/pio/models/ 目录下</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>对话设置</h4>
      <div class="config-row">
        <div class="config-item" style="width:100%;"><label>欢迎词</label><input type="text" id="modal-pio-welcome" value="\${escAttr(pio.dialog?.welcome || '')}" placeholder="欢迎访问我的网站！"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>首页提示</label><input type="text" id="modal-pio-home" value="\${escAttr(pio.dialog?.home || '')}" placeholder="点击返回首页"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>关闭提示</label><input type="text" id="modal-pio-close" value="\${escAttr(pio.dialog?.close || '')}" placeholder="下次再见~"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>关于链接</label><input type="text" id="modal-pio-link" value="\${escAttr(pio.dialog?.link || '')}" placeholder="https://"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>触摸提示（每行一个）</label><textarea id="modal-pio-touch" rows="4" placeholder="每行一个提示，如：你在干什么？">\${pio.dialog?.touch?.join('\\n') || ''}</textarea></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>换装提示（每行一个）</label><textarea id="modal-pio-skin" rows="2" placeholder="每行一个提示，如：想看看我的新衣服吗？">\${pio.dialog?.skin?.join('\\n') || ''}</textarea></div>
      </div>
    </div>\`;
  }

  if (id === 'umami') {
    const umami = config.umamiConfig || { shareUrl: '', scriptUrl: '', websiteId: '' };
    
    return \`<div class="config-section">
      <h4>Umami 统计配置</h4>
      <div class="config-row">
        <div class="config-item" style="width:100%;"><label>分享链接 (shareUrl)</label><input type="text" id="modal-umami-share" value="\${escAttr(umami.shareUrl || '')}" placeholder="https://cloud.umami.is/analytics/us/share/..."></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>跟踪脚本地址 (scriptUrl)</label><input type="text" id="modal-umami-script" value="\${escAttr(umami.scriptUrl || '')}" placeholder="https://analytics.umami.is/script.js"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>网站 ID (websiteId)</label><input type="text" id="modal-umami-id" value="\${escAttr(umami.websiteId || '')}" placeholder="your-website-id"></div>
      </div>
      <p style="font-size:12px;margin-top:12px;">提示：如果使用 Umami Cloud，分享链接需要先在浏览器中访问一次，复制重定向后的最终地址。</p>
      <p style="font-size:12px;margin-top:4px;">设置 shareUrl 为 false 可禁用组件的访问量显示，但不影响统计功能。</p>
    </div>\`;
  }

  if (id === 'post-layout') {
    const slm = config.showLastModified !== undefined ? config.showLastModified : true;
    const exp = config.expressiveCodeConfig || { theme: 'github-dark', hideDuringThemeTransition: true };
    const share = config.shareConfig || { enable: true };
    const license = config.licenseConfig || { enable: true, name: 'CC BY-NC-SA 4.0', url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' };
    const toc = config.toc || { enable: true, depth: 2, useJapaneseBadge: true };
    const comment = config.commentConfig || { enable: false, system: 'twikoo', twikoo: { envId: '', lang: 'SITE_LANG' }, giscus: {} };

    return \`<div class="config-section">
      <h4>上次编辑卡片</h4>
      <div class="config-row">
        <div class="config-item"><label>显示上次编辑</label><div class="boolean-switch">
          <input type="checkbox" id="modal-lastmod-enable"\${slm ? ' checked' : ''}><label for="modal-lastmod-enable">在文章底部显示最后修改时间</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>代码块配置</h4>
      <div class="config-row">
        <div class="config-item"><label>代码块主题</label><select id="modal-code-theme">
          <option value="github-dark"\${exp.theme === 'github-dark' ? ' selected' : ''}>github-dark (深色)</option>
          <option value="github-light"\${exp.theme === 'github-light' ? ' selected' : ''}>github-light (浅色)</option>
          <option value="dracula"\${exp.theme === 'dracula' ? ' selected' : ''}>dracula</option>
          <option value="monokai"\${exp.theme === 'monokai' ? ' selected' : ''}>monokai</option>
        </select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>主题切换时隐藏</label><div class="boolean-switch">
          <input type="checkbox" id="modal-code-hideTransition"\${exp.hideDuringThemeTransition !== false ? ' checked' : ''}><label for="modal-code-hideTransition">避免切换时卡顿</label></div></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">注意：某些样式已被覆盖，请参阅 astro.config.mjs 文件。</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>分享组件</h4>
      <div class="config-row">
        <div class="config-item"><label>启用分享</label><div class="boolean-switch">
          <input type="checkbox" id="modal-share-enable"\${share.enable ? ' checked' : ''}><label for="modal-share-enable">在文章区域显示分享组件</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>版权信息</h4>
      <div class="config-row">
        <div class="config-item"><label>显示版权</label><div class="boolean-switch">
          <input type="checkbox" id="modal-license-enable"\${license.enable ? ' checked' : ''}><label for="modal-license-enable">在文章底部显示版权信息</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>版权名称</label><input type="text" id="modal-license-name" value="\${escAttr(license.name || '')}" placeholder="如: CC BY-NC-SA 4.0"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>版权链接</label><input type="text" id="modal-license-url" value="\${escAttr(license.url || '')}" placeholder="https://creativecommons.org/..."></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>目录导航</h4>
      <div class="config-row">
        <div class="config-item"><label>启用目录</label><div class="boolean-switch">
          <input type="checkbox" id="modal-toc-enable"\${toc.enable ? ' checked' : ''}><label for="modal-toc-enable">在文章侧边显示目录导航</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>目录深度</label><select id="modal-toc-depth">
          <option value="1"\${toc.depth === 1 ? ' selected' : ''}>1 (仅h1)</option>
          <option value="2"\${toc.depth === 2 ? ' selected' : ''}>2 (h1-h2)</option>
          <option value="3"\${toc.depth === 3 ? ' selected' : ''}>3 (h1-h3)</option>
          <option value="4"\${toc.depth === 4 ? ' selected' : ''}>4 (h1-h4)</option>
          <option value="5"\${toc.depth === 5 ? ' selected' : ''}>5 (h1-h5)</option>
          <option value="6"\${toc.depth === 6 ? ' selected' : ''}>6 (h1-h6)</option>
        </select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>日语假名标记</label><div class="boolean-switch">
          <input type="checkbox" id="modal-toc-japaneseBadge"\${toc.useJapaneseBadge ? ' checked' : ''}><label for="modal-toc-japaneseBadge">使用假名(ァィゥ...)代替数字</label></div></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">开启后会将 1、2、3... 改为 ァ、ィ、ゥ...，首页文章列表导航也会生效。</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>评论系统</h4>
      <div class="config-row">
        <div class="config-item"><label>启用评论</label><div class="boolean-switch">
          <input type="checkbox" id="modal-comment-enable"\${comment.enable ? ' checked' : ''}><label for="modal-comment-enable">启用评论功能</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>评论系统</label><select id="modal-comment-system">
          <option value="twikoo"\${comment.system === 'twikoo' ? ' selected' : ''}>Twikoo</option>
          <option value="giscus"\${comment.system === 'giscus' ? ' selected' : ''}>Giscus (GitHub)</option>
        </select></div>
      </div>
      <div id="modal-comment-twikoo-fields" style="margin-top:12px;\${comment.system === 'giscus' ? 'display:none;' : ''}">
        <div class="config-row">
          <div class="config-item"><label>Twikoo 环境ID</label><input type="text" id="modal-comment-twikoo-envId" value="\${escAttr(comment.twikoo?.envId || '')}" placeholder="https://your-twikoo.vercel.app"></div>
        </div>
      </div>
      <div id="modal-comment-giscus-fields" style="margin-top:12px;\${comment.system !== 'giscus' ? 'display:none;' : ''}">
        <div class="config-row">
          <div class="config-item"><label>仓库 (repo)</label><input type="text" id="modal-comment-giscus-repo" value="\${escAttr(comment.giscus?.repo || '')}" placeholder="username/repo"></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>仓库ID (repoId)</label><input type="text" id="modal-comment-giscus-repoId" value="\${escAttr(comment.giscus?.repoId || '')}" placeholder="R_kgD..."></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>分类 (category)</label><input type="text" id="modal-comment-giscus-category" value="\${escAttr(comment.giscus?.category || 'Announcements')}"></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>分类ID (categoryId)</label><input type="text" id="modal-comment-giscus-categoryId" value="\${escAttr(comment.giscus?.categoryId || '')}" placeholder="DIC_kwD..."></div>
        </div>
      </div>
      <p style="font-size:12px;margin-top:12px;">Twikoo 需要部署到 Vercel 等平台。Giscus 基于 GitHub Discussions，适合技术博客。</p>
    </div>\`;
  }

  return '';
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

function applyModalChanges() {
  const id = currentModal;
  if (id === 'basic') {
    currentConfig.title = document.getElementById('modal-basic-title').value;
    currentConfig.subtitle = document.getElementById('modal-basic-subtitle').value;
    currentConfig.siteURL = document.getElementById('modal-basic-siteURL').value;
    currentConfig.siteStartDate = document.getElementById('modal-basic-siteStartDate').value;
    currentConfig.lang = document.getElementById('modal-basic-lang').value;
    currentConfig.timeZone = parseInt(document.getElementById('modal-basic-timeZone').value);
    currentConfig.themeColor = { hue: parseInt(document.getElementById('modal-basic-themeHue').value), fixed: document.getElementById('modal-basic-themeFixed').checked };
    if (currentConfig.diaryApiUrl === undefined) currentConfig.diaryApiUrl = '';
  }
  if (id === 'navbar') {
    currentConfig.navbarTitle = { mode: document.getElementById('modal-navbar-mode').value, text: document.getElementById('modal-navbar-text').value, icon: document.getElementById('modal-navbar-icon').value, logo: document.getElementById('modal-navbar-logo').value };
  }
  if (id === 'navLinks') { currentConfig.navBarLinks = collectNavBarLinks(); }
  if (id === 'featurePages') {
    currentConfig.featurePages = { anime: document.getElementById('modal-fp-anime').checked, diary: document.getElementById('modal-fp-diary').checked, friends: document.getElementById('modal-fp-friends').checked, projects: document.getElementById('modal-fp-projects').checked, skills: document.getElementById('modal-fp-skills').checked, timeline: document.getElementById('modal-fp-timeline').checked, albums: document.getElementById('modal-fp-albums').checked, devices: document.getElementById('modal-fp-devices').checked };
  }
  if (id === 'layout') {
    const existingLayout = currentConfig.postListLayout || {};
    currentConfig.postListLayout = { defaultMode: document.getElementById('modal-layout-mode').value, allowSwitch: document.getElementById('modal-layout-allowSwitch').checked, categoryBar: existingLayout.categoryBar || { enable: true } };
    currentConfig.tagStyle = { useNewStyle: document.getElementById('modal-layout-tagNewStyle').checked };
  }
  if (id === 'wallpaper') {
    currentConfig.wallpaperMode = { defaultMode: document.getElementById('modal-wallpaper-mode').value, showModeSwitchOnMobile: document.getElementById('modal-wallpaper-showSwitch').value };
  }
  if (id === 'banner') {
    const existingBanner = currentConfig.banner || {};
    currentConfig.banner = {
      src: { desktop: document.getElementById('modal-banner-desktop').value.split('\\n').map(s => s.trim()).filter(s => s), mobile: document.getElementById('modal-banner-mobile').value.split('\\n').map(s => s.trim()).filter(s => s) },
      position: document.getElementById('modal-banner-position').value,
      carousel: { enable: document.getElementById('modal-banner-carousel').checked, interval: parseFloat(document.getElementById('modal-banner-interval').value) },
      waves: { enable: document.getElementById('modal-banner-waves').checked, performanceMode: document.getElementById('modal-banner-wavesPerf').checked, mobileDisable: document.getElementById('modal-banner-wavesMobile').checked },
      imageApi: existingBanner.imageApi || { enable: false, url: '' },
      homeText: { enable: document.getElementById('modal-banner-textEnable').checked, title: document.getElementById('modal-banner-textTitle').value, subtitle: document.getElementById('modal-banner-textSubtitle').value.split('\\n').map(s => s.trim()).filter(s => s), typewriter: { enable: document.getElementById('modal-banner-typewriter').checked, speed: parseInt(document.getElementById('modal-banner-typeSpeed').value), deleteSpeed: parseInt(document.getElementById('modal-banner-typeDeleteSpeed').value), pauseTime: parseInt(document.getElementById('modal-banner-typePauseTime').value) } },
      credit: existingBanner.credit || { enable: false, text: '', url: '' },
      navbar: { transparentMode: document.getElementById('modal-banner-navbarTransparent').value }
    };
  }
  if (id === 'fullscreen') {
    currentConfig.fullscreenWallpaper = {
      src: { desktop: document.getElementById('modal-fullscreen-desktop').value.split('\\n').map(s => s.trim()).filter(s => s), mobile: document.getElementById('modal-fullscreen-mobile').value.split('\\n').map(s => s.trim()).filter(s => s) },
      position: document.getElementById('modal-fullscreen-position').value,
      carousel: { enable: document.getElementById('modal-fullscreen-carousel').checked, interval: parseFloat(document.getElementById('modal-fullscreen-interval').value) },
      zIndex: parseInt(document.getElementById('modal-fullscreen-zIndex').value), opacity: parseFloat(document.getElementById('modal-fullscreen-opacity').value), blur: parseInt(document.getElementById('modal-fullscreen-blur').value)
    };
  }
  if (id === 'footer') { currentConfig.footer = { enable: document.getElementById('modal-footer-enable').checked, customHtml: document.getElementById('modal-footer-customHtml').value }; }
  if (id === 'pageScaling') { currentConfig.pageScaling = { enable: document.getElementById('modal-scaling-enable').checked, targetWidth: parseInt(document.getElementById('modal-scaling-targetWidth').value) }; }
  if (id === 'anime') {
    currentConfig.anime = {
      mode: document.getElementById('modal-anime-mode').value,
      bangumi: { userId: document.getElementById('modal-anime-bangumiId').value },
      bilibili: {
        vmid: document.getElementById('modal-anime-bilibiliVmid').value,
        fetchOnDev: document.getElementById('modal-anime-fetchOnDev').checked,
        coverMirror: document.getElementById('modal-anime-coverMirror').value,
        useWebp: document.getElementById('modal-anime-useWebp').checked
      }
    };
  }

  if (id === 'sidebarLayout') {
    const leftComps = Array.from(document.querySelectorAll('#sidebar-left-container .sidebar-component-item')).map(el => el.getAttribute('data-type')).filter(Boolean);
    const rightComps = Array.from(document.querySelectorAll('#sidebar-right-container .sidebar-component-item')).map(el => el.getAttribute('data-type')).filter(Boolean);
    const drawerComps = Array.from(document.querySelectorAll('#sidebar-drawer-container .sidebar-component-item')).map(el => el.getAttribute('data-type')).filter(Boolean);

    currentConfig.sidebarLayoutConfig = {
      properties: currentConfig.sidebarLayoutConfig?.properties || [],
      components: {
        left: leftComps,
        right: rightComps,
        drawer: drawerComps
      },
      defaultAnimation: {
        enable: document.getElementById('modal-sidebar-animEnable').checked,
        baseDelay: parseInt(document.getElementById('modal-sidebar-animBaseDelay').value) || 0,
        increment: parseInt(document.getElementById('modal-sidebar-animIncrement').value) || 50
      },
      responsive: {
        breakpoints: {
          mobile: parseInt(document.getElementById('modal-sidebar-mobileBp').value) || 768,
          tablet: parseInt(document.getElementById('modal-sidebar-tabletBp').value) || 1280,
          desktop: parseInt(document.getElementById('modal-sidebar-desktopBp').value) || 1280
        }
      }
    };
  }

  if (id === 'profile') {
    const links = [];
    document.querySelectorAll('.nav-child-item').forEach(function(el) {
      const name = el.querySelector('.profile-link-name')?.value;
      const icon = el.querySelector('.profile-link-icon')?.value;
      const url = el.querySelector('.profile-link-url')?.value;
      if (name || url) {
        links.push({ name: name || '', icon: icon || '', url: url || '' });
      }
    });
    currentConfig.profileConfig = {
      avatar: document.getElementById('modal-profile-avatar').value,
      name: document.getElementById('modal-profile-name').value,
      bio: document.getElementById('modal-profile-bio').value,
      typewriter: {
        enable: document.getElementById('modal-profile-typewriter').checked,
        speed: parseInt(document.getElementById('modal-profile-typeSpeed').value) || 80
      },
      links: links
    };
    
    const sl = currentConfig.sidebarLayoutConfig || { properties: [] };
    const profileIndex = sl.properties.findIndex(p => p.type === 'profile');
    const profileConfig = {
      type: 'profile',
      position: document.getElementById('modal-profile-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-profile-delay').value) || 0
    };
    if (profileIndex >= 0) {
      sl.properties[profileIndex] = profileConfig;
    } else {
      sl.properties.push(profileConfig);
    }
    currentConfig.sidebarLayoutConfig = sl;
  }

  if (id === 'announcement') {
    currentConfig.announcementConfig = {
      title: document.getElementById('modal-announcement-title').value,
      content: document.getElementById('modal-announcement-content').value,
      closable: document.getElementById('modal-announcement-closable').checked,
      link: {
        enable: document.getElementById('modal-announcement-linkEnable').checked,
        text: document.getElementById('modal-announcement-linkText').value,
        url: document.getElementById('modal-announcement-linkUrl').value,
        external: document.getElementById('modal-announcement-linkExternal').checked
      }
    };
    
    const sl = currentConfig.sidebarLayoutConfig || { properties: [] };
    const announcementIndex = sl.properties.findIndex(p => p.type === 'announcement');
    const announcementConfig = {
      type: 'announcement',
      position: document.getElementById('modal-announcement-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-announcement-delay').value) || 50
    };
    if (announcementIndex >= 0) {
      sl.properties[announcementIndex] = announcementConfig;
    } else {
      sl.properties.push(announcementConfig);
    }
    currentConfig.sidebarLayoutConfig = sl;
  }

  if (id === 'categories') {
    const sl = currentConfig.sidebarLayoutConfig || { properties: [] };
    
    const catIndex = sl.properties.findIndex(p => p.type === 'categories');
    const catConfig = {
      type: 'categories',
      position: document.getElementById('modal-categories-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-categories-delay').value) || 150,
      responsive: {
        collapseThreshold: parseInt(document.getElementById('modal-categories-threshold').value) || 5
      }
    };
    if (catIndex >= 0) {
      sl.properties[catIndex] = catConfig;
    } else {
      sl.properties.push(catConfig);
    }
    
    const tagsIndex = sl.properties.findIndex(p => p.type === 'tags');
    const tagsConfig = {
      type: 'tags',
      position: document.getElementById('modal-tags-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-tags-delay').value) || 250,
      responsive: {
        collapseThreshold: parseInt(document.getElementById('modal-tags-threshold').value) || 20
      }
    };
    if (tagsIndex >= 0) {
      sl.properties[tagsIndex] = tagsConfig;
    } else {
      sl.properties.push(tagsConfig);
    }
    
    const cardTocIndex = sl.properties.findIndex(p => p.type === 'card-toc');
    const cardTocConfig = {
      type: 'card-toc',
      position: document.getElementById('modal-cardToc-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-cardToc-delay').value) || 200
    };
    if (cardTocIndex >= 0) {
      sl.properties[cardTocIndex] = cardTocConfig;
    } else {
      sl.properties.push(cardTocConfig);
    }
    
    const calendarIndex = sl.properties.findIndex(p => p.type === 'calendar');
    const calendarConfig = {
      type: 'calendar',
      position: document.getElementById('modal-calendar-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-calendar-delay').value) || 250
    };
    if (calendarIndex >= 0) {
      sl.properties[calendarIndex] = calendarConfig;
    } else {
      sl.properties.push(calendarConfig);
    }
    
    const siteStatsIndex = sl.properties.findIndex(p => p.type === 'site-stats');
    const siteStatsConfig = {
      type: 'site-stats',
      position: document.getElementById('modal-siteStats-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-siteStats-delay').value) || 200
    };
    if (siteStatsIndex >= 0) {
      sl.properties[siteStatsIndex] = siteStatsConfig;
    } else {
      sl.properties.push(siteStatsConfig);
    }
    
    currentConfig.sidebarLayoutConfig = sl;
    
    const startDate = document.getElementById('modal-siteStats-startDate').value;
    if (startDate) {
      currentConfig.siteStartDate = startDate;
    }
  }



  if (id === 'music-player') {
    currentConfig.musicPlayerConfig = {
      enable: document.getElementById('modal-music-enable').checked,
      mode: document.getElementById('modal-music-mode').value,
      meting_api: document.getElementById('modal-music-api').value,
      id: document.getElementById('modal-music-id').value,
      server: document.getElementById('modal-music-server').value,
      type: document.getElementById('modal-music-type').value,
      showFloatingPlayer: document.getElementById('modal-music-floating').checked,
      floatingEntryMode: document.getElementById('modal-music-entryMode').value,
      local: {
        songs: collectMusicSongs()
      }
    };
    
    const sl = currentConfig.sidebarLayoutConfig || { properties: [] };
    const musicIndex = sl.properties.findIndex(p => p.type === 'music-sidebar');
    const musicConfig = {
      type: 'music-sidebar',
      position: document.getElementById('modal-music-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-music-delay').value) || 100
    };
    if (musicIndex >= 0) {
      sl.properties[musicIndex] = musicConfig;
    } else {
      sl.properties.push(musicConfig);
    }
    currentConfig.sidebarLayoutConfig = sl;
  }

  if (id === 'sakura') {
    currentConfig.sakuraConfig = {
      enable: document.getElementById('modal-sakura-enable').checked,
      sakuraNum: parseInt(document.getElementById('modal-sakura-num').value) || 21,
      limitTimes: parseInt(document.getElementById('modal-sakura-limit').value) || -1,
      size: {
        min: parseFloat(document.getElementById('modal-sakura-size-min').value) || 0.5,
        max: parseFloat(document.getElementById('modal-sakura-size-max').value) || 1.1
      },
      opacity: {
        min: parseFloat(document.getElementById('modal-sakura-opacity-min').value) || 0.3,
        max: parseFloat(document.getElementById('modal-sakura-opacity-max').value) || 0.9
      },
      speed: {
        horizontal: {
          min: parseFloat(document.getElementById('modal-sakura-h-min').value) || -1.7,
          max: parseFloat(document.getElementById('modal-sakura-h-max').value) || -1.2
        },
        vertical: {
          min: parseFloat(document.getElementById('modal-sakura-v-min').value) || 1.5,
          max: parseFloat(document.getElementById('modal-sakura-v-max').value) || 2.2
        },
        rotation: parseFloat(document.getElementById('modal-sakura-rotation').value) || 0.03,
        fadeSpeed: parseFloat(document.getElementById('modal-sakura-fade').value) || 0.03
      },
      zIndex: parseInt(document.getElementById('modal-sakura-zindex').value) || 100
    };
  }

  if (id === 'pio') {
    currentConfig.pioConfig = {
      enable: document.getElementById('modal-pio-enable').checked,
      models: document.getElementById('modal-pio-models').value.split(',').map(s => s.trim()).filter(s => s),
      position: document.getElementById('modal-pio-position').value,
      width: parseInt(document.getElementById('modal-pio-width').value) || 280,
      height: parseInt(document.getElementById('modal-pio-height').value) || 250,
      mode: document.getElementById('modal-pio-mode').value,
      hiddenOnMobile: document.getElementById('modal-pio-mobile').checked,
      dialog: {
        welcome: document.getElementById('modal-pio-welcome').value,
        touch: document.getElementById('modal-pio-touch').value.split('\\n').filter(s => s.trim()),
        home: document.getElementById('modal-pio-home').value,
        skin: document.getElementById('modal-pio-skin').value.split('\\n').filter(s => s.trim()),
        close: document.getElementById('modal-pio-close').value,
        link: document.getElementById('modal-pio-link').value
      }
    };
  }

  if (id === 'umami') {
    currentConfig.umamiConfig = {
      shareUrl: document.getElementById('modal-umami-share').value || '',
      scriptUrl: document.getElementById('modal-umami-script').value || '',
      websiteId: document.getElementById('modal-umami-id').value || ''
    };
  }

  if (id === 'post-layout') {
    currentConfig.showLastModified = document.getElementById('modal-lastmod-enable').checked;
    currentConfig.expressiveCodeConfig = {
      theme: document.getElementById('modal-code-theme').value,
      hideDuringThemeTransition: document.getElementById('modal-code-hideTransition').checked
    };
    currentConfig.shareConfig = {
      enable: document.getElementById('modal-share-enable').checked
    };
    currentConfig.licenseConfig = {
      enable: document.getElementById('modal-license-enable').checked,
      name: document.getElementById('modal-license-name').value || '',
      url: document.getElementById('modal-license-url').value || ''
    };
    currentConfig.toc = {
      enable: document.getElementById('modal-toc-enable').checked,
      depth: parseInt(document.getElementById('modal-toc-depth').value) || 2,
      useJapaneseBadge: document.getElementById('modal-toc-japaneseBadge').checked
    };
    const commentSystem = document.getElementById('modal-comment-system').value;
    const commentEnable = document.getElementById('modal-comment-enable').checked;
    const commentConfig = {
      enable: commentEnable,
      system: commentSystem,
      twikoo: {
        envId: document.getElementById('modal-comment-twikoo-envId').value || '',
        lang: 'SITE_LANG'
      },
      giscus: {
        repo: document.getElementById('modal-comment-giscus-repo').value || '',
        repoId: document.getElementById('modal-comment-giscus-repoId').value || '',
        category: document.getElementById('modal-comment-giscus-category').value || 'Announcements',
        categoryId: document.getElementById('modal-comment-giscus-categoryId').value || '',
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'top',
        theme: 'preferred_color_scheme',
        lang: 'SITE_LANG',
        loading: 'lazy'
      }
    };
    currentConfig.commentConfig = commentConfig;
  }
}

async function saveConfig() {
  try { await api('PUT', '/api/config', currentConfig); showMsg('配置保存成功', 'success'); }
  catch (e) { showMsg('保存配置失败: ' + e.message); }
}

window.navBarLinksData = [];
let dragSrcIdx = null;

function loadNavBarConfig(links) { window.navBarLinksData = Array.isArray(links) ? links : []; }

function renderNavBarLinks() {
  const container = document.getElementById('modal-navLinks-container');
  if (!container) return;
  container.innerHTML = '';
  const links = window.navBarLinksData;
  if (links.length === 0) { container.innerHTML = '<div class="empty-state">暂无导航链接，请点击下方按钮添加</div>'; return; }

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
    header.innerHTML = '<span class="drag-handle">☰</span>' +
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
  item.setAttribute('data-sidebar', sidebar);
  item.setAttribute('data-type', type);
  item.innerHTML = '<span>' + (componentNames[type] || type) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(&quot;' + type + '&quot;, &quot;' + sidebar + '&quot;)">移除</button>';
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

let draggedItem = null;

function handleDragStart(event) {
  draggedItem = event.target;
  draggedItem.style.opacity = '0.5';
  draggedItem.classList.add('dragging');
  event.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(event) {
  draggedItem.style.opacity = '1';
  draggedItem.classList.remove('dragging');
  draggedItem = null;
  document.querySelectorAll('.sidebar-component-item').forEach(item => {
    item.classList.remove('drag-over');
  });
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  const target = event.target.closest('.sidebar-component-item');
  if (target && target !== draggedItem) {
    target.classList.add('drag-over');
  }
}

function handleDrop(event) {
  event.preventDefault();
  const target = event.target.closest('.sidebar-component-item');
  const targetContainer = event.target.closest('.sidebar-components-container');
  
  if (target && draggedItem && targetContainer) {
    const draggedSidebar = draggedItem.dataset.sidebar;
    const targetSidebar = target.dataset.sidebar;
    const draggedType = draggedItem.dataset.type;
    
    if (draggedSidebar !== targetSidebar) {
      const draggedContainer = document.getElementById('sidebar-' + draggedSidebar + '-container');
      draggedItem.remove();
      
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
      
      if (draggedContainer.querySelectorAll('.sidebar-component-item').length === 0) {
        draggedContainer.innerHTML = '<div class="empty-state">暂无组件</div>';
      }
    }
    
    targetContainer.insertBefore(draggedItem, target);
    
    if (targetContainer.querySelector('.empty-state')) {
      targetContainer.querySelector('.empty-state').remove();
    }
  }
  
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
</script>`;
