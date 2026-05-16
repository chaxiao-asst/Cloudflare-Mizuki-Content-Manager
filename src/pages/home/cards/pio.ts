export const CARD_ID = 'pio';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('pio')">
    <div class="card-header">
      <div class="card-icon">💬</div>
      <h3 class="card-title">Live2D 看板娘</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">状态：</span><span class="summary-value" id="summary-pio-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">位置：</span><span class="summary-value" id="summary-pio-position">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>基础设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用看板娘</label><div class="boolean-switch">
          <input type="checkbox" id="modal-pio-enable"\${(${config}.pioConfig || {}).enable ? ' checked' : ''}><label for="modal-pio-enable">启用 Live2D 看板娘</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>位置</label><select id="modal-pio-position">
          <option value="left"\${(${config}.pioConfig || {}).position === 'left' ? ' selected' : ''}>左侧</option>
          <option value="right"\${(${config}.pioConfig || {}).position === 'right' ? ' selected' : ''}>右侧</option></select></div>
        <div class="config-item"><label>模式</label><select id="modal-pio-mode">
          <option value="draggable"\${(${config}.pioConfig || {}).mode === 'draggable' ? ' selected' : ''}>可拖拽</option>
          <option value="fixed"\${(${config}.pioConfig || {}).mode === 'fixed' ? ' selected' : ''}>固定位置</option></select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>宽度</label><input type="number" id="modal-pio-width" min="100" max="500" value="\${(${config}.pioConfig || {}).width || 280}"></div>
        <div class="config-item"><label>高度</label><input type="number" id="modal-pio-height" min="100" max="500" value="\${(${config}.pioConfig || {}).height || 250}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>移动端隐藏</label><div class="boolean-switch">
          <input type="checkbox" id="modal-pio-mobile"\${(${config}.pioConfig || {}).hiddenOnMobile ? ' checked' : ''}><label for="modal-pio-mobile">在移动设备上隐藏看板娘</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>模型路径</h4>
      <div class="config-row">
        <div class="config-item" style="width:100%;"><label>模型路径（JSON格式）</label><input type="text" id="modal-pio-models" value="\${escAttr((${config}.pioConfig || {}).models?.join(', ') || '/pio/models/pio/model.json')}" placeholder="多个路径用逗号分隔"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">将模型文件放置在 public/pio/models/ 目录下</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>对话设置</h4>
      <div class="config-row">
        <div class="config-item" style="width:100%;"><label>欢迎词</label><input type="text" id="modal-pio-welcome" value="\${escAttr((${config}.pioConfig || {}).dialog?.welcome || '')}" placeholder="欢迎访问我的网站！"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>首页提示</label><input type="text" id="modal-pio-home" value="\${escAttr((${config}.pioConfig || {}).dialog?.home || '')}" placeholder="点击返回首页"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>关闭提示</label><input type="text" id="modal-pio-close" value="\${escAttr((${config}.pioConfig || {}).dialog?.close || '')}" placeholder="下次再见~"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>关于链接</label><input type="text" id="modal-pio-link" value="\${escAttr((${config}.pioConfig || {}).dialog?.link || '')}" placeholder="https://"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>触摸提示（每行一个）</label><textarea id="modal-pio-touch" rows="4" placeholder="每行一个提示，如：你在干什么？">\${((${config}.pioConfig || {}).dialog?.touch || []).join('\\n')}</textarea></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="width:100%;"><label>换装提示（每行一个）</label><textarea id="modal-pio-skin" rows="2" placeholder="每行一个提示，如：想看看我的新衣服吗？">\${((${config}.pioConfig || {}).dialog?.skin || []).join('\\n')}</textarea></div>
      </div>
    </div>`;
}

export const summaryJs = `
  const pio = config.pioConfig;
  if (pio) {
    document.getElementById('summary-pio-enable').textContent = pio.enable ? '已启用' : '已禁用';
    document.getElementById('summary-pio-position').textContent = pio.position === 'left' ? '左侧' : (pio.position === 'right' ? '右侧' : pio.position || '-');
  } else {
    document.getElementById('summary-pio-enable').textContent = '未配置';
    document.getElementById('summary-pio-position').textContent = '-';
  }
`;

export const applyJs = `
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
`;