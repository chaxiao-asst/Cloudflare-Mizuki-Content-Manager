export const CARD_ID = 'anime';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('anime')">
    <div class="card-header">
      <div class="card-icon">📺</div>
      <h3 class="card-title">番剧配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">数据模式：</span><span class="summary-value" id="summary-anime-mode">-</span></div>
      <div class="card-summary-item" id="summary-anime-bangumi-row" style="display:none"><span class="summary-label">Bangumi用户：</span><span class="summary-value" id="summary-anime-bangumi">-</span></div>
      <div class="card-summary-item" id="summary-anime-bilibili-row" style="display:none"><span class="summary-label">Bilibili用户：</span><span class="summary-value" id="summary-anime-bilibili">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section"><div class="config-row">
      <div class="config-item" style="grid-column:1/-1"><label>数据模式</label>
        <select id="modal-anime-mode" style="width:100%;padding:10px;border-radius:8px;">
          <option value="local"\${${config}.anime?.mode === 'local' ? ' selected' : ''}>本地模式 - 手动管理番剧数据</option>
          <option value="bangumi"\${${config}.anime?.mode === 'bangumi' ? ' selected' : ''}>Bangumi模式 - 自动从Bangumi API同步</option>
          <option value="bilibili"\${${config}.anime?.mode === 'bilibili' ? ' selected' : ''}>Bilibili模式 - 自动从Bilibili API同步</option>
        </select>
        <p style="font-size:12px;margin-top:6px;">选择番剧数据来源：本地手动管理、Bangumi自动同步或Bilibili自动同步观看记录</p>
      </div>
    </div>
    <div class="config-section" style="margin-top:16px;padding:16px;border-radius:8px;">
      <h4 style="margin:0 0 12px 0;">Bangumi 配置</h4>
      <div class="config-row">
        <div class="config-item"><label>Bangumi用户ID</label><input type="text" id="modal-anime-bangumiId" value="\${${config}.anime?.bangumi?.userId || ''}" placeholder="例如: 12345 或 sai">
          <p style="font-size:12px;margin-top:6px;">访问 https://bgm.tv 登录 → 个人主页 → URL 中数字部分即为用户 ID</p></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:16px;padding:16px;border-radius:8px;">
      <h4 style="margin:0 0 12px 0;">Bilibili 配置</h4>
      <div class="config-row">
        <div class="config-item"><label>Bilibili用户ID (vmid)</label><input type="text" id="modal-anime-bilibiliVmid" value="\${${config}.anime?.bilibili?.vmid || ''}" placeholder="例如: 1129280784">
          <p style="font-size:12px;margin-top:6px;">访问 https://space.bilibili.com 登录 → 个人空间 → URL 中数字部分即为用户 ID</p></div>
        <div class="config-item"><label>开发环境获取数据</label><div class="boolean-switch">
          <input type="checkbox" id="modal-anime-fetchOnDev"\${${config}.anime?.bilibili?.fetchOnDev ? ' checked' : ''}><label for="modal-anime-fetchOnDev">在开发环境获取数据</label></div>
          <p style="font-size:12px;margin-top:6px;">建议保持关闭，避免开发时频繁请求 API</p></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>封面镜像源</label><input type="text" id="modal-anime-coverMirror" value="\${${config}.anime?.bilibili?.coverMirror || ''}" placeholder="如: https://images.weserv.nl/?url=">
          <p style="font-size:12px;margin-top:6px;">可选，用于加速封面图片加载</p></div>
        <div class="config-item"><label>使用WebP格式</label><div class="boolean-switch">
          <input type="checkbox" id="modal-anime-useWebp"\${(${config}.anime?.bilibili?.useWebp !== undefined ? ${config}.anime.bilibili.useWebp : true) ? ' checked' : ''}><label for="modal-anime-useWebp">使用WebP格式</label></div>
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
    </div></div>`;
}

export const summaryJs = `
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
`;

export const applyJs = `
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
`;