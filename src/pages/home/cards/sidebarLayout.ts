export const CARD_ID = 'sidebarLayout';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('sidebarLayout')">
    <div class="card-header">
      <div class="card-icon">📍</div>
      <h3 class="card-title">基础位置配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">左侧栏组件：</span><span class="summary-value" id="summary-sidebarLayout-left">-</span></div>
      <div class="card-summary-item"><span class="summary-label">右侧栏组件：</span><span class="summary-value" id="summary-sidebarLayout-right">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section" id="modal-sidebarLayout-root" data-config="\${escAttr(JSON.stringify(${config}))}"></div>`;
}

export const summaryJs = `
  const sl = config.sidebarLayoutConfig;
  if (sl && sl.components) {
    document.getElementById('summary-sidebarLayout-left').textContent = (sl.components.left || []).length + ' 个组件';
    document.getElementById('summary-sidebarLayout-right').textContent = (sl.components.right || []).length + ' 个组件';
  } else {
    document.getElementById('summary-sidebarLayout-left').textContent = '未配置';
    document.getElementById('summary-sidebarLayout-right').textContent = '未配置';
  }
`;

export const applyJs = `
  if (id === 'sidebarLayout') {
    const leftComps = Array.from(document.querySelectorAll('#sidebar-left-container .sidebar-component-item')).map(el => el.getAttribute('data-type')).filter(Boolean);
    const rightComps = Array.from(document.querySelectorAll('#sidebar-right-container .sidebar-component-item')).map(el => el.getAttribute('data-type')).filter(Boolean);
    const drawerComps = Array.from(document.querySelectorAll('#sidebar-drawer-container .sidebar-component-item')).map(el => el.getAttribute('data-type')).filter(Boolean);

    currentConfig.sidebarLayoutConfig = {
      properties: currentConfig.sidebarLayoutConfig?.properties || [],
      components: {
        left: leftComps,
        right: rightComps,
        drawer: drawerComps
      },
      defaultAnimation: {
        enable: document.getElementById('modal-sidebar-animEnable').checked,
        baseDelay: parseInt(document.getElementById('modal-sidebar-animBaseDelay').value) || 0,
        increment: parseInt(document.getElementById('modal-sidebar-animIncrement').value) || 50
      },
      responsive: {
        breakpoints: {
          mobile: parseInt(document.getElementById('modal-sidebar-mobileBp').value) || 768,
          tablet: parseInt(document.getElementById('modal-sidebar-tabletBp').value) || 1280,
          desktop: parseInt(document.getElementById('modal-sidebar-desktopBp').value) || 1280
        }
      }
    };
  }
`;

export function sidebarLayoutModalHtml(config: string): string {
  const componentTypes = ['profile', 'announcement', 'categories', 'tags', 'site-stats', 'calendar', 'card-toc', 'music-sidebar'];
  const componentNames: Record<string, string> = { profile: '个人资料', announcement: '公告', categories: '分类', tags: '标签', 'site-stats': '站点统计', calendar: '日历', 'card-toc': '卡片目录', 'music-sidebar': '音乐播放器' };

  return `<div class="config-section">
      <h4>左侧栏组件</h4>
      <p style="font-size:12px;margin-bottom:12px;">拖拽排序，控制在左侧栏显示的组件</p>
      <div id="sidebar-left-container" class="sidebar-components-container" ondragover="handleContainerDragOver(event)" ondrop="handleContainerDrop(event)">
        \${((${config}).sidebarLayoutConfig?.components?.left || []).map((c, idx) => '<div class="sidebar-component-item" draggable="true" data-sidebar="left" data-type="' + c + '" data-index="' + idx + '" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)" ondragover="handleDragOver(event)" ondragenter="handleDragEnter(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)"><span class="drag-handle">⋮⋮</span><span>' + (componentNames[c] || c) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(\\"' + c + '\\", \\"left\\")">移除</button></div>').join('') || '<div class="empty-state">暂无组件</div>'}
      </div>
      <div style="margin-top:12px;">
        <select id="modal-sidebar-add-left" style="width:100%;padding:10px;border-radius:8px;margin-bottom:8px;">
          <option value="">选择要添加的组件...</option>
          \${componentTypes.filter(t => !((${config}).sidebarLayoutConfig?.components?.left || []).includes(t)).map(t => '<option value="' + t + '">' + (componentNames[t] || t) + '</option>').join('')}
        </select>
        <button type="button" class="btn-primary" onclick="addSidebarComponent('left')" style="width:100%;">+ 添加到左侧栏</button>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>右侧栏组件</h4>
      <p style="font-size:12px;margin-bottom:12px;">拖拽排序，控制在右侧栏显示的组件</p>
      <div id="sidebar-right-container" class="sidebar-components-container" ondragover="handleContainerDragOver(event)" ondrop="handleContainerDrop(event)">
        \${((${config}).sidebarLayoutConfig?.components?.right || []).map((c, idx) => '<div class="sidebar-component-item" draggable="true" data-sidebar="right" data-type="' + c + '" data-index="' + idx + '" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)" ondragover="handleDragOver(event)" ondragenter="handleDragEnter(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)"><span class="drag-handle">⋮⋮</span><span>' + (componentNames[c] || c) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(\\"' + c + '\\", \\"right\\")">移除</button></div>').join('') || '<div class="empty-state">暂无组件</div>'}
      </div>
      <div style="margin-top:12px;">
        <select id="modal-sidebar-add-right" style="width:100%;padding:10px;border-radius:8px;margin-bottom:8px;">
          <option value="">选择要添加的组件...</option>
          \${componentTypes.filter(t => !((${config}).sidebarLayoutConfig?.components?.right || []).includes(t)).map(t => '<option value="' + t + '">' + (componentNames[t] || t) + '</option>').join('')}
        </select>
        <button type="button" class="btn-primary" onclick="addSidebarComponent('right')" style="width:100%;">+ 添加到右侧栏</button>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>抽屉模式组件（移动端）</h4>
      <p style="font-size:12px;margin-bottom:12px;">控制在移动端抽屉菜单中显示的组件</p>
      <div id="sidebar-drawer-container" class="sidebar-components-container" ondragover="handleContainerDragOver(event)" ondrop="handleContainerDrop(event)">
        \${((${config}).sidebarLayoutConfig?.components?.drawer || []).map((c, idx) => '<div class="sidebar-component-item" draggable="true" data-sidebar="drawer" data-type="' + c + '" data-index="' + idx + '" ondragstart="handleDragStart(event)" ondragend="handleDragEnd(event)" ondragover="handleDragOver(event)" ondragenter="handleDragEnter(event)" ondragleave="handleDragLeave(event)" ondrop="handleDrop(event)"><span class="drag-handle">⋮⋮</span><span>' + (componentNames[c] || c) + '</span><button type="button" class="btn-danger btn-sm" onclick="removeSidebarComponent(\\"' + c + '\\", \\"drawer\\")">移除</button></div>').join('') || '<div class="empty-state">暂无组件</div>'}
      </div>
      <div style="margin-top:12px;">
        <select id="modal-sidebar-add-drawer" style="width:100%;padding:10px;border-radius:8px;margin-bottom:8px;">
          <option value="">选择要添加的组件...</option>
          \${componentTypes.filter(t => !((${config}).sidebarLayoutConfig?.components?.drawer || []).includes(t)).map(t => '<option value="' + t + '">' + (componentNames[t] || t) + '</option>').join('')}
        </select>
        <button type="button" class="btn-primary" onclick="addSidebarComponent('drawer')" style="width:100%;">+ 添加到抽屉模式</button>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>默认动画配置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用动画</label><div class="boolean-switch">
          <input type="checkbox" id="modal-sidebar-animEnable"\${(${config}).sidebarLayoutConfig?.defaultAnimation?.enable !== false ? ' checked' : ''}><label for="modal-sidebar-animEnable">启用组件加载动画</label></div></div>
        <div class="config-item"><label>基础延迟（毫秒）</label><input type="number" id="modal-sidebar-animBaseDelay" min="0" max="1000" value="\${(${config}).sidebarLayoutConfig?.defaultAnimation?.baseDelay || 0}"></div>
        <div class="config-item"><label>递增延迟（毫秒）</label><input type="number" id="modal-sidebar-animIncrement" min="0" max="500" value="\${(${config}).sidebarLayoutConfig?.defaultAnimation?.increment || 50}"></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>响应式断点配置</h4>
      <div class="config-row">
        <div class="config-item"><label>移动端断点（px）</label><input type="number" id="modal-sidebar-mobileBp" min="0" max="2000" value="\${(${config}).sidebarLayoutConfig?.responsive?.breakpoints?.mobile || 768}"></div>
        <div class="config-item"><label>平板端断点（px）</label><input type="number" id="modal-sidebar-tabletBp" min="0" max="2000" value="\${(${config}).sidebarLayoutConfig?.responsive?.breakpoints?.tablet || 1280}"></div>
        <div class="config-item"><label>桌面端断点（px）</label><input type="number" id="modal-sidebar-desktopBp" min="0" max="2000" value="\${(${config}).sidebarLayoutConfig?.responsive?.breakpoints?.desktop || 1280}"></div>
      </div>
    </div>`;
}