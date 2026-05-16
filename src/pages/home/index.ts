import * as basicCard from './cards/basic';
import * as navLinksCard from './cards/navLinks';
import * as featurePagesCard from './cards/featurePages';
import * as layoutCard from './cards/layout';
import * as bannerCard from './cards/banner';
import * as fullscreenCard from './cards/fullscreen';
import * as animeCard from './cards/anime';
import * as sidebarLayoutCard from './cards/sidebarLayout';
import * as profileCard from './cards/profile';
import * as announcementCard from './cards/announcement';
import * as componentsCard from './cards/components';
import * as musicPlayerCard from './cards/musicPlayer';
import * as sakuraCard from './cards/sakura';
import * as pioCard from './cards/pio';
import * as umamiCard from './cards/umami';
import * as postLayoutCard from './cards/postLayout';
import { SHARED_JS } from './utils';

const cards = [
  basicCard, navLinksCard, featurePagesCard, layoutCard,
  bannerCard, fullscreenCard, animeCard, sidebarLayoutCard,
  profileCard, announcementCard, componentsCard, musicPlayerCard,
  sakuraCard, pioCard, umamiCard, postLayoutCard,
];

function composeCards(): string {
  return cards.map(c => c.cardHtml()).join('\n  ');
}

function composeModalContent(): string {
  const cases: string[] = [];
  for (const card of cards) {
    if (card.CARD_ID === 'sidebarLayout') {
      cases.push(`  if (id === 'sidebarLayout') {
    const sl = currentConfig.sidebarLayoutConfig || { properties: [], components: { left: [], right: [], drawer: [] }, defaultAnimation: { enable: true, baseDelay: 0, increment: 50 }, responsive: { breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 } } };
    return \`${sidebarLayoutCard.sidebarLayoutModalHtml('currentConfig')}\`;
  }`);
    } else {
      cases.push(`  if (id === '${card.CARD_ID}') {
    return \`${card.modalHtml('currentConfig')}\`;
  }`);
    }
  }
  return cases.join('\n');
}

function composeSummaryJs(): string {
  return cards.map(c => c.summaryJs).join('\n');
}

function composeApplyJs(): string {
  return cards.map(c => c.applyJs).join('\n  ');
}

export const homePage = `
<div class="content" id="configSection">
<h2>站点管理</h2>

<div class="card-grid">
  ${composeCards()}
</div>

<div class="cfg-overlay" id="cfg-overlay" onclick="closeModal(event)">
  <div class="cfg-dialog" onclick="event.stopPropagation()">
    <div class="cfg-dialog-header">
      <h2 id="cfg-title">配置</h2>
      <button class="cfg-close-btn" onclick="closeModal()">&times;</button>
    </div>
    <div class="cfg-dialog-body" id="cfg-body"></div>
    <div class="cfg-dialog-footer">
      <button class="btn-primary" onclick="showIconSets()" id="iconify-footer-btn" style="display:none;">📚 图标集</button>
      <button class="btn-cancel" onclick="closeModal()">取消</button>
      <button class="btn-save" onclick="saveModal()">保存</button>
    </div>
  </div>
</div>

<script>
${SHARED_JS}

let currentConfig = {};
let currentModal = '';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.querySelector('.nav-link[data-page="home"]')?.classList.add('active');
  loadConfig();
});

async function loadConfig() {
  try {
    const res = await api('GET', '/api/config');
    currentConfig = res.data || {};
    if (currentConfig.navBarLinks && typeof currentConfig.navBarLinks === 'object' && !Array.isArray(currentConfig.navBarLinks) && currentConfig.navBarLinks.links) {
      currentConfig.navBarLinks = currentConfig.navBarLinks.links;
    }
    updateAllSummaries();
    loadNavBarConfig(currentConfig.navBarLinks || []);
    loadMusicSongs(currentConfig.musicPlayerConfig?.local?.songs || []);
  } catch (e) {
    showMsg('加载配置失败: ' + e.message);
  }
}

function updateAllSummaries() {
  const config = currentConfig;
  ${composeSummaryJs()}
}

function openModal(id) {
  currentModal = id;
  const modal = document.getElementById('cfg-overlay');
  const title = document.getElementById('cfg-title');
  const body = document.getElementById('cfg-body');
  const titles = {
    basic: '📋 基础信息', navLinks: '🔗 导航栏',
    featurePages: '📑 特色页面', layout: '📐 布局',
    banner: '🎨 横幅模式', fullscreen: '🌄 全屏模式',
    anime: '📺 番剧配置', sidebarLayout: '📍 基础位置配置', profile: '👤 个人资料', announcement: '📢 公告配置', categories: '📁 组件', 'music-player': '🎵 音乐播放器配置', sakura: '🌸 樱花飘落特效', pio: '💬 Live2D 看板娘', umami: '📈 Umami 统计', 'post-layout': '📝 文章布局'
  };
  title.innerHTML = titles[id] || '配置';
  body.innerHTML = getModalContent(id);
  if (id === 'navLinks') renderNavBarLinks();
  if (id === 'announcement') initAnnouncementModal();
  modal.classList.add('active');
  const iconBtn = document.getElementById('iconify-footer-btn');
  if (iconBtn) {
    iconBtn.style.display = (id === 'navLinks' || id === 'profile') ? 'block' : 'none';
  }
}

function getModalContent(id) {
  const config = currentConfig;
${composeModalContent()}

  return '';
}

function applyModalChanges() {
  const id = currentModal;
  ${composeApplyJs()}
}
</script>`;