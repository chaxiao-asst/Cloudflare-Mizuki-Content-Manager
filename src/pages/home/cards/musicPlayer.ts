export const CARD_ID = 'music-player';

export function cardHtml(): string {
  return `<div class="config-card" onclick="openModal('music-player')">
    <div class="card-header">
      <div class="card-icon">🎵</div>
      <h3 class="card-title">音乐播放器配置</h3>
    </div>
    <div class="card-summary">
      <div class="card-summary-item"><span class="summary-label">状态：</span><span class="summary-value" id="summary-music-enable">-</span></div>
      <div class="card-summary-item"><span class="summary-label">模式：</span><span class="summary-value" id="summary-music-mode">-</span></div>
    </div>
  </div>`;
}

export function modalHtml(config: string): string {
  return `<div class="config-section">
      <h4>基础设置</h4>
      <div class="config-row">
        <div class="config-item"><label>启用播放器</label><div class="boolean-switch">
          <input type="checkbox" id="modal-music-enable"\${(${config}.musicPlayerConfig || {}).enable ? ' checked' : ''}><label for="modal-music-enable">启用音乐播放器功能</label></div></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>播放模式</label><select id="modal-music-mode">
          <option value="meting"\${(${config}.musicPlayerConfig || {}).mode === 'meting' ? ' selected' : ''}>Meting API模式（网易云音乐等）</option>
          <option value="local"\${(${config}.musicPlayerConfig || {}).mode === 'local' ? ' selected' : ''}>本地模式</option></select></div>
      </div>
      <p style="font-size:12px;margin-top:8px;">推荐使用Meting API模式，可以播放网易云音乐、QQ音乐等平台的在线音乐</p>
    </div>
    <div class="config-section" style="margin-top:20px;">
      <h4>界面设置</h4>
      <div class="config-row">
        <div class="config-item"><label>悬浮播放器</label><div class="boolean-switch">
          <input type="checkbox" id="modal-music-floating"\${(${config}.musicPlayerConfig || {}).showFloatingPlayer !== false ? ' checked' : ''}><label for="modal-music-floating">显示悬浮播放器</label></div></div>
        <div class="config-item"><label>悬浮入口模式</label><select id="modal-music-entryMode">
          <option value="fab"\${(${config}.musicPlayerConfig || {}).floatingEntryMode === 'fab' ? ' selected' : ''}>集成到FAB按钮组</option>
          <option value="default"\${(${config}.musicPlayerConfig || {}).floatingEntryMode !== 'fab' ? ' selected' : ''}>独立悬浮播放器</option></select></div>
      </div>
      <div class="config-row" style="margin-top:8px;">
        <div class="config-item"><label>定位方式</label><select id="modal-music-position">
          <option value="sticky"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'music-sidebar')?.position === 'sticky' ? ' selected' : ''}>粘性定位</option>
          <option value="top"\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'music-sidebar')?.position === 'top' ? ' selected' : ''}>顶部固定</option></select></div>
        <div class="config-item"><label>动画延迟（毫秒）</label><input type="number" id="modal-music-delay" min="0" max="1000" value="\${((${config}.sidebarLayoutConfig || {}).properties || []).find(p => p.type === 'music-sidebar')?.animationDelay || 100}"></div>
      </div>
    </div>
    <div id="modal-music-metingFields" style="margin-top:20px;">
      <div class="config-section">
        <h4>Meting API 设置</h4>
        <div class="config-row">
          <div class="config-item"><label>Meting API 地址</label><input type="text" id="modal-music-api" value="\${escAttr((${config}.musicPlayerConfig || {}).meting_api || '')}" placeholder="https://"></div>
        </div>
        <div class="config-row" style="margin-top:8px;">
          <div class="config-item"><label>音乐源</label><select id="modal-music-server">
            <option value="netease"\${(${config}.musicPlayerConfig || {}).server === 'netease' ? ' selected' : ''}>网易云音乐</option>
            <option value="tencent"\${(${config}.musicPlayerConfig || {}).server === 'tencent' ? ' selected' : ''}>QQ音乐</option>
            <option value="kugou"\${(${config}.musicPlayerConfig || {}).server === 'kugou' ? ' selected' : ''}>酷狗音乐</option>
            <option value="xiami"\${(${config}.musicPlayerConfig || {}).server === 'xiami' ? ' selected' : ''}>虾米音乐</option>
            <option value="baidu"\${(${config}.musicPlayerConfig || {}).server === 'baidu' ? ' selected' : ''}>百度音乐</option></select></div>
          <div class="config-item"><label>类型</label><select id="modal-music-type">
            <option value="playlist"\${(${config}.musicPlayerConfig || {}).type === 'playlist' ? ' selected' : ''}>歌单</option>
            <option value="song"\${(${config}.musicPlayerConfig || {}).type === 'song' ? ' selected' : ''}>单曲</option>
            <option value="album"\${(${config}.musicPlayerConfig || {}).type === 'album' ? ' selected' : ''}>专辑</option>
            <option value="artist"\${(${config}.musicPlayerConfig || {}).type === 'artist' ? ' selected' : ''}>艺术家</option></select></div>
          <div class="config-item"><label>ID</label><input type="text" id="modal-music-id" value="\${escAttr((${config}.musicPlayerConfig || {}).id || '')}" placeholder="歌单/歌曲ID"></div>
        </div>
        <p style="font-size:12px;margin-top:8px;">从音乐平台分享链接中获取ID，如 https://music.163.com/playlist?id=123456789 中的 123456789</p>
      </div>
    </div>
    <div id="modal-music-localFields" style="margin-top:20px;">
      <div class="config-section">
        <h4>本地音乐列表</h4>
        <p style="font-size:12px;margin-bottom:12px;">添加本地音乐文件，需要将音乐文件放置在项目的 public 目录下</p>
        <div id="music-songs-container">
          \${((${config}.musicPlayerConfig || {}).local?.songs || []).map((song, idx) => \`<div class="music-song-item" data-idx="\${idx}">
      <div class="form-grid" style="grid-template-columns: 1fr 1fr 1fr;">
        <div class="form-group"><label>歌曲标题</label><input type="text" class="music-song-title" data-idx="\${idx}" value="\${escAttr(song.title || '')}" placeholder="歌曲标题"></div>
        <div class="form-group"><label>艺术家</label><input type="text" class="music-song-artist" data-idx="\${idx}" value="\${escAttr(song.artist || '')}" placeholder="艺术家/歌手"></div>
        <div class="form-group"><label>音频URL</label><input type="text" class="music-song-url" data-idx="\${idx}" value="\${escAttr(song.url || '')}" placeholder="assets/music/song.mp3"></div>
      </div>
      <div class="form-grid" style="grid-template-columns: 1fr 1fr;">
        <div class="form-group"><label>封面URL</label><input type="text" class="music-song-cover" data-idx="\${idx}" value="\${escAttr(song.cover || '')}" placeholder="assets/music/cover.jpg"></div>
        <div class="form-group"><label>时长(秒)</label><input type="number" class="music-song-duration" data-idx="\${idx}" value="\${song.duration || ''}" placeholder="240"></div>
      </div>
      <button type="button" class="btn-danger btn-sm" onclick="removeMusicSong(\${idx})">移除</button>
    </div>\`).join('') || '<div class="empty-state">暂无本地音乐，请添加</div>'}
        </div>
        <div style="margin-top:12px;">
          <button type="button" class="btn-primary" onclick="addMusicSong()">+ 添加歌曲</button>
        </div>
      </div>
    </div>`;
}

export const summaryJs = `
  const mp = config.musicPlayerConfig;
  if (mp) {
    document.getElementById('summary-music-enable').textContent = mp.enable ? '已启用' : '已禁用';
    document.getElementById('summary-music-mode').textContent = mp.mode === 'local' ? '本地模式' : (mp.mode === 'meting' ? 'Meting API模式' : mp.mode || '-');
  } else {
    document.getElementById('summary-music-enable').textContent = '未配置';
    document.getElementById('summary-music-mode').textContent = '-';
  }
`;

export const applyJs = `
  if (id === 'music-player') {
    currentConfig.musicPlayerConfig = {
      enable: document.getElementById('modal-music-enable').checked,
      mode: document.getElementById('modal-music-mode').value,
      meting_api: document.getElementById('modal-music-api').value,
      id: document.getElementById('modal-music-id').value,
      server: document.getElementById('modal-music-server').value,
      type: document.getElementById('modal-music-type').value,
      showFloatingPlayer: document.getElementById('modal-music-floating').checked,
      floatingEntryMode: document.getElementById('modal-music-entryMode').value,
      local: {
        songs: collectMusicSongs()
      }
    };
    
    const sl = currentConfig.sidebarLayoutConfig || { properties: [] };
    const musicIndex = sl.properties.findIndex(p => p.type === 'music-sidebar');
    const musicConfig = {
      type: 'music-sidebar',
      position: document.getElementById('modal-music-position').value,
      class: 'onload-animation',
      animationDelay: parseInt(document.getElementById('modal-music-delay').value) || 100
    };
    if (musicIndex >= 0) {
      sl.properties[musicIndex] = musicConfig;
    } else {
      sl.properties.push(musicConfig);
    }
    currentConfig.sidebarLayoutConfig = sl;
  }
`;