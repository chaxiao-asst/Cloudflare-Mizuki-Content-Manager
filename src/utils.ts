export function remapContentPath(path: string): string {
  if (path.startsWith('src/content/')) {
    return path.slice('src/content/'.length);
  }
  if (path.startsWith('src/data/')) {
    return path.slice('src/'.length);
  }
  if (path.startsWith('public/images/')) {
    return path.slice('public/'.length);
  }
  return path;
}

function findBracketExpr(content: string, startIndex: number): string | null {
  let firstBracket = -1;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '[' || content[i] === '{') {
      firstBracket = i;
      break;
    }
  }
  if (firstBracket === -1) return null;

  const openChar = content[firstBracket];
  const closeChar = openChar === '[' ? ']' : '}';
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escapeNext = false;

  for (let i = firstBracket; i < content.length; i++) {
    const char = content[i];

    if (escapeNext) { escapeNext = false; continue; }
    if (char === '\\') { escapeNext = true; continue; }
    if (inString) {
      if (char === stringChar) inString = false;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === openChar) depth++;
    else if (char === closeChar) depth--;

    if (depth === 0 && char === closeChar) {
      return content.substring(firstBracket, i + 1);
    }
  }

  return content.substring(firstBracket);
}

function findVariable(content: string, varName: string): RegExpMatchArray | null {
  const varPattern = new RegExp(`(?:export\\s+)?const\\s+${varName}\\s*(?::[^=]+)?\\s*=\\s*`, 's');
  return content.match(varPattern);
}

const LINK_PRESET_NAMES = ['Home', 'Archive', 'About', 'Friends', 'Anime', 'Diary', 'Albums', 'Projects', 'Skills', 'Timeline', 'Devices'];

function makeLinkPresetMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const name of LINK_PRESET_NAMES) {
    map[name] = name;
  }
  return map;
}

function resolveConstants(content: string): Record<string, string> {
  const constantValues: Record<string, string> = {};
  const constPattern = /^(?:export\s+)?const\s+([A-Z_][A-Z0-9_]*)\s*=\s*(.+?);/gm;
  let constMatch;
  while ((constMatch = constPattern.exec(content)) !== null) {
    constantValues[constMatch[1]] = constMatch[2].trim();
  }
  return constantValues;
}

export function parseTsVariable(content: string, varName: string): unknown {
  const varMatch = findVariable(content, varName);
  if (!varMatch) return null;

  const startIndex = varMatch.index! + varMatch[0].length;
  const dataStr = findBracketExpr(content, startIndex);
  if (!dataStr) return null;

  try {
    const constantValues = resolveConstants(content);
    const linkPresetMap = makeLinkPresetMap();

    const strings: Array<{ placeholder: string; value: string }> = [];
    const linkPresets: Array<{ placeholder: string; name: string }> = [];
    let stringCounter = 0;
    let lpCounter = 0;

    let result = dataStr;

    let inString = false;
    let stringChar = '';
    let escapeNext = false;
    let currentString = '';
    let tempResult = '';

    for (let i = 0; i < result.length; i++) {
      const char = result[i];

      if (escapeNext) {
        currentString += char;
        escapeNext = false;
        continue;
      }
      if (char === '\\') {
        currentString += char;
        escapeNext = true;
        continue;
      }
      if (inString) {
        if (char === stringChar) {
          const placeholder = `__STR_${stringCounter}__`;
          strings.push({ placeholder, value: currentString });
          tempResult += placeholder;
          stringCounter++;
          currentString = '';
          inString = false;
        } else {
          currentString += char;
        }
        continue;
      }
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
        continue;
      }
      tempResult += char;
    }

    result = tempResult;

    for (const [constName, constValue] of Object.entries(constantValues)) {
      const regex = new RegExp(`\\b${constName}\\b`, 'g');
      result = result.replace(regex, constValue);
    }

    inString = false;
    stringChar = '';
    escapeNext = false;
    let afterLpReplacement = '';

    for (let i = 0; i < result.length; i++) {
      const char = result[i];

      if (escapeNext) {
        afterLpReplacement += char;
        escapeNext = false;
        continue;
      }
      if (char === '\\') {
        afterLpReplacement += char;
        escapeNext = true;
        continue;
      }
      if (inString) {
        afterLpReplacement += char;
        if (char === stringChar) {
          stringChar = '';
          inString = false;
        }
        continue;
      }
      if (char === '"' || char === "'" || char === '`') {
        inString = true;
        stringChar = char;
        afterLpReplacement += char;
        continue;
      }

      let matched = false;
      for (const [preset, name] of Object.entries(linkPresetMap)) {
        const lpPattern = `LinkPreset.${preset}`;
        if (result.slice(i, i + lpPattern.length) === lpPattern) {
          const placeholder = `__LP_${lpCounter}__`;
          linkPresets.push({ placeholder, name });
          afterLpReplacement += placeholder;
          i += lpPattern.length - 1;
          lpCounter++;
          matched = true;
          break;
        }
      }

      if (!matched) {
        afterLpReplacement += char;
      }
    }

    result = afterLpReplacement;

    result = result
      .replace(/\/\/.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":')
      .replace(/,\s*([}\]])/g, '$1');

    for (const { placeholder, value } of strings) {
      const escapedValue = value
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      result = result.replace(placeholder, `"${escapedValue}"`);
    }

    for (const { placeholder, name } of linkPresets) {
      result = result.replace(placeholder, JSON.stringify({ _lp: name }));
    }

    return JSON.parse(result);
  } catch (e) {
    return { error: (e as Error).message, jsonStr: dataStr };
  }
}

export function generateTsContent(
  varName: string,
  data: unknown,
  interfaceType: string
): string {
  const content = generateTsObject(data, 0);
  return `export const ${varName}: ${interfaceType} = ${content};`;
}

function generateTsObject(obj: unknown, indentLevel: number): string {
  const indent = '\t'.repeat(indentLevel);
  const innerIndent = '\t'.repeat(indentLevel + 1);

  if (obj === null || obj === undefined) {
    return 'null';
  }

  if (typeof obj === 'string') {
    if (obj.startsWith('__LP_') && obj.endsWith('__')) {
      const presetName = obj.slice(4, -2);
      return `LinkPreset.${presetName}`;
    }
    return JSON.stringify(obj);
  }

  if (typeof obj === 'number' || typeof obj === 'boolean') {
    return String(obj);
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const isSimpleArray = obj.every(item =>
      typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean'
    );

    if (isSimpleArray && obj.length <= 3) {
      const items = obj.map(item => generateTsObject(item, indentLevel + 1)).join(', ');
      return `[${items}]`;
    }

    const items = obj.map(item => `${innerIndent}${generateTsObject(item, indentLevel + 1)}`).join(',\n');
    return `[\n${items}\n${indent}]`;
  }

  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    const lpObj = obj as Record<string, unknown>;
    if (lpObj._lp && typeof lpObj._lp === 'string') {
      return `LinkPreset.${lpObj._lp}`;
    }
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';

    const items = keys.map(key => {
      const value = (obj as Record<string, unknown>)[key];
      const valueStr = generateTsObject(value, indentLevel + 1);
      return `${innerIndent}${key}: ${valueStr}`;
    }).join(',\n');

    return `{\n${items}\n${indent}}`;
  }

  return String(obj);
}

export function deepMerge(target: unknown, source: unknown): unknown {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return source;
  if (Array.isArray(source)) return source;
  if (Array.isArray(target)) return source;

  const result = { ...(target as Record<string, unknown>) };
  for (const key of Object.keys(source as Record<string, unknown>)) {
    const sourceVal = (source as Record<string, unknown>)[key];
    if (sourceVal === undefined) continue;
    const targetVal = (result as Record<string, unknown>)[key];
    if (
      key in result &&
      typeof targetVal === 'object' &&
      targetVal !== null &&
      !Array.isArray(targetVal) &&
      typeof sourceVal === 'object' &&
      sourceVal !== null &&
      !Array.isArray(sourceVal)
    ) {
      result[key] = deepMerge(targetVal, sourceVal);
    } else {
      result[key] = sourceVal;
    }
  }
  return result;
}

export function updateTsVariable(
  content: string,
  varName: string,
  data: unknown,
  interfaceType: string
): string {
  const varMatch = findVariable(content, varName);

  if (!varMatch) {
    return content + (content.endsWith('\n') ? '' : '\n') + generateTsContent(varName, data, interfaceType) + '\n';
  }

  const startIndex = varMatch.index! + varMatch[0].length;
  const bracketExpr = findBracketExpr(content, startIndex);

  if (!bracketExpr) {
    const afterDecl = content.substring(startIndex);
    const simpleMatch = afterDecl.match(/^(-?\d+(?:\.\d+)?|true|false)\s*;/);
    if (simpleMatch) {
      const after = afterDecl.substring(simpleMatch[0].length);
      const newValue = generateTsObject(data, 0);
      return content.substring(0, varMatch.index!) + content.substring(varMatch.index!, startIndex) + newValue + ';' + after;
    }
    return content + (content.endsWith('\n') ? '' : '\n') + generateTsContent(varName, data, interfaceType) + '\n';
  }

  const bracketStart = content.indexOf(bracketExpr, startIndex);
  const bracketEnd = bracketStart + bracketExpr.length;
  const newContent = generateTsObject(data, 0);
  const before = content.substring(0, varMatch.index!);
  const after = content.substring(bracketEnd);

  let result = before + content.substring(varMatch.index!, startIndex) + newContent + after;

  const siteLangMatch = content.match(/const\s+SITE_LANG\s*=\s*"([^"]*)"/);
  const siteTimezoneMatch = content.match(/const\s+SITE_TIMEZONE\s*=\s*(-?\d+)/);

  if (siteLangMatch) {
    const escaped = siteLangMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(`(lang:\\s*)"${escaped}"`, 'g'), '$1SITE_LANG');
  }

  if (siteTimezoneMatch) {
    const tzValue = siteTimezoneMatch[1];
    result = result.replace(new RegExp(`(timeZone:\\s*)${tzValue}\\b`, 'g'), '$1SITE_TIMEZONE');
  }

  return result;
}

export function parseFrontmatter(content: string): { meta: Record<string, unknown>; body: string } {
  const meta: Record<string, unknown> = {};

  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n?/);

  if (frontmatterMatch) {
    const frontmatterContent = frontmatterMatch[1];
    const body = content.slice(frontmatterMatch[0].length);

    const lines = frontmatterContent.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) continue;

      const colonIndex = trimmedLine.indexOf(':');
      if (colonIndex !== -1) {
        const key = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim();

        if (key) {
          meta[key] = parseYamlValue(value);
        }
      }
    }

    return { meta, body: body.trim() };
  }

  return { meta, body: content.trim() };
}

function parseYamlValue(value: string): unknown {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  const num = parseFloat(value);
  if (!isNaN(num) && value === num.toString()) return num;

  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim();
    if (!inner) return [];
    try {
      return JSON.parse(value);
    } catch {
      return inner.split(',').map(s => {
        let item = s.trim();
        if ((item.startsWith('"') && item.endsWith('"')) ||
            (item.startsWith("'") && item.endsWith("'"))) {
          item = item.slice(1, -1);
        }
        return item;
      });
    }
  }

  if (value.startsWith('{') && value.endsWith('}')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value.replace(/['"]/g, '');
}

const DATE_FIELDS = new Set(['published', 'pubDate', 'date', 'updated']);

export function generateFrontmatter(meta: Record<string, unknown>, body: string): string {
  let frontmatter = '---\n';

  Object.entries(meta).forEach(([key, value]) => {
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      return;
    }
    if (Array.isArray(value)) {
      frontmatter += `${key}: ${JSON.stringify(value)}\n`;
    } else if (typeof value === 'boolean' || typeof value === 'number') {
      frontmatter += `${key}: ${value}\n`;
    } else if (DATE_FIELDS.has(key)) {
      frontmatter += `${key}: ${value}\n`;
    } else {
      frontmatter += `${key}: "${value}"\n`;
    }
  });

  frontmatter += '---\n\n';
  frontmatter += body;

  return frontmatter;
}