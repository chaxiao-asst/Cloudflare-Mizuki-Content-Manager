export const CARD_ID = 'featurePages';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('featurePages')">
    <div class="card-header">
      <div class="card-icon">📑</div>
      <h3 class="card-title">特色页面</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">已启用：</span><span class="summary-value" id="summary-featurePages-count">0</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section"><div class="feature-pages-grid">
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-anime"\${${config}.featurePages?.anime ? ' checked' : ''}><label for="modal-fp-anime">番剧页面</label></div></div>
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-diary"\${${config}.featurePages?.diary ? ' checked' : ''}><label for="modal-fp-diary">日记页面</label></div></div>
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-friends"\${${config}.featurePages?.friends ? ' checked' : ''}><label for="modal-fp-friends">友链页面</label></div></div>
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-projects"\${${config}.featurePages?.projects ? ' checked' : ''}><label for="modal-fp-projects">项目页面</label></div></div>
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-skills"\${${config}.featurePages?.skills ? ' checked' : ''}><label for="modal-fp-skills">技能页面</label></div></div>
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-timeline"\${${config}.featurePages?.timeline ? ' checked' : ''}><label for="modal-fp-timeline">时间线页面</label></div></div>
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-albums"\${${config}.featurePages?.albums ? ' checked' : ''}><label for="modal-fp-albums">相册页面</label></div></div>
      <div class="feature-page-item"><div class="boolean-switch"><input type="checkbox" id="modal-fp-devices"\${${config}.featurePages?.devices ? ' checked' : ''}><label for="modal-fp-devices">设备页面</label></div></div>
    </div></div>`;
}

export const summaryJs = `
  const featurePages = config.featurePages || {};
  const enabledCount = Object.values(featurePages).filter(v => v).length;
  document.getElementById('summary-featurePages-count').textContent = enabledCount + ' / 8';
`;

export const applyJs = `
  if (id === 'featurePages') {
    currentConfig.featurePages = { anime: document.getElementById('modal-fp-anime').checked, diary: document.getElementById('modal-fp-diary').checked, friends: document.getElementById('modal-fp-friends').checked, projects: document.getElementById('modal-fp-projects').checked, skills: document.getElementById('modal-fp-skills').checked, timeline: document.getElementById('modal-fp-timeline').checked, albums: document.getElementById('modal-fp-albums').checked, devices: document.getElementById('modal-fp-devices').checked };
  }
`;