import { Router } from 'itty-router';
import { GitHubClient } from '../github';
import { parseTsVariable, updateTsVariable, deepMerge } from '../utils';

const DEFAULT_CONFIGS: Record<string, unknown> = {
  footer: { enable: false, customHtml: '' },
  anime: { mode: 'local', bangumi: { userId: '' }, bilibili: { vmid: '', fetchOnDev: false, coverMirror: '', useWebp: true } },
  sidebarLayoutConfig: { properties: [], components: { left: [], right: [], drawer: [] }, defaultAnimation: { enable: true, baseDelay: 0, increment: 50 }, responsive: { breakpoints: { mobile: 768, tablet: 1280, desktop: 1280 } } },
  profileConfig: { avatar: '', name: '', bio: '', typewriter: { enable: true, speed: 80 }, links: [] },
  announcementConfig: { title: '', content: '', closable: true, link: { enable: false, text: '', url: '', external: false } },
  musicPlayerConfig: { enable: true, mode: 'meting', meting_api: 'https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r', id: '', server: 'netease', type: 'playlist', showFloatingPlayer: true, floatingEntryMode: 'fab', local: { songs: [] } },
  sakuraConfig: { enable: false, sakuraNum: 21, limitTimes: -1, size: { min: 0.5, max: 1.1 }, opacity: { min: 0.3, max: 0.9 }, speed: { horizontal: { min: -1.7, max: -1.2 }, vertical: { min: 1.5, max: 2.2 }, rotation: 0.03, fadeSpeed: 0.03 }, zIndex: 100 },
  pioConfig: { enable: true, models: ["/pio/models/pio/model.json"], position: "left", width: 280, height: 250, mode: "draggable", hiddenOnMobile: true, dialog: { welcome: "Welcome to Mizuki Website!", touch: ["What are you doing?", "Stop touching me!", "HENTAI!", "Don't bully me like that!"], home: "Click here to go back to homepage!", skin: ["Want to see my new outfit?", "The new outfit looks great~"], close: "QWQ See you next time~", link: "https://github.com/matsuzaka-yuki/Mizuki" } },
  umamiConfig: { shareUrl: '', scriptUrl: '', websiteId: '' },
  showLastModified: true,
  expressiveCodeConfig: { theme: 'github-dark', hideDuringThemeTransition: true },
  shareConfig: { enable: true },
  licenseConfig: { enable: true, name: 'CC BY-NC-SA 4.0', url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' },
  toc: { enable: true, depth: 2, useJapaneseBadge: true },
  commentConfig: { enable: false, system: 'twikoo', twikoo: { envId: '', lang: 'SITE_LANG' }, giscus: {} },
};

type ParsedResult = unknown;

function withDefault(result: Record<string, unknown>, key: string, varName: string, parseResult: ParsedResult): void {
  if (parseResult && typeof parseResult === 'object' && !('error' in parseResult)) {
    result[key] = parseResult;
  } else {
    result[key] = DEFAULT_CONFIGS[varName] ?? DEFAULT_CONFIGS[key];
  }
}

function parseConfigSections(fileContent: string, varNames: [string, string][]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [varName, key] of varNames) {
    const parseResult = parseTsVariable(fileContent, varName);
    withDefault(result, key, varName, parseResult);
  }
  return result;
}

const GET_SECTIONS: [string, string][] = [
  ['fullscreenWallpaperConfig', 'fullscreenWallpaper'],
  ['navBarConfig', 'navBarLinks'],
  ['footerConfig', 'footer'],
  ['animeConfig', 'anime'],
  ['sidebarLayoutConfig', 'sidebarLayoutConfig'],
  ['profileConfig', 'profileConfig'],
  ['announcementConfig', 'announcementConfig'],
  ['musicPlayerConfig', 'musicPlayerConfig'],
  ['sakuraConfig', 'sakuraConfig'],
  ['pioConfig', 'pioConfig'],
  ['umamiConfig', 'umamiConfig'],
  ['showLastModified', 'showLastModified'],
  ['expressiveCodeConfig', 'expressiveCodeConfig'],
  ['shareConfig', 'shareConfig'],
  ['licenseConfig', 'licenseConfig'],
  ['toc', 'toc'],
  ['commentConfig', 'commentConfig'],
];

const PUT_SECTIONS = [
  ...GET_SECTIONS.filter(([v]) => v !== 'siteConfig'),
];

export function createConfigRouter(githubClient: GitHubClient) {
  const router = Router();

  router.get('/api/config', async () => {
    try {
      const file = await githubClient.getFile('src/config.ts');
      const parseResult = parseTsVariable(file.content, 'siteConfig');

      if (!parseResult) {
        return Response.json({
          success: false,
          message: '无法解析配置文件，未找到 siteConfig 变量',
          debug: { contentLength: file.content.length, contentPreview: file.content.substring(0, 500) }
        }, { status: 500 });
      }

      if (typeof parseResult === 'object' && parseResult !== null) {
        if ('error' in parseResult) {
          console.error('Config parse error:', parseResult.error);
          console.error('JSON string that failed:', (parseResult as { jsonStr: string }).jsonStr);
          return Response.json({
            success: false,
            message: '解析配置文件时出错: ' + (parseResult as { error: string }).error
          }, { status: 500 });
        }

        const result = { ...(parseResult as Record<string, unknown>) };
        const sections = parseConfigSections(file.content, GET_SECTIONS);
        for (const [key, value] of Object.entries(sections)) {
          result[key] = value;
        }

        const siteConfigData = parseResult as Record<string, unknown>;
        const optionalKeys = ['pioConfig', 'shareConfig', 'licenseConfig'];
        for (const key of optionalKeys) {
          if (!result[key] && siteConfigData[key]) {
            result[key] = siteConfigData[key];
          }
        }

        return Response.json({ success: true, data: result });
      }

      return Response.json({ success: true, data: {} });
    } catch (error) {
      console.error('API error:', error);
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  router.put('/api/config', async (request) => {
    try {
      const config = await request.json() as Record<string, unknown>;
      const {
        fullscreenWallpaper, navBarLinks, footer, anime, sidebarLayoutConfig,
        profileConfig, announcementConfig, musicPlayerConfig, sakuraConfig,
        pioConfig, umamiConfig, showLastModified, expressiveCodeConfig,
        shareConfig, licenseConfig, toc, commentConfig, ...siteConfigData
      } = config;

      const file = await githubClient.getFile('src/config.ts');

      const existingSiteConfig = parseTsVariable(file.content, 'siteConfig');
      let mergedSiteConfig = siteConfigData;
      if (existingSiteConfig && typeof existingSiteConfig === 'object' && existingSiteConfig !== null && !('error' in existingSiteConfig)) {
        mergedSiteConfig = deepMerge(existingSiteConfig, siteConfigData) as Record<string, unknown>;
      }
      const ms = mergedSiteConfig as Record<string, unknown>;
      if (!('diaryApiUrl' in ms)) ms.diaryApiUrl = '';

      if (pioConfig) ms.pioConfig = pioConfig;
      if (shareConfig) ms.shareConfig = shareConfig;
      if (licenseConfig) ms.licenseConfig = licenseConfig;

      let content = updateTsVariable(file.content, 'siteConfig', mergedSiteConfig, 'SiteConfig');

      content = conditionalUpdate(content, file.content, 'fullscreenWallpaperConfig', fullscreenWallpaper as Record<string, unknown> | undefined, 'FullscreenWallpaperConfig', true);

      if (navBarLinks) {
        let linksArray = navBarLinks;
        if (typeof navBarLinks === 'object' && navBarLinks !== null && !Array.isArray(navBarLinks) && 'links' in navBarLinks) {
          linksArray = (navBarLinks as Record<string, unknown>).links;
        }
        content = updateTsVariable(content, 'navBarConfig', { links: linksArray }, 'NavBarConfig');
      }

      const keyUpdates: [string, string | undefined, string, boolean][] = [
        ['sidebarLayoutConfig', 'sidebarLayoutConfig', 'SidebarLayoutConfig', false],
        ['footer', 'footerConfig', 'FooterConfig', false],
        ['anime', 'animeConfig', 'Record<string, unknown>', false],
        ['profileConfig', 'profileConfig', 'ProfileConfig', false],
        ['announcementConfig', 'announcementConfig', 'AnnouncementConfig', false],
        ['musicPlayerConfig', 'musicPlayerConfig', 'MusicPlayerConfig', false],
        ['sakuraConfig', 'sakuraConfig', 'SakuraConfig', false],
        ['pioConfig', 'pioConfig', 'PioConfig', false],
        ['umamiConfig', 'umamiConfig', 'UmamiConfig', false],
        ['expressiveCodeConfig', 'expressiveCodeConfig', 'Record<string, unknown>', false],
        ['shareConfig', 'shareConfig', 'ShareConfig', false],
        ['licenseConfig', 'licenseConfig', 'LicenseConfig', false],
        ['toc', 'toc', 'TocConfig', false],
        ['commentConfig', 'commentConfig', 'CommentConfig', false],
      ];

      for (const [configKey, varName, typeName] of keyUpdates) {
        const val = config[configKey] as Record<string, unknown> | undefined;
        if (val) {
          content = conditionalUpdate(content, file.content, varName!, val, typeName, false);
        }
      }

      if (showLastModified !== undefined) {
        content = updateTsVariable(content, 'showLastModified', showLastModified, 'boolean');
      }

      await githubClient.updateFile('src/config.ts', content, 'Update site config', file.sha);
      return Response.json({ success: true, data: config });
    } catch (error) {
      console.error('API error:', error);
      return Response.json({ success: false, message: (error as Error).message }, { status: 500 });
    }
  });

  return router;
}

function conditionalUpdate(
  content: string,
  originalContent: string,
  varName: string,
  value: Record<string, unknown> | undefined,
  interfaceType: string,
  useDeepMerge: boolean
): string {
  if (!value) return content;

  if (useDeepMerge) {
    const existing = parseTsVariable(originalContent, varName);
    let merged = value;
    if (existing && typeof existing === 'object' && existing !== null && !('error' in existing)) {
      merged = deepMerge(existing, value) as Record<string, unknown>;
    }
    return updateTsVariable(content, varName, merged, interfaceType);
  }

  return updateTsVariable(content, varName, value, interfaceType);
}