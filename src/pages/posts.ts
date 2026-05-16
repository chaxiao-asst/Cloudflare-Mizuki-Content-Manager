export const postsPage = `
<div class="content page-layout">
<div class="page-toolbar">
<h2>文章管理</h2>
<button type="button" class="btn btn-secondary" onclick="openHelpModal()">📖 Markdown 语法帮助</button>
<button type="button" class="btn btn-primary" onclick="openPostModal()">+ 新建文章</button>
<input type="text" id="postSearchInput" placeholder="搜索文章标题 / 名称..." onkeyup="filterPosts()">
<select id="postCategoryFilter" onchange="filterPosts()">
  <option value="">全部分类</option>
</select>
<select id="postStatusFilter" onchange="filterPosts()">
  <option value="">全部状态</option>
  <option value="published">已发布</option>
  <option value="draft">草稿</option>
  <option value="encrypted">加密</option>
  <option value="pinned">置顶</option>
</select>
</div>
<div class="page-cards-area">
<div class="card-grid" id="postsCards"></div>
</div>
<div id="postsStats" class="page-stats"></div>
</div>

<div class="modal" id="postModal">
  <div class="modal-content" style="min-width:750px;max-width:900px;">
    <div class="modal-header">
      <h2 id="postModalTitle">新建文章</h2>
      <button class="close-btn" onclick="closePostModal()">&times;</button>
    </div>
    <div class="tab-nav">
      <button class="tab-btn active" onclick="switchTab('basic')">基本信息</button>
      <button class="tab-btn" onclick="switchTab('advanced')">高级设置</button>
      <button class="tab-btn" onclick="switchTab('content')">文章内容</button>
    </div>
    <form id="postForm" class="form-group">
      <input type="hidden" name="name" id="postName">
      <div class="tab-panel active" id="tab-basic">
        <div class="form-grid">
          <div class="form-group"><label>文章名称 (URL slug) *</label><input type="text" name="postNameInput" id="postNameInput" placeholder="my-article-slug" required></div>
          <div class="form-group"><label>标题 *</label><input type="text" name="title" id="postTitle" required></div>
          <div class="form-group"><label>永久链接</label><input type="text" name="permalink" id="postPermalink" placeholder="custom-url"></div>
          <div class="form-group"><label>发布日期</label><input type="date" name="published" id="postPublished"></div>
          <div class="form-group"><label>更新日期</label><input type="date" name="updated" id="postUpdated"></div>
          <div class="form-group"><label>分类</label><input type="text" name="category" id="postCategory" placeholder="技术 / 生活 / 教程..."></div>
          <div class="form-group"><label>标签</label><input type="text" name="tags" id="postTags" placeholder="tag1, tag2, tag3"></div>
          <div class="form-group"><label>作者</label><input type="text" name="author" id="postAuthor" placeholder="作者名"></div>
          <div class="form-group"><label>封面图片</label><input type="text" name="image" id="postImage" placeholder="cover.webp 或 ./cover.webp"></div>
        </div>
        <div id="postSchemeRow" style="margin:10px 0 15px;padding:10px;background:#f8f9fa;border-radius:6px;">
          <label style="font-weight:600;display:block;margin-bottom:8px;">📂 存储方案</label>
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:0.85rem;">📁 文件夹方案</span>
            <label class="boolean-switch" style="margin:0 8px;"><input type="checkbox" id="postSchemeToggle" checked><span class="slider"></span></label>
            <span style="font-size:0.85rem;">📄 单文件方案</span>
          </div>
          <p style="font-size:0.75rem;color:#888;margin-top:6px;">文件夹方案：文章名即文件夹，内含 index.md + 图片资源 | 单文件方案：{name}.md，适合无图片文章</p>
        </div>
        <div class="form-group"><label>描述</label><textarea name="description" id="postDescription" placeholder="文章简要描述..."></textarea></div>
        <div class="form-group">
          <div class="boolean-switch"><input type="checkbox" name="pinned" id="postPinned"><label for="postPinned">📌 置顶</label></div>
          <div class="boolean-switch"><input type="checkbox" name="draft" id="postDraft"><label for="postDraft">📝 草稿</label></div>
          <div class="boolean-switch"><input type="checkbox" name="comment" id="postComment" checked><label for="postComment">💬 启用评论</label></div>
        </div>
      </div>
      <div class="tab-panel" id="tab-advanced">
        <h3 style="margin-bottom:15px;color:#555;">加密设置</h3>
        <div class="form-grid">
          <div class="form-group"><div class="boolean-switch"><input type="checkbox" name="encrypted" id="postEncrypted" onchange="toggleEncryptFields()"><label for="postEncrypted">🔒 启用客户端加密</label></div></div>
          <div class="form-group" id="encryptPasswordGroup" style="display:none;"><label>加密密码</label><input type="text" name="password" id="postPassword" placeholder="设置访问密码"></div>
          <div class="form-group" id="encryptHintGroup" style="display:none;"><label>密码提示</label><input type="text" name="passwordHint" id="postPasswordHint" placeholder="提示访问者密码"></div>
        </div>
        <div id="postLicenseSection">
        <h3 style="margin:15px 0;color:#555;">版权与来源</h3>
        <div class="form-group"><div class="boolean-switch"><input type="checkbox" name="showLicense" id="postShowLicense" onchange="toggleLicenseFields()"><label for="postShowLicense">📋 启用版权信息</label></div></div>
        <div id="licenseFields" style="display:none;">
          <div class="form-grid">
            <div class="form-group"><label>许可证</label><input type="text" name="licenseName" id="postLicenseName" placeholder="CC BY-NC-SA 4.0 / MIT / Unlicensed"></div>
            <div class="form-group"><label>许可证链接</label><input type="text" name="licenseUrl" id="postLicenseUrl" placeholder="https://creativecommons.org/..."></div>
            <div class="form-group"><label>源码链接</label><input type="text" name="sourceLink" id="postSourceLink" placeholder="https://github.com/..."></div>
          </div>
        </div>
        </div>
        <div id="postShareSection">
        <h3 style="margin:15px 0;color:#555;">分享设置</h3>
        <div class="form-group"><div class="boolean-switch"><input type="checkbox" name="showShare" id="postShowShare"><label for="postShowShare">📤 启用文章分享</label></div></div>
        </div>
        <h3 style="margin:15px 0;color:#555;">其他</h3>
        <div class="form-grid">
          <div class="form-group"><label>别名</label><input type="text" name="alias" id="postAlias" placeholder="文章别名路径"></div>
          <div class="form-group"><label>优先级 (数字越大越靠前)</label><input type="number" name="priority" id="postPriority" placeholder="0"></div>
        </div>
      </div>
      <div class="tab-panel" id="tab-content">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span style="font-size:0.85rem;color:#888;">📝 支持 Markdown + Mermaid 图表 + HTML 视频嵌入 + 图片宽高语法</span>
          <button type="button" class="btn btn-sm btn-secondary" onclick="openHelpModal()">语法参考</button>
        </div>
        <div class="form-group"><label>Markdown 内容</label><textarea name="content" id="postContent" placeholder="编写 Markdown 内容..." style="min-height:300px;font-family:monospace;font-size:0.9rem;"></textarea></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:20px;">
        <button type="button" class="btn btn-success" onclick="closePostModal()">取消</button>
        <button type="submit" class="btn btn-primary">💾 保存文章</button>
      </div>
    </form>
  </div>
</div>

<div class="modal" id="helpModal">
  <div class="modal-content" style="min-width:700px;max-width:900px;max-height:85vh;">
    <div class="modal-header">
      <h2>📖 Markdown 语法帮助</h2>
      <button class="close-btn" onclick="closeHelpModal()">&times;</button>
    </div>
    <div style="overflow-y:auto;max-height:60vh;">
      <div class="help-nav" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:15px;">
        <button class="btn btn-sm btn-primary" onclick="showHelpSection('basic')">基础语法</button>
        <button class="btn btn-sm btn-secondary" onclick="showHelpSection('chart')">图表 (Mermaid)</button>
        <button class="btn btn-sm btn-secondary" onclick="showHelpSection('video')">视频嵌入</button>
        <button class="btn btn-sm btn-secondary" onclick="showHelpSection('image')">图片语法</button>
        <button class="btn btn-sm btn-secondary" onclick="showHelpSection('encrypt')">文章加密</button>
        <button class="btn btn-sm btn-secondary" onclick="showHelpSection('permalink')">固定链接</button>
      </div>
      <div class="help-section active" id="help-basic">
        <h3>Frontmatter (前置元数据)</h3>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">---
title: "文章标题"
published: 2025-01-20
pinned: true
description: 文章的描述摘要
tags: [Markdown, Blogging]
category: Examples
licenseName: CC BY 4.0
author: 作者名
sourceLink: https://github.com/user/repo
draft: false
image: ./cover.webp
permalink: custom-url
---</pre>
        <h3>常用 Markdown 语法</h3>
        <table style="font-size:0.9rem;">
          <tr><th>效果</th><th>语法</th></tr>
          <tr><td>标题 H1-H6</td><td><code># H1 ## H2 ### H3</code></td></tr>
          <tr><td>粗体</td><td><code>**粗体文本**</code></td></tr>
          <tr><td>斜体</td><td><code>*斜体文本*</code></td></tr>
          <tr><td>删除线</td><td><code>~~删除文本~~</code></td></tr>
          <tr><td>行内代码</td><td><code>\`console.log("hi")\`</code></td></tr>
          <tr><td>链接</td><td><code>[链接文本](https://example.com "可选标题")</code></td></tr>
          <tr><td>图片</td><td><code>![替代文本](图片路径 "可选标题")</code></td></tr>
          <tr><td>无序列表</td><td><code>- 项目1<br>- 项目2</code></td></tr>
          <tr><td>有序列表</td><td><code>1. 项目1<br>1. 项目2</code></td></tr>
          <tr><td>代码块</td><td><code>\`\`\`js<br>const a = 1;<br>\`\`\`</code></td></tr>
          <tr><td>引用</td><td><code>> 引用内容</code></td></tr>
          <tr><td>分隔线</td><td><code>---</code></td></tr>
          <tr><td>表格</td><td><code>| 列1 | 列2 |<br>|-----|-----|<br>| A | B |</code></td></tr>
        </table>
        <h3>Frontmatter 字段说明</h3>
        <table style="font-size:0.85rem;">
          <tr><th>字段</th><th>说明</th><th>必填</th></tr>
          <tr><td>title</td><td>文章标题</td><td>✅</td></tr>
          <tr><td>description</td><td>文章描述摘要</td><td>✅</td></tr>
          <tr><td>published</td><td>发布日期 (YYYY-MM-DD)</td><td>-</td></tr>
          <tr><td>updated</td><td>最后更新日期</td><td>-</td></tr>
          <tr><td>tags</td><td>标签数组 [tag1, tag2]</td><td>-</td></tr>
          <tr><td>category</td><td>文章分类</td><td>-</td></tr>
          <tr><td>author</td><td>作者姓名</td><td>-</td></tr>
          <tr><td>image</td><td>封面图片路径</td><td>-</td></tr>
          <tr><td>pinned</td><td>是否置顶 (true/false)</td><td>-</td></tr>
          <tr><td>draft</td><td>是否为草稿 (true/false)</td><td>-</td></tr>
          <tr><td>permalink</td><td>自定义固定链接</td><td>-</td></tr>
          <tr><td>encrypted</td><td>是否加密 (true/false)</td><td>-</td></tr>
          <tr><td>password</td><td>加密密码</td><td>-</td></tr>
          <tr><td>passwordHint</td><td>密码提示</td><td>-</td></tr>
          <tr><td>licenseName</td><td>许可证名称</td><td>-</td></tr>
          <tr><td>sourceLink</td><td>源码/原始链接</td><td>-</td></tr>
          <tr><td>comment</td><td>是否启用评论 (默认true)</td><td>-</td></tr>
          <tr><td>alias</td><td>文章别名路径</td><td>-</td></tr>
          <tr><td>priority</td><td>排序优先级</td><td>-</td></tr>
        </table>
      </div>
      <div class="help-section" id="help-chart" style="display:none;">
        <h3>Mermaid 图表支持</h3>
        <p>Mizuki 内置 Mermaid 支持，使用 <code>\`\`\`mermaid</code> 代码块创建图表。</p>
        <h4>流程图</h4>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">\`\`\`mermaid
graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[执行操作1]
    B -->|否| D[执行操作2]
    C --> E[结束]
    D --> E
\`\`\`</pre>
        <h4>序列图</h4>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">\`\`\`mermaid
sequenceDiagram
    participant 用户
    participant 前端
    participant 后端
    用户->>前端: 发起请求
    前端->>后端: API调用
    后端-->>前端: 响应结果
    前端-->>用户: 显示结果
\`\`\`</pre>
        <h4>支持的图表类型</h4>
        <ul>
          <li><strong>流程图</strong> (Flowchart) — graph TD / LR</li>
          <li><strong>序列图</strong> (Sequence Diagram) — sequenceDiagram</li>
          <li><strong>类图</strong> (Class Diagram) — classDiagram</li>
          <li><strong>状态图</strong> (State Diagram) — stateDiagram-v2</li>
          <li><strong>饼图</strong> (Pie Chart) — pie</li>
          <li><strong>甘特图</strong> (Gantt Chart) — gantt</li>
        </ul>
      </div>
      <div class="help-section" id="help-video" style="display:none;">
        <h3>B站视频嵌入</h3>
        <p>从B站复制嵌入代码，直接粘贴到 Markdown 中即可。</p>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">&lt;iframe width="100%" height="468"
  src="//player.bilibili.com/player.html?bvid=BV1fK4y1s7Qf&p=1&autoplay=0"
  scrolling="no" border="0" frameborder="no" framespacing="0"
  allowfullscreen="true"&gt;&lt;/iframe&gt;</pre>
        <h4>参数说明</h4>
        <table style="font-size:0.85rem;">
          <tr><th>参数</th><th>说明</th></tr>
          <tr><td>bvid</td><td>B站视频 BV 号</td></tr>
          <tr><td>p=1</td><td>分P编号</td></tr>
          <tr><td>autoplay=0</td><td>自动播放 (0=关闭, 1=开启)</td></tr>
          <tr><td>t=30</td><td>从30秒处开始播放</td></tr>
          <tr><td>high_quality=1</td><td>高画质模式</td></tr>
        </table>
        <h4>其他平台</h4>
        <ul>
          <li>YouTube: <code>https://www.youtube.com/embed/VIDEO_ID</code></li>
          <li>腾讯视频: <code>https://v.qq.com/txp/iframe/player.html?vid=VIDEO_ID</code></li>
        </ul>
      </div>
      <div class="help-section" id="help-image" style="display:none;">
        <h3>图片语法 (Mizuki 8.0+)</h3>
        <p>支持设置图片缩放比例、标题和居中对齐。</p>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">![图片描述 w-50%](图片链接 "图片标题")</pre>
        <ul>
          <li><code>w-50%</code> 表示图片宽度为 50%（可以是任意百分比）</li>
          <li><code>"图片标题"</code> 表示图片的标题（可选）</li>
        </ul>
        <h4>图片路径最佳实践 (文件夹方案)</h4>
        <p>推荐使用相对路径引用同目录下的图片资源：</p>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">![图片描述](image1.png)
![封面](./cover.webp)</pre>
        <p>这样能让 RSS 正确构建图片路径，同时确保图片与文章一同打包部署。</p>
      </div>
      <div class="help-section" id="help-encrypt" style="display:none;">
        <h3>文章客户端加密</h3>
        <p>使用 bcryptjs + crypto-js 在客户端实现加密。访客输入密码后浏览器端解密渲染。</p>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">---
title: "加密文章"
encrypted: true
password: "your-secret-password"
passwordHint: "提示：我的生日"
---</pre>
        <h4>工作流程</h4>
        <ol>
          <li>访客看到密码输入界面（而非文章内容）</li>
          <li>输入密码后，浏览器用 bcryptjs 验证密码哈希</li>
          <li>验证通过后，用 crypto-js 解密文章内容</li>
          <li>动态渲染文章 HTML 内容</li>
        </ol>
      </div>
      <div class="help-section" id="help-permalink" style="display:none;">
        <h3>固定链接 (Mizuki 7.2+)</h3>
        <p>为文章配置自定义固定链接，优化 SEO。</p>
        <pre style="background:#f5f5f5;padding:12px;border-radius:8px;font-size:0.85rem;overflow-x:auto;">---
permalink: encrypted-example
---</pre>
        <p>文章将通过 <code>/posts/encrypted-example</code> 访问。</p>
      </div>
    </div>
  </div>
</div>

<script>
var tabBtns, tabPanels, helpBtns, helpSections;

function switchTab(name) {
  tabBtns.forEach(function(b) { b.classList.remove('active'); });
  tabPanels.forEach(function(p) { p.classList.remove('active'); });
  document.querySelector('.tab-btn[onclick="switchTab(\\'' + name + '\\')"]').classList.add('active');
  document.getElementById('tab-' + name).classList.add('active');
}

function showHelpSection(name) {
  helpBtns.forEach(function(b) { b.classList.remove('btn-primary'); b.classList.add('btn-secondary'); });
  helpSections.forEach(function(s) { s.style.display = 'none'; });
  var targetBtn = document.querySelector('.help-nav .btn[onclick="showHelpSection(\\'' + name + '\\')"]');
  if (targetBtn) { targetBtn.classList.add('btn-primary'); targetBtn.classList.remove('btn-secondary'); }
  var section = document.getElementById('help-' + name);
  if (section) section.style.display = 'block';
}

function openHelpModal() {
  document.getElementById('helpModal').classList.add('active');
}

function closeHelpModal() {
  document.getElementById('helpModal').classList.remove('active');
}

function toggleEncryptFields() {
  var checked = document.getElementById('postEncrypted').checked;
  document.getElementById('encryptPasswordGroup').style.display = checked ? 'block' : 'none';
  document.getElementById('encryptHintGroup').style.display = checked ? 'block' : 'none';
}

function toggleLicenseFields() {
  var checked = document.getElementById('postShowLicense').checked;
  document.getElementById('licenseFields').style.display = checked ? 'block' : 'none';
}

async function loadPosts() {
  var res = await api('GET', '/api/posts');
  window.postsData = res.data || [];

  var categories = new Set(res.data.map(function(p) { return p.meta?.category; }).filter(Boolean));
  var select = document.getElementById('postCategoryFilter');
  select.innerHTML = '<option value="">全部分类</option>';
  Array.from(categories).sort().forEach(function(cat) {
    var opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });

  filterPosts();
}

function filterPosts() {
  var data = window.postsData || [];
  var container = document.getElementById('postsCards');
  var searchQuery = document.getElementById('postSearchInput').value.toLowerCase();
  var categoryFilter = document.getElementById('postCategoryFilter').value;
  var statusFilter = document.getElementById('postStatusFilter').value;

  var filtered = data.filter(function(p) {
    var matchSearch = !searchQuery ||
      (p.name && p.name.toLowerCase().includes(searchQuery)) ||
      (p.meta?.title && p.meta?.title.toLowerCase().includes(searchQuery));
    var matchCategory = !categoryFilter || p.meta?.category === categoryFilter;
    var matchStatus = true;
    if (statusFilter === 'published') matchStatus = !p.meta?.draft;
    else if (statusFilter === 'draft') matchStatus = p.meta?.draft === true;
    else if (statusFilter === 'encrypted') matchStatus = p.meta?.encrypted === true;
    else if (statusFilter === 'pinned') matchStatus = p.meta?.pinned === true;
    return matchSearch && matchCategory && matchStatus;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state"><p style="font-size:3rem;">📝</p><p>没有符合条件的文章</p><p style="font-size:0.85rem;color:#aaa;">点击「新建文章」开始写作</p></div>';
  } else {
    container.innerHTML = '';

    filtered.forEach(function(p) {
      var meta = p.meta || {};
      var card = document.createElement('div');
      card.className = 'card';
      if (meta.image) {
        card.style.borderLeft = '4px solid #667eea';
      }

      var badges = '';
      if (meta.draft) badges += '<span class="badge badge-warning">📝 草稿</span>';
      if (meta.pinned) badges += '<span class="badge badge-success">📌 置顶</span>';
      if (meta.encrypted) badges += '<span class="badge" style="background:#fde3e3;color:#c0392b;">🔒 加密</span>';
      if (meta.category) badges += '<span class="badge badge-info">' + meta.category + '</span>';

      var tagsHtml = '';
      if (meta.tags && meta.tags.length > 0) {
        tagsHtml = '<div style="font-size:0.8rem;margin-top:6px;">' +
          meta.tags.slice(0, 5).map(function(t) { return '<span style="background:#eef;color:#556;padding:2px 8px;border-radius:12px;margin-right:4px;display:inline-block;">#' + t + '</span>'; }).join('') +
          (meta.tags.length > 5 ? '<span style="color:#999;"> +' + (meta.tags.length - 5) + '</span>' : '') +
          '</div>';
      }

      var metaInfo = '';
      if (meta.published) metaInfo += '<span>📅 发布: ' + meta.published + '</span>';
      if (meta.updated) metaInfo += '<span style="margin-left:10px;">🔄 更新: ' + meta.updated + '</span>';
      if (meta.author) metaInfo += '<span style="margin-left:10px;">✍️ ' + meta.author + '</span>';

      card.innerHTML =
        '<h3>' + (meta.title || p.name) + '</h3>' +
        '<p style="color:#666;font-size:0.9rem;">' + (meta.description || '暂无描述') + '</p>' +
        '<div class="card-meta">' + badges + '</div>' +
        '<div style="font-size:0.8rem;color:#999;margin-top:6px;">' + metaInfo + '</div>' +
        tagsHtml +
        (meta.licenseName ? '<div style="font-size:0.75rem;color:#aaa;margin-top:4px;">📜 ' + meta.licenseName + '</div>' : '') +
        '<div class="card-actions" style="margin-top:12px;">' +
        '<button class="btn btn-sm btn-primary">✏️ 编辑</button>' +
        '<button class="btn btn-sm btn-danger">🗑 删除</button>' +
        '</div>';

      var editBtn = card.querySelector('.btn-primary');
      var deleteBtn = card.querySelector('.btn-danger');
      editBtn.addEventListener('click', function() { editPost(p.name); });
      deleteBtn.addEventListener('click', function() { deletePost(p.name); });

      container.appendChild(card);
    });
  }

  document.getElementById('postsStats').innerHTML =
    '共 <strong>' + filtered.length + '</strong> 篇文章' +
    (filtered.length !== data.length ? '（筛选自 ' + data.length + ' 篇）' : '') +
    ' | 草稿: ' + data.filter(function(p) { return p.meta?.draft; }).length +
    ' | 加密: ' + data.filter(function(p) { return p.meta?.encrypted; }).length +
    ' | 置顶: ' + data.filter(function(p) { return p.meta?.pinned; }).length;
}

function openPostModal() {
  document.getElementById('postModalTitle').textContent = '新建文章';
  clearPostForm();
  document.getElementById('postNameInput').removeAttribute('readonly');
  document.getElementById('postPublished').value = new Date().toISOString().split('T')[0];
  document.getElementById('postSchemeRow').style.display = 'block';
  document.getElementById('postModal').classList.add('active');
  switchTab('basic');
}

function closePostModal() {
  document.getElementById('postModal').classList.remove('active');
}

document.getElementById('postForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  var name = document.getElementById('postNameInput').value || document.getElementById('postName').value;
  var meta = {
    title: document.getElementById('postTitle').value,
    published: document.getElementById('postPublished').value,
    updated: document.getElementById('postUpdated').value,
    description: document.getElementById('postDescription').value,
    tags: document.getElementById('postTags').value.split(',').map(function(t) { return t.trim(); }).filter(Boolean),
    category: document.getElementById('postCategory').value,
    author: document.getElementById('postAuthor').value,
    permalink: document.getElementById('postPermalink').value,
    image: document.getElementById('postImage').value,
    pinned: document.getElementById('postPinned').checked,
    draft: document.getElementById('postDraft').checked,
    comment: document.getElementById('postComment').checked,
    encrypted: document.getElementById('postEncrypted').checked,
    password: document.getElementById('postPassword').value,
    passwordHint: document.getElementById('postPasswordHint').value,
    alias: document.getElementById('postAlias').value,
    priority: document.getElementById('postPriority').value ? parseInt(document.getElementById('postPriority').value) : undefined
  };
  if (document.getElementById('postShowLicense').checked) {
    meta.licenseName = document.getElementById('postLicenseName').value;
    meta.licenseUrl = document.getElementById('postLicenseUrl').value;
    meta.sourceLink = document.getElementById('postSourceLink').value;
  } else {
    meta.licenseName = '';
    meta.licenseUrl = '';
    meta.sourceLink = '';
  }
  meta.share = document.getElementById('postShowShare').checked;
  var content = document.getElementById('postContent').value;
  var existing = document.getElementById('postName').value;
  if (existing) {
    await api('PUT', '/api/posts/' + existing, { meta: meta, content: content });
  } else {
    var scheme = document.getElementById('postSchemeToggle').checked ? 'single' : 'folder';
    await api('POST', '/api/posts', { name: name, meta: meta, content: content, scheme: scheme });
  }
  showMsg('✅ 文章保存成功', 'success');
  loadPosts();
  clearPostForm();
  closePostModal();
});

function clearPostForm() {
  document.getElementById('postName').value = '';
  document.getElementById('postNameInput').value = '';
  document.getElementById('postTitle').value = '';
  document.getElementById('postPermalink').value = '';
  document.getElementById('postPublished').value = '';
  document.getElementById('postUpdated').value = '';
  document.getElementById('postCategory').value = '';
  document.getElementById('postAuthor').value = '';
  document.getElementById('postTags').value = '';
  document.getElementById('postImage').value = '';
  document.getElementById('postDescription').value = '';
  document.getElementById('postPinned').checked = false;
  document.getElementById('postDraft').checked = false;
  document.getElementById('postComment').checked = true;
  document.getElementById('postEncrypted').checked = false;
  document.getElementById('postPassword').value = '';
  document.getElementById('postPasswordHint').value = '';
  document.getElementById('postLicenseName').value = '';
  document.getElementById('postLicenseUrl').value = '';
  document.getElementById('postSourceLink').value = '';
  document.getElementById('postShowLicense').checked = false;
  document.getElementById('postShowShare').checked = false;
  var schemeToggle = document.getElementById('postSchemeToggle');
  if (schemeToggle) schemeToggle.checked = false;
  document.getElementById('postAlias').value = '';
  document.getElementById('postPriority').value = '';
  document.getElementById('postContent').value = '';
  toggleEncryptFields();
  toggleLicenseFields();
}

async function editPost(name) {
  var res = await api('GET', '/api/posts/' + name);
  var data = res.data;
  if (!data) return;

  document.getElementById('postModalTitle').textContent = '编辑文章 — ' + name;
  document.getElementById('postName').value = name;
  document.getElementById('postNameInput').value = name;
  document.getElementById('postNameInput').setAttribute('readonly', 'readonly');
  document.getElementById('postTitle').value = data.meta?.title || '';
  document.getElementById('postPermalink').value = data.meta?.permalink || '';
  document.getElementById('postPublished').value = data.meta?.published || '';
  document.getElementById('postUpdated').value = data.meta?.updated || '';
  document.getElementById('postCategory').value = data.meta?.category || '';
  document.getElementById('postAuthor').value = data.meta?.author || '';
  document.getElementById('postTags').value = (data.meta?.tags || []).join(', ');
  document.getElementById('postImage').value = data.meta?.image || '';
  document.getElementById('postDescription').value = data.meta?.description || '';
  document.getElementById('postPinned').checked = data.meta?.pinned || false;
  document.getElementById('postDraft').checked = data.meta?.draft || false;
  document.getElementById('postComment').checked = data.meta?.comment !== false;
  document.getElementById('postEncrypted').checked = data.meta?.encrypted || false;
  document.getElementById('postPassword').value = data.meta?.password || '';
  document.getElementById('postPasswordHint').value = data.meta?.passwordHint || '';
  document.getElementById('postLicenseName').value = data.meta?.licenseName || '';
  document.getElementById('postLicenseUrl').value = data.meta?.licenseUrl || '';
  document.getElementById('postSourceLink').value = data.meta?.sourceLink || '';
  var hasLicense = !!(data.meta?.licenseName || data.meta?.licenseUrl || data.meta?.sourceLink);
  document.getElementById('postShowLicense').checked = hasLicense;
  document.getElementById('postShowShare').checked = data.meta?.share === true;
  document.getElementById('postAlias').value = data.meta?.alias || '';
  document.getElementById('postPriority').value = data.meta?.priority !== undefined ? data.meta.priority : '';
  document.getElementById('postContent').value = data.content || '';
  toggleEncryptFields();
  toggleLicenseFields();
  document.getElementById('postSchemeRow').style.display = 'none';
  document.getElementById('postModal').classList.add('active');
  switchTab('basic');
}

async function deletePost(name) {
  showConfirmModal('⚠️ 确定要删除文章「' + name + '」吗？此操作不可撤销！', async function() {
    await api('DELETE', '/api/posts/' + name);
    showMsg('🗑 删除成功', 'success');
    loadPosts();
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  tabBtns = document.querySelectorAll('.tab-btn');
  tabPanels = document.querySelectorAll('.tab-panel');
  helpBtns = document.querySelectorAll('.help-nav .btn');
  helpSections = document.querySelectorAll('.help-section');
  document.querySelector('.nav-link[data-page="posts"]')?.classList.add('active');
  await fetchPostGlobalConfig();
  applyPostGlobalConfig();
  loadPosts();
  document.getElementById('postModal').addEventListener('click', function(e) { if (e.target === document.getElementById('postModal')) { closePostModal(); } });
  document.getElementById('helpModal').addEventListener('click', function(e) { if (e.target === document.getElementById('helpModal')) { closeHelpModal(); } });
});

window.postGlobalConfig = { shareConfig: {}, licenseConfig: {} };

async function fetchPostGlobalConfig() {
  try {
    var res = await api('GET', '/api/config');
    window.postGlobalConfig = res.data || {};
  } catch(e) {}
}

function applyPostGlobalConfig() {
  var cfg = window.postGlobalConfig;
  if (cfg.licenseConfig && !cfg.licenseConfig.enable) {
    var licenseSection = document.getElementById('postLicenseSection');
    if (licenseSection) licenseSection.style.display = 'none';
  }
  if (cfg.shareConfig && !cfg.shareConfig.enable) {
    var shareSection = document.getElementById('postShareSection');
    if (shareSection) shareSection.style.display = 'none';
  }
}
</script>`;