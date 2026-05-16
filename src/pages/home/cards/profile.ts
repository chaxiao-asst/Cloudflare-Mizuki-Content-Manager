export const CARD_ID = 'profile';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('profile')">
    <div class="card-header">
      <div class="card-icon">👤</div>
      <h3 class="card-title">个人资料</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">名称：</span><span class="summary-value" id="summary-profile-name">-</span></div>
      <div class="card-summary-item"><span class="summary-label">链接数：</span><span class="summary-value" id="summary-profile-links">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>基本信息</h4>
      <p style="font-size:12px;margin-bottom:8px;">头像支持本地路径或在线链接（https://）</p>
      <div class="config-row">
        <div class="config-item"><label>头像</label><input type="text" id="modal-profile-avatar" value="\${escAttr((${config}.profileConfig || {}).avatar)}" placeholder="assets/images/avatar.webp 或 https://example.com/avatar.webp"></div>
        <div class="config-item"><label>名称</label><input type="text" id="modal-profile-name" value="\${escAttr((${config}.profileConfig || {}).name)}" placeholder="您的名称"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="grid-column:1/-1"><label>个人简介</label>
          <textarea id="modal-profile-bio" rows="3" style="width:100%;padding:10px;border-radius:8px;font-size:14px;">\${escAttr((${config}.profileConfig || {}).bio)}</textarea>
        </div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>打字机效果</h4>
      <div class="config-row">
        <div class="config-item"><label>启用打字机效果</label><div class="boolean-switch">
          <input type="checkbox" id="modal-profile-typewriter"\${(${config}.profileConfig || {}).typewriter?.enable !== false ? ' checked' : ''}><label for="modal-profile-typewriter">逐字显示个人简介</label></div></div>
        <div class="config-item"><label>打字速度（毫秒）</label><input type="number" id="modal-profile-typeSpeed" min="10" max="500" value="\${(${config}.profileConfig || {}).typewriter?.speed || 80}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>布局设置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-profile-position">
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'profile')?.position === 'top' || !((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'profile') ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'profile')?.position === 'sticky' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-profile-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'profile')?.animationDelay || 0}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>社交媒体链接</h4>
      <p style="font-size:12px;margin-bottom:12px;">添加您的社交媒体链接，图标使用 Iconify 格式</p>
      <div id="profile-links-container">
        \${((${config}.profileConfig || {}).links || []).map((link, idx) => \`<div class="nav-child-item">
      <div class="form-grid">
        <div class="form-group"><label>链接名称</label><input type="text" class="profile-link-name" data-idx="\${idx}" value="\${escAttr(link.name)}" placeholder="如: GitHub"></div>
        <div class="form-group"><label>图标 iconify 图标集格式</label><input type="text" class="profile-link-icon" data-idx="\${idx}" value="\${escAttr(link.icon)}" placeholder="图标集:图标名 (如 material-symbols:home)"></div>
        <div class="form-group"><label>URL</label><input type="text" class="profile-link-url" data-idx="\${idx}" value="\${escAttr(link.url)}" placeholder="https://"></div>
      </div>
      <button type="button" class="btn-danger btn-sm" onclick="removeProfileLink(\${idx})">移除</button>
    </div>\`).join('') || '<div class="empty-state">暂无链接</div>'}
      </div>
      <div style="margin-top:12px;">
        <button type="button" class="btn-primary" onclick="addProfileLink()">+ 添加链接</button>
      </div>
    </div>`;
}

export const summaryJs = `
  const pf = config.profileConfig;
  if (pf) {
    document.getElementById('summary-profile-name').textContent = pf.name || '未设置';
    document.getElementById('summary-profile-links').textContent = (pf.links || []).length + ' 个链接';
  } else {
    document.getElementById('summary-profile-name').textContent = '未配置';
    document.getElementById('summary-profile-links').textContent = '0 个链接';
  }
`;

export const applyJs = `
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
`;