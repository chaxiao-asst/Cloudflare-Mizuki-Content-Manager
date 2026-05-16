export const aboutPage = `
<div class="content">
<h2>关于页面</h2>
<p style="color:#888;font-size:14px;margin-bottom:20px;">关于页面内容存储在 Markdown 文件中，支持标准 Markdown 语法及主题扩展语法</p>

<div class="form-group">
  <label>页面内容</label>
  <textarea id="aboutContent" placeholder="输入关于页面的 Markdown 内容..." style="min-height:300px;width:100%;padding:12px;border:1px solid #e5e7eb;border-radius:8px;font-family:monospace;font-size:14px;"></textarea>
</div>
<div class="form-group">
  <button type="button" class="btn btn-primary" onclick="saveAboutContent()">保存内容</button>
  <button type="button" class="btn btn-success" onclick="loadAboutContent()">刷新</button>
</div>

<div class="config-section" style="margin-top:20px;">
  <h4>支持的 Markdown 扩展语法</h4>
  <ul style="font-size:14px;color:#666;">
    <li><strong>GitHub 卡片</strong>: <code>github{repo=用户名/仓库名}</code></li>
    <li><strong>注意框</strong>: <code>[!NOTE]</code>、<code>[!TIP]</code>、<code>[!WARNING]</code></li>
    <li><strong>数学公式</strong>: 行内 <code>$公式$</code>，块级 <code>$$公式$$</code></li>
  </ul>
</div>
</div>

<script>
async function loadAboutContent() {
  const res = await api('GET', '/api/about');
  if (res.success) {
    document.getElementById('aboutContent').value = res.data || '';
  }
}

async function saveAboutContent() {
  const content = document.getElementById('aboutContent').value;
  const res = await api('PUT', '/api/about', { content });
  if (res.success) {
    alert('保存成功');
  } else {
    alert('保存失败: ' + res.message);
  }
}

loadAboutContent();
</script>
`;
