export const CARD_ID = 'announcement';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('announcement')">
    <div class="card-header">
      <div class="card-icon">📢</div>
      <h3 class="card-title">公告配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">标题：</span><span class="summary-value" id="summary-announcement-title">-</span></div>
      <div class="card-summary-item"><span class="summary-label">可关闭：</span><span class="summary-value" id="summary-announcement-closable">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>公告内容</h4>
      <div class="config-row">
        <div class="config-item"><label>公告标题</label><input type="text" id="modal-announcement-title" value="\${escAttr((${config}.announcementConfig || {}).title)}" placeholder="如: 网站公告"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="grid-column:1/-1"><label>公告内容</label>
          <textarea id="modal-announcement-content" rows="4" style="width:100%;padding:10px;border-radius:8px;font-size:14px;">\${escAttr((${config}.announcementConfig || {}).content)}</textarea>
        </div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>允许关闭</label><div class="boolean-switch">
          <input type="checkbox" id="modal-announcement-closable"\${(${config}.announcementConfig || {}).closable !== false ? ' checked' : ''}><label for="modal-announcement-closable">显示关闭按钮</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>链接设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用链接</label><div class="boolean-switch">
          <input type="checkbox" id="modal-announcement-linkEnable"\${(${config}.announcementConfig || {}).link?.enable ? ' checked' : ''}><label for="modal-announcement-linkEnable">在公告中显示链接</label></div></div>
      </div>
      <div id="modal-announcement-linkFields" style="margin-top:12px;">
        <div class="config-row">
          <div class="config-item"><label>链接文本</label><input type="text" id="modal-announcement-linkText" value="\${escAttr((${config}.announcementConfig || {}).link?.text || '')}" placeholder="如: 查看详情"></div>
          <div class="config-item"><label>链接URL</label><input type="text" id="modal-announcement-linkUrl" value="\${escAttr((${config}.announcementConfig || {}).link?.url || '')}" placeholder="https://"></div>
          <div class="config-item"><label>外部链接</label><div class="boolean-switch">
            <input type="checkbox" id="modal-announcement-linkExternal"\${(${config}.announcementConfig || {}).link?.external ? ' checked' : ''}><label for="modal-announcement-linkExternal">在新标签页打开</label></div></div>
        </div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>布局设置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-announcement-position">
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'announcement')?.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'announcement')?.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-announcement-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'announcement')?.animationDelay || 50}"></div>
      </div>
    </div>`;
}

export const summaryJs = `
  const an = config.announcementConfig;
  if (an) {
    document.getElementById('summary-announcement-title').textContent = an.title || '未设置';
    document.getElementById('summary-announcement-closable').textContent = an.closable ? '是' : '否';
  } else {
    document.getElementById('summary-announcement-title').textContent = '未配置';
    document.getElementById('summary-announcement-closable').textContent = '-';
  }
`;

export const applyJs = `
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
`;