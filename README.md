# Mizuki Content Manager

基于 Cloudflare Workers 构建的 Mizuki 博客内容管理系统，提供 Web 管理后台与 REST API，通过 GitHub API 直接读写 GitHub 仓库中的博客内容文件（TypeScript 配置、Markdown 文章等），实现无需数据库的纯 Git 驱动内容管理。

## 功能特性

- **📊 仪表盘总览** — 一站式查看各模块数据统计
- **📝 日记管理** — 增删改查日记条目（`src/data/diary.ts`）
- **🔗 友链管理** — 管理友情链接列表（`src/data/friends.ts`）
- **🚀 项目管理** — 管理项目展示（`src/data/projects.ts`）
- **💡 技能管理** — 管理技能标签（`src/data/skills.ts`）
- **📅 时间线管理** — 管理个人时间线事件（`src/data/timeline.ts`）
- **📱 设备管理** — 管理设备展示（`src/data/devices.ts`）
- **📄 文章管理** — 编辑 Markdown 文章（Frontmatter + 正文）（`src/content/posts/`）
- **🎬 番剧管理** — 追番列表管理（`src/data/anime.ts`）
- **🖼️ 相册管理** — 照片相册管理（`src/data/albums.ts`）
- **👤 关于页面** — 编辑个人介绍（`src/data/about.ts`）
- **⚙️ 站点配置** — 可视化编辑 `src/config.ts` 中所有配置项，包括导航栏、侧边栏、音乐播放器、樱花特效、Pio 看板娘、评论系统、Umami 统计等
- **🔀 内容同步** — 支持将配置仓库与内容仓库分离，同时写入两个独立仓库

## 技术栈

| 类别 | 技术 |
|------|------|
| 运行时 | Cloudflare Workers |
| 语言 | TypeScript |
| 路由 | [itty-router](https://github.com/kwhitley/itty-router) v4 |
| 部署 | Wrangler CLI / GitHub Actions |
| 存储 | GitHub API（读写仓库文件） |

## 项目结构

```
├── .github/workflows/deploy.yml   # GitHub Actions 自动部署
├── deploy.sh                      # Linux/macOS 手动部署脚本
├── deploy.ps1                     # Windows 手动部署脚本
├── wrangler.toml                  # Cloudflare Workers 配置
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                   # 入口：Worker fetch 处理 + Web UI HTML
    ├── github.ts                  # GitHub API 客户端封装
    ├── routes.ts                  # 全局路由注册
    ├── utils.ts                   # TypeScript 解析/生成 + Frontmatter 工具
    ├── types.ts                   # 数据模型类型定义
    ├── styles.ts                  # Web UI 样式
    ├── pages/                     # 各管理页面 HTML 模板
    │   ├── index.ts               # 页面注册
    │   ├── dashboard.ts
    │   ├── diary.ts
    │   ├── friends.ts
    │   ├── projects.ts
    │   ├── skills.ts
    │   ├── timeline.ts
    │   ├── devices.ts
    │   ├── posts.ts
    │   ├── anime.ts
    │   ├── albums.ts
    │   ├── about.ts
    │   └── home/                  # 首页各卡片组件
    └── routes/                    # API 路由处理
        ├── config.ts              # 站点配置读写
        ├── crud.ts                # 通用 CRUD 路由工厂
        ├── diary.ts
        ├── friends.ts
        ├── projects.ts
        ├── skills.ts
        ├── timeline.ts
        ├── devices.ts
        ├── posts.ts
        ├── anime.ts
        ├── albums.ts
        └── about.ts
```

---

## 部署指南

### 前置条件

1. [Node.js](https://nodejs.org/) 18+ 版本
2. [Cloudflare 账号](https://dash.cloudflare.com/sign-up)
3. [GitHub 账号](https://github.com/) 及一个存放博客源码的仓库

---

### 第一步：获取 Cloudflare API Token

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击右上角头像 → **My Profile**
3. 选择左侧 **API Tokens** → 点击 **Create Token**
4. 选择 **Edit Cloudflare Workers** 模板，或手动创建自定义 Token：
   - **Permissions**: `Account` → `Workers Scripts` → `Edit`
   - **Account Resources**: 选择你的账户（Include → 选择具体账户）
   - **Zone Resources**: 无需添加
5. 点击 **Continue to summary** → **Create Token**
6. **立即复制保存**生成的 Token（关闭页面后将不可见），记为 `CLOUDFLARE_API_TOKEN`

---

### 第二步：获取 Cloudflare Account ID

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在右侧栏或页面 URL 中找到你的 **Account ID**：
   - 方法一：进入 **Workers & Pages** 页面，右侧栏直接显示
   - 方法二：URL 格式为 `https://dash.cloudflare.com/{account_id}`
3. 复制此 ID，记为 `CLOUDFLARE_ACCOUNT_ID`

---

### 第三步：获取 GitHub Personal Access Token

1. 登录 GitHub → 右上角头像 → **Settings**
2. 左侧 **Developer settings** → **Personal access tokens** → **Fine-grained tokens**（推荐）或 **Tokens (classic)**
3. 点击 **Generate new token**：

   **Fine-grained token（推荐）**：
   - **Resource owner**: 选择你的 GitHub 账号或组织
   - **Repository access**: 选择 **Only select repositories**，然后选择你的博客仓库
   - **Permissions** → **Repository permissions**：
     - **Contents**: `Read and write`
     - **Metadata**: `Read-only`（默认自动勾选）
   - 点击 **Generate token**

   **Classic token**（备选）：
   - **Note**: 填写备注如 `Mizuki Content Manager`
   - **Expiration**: 按需选择
   - **Select scopes**: 勾选 `repo`（完整仓库访问权限）

4. **立即复制保存**生成的 Token（格式为 `ghp_xxxxxxxx` 或 `github_pat_xxxxxxxx`），记为 `GH_TOKEN`

---

### 第四步：环境变量说明

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `GH_TOKEN` | ✅ 是 | GitHub Personal Access Token，用于读写仓库内容 |
| `GH_REPO_OWNER` | ✅ 是 | GitHub 仓库所有者（用户名或组织名） |
| `GH_REPO_NAME` | ✅ 是 | GitHub 仓库名称 |
| `ENABLE_CONTENT_SYNC` | ❌ 否 | 是否启用内容同步到独立仓库，设为 `true` 时需同时配置下面两个变量 |
| `CONTENT_REPO_OWNER` | ❌ 否 | 内容仓库所有者（用户或组织名） |
| `CONTENT_REPO_NAME` | ❌ 否 | 内容仓库名称 |

**关于内容同步**：如果你的博客源码中，配置文件和内容文件位于不同仓库（例如配置文件在一个仓库，文章/数据在另一个仓库），则设置 `ENABLE_CONTENT_SYNC=true` 并填写对应仓库信息。启用后，文章、日记、友链等内容会写入内容仓库，而站点配置会写入配置仓库。路径会从 `src/content/`、`src/data/` 自动映射。

---

## 部署方式

### 方式一：GitHub Actions 自动部署（推荐）

1. Fork 或推送本项目到你的 GitHub 仓库

2. 在 GitHub 仓库页面进入 **Settings** → **Secrets and variables** → **Actions**

3. 点击 **New repository secret**，依次添加以下 Secrets：

   | Secret 名称 | 值 |
   |-------------|-----|
   | `CLOUDFLARE_API_TOKEN` | 第一步获取的 Token |
   | `CLOUDFLARE_ACCOUNT_ID` | 第二步获取的 Account ID |
   | `GH_TOKEN` | 第三步获取的 GitHub Token |
   | `GH_REPO_OWNER` | 你的博客仓库所有者 |
   | `GH_REPO_NAME` | 你的博客仓库名称 |
   | `CONTENT_REPO_OWNER` | （可选）内容仓库所有者 |
   | `CONTENT_REPO_NAME` | （可选）内容仓库名称 |
   | `ENABLE_CONTENT_SYNC` | （可选）`true` 或 `false` |

4. 推送代码到 `main` 或 `master` 分支，GitHub Actions 将自动执行：
   - 安装依赖
   - 通过 `wrangler secret put` 将 Secret 注入 Cloudflare
   - 执行 `wrangler deploy` 部署到 Cloudflare Workers

5. 你也可以手动触发部署：进入仓库 **Actions** 标签 → **Deploy to Cloudflare Workers** → **Run workflow** → 选择环境 → **Run workflow**

---

### 方式二：手动部署（命令行）

#### Linux / macOS

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd <project-dir>

# 2. 安装依赖
npm install

# 3. 设置环境变量
export CLOUDFLARE_API_TOKEN="你的Cloudflare API Token"
export CLOUDFLARE_ACCOUNT_ID="你的Cloudflare Account ID"
export GH_TOKEN="你的GitHub Token"
export GH_REPO_OWNER="你的GitHub用户名"
export GH_REPO_NAME="你的博客仓库名"

# 可选：内容仓库分离
export ENABLE_CONTENT_SYNC="true"
export CONTENT_REPO_OWNER="你的GitHub用户名"
export CONTENT_REPO_NAME="你的内容仓库名"

# 4. 设置 Cloudflare Secrets
echo "$GH_TOKEN" | npx wrangler secret put GH_TOKEN
echo "$GH_REPO_OWNER" | npx wrangler secret put GH_REPO_OWNER
echo "$GH_REPO_NAME" | npx wrangler secret put GH_REPO_NAME

# 5. 部署
npx wrangler deploy
```

或直接运行部署脚本：

```bash
chmod +x deploy.sh
./deploy.sh
```

#### Windows (PowerShell)

```powershell
# 1. 克隆项目
git clone <your-repo-url>
cd <project-dir>

# 2. 安装依赖
npm install

# 3. 设置环境变量
$env:CLOUDFLARE_API_TOKEN = "你的Cloudflare API Token"
$env:CLOUDFLARE_ACCOUNT_ID = "你的Cloudflare Account ID"
$env:GH_TOKEN = "你的GitHub Token"
$env:GH_REPO_OWNER = "你的GitHub用户名"
$env:GH_REPO_NAME = "你的博客仓库名"

# 可选：内容仓库分离
$env:ENABLE_CONTENT_SYNC = "true"
$env:CONTENT_REPO_OWNER = "你的GitHub用户名"
$env:CONTENT_REPO_NAME = "你的内容仓库名"

# 4. 设置 Cloudflare Secrets
echo $env:GH_TOKEN | npx wrangler secret put GH_TOKEN
echo $env:GH_REPO_OWNER | npx wrangler secret put GH_REPO_OWNER
echo $env:GH_REPO_NAME | npx wrangler secret put GH_REPO_NAME

# 5. 部署
npx wrangler deploy
```

或直接运行部署脚本：

```powershell
.\deploy.ps1
```

---

### 方式三：多环境部署

`wrangler.toml` 中预设了三个环境：

| 环境 | Worker 名称 | 部署命令 |
|------|------------|----------|
| 默认 (`default`) | `mizuki-content-manager` | `npx wrangler deploy` |
| 生产 (`production`) | `mizuki-content-manager-production` | `npx wrangler deploy --env production` |
| 预发布 (`staging`) | `mizuki-content-manager-staging` | `npx wrangler deploy --env staging` |

首次部署多环境时，需为每个环境单独设置 Secret：

```bash
npx wrangler secret put GH_TOKEN --env production
npx wrangler secret put GH_REPO_OWNER --env production
npx wrangler secret put GH_REPO_NAME --env production
```

---

## 本地开发

```bash
# 安装依赖
npm install

# 设置本地开发环境变量（创建 .env 文件）
# 注意：.env 文件已在 .gitignore 中，不会被提交

# 启动本地开发服务器
npm run dev

# 访问 http://localhost:8787 查看管理后台
```

在本地开发时，需要通过 `wrangler secret put` 或者环境变量设置 `GH_TOKEN`、`GH_REPO_OWNER`、`GH_REPO_NAME`。你也可以在 `wrangler.toml` 中通过 `[vars]` 设置非敏感变量：

```toml
[vars]
GH_REPO_OWNER = "your-username"
GH_REPO_NAME = "your-blog-repo"
```

> ⚠️ **安全提醒**：`GH_TOKEN` 等敏感信息不要直接写在 `wrangler.toml` 中，应使用 `wrangler secret put` 或 `.dev.vars` 文件。

---

## API 概览

系统提供丰富的 REST API 用于管理各类内容：

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/diary` | 获取日记列表 |
| `POST` | `/api/diary` | 创建日记 |
| `PUT` | `/api/diary/:id` | 更新日记 |
| `DELETE` | `/api/diary/:id` | 删除日记 |
| `GET` | `/api/friends` | 获取友链列表 |
| `POST` | `/api/friends` | 添加友链 |
| `PUT` | `/api/friends/:id` | 更新友链 |
| `DELETE` | `/api/friends/:id` | 删除友链 |
| `GET` | `/api/projects` | 获取项目列表 |
| `POST` | `/api/projects` | 添加项目 |
| `PUT` | `/api/projects/:id` | 更新项目 |
| `DELETE` | `/api/projects/:id` | 删除项目 |
| `GET` | `/api/skills` | 获取技能列表 |
| `POST` | `/api/skills` | 添加技能 |
| `PUT` | `/api/skills/:id` | 更新技能 |
| `DELETE` | `/api/skills/:id` | 删除技能 |
| `GET` | `/api/timeline` | 获取时间线 |
| `POST` | `/api/timeline` | 添加时间线事件 |
| `PUT` | `/api/timeline/:id` | 更新时间线事件 |
| `DELETE` | `/api/timeline/:id` | 删除时间线事件 |
| `GET` | `/api/devices` | 获取设备列表 |
| `POST` | `/api/devices` | 添加设备 |
| `PUT` | `/api/devices` | 更新设备 |
| `DELETE` | `/api/devices` | 删除设备 |
| `GET` | `/api/posts` | 获取文章列表 |
| `GET` | `/api/posts/:name` | 获取单篇文章 |
| `POST` | `/api/posts` | 创建文章（Markdown） |
| `PUT` | `/api/posts/:name` | 更新文章 |
| `DELETE` | `/api/posts/:name` | 删除文章 |
| `GET` | `/api/anime` | 获取番剧列表 |
| `GET` | `/api/anime/:title` | 获取单部番剧 |
| `POST` | `/api/anime` | 添加番剧 |
| `PUT` | `/api/anime/:title` | 更新番剧 |
| `DELETE` | `/api/anime/:title` | 删除番剧 |
| `GET` | `/api/anime/config` | 获取番剧配置 |
| `PUT` | `/api/anime/config` | 更新番剧配置 |
| `GET` | `/api/albums` | 获取相册列表 |
| `GET` | `/api/albums/:name` | 获取单个相册 |
| `POST` | `/api/albums` | 创建相册 |
| `PUT` | `/api/albums/:name` | 更新相册 |
| `DELETE` | `/api/albums/:name` | 删除相册 |
| `GET` | `/api/about` | 获取关于页面内容 |
| `PUT` | `/api/about` | 更新关于页面内容 |
| `GET` | `/api/config` | 获取站点全部配置 |
| `PUT` | `/api/config` | 更新站点配置 |

所有 API 响应的 JSON 格式统一为：

```json
{
  "success": true,
  "data": { ... }
}
```

---

## Web UI 页面

部署后访问 Worker URL 即可进入管理后台，内置以下页面：

| 路径 | 页面 | 功能 |
|------|------|------|
| `/` | 首页 | 各模块快捷入口卡片 |
| `/dashboard` | 总览 | 数据统计面板 |
| `/diary` | 日记 | 日记增删改查 |
| `/friends` | 友链 | 友链管理 |
| `/projects` | 项目 | 项目管理 |
| `/skills` | 技能 | 技能管理 |
| `/timeline` | 时间线 | 时间线管理 |
| `/devices` | 设备 | 设备管理 |
| `/posts` | 文章 | Markdown 文章编辑 |
| `/anime` | 番剧 | 追番列表管理 |
| `/albums` | 相册 | 相册管理 |
| `/about` | 关于 | 个人介绍编辑 |

---

## 许可证

MIT License