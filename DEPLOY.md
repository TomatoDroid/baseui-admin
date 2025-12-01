# GitHub Pages 部署指南

本项目已配置好 GitHub Pages 自动部署，你可以选择自动部署或手动部署。

## 方式一：自动部署（推荐）

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Build and deployment** 部分：
   - **Source** 选择：`GitHub Actions`

### 2. 推送代码触发部署

配置完成后，每次推送到 `main` 分支都会自动触发部署：

```bash
git add .
git commit -m "feat: 添加 GitHub Pages 部署配置"
git push origin main
```

### 3. 查看部署状态

- 前往仓库的 **Actions** 标签页
- 找到 `Deploy to GitHub Pages` 工作流
- 等待构建和部署完成（通常需要 2-5 分钟）

### 4. 访问你的网站

部署完成后，你的网站将在以下地址可访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

例如：`https://TomatoDroid.github.io/reactsse/`

## 方式二：手动部署

如果你想手动部署，可以使用以下步骤：

### 1. 安装依赖

```bash
pnpm install
```

### 2. 构建项目

```bash
# 设置正确的 base 路径（替换为你的仓库名）
$env:BASE_PATH="/<仓库名>/" # PowerShell
# 或
export BASE_PATH="/<仓库名>/" # Bash

pnpm build
```

### 3. 部署到 gh-pages 分支

```bash
pnpm deploy
```

这将会把 `dist` 目录的内容推送到 `gh-pages` 分支。

### 4. 配置 GitHub Pages

1. 进入 GitHub 仓库的 **Settings** → **Pages**
2. **Source** 选择：`Deploy from a branch`
3. **Branch** 选择：`gh-pages` / `root`
4. 点击 **Save**

## 故障排查

### 问题：页面显示 404

**原因**：base 路径配置不正确

**解决方案**：
1. 检查 `.github/workflows/deploy.yml` 中的 `BASE_PATH` 环境变量
2. 确保设置为 `/${{ github.event.repository.name }}/`
3. 重新推送代码触发部署

### 问题：样式或资源加载失败

**原因**：资源路径不正确

**解决方案**：
1. 确保 `vite.config.ts` 中配置了正确的 `base` 路径
2. 检查控制台错误信息，确认资源 URL 是否正确
3. 清除浏览器缓存后重试

### 问题：路由刷新后显示 404

**原因**：GitHub Pages 不支持客户端路由

**解决方案**：
- 已经在 `public/404.html` 中添加了 SPA 路由支持
- 如果仍有问题，考虑使用 Hash 路由

### 问题：Actions 部署失败

**原因**：权限不足

**解决方案**：
1. 进入仓库 **Settings** → **Actions** → **General**
2. 在 **Workflow permissions** 部分选择：
   - `Read and write permissions`
   - 勾选 `Allow GitHub Actions to create and approve pull requests`
3. 点击 **Save**

## 本地预览生产构建

在部署前，你可以本地预览生产构建：

```bash
# 构建
pnpm build

# 预览
pnpm serve
```

访问 `http://localhost:4173` 查看效果。

## 其他部署选项

如果你需要 SSR（服务器端渲染）功能，GitHub Pages 不支持。请考虑：

- **Vercel**：支持 TanStack Start SSR，零配置部署
- **Netlify**：支持 SSR，需要配置构建命令
- **Cloudflare Pages**：支持 SSR，需要 Worker 配置

## 环境变量

如果需要在生产环境中使用环境变量：

1. 在仓库 **Settings** → **Secrets and variables** → **Actions**
2. 添加需要的环境变量
3. 在 `.github/workflows/deploy.yml` 中引用：

```yaml
- name: 构建项目
  env:
    BASE_PATH: /${{ github.event.repository.name }}/
    VITE_API_URL: ${{ secrets.VITE_API_URL }}
  run: pnpm build
```

## 注意事项

- ⚠️ GitHub Pages 仅支持静态站点（SPA 模式）
- ⚠️ 确保 `.github/workflows/deploy.yml` 中的分支名与你的默认分支一致
- ⚠️ 首次部署可能需要 5-10 分钟，请耐心等待
- ⚠️ 如果仓库是私有的，确保 GitHub Pages 已启用（需要 GitHub Pro）

## 相关资源

- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [TanStack Start 文档](https://tanstack.com/start/latest)

