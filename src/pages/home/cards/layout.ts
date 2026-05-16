export const CARD_ID = 'layout';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('layout')">
    <div class="card-header">
      <div class="card-icon">📐</div>
      <h3 class="card-title">布局</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">布局：</span><span class="summary-value" id="summary-layout-mode">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>首页布局</h4>
      <div class="config-row">
        <div class="config-item"><label>默认布局模式</label><select id="modal-layout-mode">
          <option value="list"\${${config}.postListLayout?.defaultMode !== 'grid' ? ' selected' : ''}>列表模式（单列）</option>
          <option value="grid"\${${config}.postListLayout?.defaultMode === 'grid' ? ' selected' : ''}>网格模式（双列）</option></select></div>
        <div class="config-item"><label>允许用户切换布局</label><div class="boolean-switch">
          <input type="checkbox" id="modal-layout-allowSwitch"\${${config}.postListLayout?.allowSwitch ? ' checked' : ''}><label for="modal-layout-allowSwitch">启用切换</label></div></div>
        <div class="config-item"><label>使用新标签样式</label><div class="boolean-switch">
          <input type="checkbox" id="modal-layout-tagNewStyle"\${${config}.tagStyle?.useNewStyle ? ' checked' : ''}><label for="modal-layout-tagNewStyle">悬停高亮样式</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>整体布局</h4>
      <div class="config-row">
        <div class="config-item"><label>默认壁纸模式</label><select id="modal-wallpaper-mode">
          <option value="banner"\${${config}.wallpaperMode?.defaultMode !== 'fullscreen' && ${config}.wallpaperMode?.defaultMode !== 'none' ? ' selected' : ''}>顶部横幅</option>
          <option value="fullscreen"\${${config}.wallpaperMode?.defaultMode === 'fullscreen' ? ' selected' : ''}>全屏壁纸</option>
          <option value="none"\${${config}.wallpaperMode?.defaultMode === 'none' ? ' selected' : ''}>无壁纸</option></select></div>
        <div class="config-item"><label>布局切换按钮显示</label><select id="modal-wallpaper-showSwitch">
          <option value="off"\${${config}.wallpaperMode?.showModeSwitchOnMobile === 'off' ? ' selected' : ''}>不显示</option>
          <option value="mobile"\${${config}.wallpaperMode?.showModeSwitchOnMobile === 'mobile' ? ' selected' : ''}>仅移动端</option>
          <option value="desktop"\${${config}.wallpaperMode?.showModeSwitchOnMobile === 'desktop' ? ' selected' : ''}>仅桌面端</option>
          <option value="both"\${${config}.wallpaperMode?.showModeSwitchOnMobile === 'both' ? ' selected' : ''}>所有设备</option></select></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>页面自动缩放</h4>
      <div class="config-row">
        <div class="config-item"><label>启用自动缩放</label><div class="boolean-switch">
          <input type="checkbox" id="modal-scaling-enable"\${${config}.pageScaling?.enable ? ' checked' : ''}><label for="modal-scaling-enable">开启页面自动缩放功能</label></div></div>
        <div class="config-item"><label>目标宽度 (px)</label><input type="number" id="modal-scaling-targetWidth" min="1000" max="4000" value="\${${config}.pageScaling?.targetWidth || 2000}">
          <p style="font-size:12px;margin-top:6px;">当页面宽度低于此值时开始缩放</p></div>
      </div>
    </div>`;
}

export const summaryJs = `
  const layoutMode = config.postListLayout?.defaultMode || 'list';
  document.getElementById('summary-layout-mode').textContent = layoutMode === 'list' ? '列表模式' : '网格模式';
`;

export const applyJs = `
  if (id === 'layout') {
    const existingLayout = currentConfig.postListLayout || {};
    currentConfig.postListLayout = { defaultMode: document.getElementById('modal-layout-mode').value, allowSwitch: document.getElementById('modal-layout-allowSwitch').checked, categoryBar: existingLayout.categoryBar || { enable: true } };
    currentConfig.tagStyle = { useNewStyle: document.getElementById('modal-layout-tagNewStyle').checked };
  }
  if (id === 'wallpaper') {
    currentConfig.wallpaperMode = { defaultMode: document.getElementById('modal-wallpaper-mode').value, showModeSwitchOnMobile: document.getElementById('modal-wallpaper-showSwitch').value };
  }
  if (id === 'pageScaling') { currentConfig.pageScaling = { enable: document.getElementById('modal-scaling-enable').checked, targetWidth: parseInt(document.getElementById('modal-scaling-targetWidth').value) }; }
`;