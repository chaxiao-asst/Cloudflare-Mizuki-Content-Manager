export const CARD_ID = 'sakura';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('sakura')">
    <div class="card-header">
      <div class="card-icon">🌸</div>
      <h3 class="card-title">樱花飘落特效</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">状态：</span><span class="summary-value" id="summary-sakura-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">樱花数量：</span><span class="summary-value" id="summary-sakura-num">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>基础设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用特效</label><div class="boolean-switch">
          <input type="checkbox" id="modal-sakura-enable"\${(${config}.sakuraConfig || {}).enable ? ' checked' : ''}><label for="modal-sakura-enable">启用樱花飘落特效</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>樱花数量</label><input type="number" id="modal-sakura-num" min="1" max="100" value="\${(${config}.sakuraConfig || {}).sakuraNum || 21}"></div>
        <div class="config-item"><label>越界限制次数</label><input type="number" id="modal-sakura-limit" value="\${(${config}.sakuraConfig || {}).limitTimes !== undefined ? ${config}.sakuraConfig.limitTimes : -1}" placeholder="-1为无限循环"></div>
        <div class="config-item"><label>层级 (zIndex)</label><input type="number" id="modal-sakura-zindex" min="1" max="9999" value="\${(${config}.sakuraConfig || {}).zIndex || 100}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>尺寸设置</h4>
      <div class="config-row">
        <div class="config-item"><label>最小尺寸倍数</label><input type="number" id="modal-sakura-size-min" step="0.1" min="0.1" max="2" value="\${(${config}.sakuraConfig || {}).size?.min !== undefined ? ${config}.sakuraConfig.size.min : 0.5}"></div>
        <div class="config-item"><label>最大尺寸倍数</label><input type="number" id="modal-sakura-size-max" step="0.1" min="0.1" max="2" value="\${(${config}.sakuraConfig || {}).size?.max !== undefined ? ${config}.sakuraConfig.size.max : 1.1}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>透明度设置</h4>
      <div class="config-row">
        <div class="config-item"><label>最小不透明度</label><input type="number" id="modal-sakura-opacity-min" step="0.1" min="0" max="1" value="\${(${config}.sakuraConfig || {}).opacity?.min !== undefined ? ${config}.sakuraConfig.opacity.min : 0.3}"></div>
        <div class="config-item"><label>最大不透明度</label><input type="number" id="modal-sakura-opacity-max" step="0.1" min="0" max="1" value="\${(${config}.sakuraConfig || {}).opacity?.max !== undefined ? ${config}.sakuraConfig.opacity.max : 0.9}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>速度设置</h4>
      <div class="config-row">
        <div class="config-item"><label>水平速度最小值</label><input type="number" id="modal-sakura-h-min" step="0.1" value="\${(${config}.sakuraConfig || {}).speed?.horizontal?.min !== undefined ? ${config}.sakuraConfig.speed.horizontal.min : -1.7}"></div>
        <div class="config-item"><label>水平速度最大值</label><input type="number" id="modal-sakura-h-max" step="0.1" value="\${(${config}.sakuraConfig || {}).speed?.horizontal?.max !== undefined ? ${config}.sakuraConfig.speed.horizontal.max : -1.2}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>垂直速度最小值</label><input type="number" id="modal-sakura-v-min" step="0.1" min="0" value="\${(${config}.sakuraConfig || {}).speed?.vertical?.min !== undefined ? ${config}.sakuraConfig.speed.vertical.min : 1.5}"></div>
        <div class="config-item"><label>垂直速度最大值</label><input type="number" id="modal-sakura-v-max" step="0.1" min="0" value="\${(${config}.sakuraConfig || {}).speed?.vertical?.max !== undefined ? ${config}.sakuraConfig.speed.vertical.max : 2.2}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>旋转速度</label><input type="number" id="modal-sakura-rotation" step="0.01" min="0" value="\${(${config}.sakuraConfig || {}).speed?.rotation !== undefined ? ${config}.sakuraConfig.speed.rotation : 0.03}"></div>
        <div class="config-item"><label>消失速度</label><input type="number" id="modal-sakura-fade" step="0.01" min="0" max="1" value="\${(${config}.sakuraConfig || {}).speed?.fadeSpeed !== undefined ? ${config}.sakuraConfig.speed.fadeSpeed : 0.03}"></div>
      </div>
    </div>`;
}

export const summaryJs = `
  const sakura = config.sakuraConfig;
  if (sakura) {
    document.getElementById('summary-sakura-enable').textContent = sakura.enable ? '已启用' : '已禁用';
    document.getElementById('summary-sakura-num').textContent = sakura.sakuraNum !== undefined ? sakura.sakuraNum : '未设置';
  } else {
    document.getElementById('summary-sakura-enable').textContent = '未配置';
    document.getElementById('summary-sakura-num').textContent = '-';
  }
`;

export const applyJs = `
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
`;