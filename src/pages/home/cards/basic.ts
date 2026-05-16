export const CARD_ID = 'basic';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('basic')">
    <div class="card-header">
      <div class="card-icon">📋</div>
      <h3 class="card-title">基础信息</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">标题：</span><span class="summary-value" id="summary-basic-title">-</span></div>
      <div class="card-summary-item"><span class="summary-label">副标题：</span><span class="summary-value" id="summary-basic-subtitle">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>站点基本信息</h4>
      <div class="config-row">
        <div class="config-item"><label>网站标题</label><input type="text" id="modal-basic-title" value="\${escAttr(${config}.title)}"></div>
        <div class="config-item"><label>网站副标题</label><input type="text" id="modal-basic-subtitle" value="\${escAttr(${config}.subtitle)}"></div>
        <div class="config-item"><label>站点URL</label><input type="text" id="modal-basic-siteURL" value="\${escAttr(${config}.siteURL)}"></div>
        <div class="config-item"><label>站点开始日期</label><input type="date" id="modal-basic-siteStartDate" value="\${${config}.siteStartDate || ''}"></div>
        <div class="config-item"><label>语言</label><select id="modal-basic-lang">
          <option value="zh_CN"\${${config}.lang === 'zh_CN' ? ' selected' : ''}>简体中文</option>
          <option value="zh_TW"\${${config}.lang === 'zh_TW' ? ' selected' : ''}>繁体中文</option>
          <option value="en"\${${config}.lang === 'en' ? ' selected' : ''}>English</option>
          <option value="ja"\${${config}.lang === 'ja' ? ' selected' : ''}>日本語</option></select></div>
        <div class="config-item"><label>时区</label><select id="modal-basic-timeZone">
          \${Array.from({length: 25}, (_, i) => i - 12).map(tz => '<option value="' + tz + '"' + (parseInt(${config}.timeZone) === tz ? ' selected' : '') + '>UTC' + (tz >= 0 ? '+' : '') + tz + '</option>').join('')}</select></div>
        <div class="config-item"><label>主题色相</label><input type="number" id="modal-basic-themeHue" min="0" max="360" value="\${${config}.themeColor?.hue || ''}"></div>
        <div class="config-item"><label>固定主题色</label><div class="boolean-switch">
          <input type="checkbox" id="modal-basic-themeFixed"\${${config}.themeColor?.fixed ? ' checked' : ''}><label for="modal-basic-themeFixed">隐藏主题色选择器</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>Logo配置</h4>
      <div class="config-row">
        <div class="config-item"><label>显示模式</label><select id="modal-navbar-mode">
          <option value="text-icon"\${${config}.navbarTitle?.mode !== 'logo' ? ' selected' : ''}>图标+文本</option>
          <option value="logo"\${${config}.navbarTitle?.mode === 'logo' ? ' selected' : ''}>仅显示Logo</option></select></div>
        <div class="config-item"><label>标题文本</label><input type="text" id="modal-navbar-text" value="\${escAttr(${config}.navbarTitle?.text)}" placeholder="支持中文"></div>
        <div class="config-item"><label>图标路径（支持外链）</label><input type="url" id="modal-navbar-icon" value="\${escAttr(${config}.navbarTitle?.icon)}" placeholder="图标名或外链URL"></div>
        <div class="config-item"><label>Logo路径（支持外链）</label><input type="url" id="modal-navbar-logo" value="\${escAttr(${config}.navbarTitle?.logo)}" placeholder="Logo图片外链URL" oninput="updateFaviconPreview()"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>网站图标 (Favicon)</h4>
      <p style="font-size:12px;color:#888;margin-bottom:10px;">网站图标将自动使用上方配置的 Logo 路径</p>
      <div style="display:flex;align-items:center;gap:12px;">
        <div id="modal-favicon-preview" style="width:32px;height:32px;border-radius:6px;overflow:hidden;border:1px solid #e0e0e0;display:flex;align-items:center;justify-content:center;background:#f5f5f5;">
          \${${config}.navbarTitle?.logo ? '<img src="' + escAttr(${config}.navbarTitle.logo) + '" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.innerHTML=\\\\'⚠️\\\\'">' : '<span style="font-size:16px;">🌐</span>'}
        </div>
        <span id="modal-favicon-text" style="font-size:13px;color:#666;">\${${config}.navbarTitle?.logo ? '已设置网站图标' : '未设置 — 将使用默认图标'}</span>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>页脚配置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用页脚</label><div class="boolean-switch">
          <input type="checkbox" id="modal-footer-enable"\${${config}.footer?.enable ? ' checked' : ''}><label for="modal-footer-enable">启用页脚</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item" style="grid-column:1/-1"><label>页脚内容 (HTML)</label>
          <textarea id="modal-footer-customHtml" rows="6" placeholder="例如: &lt;p&gt;备案号：&lt;a href='https://beian.miit.gov.cn/'&gt;粤ICP备2023000000号&lt;/a&gt;&lt;/p&gt;" style="width:100%;padding:10px;border-radius:6px;font-size:14px;font-family:monospace;">\${${config}.footer?.customHtml || ''}</textarea>
        </div>
      </div>
    </div>`;
}

export const summaryJs = `
  document.getElementById('summary-basic-title').textContent = config.title || '-';
  document.getElementById('summary-basic-subtitle').textContent = config.subtitle || '-';
`;

export const applyJs = `
  if (id === 'basic') {
    currentConfig.title = document.getElementById('modal-basic-title').value;
    currentConfig.subtitle = document.getElementById('modal-basic-subtitle').value;
    currentConfig.siteURL = document.getElementById('modal-basic-siteURL').value;
    currentConfig.siteStartDate = document.getElementById('modal-basic-siteStartDate').value;
    currentConfig.lang = document.getElementById('modal-basic-lang').value;
    currentConfig.timeZone = parseInt(document.getElementById('modal-basic-timeZone').value);
    currentConfig.themeColor = { hue: parseInt(document.getElementById('modal-basic-themeHue').value), fixed: document.getElementById('modal-basic-themeFixed').checked };
    if (currentConfig.diaryApiUrl === undefined) currentConfig.diaryApiUrl = '';
    currentConfig.navbarTitle = { mode: document.getElementById('modal-navbar-mode').value, text: document.getElementById('modal-navbar-text').value, icon: document.getElementById('modal-navbar-icon').value, logo: document.getElementById('modal-navbar-logo').value };
    currentConfig.footer = { enable: document.getElementById('modal-footer-enable').checked, customHtml: document.getElementById('modal-footer-customHtml').value };
    const logoVal = document.getElementById('modal-navbar-logo').value;
    currentConfig.favicon = logoVal ? [{ src: logoVal }] : [];
  }
`;