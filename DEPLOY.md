# Optik Imej Website - Cloudflare Pages 部署指南

## 🚀 快速部署

### 方法一：命令行部署

```bash
# 1. 进入项目目录
cd optic-imej-react

# 2. 安装依赖（如果还没安装）
npm install

# 3. 构建并部署
npm run deploy
```

首次部署时会提示登录 Cloudflare 账号。

### 方法二：GitHub 集成（推荐）

1. 将代码推送到 GitHub
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. 进入 **Workers & Pages**
4. 点击 **Create application** → **Pages** → **Connect to Git**
5. 选择你的仓库
6. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `optic-imej-react`
7. 点击 **Save and Deploy**

## 📁 项目结构

```
optic-imej-react/
├── dist/              # 构建输出目录 (Cloudflare Pages 读取这里)
├── public/            # 静态资源
├── src/               # 源代码
├── wrangler.jsonc     # Cloudflare 配置
└── package.json       # 项目配置
```

## ⚙️ 可用脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 本地预览构建结果 |
| `npm run deploy` | 构建并部署到 Cloudflare Pages |

## 🔗 部署后

部署成功后，你的网站将在以下地址可用：
- `https://optik-imej.pages.dev`
- 或你绑定的自定义域名
