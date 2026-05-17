export const CARD_ID = 'categories';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('categories')">
    <div class="card-header">
      <div class="card-icon">📁</div>
      <h3 class="card-title">组件</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">定位方式：</span><span class="summary-value" id="summary-categories-position">-</span></div>
      <div class="card-summary-item"><span class="summary-label">折叠阈值：</span><span class="summary-value" id="summary-categories-threshold">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>分类组件配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-categories-position">
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'categories')?.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'categories')?.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-categories-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'categories')?.animationDelay || 150}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>折叠阈值</label><input type="number" id="modal-categories-threshold" min="-1" max="999" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'categories')?.responsive?.collapseThreshold !== undefined ? ((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'categories').responsive.collapseThreshold : 5}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">当分类数量超过此阈值时自动折叠；设置为 -1 禁用折叠功能</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>标签组件配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-tags-position">
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'tags')?.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'tags')?.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-tags-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'tags')?.animationDelay || 250}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>折叠阈值</label><input type="number" id="modal-tags-threshold" min="-1" max="999" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'tags')?.responsive?.collapseThreshold !== undefined ? ((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'tags').responsive.collapseThreshold : 20}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">当标签数量超过此阈值时自动折叠；设置为 -1 禁用折叠功能</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>卡片目录配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-cardToc-position">
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'card-toc')?.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'card-toc')?.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-cardToc-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'card-toc')?.animationDelay || 200}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>日历组件配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-calendar-position">
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'calendar')?.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'calendar')?.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-calendar-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'calendar')?.animationDelay || 250}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">移动端不显示日历组件</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>站点统计配置</h4>
      <div class="config-row">
        <div class="config-item"><label>定位方式</label><select id="modal-siteStats-position">
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'site-stats')?.position === 'top' ? ' selected' : ''}>顶部固定</option>
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'site-stats')?.position !== 'top' ? ' selected' : ''}>粘性定位</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-siteStats-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'site-stats')?.animationDelay || 200}"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>站点开始日期</label><input type="date" id="modal-siteStats-startDate" value="\${${config}.siteStartDate || ''}"></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">设置博客开始运行的日期，站点统计组件会根据这个日期计算运行天数</p>
    </div>`;
}

export const summaryJs = `
  {
    const sl = config.sidebarLayoutConfig;
    if (sl && sl.properties) {
      const catProp = sl.properties.find(p => p.type === 'categories');
      if (catProp) {
        document.getElementById('summary-categories-position').textContent = catProp.position === 'sticky' ? '粘性定位' : (catProp.position === 'top' ? '顶部固定' : catProp.position || '-');
        document.getElementById('summary-categories-threshold').textContent = catProp.responsive?.collapseThreshold !== undefined ? catProp.responsive.collapseThreshold : '未设置';
      } else {
        document.getElementById('summary-categories-position').textContent = '未配置';
        document.getElementById('summary-categories-threshold').textContent = '-';
      }
    } else {
      document.getElementById('summary-categories-position').textContent = '未配置';
      document.getElementById('summary-categories-threshold').textContent = '-';
    }
  }
`;

export const applyJs = `
  if (id === 'categories') {
    const sl = currentConfig.sidebarLayoutConfig || { properties: [] };
    
    const catIndex = sl.properties.findIndex(p => p.type === 'categories');
    const catConfig = {
      type: 'categories',
      position: document.getElementById('modal-categories-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-categories-delay').value) || 150,
      responsive: {
        collapseThreshold: parseInt(document.getElementById('modal-categories-threshold').value) || 5
      }
    };
    if (catIndex >= 0) {
      sl.properties[catIndex] = catConfig;
    } else {
      sl.properties.push(catConfig);
    }
    
    const tagsIndex = sl.properties.findIndex(p => p.type === 'tags');
    const tagsConfig = {
      type: 'tags',
      position: document.getElementById('modal-tags-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-tags-delay').value) || 250,
      responsive: {
        collapseThreshold: parseInt(document.getElementById('modal-tags-threshold').value) || 20
      }
    };
    if (tagsIndex >= 0) {
      sl.properties[tagsIndex] = tagsConfig;
    } else {
      sl.properties.push(tagsConfig);
    }
    
    const cardTocIndex = sl.properties.findIndex(p => p.type === 'card-toc');
    const cardTocConfig = {
      type: 'card-toc',
      position: document.getElementById('modal-cardToc-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-cardToc-delay').value) || 200
    };
    if (cardTocIndex >= 0) {
      sl.properties[cardTocIndex] = cardTocConfig;
    } else {
      sl.properties.push(cardTocConfig);
    }
    
    const calendarIndex = sl.properties.findIndex(p => p.type === 'calendar');
    const calendarConfig = {
      type: 'calendar',
      position: document.getElementById('modal-calendar-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-calendar-delay').value) || 250
    };
    if (calendarIndex >= 0) {
      sl.properties[calendarIndex] = calendarConfig;
    } else {
      sl.properties.push(calendarConfig);
    }
    
    const siteStatsIndex = sl.properties.findIndex(p => p.type === 'site-stats');
    const siteStatsConfig = {
      type: 'site-stats',
      position: document.getElementById('modal-siteStats-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-siteStats-delay').value) || 200
    };
    if (siteStatsIndex >= 0) {
      sl.properties[siteStatsIndex] = siteStatsConfig;
    } else {
      sl.properties.push(siteStatsConfig);
    }
    
    currentConfig.sidebarLayoutConfig = sl;
    
    const startDate = document.getElementById('modal-siteStats-startDate').value;
    if (startDate) {
      currentConfig.siteStartDate = startDate;
    }
  }
`;