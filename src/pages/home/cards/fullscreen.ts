export const CARD_ID = 'fullscreen';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('fullscreen')">
    <div class="card-header">
      <div class="card-icon">🌄</div>
      <h3 class="card-title">全屏模式</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">轮播：</span><span class="summary-badge" id="summary-fullscreen-carousel">-</span></div>
      <div class="card-summary-item" id="summary-fullscreen-interval-row"><span class="summary-label">间隔：</span><span class="summary-value" id="summary-fullscreen-interval">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section"><h4>图片设置（支持外链URL）</h4><div class="config-row">
      <div class="config-item" style="grid-column:1/-1"><label>桌面端壁纸（每行一个URL）</label>
        <textarea id="modal-fullscreen-desktop" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(${config}.fullscreenWallpaper?.src?.desktop || []).join('\\n')}</textarea></div>
      <div class="config-item" style="grid-column:1/-1"><label>移动端壁纸（每行一个URL）</label>
        <textarea id="modal-fullscreen-mobile" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(${config}.fullscreenWallpaper?.src?.mobile || []).join('\\n')}</textarea></div>
      <div class="config-item"><label>图片定位</label><select id="modal-fullscreen-position">
        <option value="top"\${${config}.fullscreenWallpaper?.position === 'top' ? ' selected' : ''}>顶部</option>
        <option value="center"\${${config}.fullscreenWallpaper?.position !== 'top' && ${config}.fullscreenWallpaper?.position !== 'bottom' ? ' selected' : ''}>居中</option>
        <option value="bottom"\${${config}.fullscreenWallpaper?.position === 'bottom' ? ' selected' : ''}>底部</option></select></div>
    </div></div>
    <div class="config-section"><h4>轮播设置</h4><div class="config-row">
      <div class="config-item"><label>启用轮播</label><div class="boolean-switch">
        <input type="checkbox" id="modal-fullscreen-carousel"\${${config}.fullscreenWallpaper?.carousel?.enable ? ' checked' : ''}><label for="modal-fullscreen-carousel">自动切换壁纸</label></div></div>
      <div class="config-item"><label>轮播间隔（秒）</label><input type="number" id="modal-fullscreen-interval" min="1" max="60" value="\${${config}.fullscreenWallpaper?.carousel?.interval || 5}"></div>
    </div></div>
    <div class="config-section"><h4>视觉效果</h4><div class="config-row">
      <div class="config-item"><label>层级 (zIndex)</label><input type="number" id="modal-fullscreen-zIndex" min="-10" max="10" value="\${${config}.fullscreenWallpaper?.zIndex || -1}"></div>
      <div class="config-item"><label>透明度</label><input type="number" id="modal-fullscreen-opacity" min="0" max="1" step="0.1" value="\${${config}.fullscreenWallpaper?.opacity || 0.8}"></div>
      <div class="config-item"><label>模糊程度 (px)</label><input type="number" id="modal-fullscreen-blur" min="0" max="20" value="\${${config}.fullscreenWallpaper?.blur || 1}"></div>
    </div></div>`;
}

export const summaryJs = `
  const cb = document.getElementById('summary-fullscreen-carousel');
  if (config.fullscreenWallpaper?.carousel?.enable) {
    cb.textContent = '已启用'; cb.className = 'summary-badge success';
    document.getElementById('summary-fullscreen-interval-row').style.display = 'flex';
    document.getElementById('summary-fullscreen-interval').textContent = (config.fullscreenWallpaper?.carousel?.interval || 5) + '秒';
  } else { cb.textContent = '已关闭'; cb.className = 'summary-badge'; document.getElementById('summary-fullscreen-interval-row').style.display = 'none'; }
`;

export const applyJs = `
  if (id === 'fullscreen') {
    currentConfig.fullscreenWallpaper = {
      src: { desktop: document.getElementById('modal-fullscreen-desktop').value.split('\\n').map(s => s.trim()).filter(s => s), mobile: document.getElementById('modal-fullscreen-mobile').value.split('\\n').map(s => s.trim()).filter(s => s) },
      position: document.getElementById('modal-fullscreen-position').value,
      carousel: { enable: document.getElementById('modal-fullscreen-carousel').checked, interval: parseFloat(document.getElementById('modal-fullscreen-interval').value) },
      zIndex: parseInt(document.getElementById('modal-fullscreen-zIndex').value), opacity: parseFloat(document.getElementById('modal-fullscreen-opacity').value), blur: parseInt(document.getElementById('modal-fullscreen-blur').value)
    };
  }
`;