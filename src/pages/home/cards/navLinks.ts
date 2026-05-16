export const CARD_ID = 'navLinks';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('navLinks')">
    <div class="card-header">
      <div class="card-icon">🔗</div>
      <h3 class="card-title">导航栏</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">链接数：</span><span class="summary-value" id="summary-navLinks-count">0</span></div>
    </div>
  </div>`;
}

export function modalHtml(_config: string): string {
  return `<div class="config-section">
      <p style="font-size:13px;margin-bottom:12px;">配置博客顶部导航栏的链接结构，支持拖拽排序</p>
      <div id="modal-navLinks-container"></div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
        <button type="button" class="btn-primary" onclick="addNavLink()">+ 添加链接</button>
        <button type="button" class="btn-primary" onclick="addNavPreset('Home')">+ 首页预设</button>
        <button type="button" class="btn-primary" onclick="addNavPreset('Archive')">+ 归档预设</button>
      </div>
    </div>`;
}

export const summaryJs = `
  document.getElementById('summary-navLinks-count').textContent = (config.navBarLinks || []).length;
`;

export const applyJs = `
  if (id === 'navLinks') { currentConfig.navBarLinks = collectNavBarLinks(); }
`;