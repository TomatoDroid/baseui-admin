# GitHub Pages 快速设置指南

## 一键设置步骤

### 1. 启用 GitHub Pages（只需一次）

1. 进入仓库 → **Settings** → **Pages**
2. Source 选择：**GitHub Actions**
3. 点击 **Save**

### 2. 更新 README 中的地址

在 `README.md` 中替换：
- `your-username` → 你的 GitHub 用户名
- `reactsse` → 你的仓库名（如果不同）

### 3. 推送代码

```bash
git add .
git commit -m "配置 GitHub Pages"
git push
```

### 4. 等待部署完成

- 访问 **Actions** 标签页查看进度
- 部署完成后访问：`https://your-username.github.io/reactsse/`

## 自动部署

✅ 推送到 `main` 分支 → 自动部署  
✅ 合并 PR → 自动更新  
✅ 手动触发 → Actions → Run workflow

## 配置说明

- **Workflow**: `.github/workflows/deploy.yml` - 自动构建和部署
- **Base 路径**: `vite.config.ts` - 自动设置为仓库名路径
- **输出目录**: `dist/` - 构建产物目录

## 故障排查

如果部署失败：
1. 检查 Actions 日志
2. 确认 Pages 设置中 Source 为 "GitHub Actions"
3. 确认仓库是公开的（或使用 Pro/Team）

## 访问地址格式

```
https://[用户名].github.io/[仓库名]/
```

例如：`https://liuzhen6.github.io/reactsse/`

