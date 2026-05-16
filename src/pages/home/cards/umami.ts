export const CARD_ID = 'umami';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('umami')">
    <div class="card-header">
      <div class="card-icon">📈</div>
      <h3 class="card-title">Umami 统计</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">分享链接：</span><span class="summary-value" id="summary-umami-url">-</span></div>
      <div class="card-summary-item"><span class="summary-label">网站ID：</span><span class="summary-value" id="summary-umami-id">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>Umami 统计配置</h4>
      <div class="config-row">
        <div class="config-item" style="width:100%;"><label>分享链接 (shareUrl)</label><input type="text" id="modal-umami-share" value="\${escAttr((${config}.umamiConfig || {}).shareUrl || '')}" placeholder="https://cloud.umami.is/analytics/us/share/..."></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>跟踪脚本地址 (scriptUrl)</label><input type="text" id="modal-umami-script" value="\${escAttr((${config}.umamiConfig || {}).scriptUrl || '')}" placeholder="https://analytics.umami.is/script.js"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>网站 ID (websiteId)</label><input type="text" id="modal-umami-id" value="\${escAttr((${config}.umamiConfig || {}).websiteId || '')}" placeholder="your-website-id"></div>
      </div>
      <p style="font-size:12px;margin-top:12px;">提示：如果使用 Umami Cloud，分享链接需要先在浏览器中访问一次，复制重定向后的最终地址。</p>
      <p style="font-size:12px;margin-top:4px;">设置 shareUrl 为 false 可禁用组件的访问量显示，但不影响统计功能。</p>
    </div>`;
}

export const summaryJs = `
  const umami = config.umamiConfig;
  if (umami) {
    document.getElementById('summary-umami-url').textContent = umami.shareUrl ? '已配置' : '未配置';
    document.getElementById('summary-umami-id').textContent = umami.websiteId ? '已配置' : '未配置';
  } else {
    document.getElementById('summary-umami-url').textContent = '未配置';
    document.getElementById('summary-umami-id').textContent = '-';
  }
`;

export const applyJs = `
  if (id === 'umami') {
    currentConfig.umamiConfig = {
      shareUrl: document.getElementById('modal-umami-share').value || '',
      scriptUrl: document.getElementById('modal-umami-script').value || '',
      websiteId: document.getElementById('modal-umami-id').value || ''
    };
  }
`;