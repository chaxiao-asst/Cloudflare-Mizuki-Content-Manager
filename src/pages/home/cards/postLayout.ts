export const CARD_ID = 'post-layout';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('post-layout')">
    <div class="card-header">
      <div class="card-icon">📝</div>
      <h3 class="card-title">文章布局</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">上次编辑：</span><span class="summary-value" id="summary-lastmod-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">评论系统：</span><span class="summary-value" id="summary-comment-system">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>上次编辑卡片</h4>
      <div class="config-row">
        <div class="config-item"><label>显示上次编辑</label><div class="boolean-switch">
          <input type="checkbox" id="modal-lastmod-enable" \${${config}.showLastModified !== undefined ? (${config}.showLastModified ? ' checked' : '') : ' checked'}><label for="modal-lastmod-enable">在文章底部显示最后修改时间</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>代码块配置</h4>
      <div class="config-row">
        <div class="config-item"><label>代码块主题</label><select id="modal-code-theme">
          <option value="github-dark" \${(${config}.expressiveCodeConfig?.theme === 'github-dark' ? ' selected' : '')}>github-dark (深色)</option>
          <option value="github-light" \${(${config}.expressiveCodeConfig?.theme === 'github-light' ? ' selected' : '')}>github-light (浅色)</option>
          <option value="dracula" \${(${config}.expressiveCodeConfig?.theme === 'dracula' ? ' selected' : '')}>dracula</option>
          <option value="monokai" \${(${config}.expressiveCodeConfig?.theme === 'monokai' ? ' selected' : '')}>monokai</option>
        </select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>主题切换时隐藏</label><div class="boolean-switch">
          <input type="checkbox" id="modal-code-hideTransition" \${(${config}.expressiveCodeConfig?.hideDuringThemeTransition !== false ? ' checked' : '')}><label for="modal-code-hideTransition">避免切换时卡顿</label></div></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">注意：某些样式已被覆盖，请参阅 astro.config.mjs 文件。</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>分享组件</h4>
      <div class="config-row">
        <div class="config-item"><label>启用分享</label><div class="boolean-switch">
          <input type="checkbox" id="modal-share-enable" \${(${config}.shareConfig?.enable ? ' checked' : '')}><label for="modal-share-enable">在文章区域显示分享组件</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>版权信息</h4>
      <div class="config-row">
        <div class="config-item"><label>显示版权</label><div class="boolean-switch">
          <input type="checkbox" id="modal-license-enable" \${(${config}.licenseConfig?.enable ? ' checked' : '')}><label for="modal-license-enable">在文章底部显示版权信息</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>版权名称</label><input type="text" id="modal-license-name" value="\${escAttr((${config}.licenseConfig?.name || ''))}" placeholder="如: CC BY-NC-SA 4.0"></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>版权链接</label><input type="text" id="modal-license-url" value="\${escAttr((${config}.licenseConfig?.url || ''))}" placeholder="https://creativecommons.org/..."></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>目录导航</h4>
      <div class="config-row">
        <div class="config-item"><label>启用目录</label><div class="boolean-switch">
          <input type="checkbox" id="modal-toc-enable" \${(${config}.toc?.enable ? ' checked' : '')}><label for="modal-toc-enable">在文章侧边显示目录导航</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>目录深度</label><select id="modal-toc-depth">
          <option value="1" \${(${config}.toc?.depth === 1 ? ' selected' : '')}>1 (仅h1)</option>
          <option value="2" \${(${config}.toc?.depth === 2 ? ' selected' : '')}>2 (h1-h2)</option>
          <option value="3" \${(${config}.toc?.depth === 3 ? ' selected' : '')}>3 (h1-h3)</option>
          <option value="4" \${(${config}.toc?.depth === 4 ? ' selected' : '')}>4 (h1-h4)</option>
          <option value="5" \${(${config}.toc?.depth === 5 ? ' selected' : '')}>5 (h1-h5)</option>
          <option value="6" \${(${config}.toc?.depth === 6 ? ' selected' : '')}>6 (h1-h6)</option>
        </select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>日语假名标记</label><div class="boolean-switch">
          <input type="checkbox" id="modal-toc-japaneseBadge" \${(${config}.toc?.useJapaneseBadge ? ' checked' : '')}><label for="modal-toc-japaneseBadge">使用假名(ァィゥ...)代替数字</label></div></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">开启后会将 1、2、3... 改为 ァ、ィ、ゥ...，首页文章列表导航也会生效。</p>
      <div class="config-row" style="margin-top:12px;">
        <div class="config-item"><label>桌面端侧边栏</label><div class="boolean-switch">
          <input type="checkbox" id="modal-toc-desktopSidebar" \${(${config}.toc?.desktopSidebar !== false ? ' checked' : '')}><label for="modal-toc-desktopSidebar">电脑端右侧边栏显示目录导航</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>FAB悬浮按钮组</label><div class="boolean-switch">
          <input type="checkbox" id="modal-toc-floating" \${(${config}.toc?.floating !== false ? ' checked' : '')}><label for="modal-toc-floating">集成到FAB按钮组的目录导航</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>手机端顶部</label><div class="boolean-switch">
          <input type="checkbox" id="modal-toc-mobileTop" \${(${config}.toc?.mobileTop !== false ? ' checked' : '')}><label for="modal-toc-mobileTop">手机端顶部显示目录导航按钮</label></div></div>
      </div>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>评论系统</h4>
      <div class="config-row">
        <div class="config-item"><label>启用评论</label><div class="boolean-switch">
          <input type="checkbox" id="modal-comment-enable" \${(${config}.commentConfig?.enable ? ' checked' : '')}><label for="modal-comment-enable">启用评论功能</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>评论系统</label><select id="modal-comment-system">
          <option value="twikoo" \${(${config}.commentConfig?.system === 'twikoo' ? ' selected' : '')}>Twikoo</option>
          <option value="giscus" \${(${config}.commentConfig?.system === 'giscus' ? ' selected' : '')}>Giscus (GitHub)</option>
        </select></div>
      </div>
      <div id="modal-comment-twikoo-fields" style="margin-top:12px;">
        <div class="config-row">
          <div class="config-item"><label>Twikoo 环境ID</label><input type="text" id="modal-comment-twikoo-envId" value="\${escAttr((${config}.commentConfig?.twikoo?.envId || ''))}" placeholder="https://your-twikoo.vercel.app"></div>
        </div>
      </div>
      <div id="modal-comment-giscus-fields" style="margin-top:12px;">
        <div class="config-row">
          <div class="config-item"><label>仓库 (repo)</label><input type="text" id="modal-comment-giscus-repo" value="\${escAttr((${config}.commentConfig?.giscus?.repo || ''))}" placeholder="username/repo"></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>仓库ID (repoId)</label><input type="text" id="modal-comment-giscus-repoId" value="\${escAttr((${config}.commentConfig?.giscus?.repoId || ''))}" placeholder="R_kgD..."></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>分类 (category)</label><input type="text" id="modal-comment-giscus-category" value="\${escAttr((${config}.commentConfig?.giscus?.category || ''))}" placeholder="Announcements"></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>分类ID (categoryId)</label><input type="text" id="modal-comment-giscus-categoryId" value="\${escAttr((${config}.commentConfig?.giscus?.categoryId || ''))}" placeholder="DIC_kwD..."></div>
        </div>
      </div>
      <p style="font-size:12px;margin-top:12px;">Twikoo 需要部署到 Vercel 等平台。Giscus 基于 GitHub Discussions，适合技术博客。</p>
    </div>`;
}

export const summaryJs = `
  document.getElementById('summary-lastmod-enable').textContent = config.showLastModified ? '已启用' : '已禁用';
  document.getElementById('summary-comment-system').textContent = config.commentConfig?.system || '未配置';
`;

export const applyJs = `
  if (id === 'post-layout') {
    currentConfig.showLastModified = document.getElementById('modal-lastmod-enable').checked;
    currentConfig.expressiveCodeConfig = {
      theme: document.getElementById('modal-code-theme').value,
      hideDuringThemeTransition: document.getElementById('modal-code-hideTransition').checked
    };
    currentConfig.shareConfig = {
      enable: document.getElementById('modal-share-enable').checked
    };
    currentConfig.licenseConfig = {
      enable: document.getElementById('modal-license-enable').checked,
      name: document.getElementById('modal-license-name').value || '',
      url: document.getElementById('modal-license-url').value || ''
    };
    currentConfig.toc = {
      enable: document.getElementById('modal-toc-enable').checked,
      depth: parseInt(document.getElementById('modal-toc-depth').value) || 2,
      useJapaneseBadge: document.getElementById('modal-toc-japaneseBadge').checked,
      desktopSidebar: document.getElementById('modal-toc-desktopSidebar').checked,
      floating: document.getElementById('modal-toc-floating').checked,
      mobileTop: document.getElementById('modal-toc-mobileTop').checked
    };
    const commentSystem = document.getElementById('modal-comment-system').value;
    const commentEnable = document.getElementById('modal-comment-enable').checked;
    const commentConfig = {
      enable: commentEnable,
      system: commentSystem,
      twikoo: {
        envId: document.getElementById('modal-comment-twikoo-envId').value || '',
        lang: 'SITE_LANG'
      },
      giscus: {
        repo: document.getElementById('modal-comment-giscus-repo').value || '',
        repoId: document.getElementById('modal-comment-giscus-repoId').value || '',
        category: document.getElementById('modal-comment-giscus-category').value || 'Announcements',
        categoryId: document.getElementById('modal-comment-giscus-categoryId').value || '',
        mapping: 'pathname',
        strict: '0',
        reactionsEnabled: '1',
        emitMetadata: '0',
        inputPosition: 'top',
        theme: 'preferred_color_scheme',
        lang: 'SITE_LANG',
        loading: 'lazy'
      }
    };
    currentConfig.commentConfig = commentConfig;
  }
`;