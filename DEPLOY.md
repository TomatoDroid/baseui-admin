# GitHub Pages 部署指南

本指南将帮助你快速将项目部署到 GitHub Pages，实现自动打包和部署。

## 前置准备

1. ✅ 确保项目已推送到 GitHub
2. ✅ 确保仓库是公开的（或使用 GitHub Pro/Team 账户）

## 部署步骤

### 第一步：启用 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 "Source" 部分：
   - 选择 **GitHub Actions**（不是 "Deploy from a branch"）
   - 点击 **Save**

### 第二步：更新 README 中的地址

1. 打开 `README.md`
2. 找到徽章部分，替换以下内容：
   - `your-username` → 你的 GitHub 用户名
   - `reactsse` → 你的仓库名（如果不同）

示例：
```markdown
[![在线体验](https://img.shields.io/badge/在线体验-点击访问-blue?style=for-the-badge)](https://your-username.github.io/reactsse/)
```

### 第三步：推送代码触发部署

```bash
git add .
git commit -m "配置 GitHub Pages 自动部署"
git push origin main
```

### 第四步：查看部署状态

1. 访问仓库的 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" workflow 的运行状态
3. 等待部署完成（通常需要 2-5 分钟）

### 第五步：访问网站

部署成功后，访问：
```
https://your-username.github.io/reactsse/
```

> 💡 提示：首次部署可能需要几分钟时间，请耐心等待。

## 自动部署流程

配置完成后，每次你：

- ✅ **推送到 `main` 分支** → 自动构建并部署到 GitHub Pages
- ✅ **合并 Pull Request** → 自动更新网站
- ✅ **手动触发** → 在 Actions 页面点击 "Run workflow"

## 工作原理

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - 监听 `main` 分支的推送
   - 自动安装依赖（pnpm）
   - 构建项目（`pnpm build`）
   - 部署到 `gh-pages` 分支

2. **Vite 配置** (`vite.config.ts`)
   - 自动设置 `base` 路径为仓库名
   - 确保路由在 GitHub Pages 上正常工作

3. **GitHub Pages**
   - 从 `gh-pages` 分支提供静态文件
   - 自动生成 HTTPS 证书

## 查看部署历史

- **Actions 页面**：查看所有部署记录和日志
- **Settings → Pages**：查看部署状态和自定义域名设置

## 自定义域名（可选）

1. 在仓库的 **Settings → Pages** 中
2. 找到 "Custom domain" 部分
3. 输入你的域名（如 `example.com`）
4. 按照提示配置 DNS 记录：
   - 添加 CNAME 记录指向 `your-username.github.io`
   - 或添加 A 记录指向 GitHub Pages 的 IP 地址
5. 等待 DNS 生效（通常几分钟到几小时）

## 故障排查

### 构建失败

1. **检查 Actions 日志**
   - 访问仓库的 **Actions** 标签页
   - 点击失败的 workflow 查看详细日志

2. **常见问题**
   - Node.js 版本不匹配 → 已配置为 Node 20
   - pnpm 版本问题 → 已锁定版本
   - 依赖安装失败 → 检查 `pnpm-lock.yaml` 是否提交

### 部署后页面空白

1. **检查 base 路径**
   - 确认 `vite.config.ts` 中的 `base` 配置正确
   - 应该是 `/your-repo-name/` 格式

2. **检查路由**
   - GitHub Pages 不支持客户端路由的刷新
   - 确保使用 HashRouter 或配置 404.html 重定向

3. **检查浏览器控制台**
   - 打开开发者工具查看错误信息
   - 检查资源路径是否正确

### 404 错误

1. **检查文件路径**
   - 确认所有资源路径使用相对路径
   - 检查 `public` 目录中的文件是否正确复制

2. **检查路由配置**
   - 确认路由配置支持 GitHub Pages 的 base 路径

### 部署状态显示失败

1. **检查权限设置**
   - 在 **Settings → Actions → General** 中
   - 确保 "Workflow permissions" 设置为 "Read and write permissions"

2. **重新运行 workflow**
   - 在 Actions 页面点击失败的 workflow
   - 点击 "Re-run all jobs"

## 本地测试

在部署前，可以本地测试构建：

```bash
# 设置 base 路径（替换为你的仓库名）
export BASE_PATH=/reactsse/

# 构建项目
pnpm build

# 预览构建结果
pnpm serve
```

## 注意事项

- ⚠️ **GitHub Pages 仅支持静态站点**：SSR 功能会被禁用，项目会以 SPA 模式运行
- ⚠️ **Base 路径**：已自动配置，但需要确保路由使用相对路径
- ⚠️ **构建时间**：每次部署需要 2-5 分钟，请耐心等待
- ⚠️ **仓库可见性**：公开仓库免费，私有仓库需要 GitHub Pro/Team

## 需要帮助？

- 📖 [GitHub Pages 文档](https://docs.github.com/en/pages)
- 📖 [GitHub Actions 文档](https://docs.github.com/en/actions)
- 💬 [TanStack Start 文档](https://tanstack.com/start/latest)
- 🐛 [提交 Issue](https://github.com/your-username/reactsse/issues)

## 其他部署选项

如果需要 SSR 功能，可以考虑：

- **Vercel**：支持 SSR，自动检测 TanStack Start
- **Netlify**：支持 SSR，需要配置构建命令
- **Cloudflare Pages**：支持 SSR，需要 Worker 配置
