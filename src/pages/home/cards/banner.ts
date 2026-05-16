export const CARD_ID = 'banner';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('banner')">
    <div class="card-header">
      <div class="card-icon">🎨</div>
      <h3 class="card-title">横幅模式</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">主标题：</span><span class="summary-value" id="summary-banner-title">-</span></div>
      <div class="card-summary-item"><span class="summary-label">打字机效果：</span><span class="summary-badge" id="summary-banner-typewriter">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section"><h4>图片设置（支持外链URL）</h4><div class="config-row">
      <div class="config-item" style="grid-column:1/-1"><label>桌面端横幅图片（每行一个URL）</label>
        <textarea id="modal-banner-desktop" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(${config}.banner?.src?.desktop || []).join('\\n')}</textarea></div>
      <div class="config-item" style="grid-column:1/-1"><label>移动端横幅图片（每行一个URL）</label>
        <textarea id="modal-banner-mobile" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(${config}.banner?.src?.mobile || []).join('\\n')}</textarea></div>
      <div class="config-item"><label>图片定位</label><select id="modal-banner-position">
        <option value="top"\${${config}.banner?.position === 'top' ? ' selected' : ''}>顶部</option>
        <option value="center"\${${config}.banner?.position !== 'top' && ${config}.banner?.position !== 'bottom' ? ' selected' : ''}>居中</option>
        <option value="bottom"\${${config}.banner?.position === 'bottom' ? ' selected' : ''}>底部</option></select></div>
    </div></div>
    <div class="config-section"><h4>轮播设置</h4><div class="config-row">
      <div class="config-item"><label>启用轮播</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-carousel"\${${config}.banner?.carousel?.enable ? ' checked' : ''}><label for="modal-banner-carousel">自动切换图片</label></div></div>
      <div class="config-item"><label>轮播间隔（秒）</label><input type="number" id="modal-banner-interval" min="1" max="60" value="\${${config}.banner?.carousel?.interval || 3}"></div>
    </div></div>
    <div class="config-section"><h4>水波纹效果</h4><div class="config-row">
      <div class="config-item"><label>启用水波纹</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-waves"\${${config}.banner?.waves?.enable ? ' checked' : ''}><label for="modal-banner-waves">显示水波纹动画</label></div></div>
      <div class="config-item"><label>性能模式</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-wavesPerf"\${${config}.banner?.waves?.performanceMode ? ' checked' : ''}><label for="modal-banner-wavesPerf">减少动画复杂度</label></div></div>
      <div class="config-item"><label>移动端禁用</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-wavesMobile"\${${config}.banner?.waves?.mobileDisable ? ' checked' : ''}><label for="modal-banner-wavesMobile">移动端不显示</label></div></div>
    </div></div>
    <div class="config-section"><h4>主页文本</h4><div class="config-row">
      <div class="config-item"><label>显示文本</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-textEnable"\${${config}.banner?.homeText?.enable ? ' checked' : ''}><label for="modal-banner-textEnable">在横幅上显示文本</label></div></div>
      <div class="config-item"><label>主标题（支持中文）</label><input type="text" id="modal-banner-textTitle" value="\${escAttr(${config}.banner?.homeText?.title)}" placeholder="支持中文标题"></div>
      <div class="config-item" style="grid-column:1/-1"><label>副标题（每行一个，支持中文）</label>
        <textarea id="modal-banner-textSubtitle" rows="4" style="width:100%;padding:8px 12px;border-radius:6px;font-size:14px;resize:vertical">\${(${config}.banner?.homeText?.subtitle || []).join('\\n')}</textarea></div>
    </div>
    <div class="config-row" style="margin-top:8px;">
      <div class="config-item"><label>启用打字机效果</label><div class="boolean-switch">
        <input type="checkbox" id="modal-banner-typewriter"\${${config}.banner?.homeText?.typewriter?.enable ? ' checked' : ''}><label for="modal-banner-typewriter">逐字显示副标题</label></div></div>
      <div class="config-item"><label>打字速度（毫秒）</label><input type="number" id="modal-banner-typeSpeed" min="10" max="500" value="\${${config}.banner?.homeText?.typewriter?.speed || 100}"></div>
      <div class="config-item"><label>删除速度（毫秒）</label><input type="number" id="modal-banner-typeDeleteSpeed" min="10" max="200" value="\${${config}.banner?.homeText?.typewriter?.deleteSpeed || 50}"></div>
      <div class="config-item"><label>暂停时间（毫秒）</label><input type="number" id="modal-banner-typePauseTime" min="500" max="5000" value="\${${config}.banner?.homeText?.typewriter?.pauseTime || 2000}"></div>
    </div></div>
    <div class="config-section"><h4>导航栏透明模式</h4><div class="config-row">
      <div class="config-item"><label>透明模式</label><select id="modal-banner-navbarTransparent">
        <option value="semi"\${${config}.banner?.navbar?.transparentMode === 'semi' ? ' selected' : ''}>半透明</option>
        <option value="full"\${${config}.banner?.navbar?.transparentMode === 'full' ? ' selected' : ''}>完全透明</option>
        <option value="semifull"\${${config}.banner?.navbar?.transparentMode !== 'semi' && ${config}.banner?.navbar?.transparentMode !== 'full' ? ' selected' : ''}>动态透明</option></select></div>
    </div></div>`;
}

export const summaryJs = `
  document.getElementById('summary-banner-title').textContent = config.banner?.homeText?.title || '-';
  const tw = document.getElementById('summary-banner-typewriter');
  if (config.banner?.homeText?.typewriter?.enable) { tw.textContent = '已启用'; tw.className = 'summary-badge success'; }
  else { tw.textContent = '已关闭'; tw.className = 'summary-badge'; }
`;

export const applyJs = `
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
`;