# 部署指南

本指南将帮助你快速将项目部署到 Vercel，实现自动打包和部署。

## 前置准备

1. 确保项目已推送到 GitHub
2. 拥有 Vercel 账号（可使用 GitHub 账号登录）

## 部署步骤

### 第一步：连接 Vercel

1. 访问 [https://vercel.com](https://vercel.com)
2. 点击右上角 "Sign Up" 或 "Log In"
3. 选择 "Continue with GitHub" 使用 GitHub 账号登录

### 第二步：导入项目

1. 登录后，点击 "Add New Project"
2. 在项目列表中找到你的 `reactsse` 仓库
3. 点击 "Import" 导入项目

### 第三步：配置项目

Vercel 会自动检测项目配置，但你可以手动确认以下设置：

- **Framework Preset**: Other（或 Vite）
- **Root Directory**: `./`
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`
- **Node.js Version**: 20.x

> 💡 提示：项目已包含 `vercel.json` 配置文件，Vercel 会自动读取这些配置。

### 第四步：环境变量（可选）

如果项目需要环境变量，可以在 "Environment Variables" 部分添加：

- 点击 "Environment Variables"
- 添加所需的变量（如 API 密钥等）
- 选择应用环境（Production、Preview、Development）

### 第五步：部署

1. 点击 "Deploy" 按钮
2. 等待构建完成（通常需要 2-5 分钟）
3. 部署成功后，你会看到：
   - ✅ 部署成功提示
   - 🌐 生产环境 URL（格式：`https://your-project.vercel.app`）

### 第六步：更新 README

部署成功后，更新 `README.md` 中的体验地址：

1. 找到 README 中的徽章部分
2. 将 `https://your-project.vercel.app` 替换为实际的 Vercel 地址
3. 将 `your-username/reactsse` 替换为你的 GitHub 用户名和仓库名

示例：
```markdown
[![在线体验](https://img.shields.io/badge/在线体验-点击访问-blue?style=for-the-badge)](https://reactsse.vercel.app)
[![GitHub Actions](https://img.shields.io/github/actions/workflow/status/your-username/reactsse/ci.yml?label=CI&logo=github&style=for-the-badge)](https://github.com/your-username/reactsse/actions)
```

## 自动部署

配置完成后，每次你：

- ✅ 推送到 `main` 分支 → 自动部署到生产环境
- ✅ 创建 Pull Request → 自动创建预览环境
- ✅ 合并 PR → 自动更新生产环境

## 查看部署状态

- **Vercel Dashboard**: 访问 [vercel.com/dashboard](https://vercel.com/dashboard) 查看所有部署
- **GitHub Actions**: 访问仓库的 "Actions" 标签页查看 CI 状态

## 自定义域名（可选）

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的自定义域名
3. 按照提示配置 DNS 记录
4. 等待 DNS 生效（通常几分钟到几小时）

## 故障排查

### 构建失败

1. 检查 Vercel 构建日志中的错误信息
2. 确认 Node.js 版本是否为 20.x
3. 确认 `package.json` 中的 `packageManager` 字段正确
4. 检查是否有缺失的环境变量

### 部署后页面空白

1. 检查 `vercel.json` 配置是否正确
2. 确认 `dist` 目录是否包含构建产物
3. 查看浏览器控制台的错误信息

### SSR 相关问题

1. 确认 Vercel 已正确识别 SSR 项目
2. 检查 `vite.config.ts` 中的 TanStack Start 插件配置
3. 查看服务器端日志（Vercel Functions 日志）

## 其他部署平台

### Netlify

1. 访问 [netlify.com](https://www.netlify.com)
2. 连接 GitHub 仓库
3. 构建设置：
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Environment variables: `NODE_VERSION=20`, `PNPM_VERSION=10`

### Cloudflare Pages

1. 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
2. 连接 GitHub 仓库
3. 构建设置：
   - Framework preset: Vite
   - Build command: `pnpm build`
   - Build output directory: `dist`

## 需要帮助？

- 📖 [Vercel 文档](https://vercel.com/docs)
- 💬 [TanStack Start 文档](https://tanstack.com/start/latest)
- 🐛 [GitHub Issues](https://github.com/your-username/reactsse/issues)

