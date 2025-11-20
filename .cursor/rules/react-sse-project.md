# React SSE 项目开发规则

## 项目概述

这是一个基于以下技术栈的现代 React 应用：
- **React 19** + **TypeScript**
- **Vite** 作为构建工具
- **TanStack Router** (文件路由系统)
- **TanStack Query** (数据获取和缓存)
- **TanStack Form** (表单管理)
- **TanStack Table** (数据表格)
- **shadcn/ui** (基于 Radix UI 的组件库)
- **Tailwind CSS 4** (样式)
- **Zustand** (状态管理)
- **Zod** (数据验证)
- **pnpm** (包管理器)

## 代码风格和规范

### TypeScript

1. **严格模式**: 项目使用 TypeScript 严格模式，必须遵循所有类型检查
2. **类型定义**: 
   - 优先使用 `interface` 定义对象类型
   - 使用 `type` 定义联合类型、工具类型等
   - 避免使用 `any`，必要时使用 `unknown`
3. **路径别名**: 使用 `@/*` 指向 `./src/*`
   - 示例: `import { cn } from '@/lib/utils'`
   - 示例: `import { Button } from '@/components/ui/button'`

### 文件命名

1. **组件文件**: 使用 kebab-case
   - 示例: `user-profile.tsx`, `data-table.tsx`
2. **工具文件**: 使用 kebab-case
   - 示例: `utils.ts`, `auth-store.ts`
3. **路由文件**: 遵循 TanStack Router 约定
   - 路由文件: `route.tsx` 或 `index.tsx`
   - 布局文件: `__root.tsx`, `_authenticated.tsx`
   - 动态路由: `$id.tsx`, `$slug.tsx`

### React 组件

1. **函数组件**: 优先使用函数组件和 Hooks
2. **组件导出**: 
   - 默认导出用于路由组件
   - 命名导出用于可复用组件
3. **Props 类型**: 使用 `interface` 定义 Props
   ```typescript
   interface ButtonProps {
     children: React.ReactNode
     variant?: 'default' | 'destructive'
   }
   ```
4. **样式类名**: 使用 `cn()` 工具函数合并 Tailwind 类名
   ```typescript
   import { cn } from '@/lib/utils'
   <div className={cn('base-class', condition && 'conditional-class')} />
   ```

## TanStack Router 规范

1. **文件路由**: 路由基于文件系统结构
   - `src/routes/` 目录下的文件自动成为路由
   - 使用 `route.tsx` 或 `index.tsx` 定义路由组件
2. **路由布局**:
   - `__root.tsx`: 根布局
   - `_authenticated.tsx`: 需要认证的布局
   - `(auth)`: 认证相关路由组
   - `(errors)`: 错误页面路由组
3. **路由上下文**: 使用 `createRootRouteWithContext` 传递 QueryClient
4. **数据加载**: 使用 `loader` 函数预加载数据
   ```typescript
   export const Route = createFileRoute('/users')({
     loader: async ({ context }) => {
       return context.queryClient.ensureQueryData(...)
     },
   })
   ```

## TanStack Query 规范

1. **Query Keys**: 使用数组形式，保持层次结构
   ```typescript
   ['users']
   ['users', userId]
   ['users', userId, 'posts']
   ```
2. **Query Functions**: 在 `src/integrations/tanstack-query/` 中定义
3. **Mutations**: 使用 `useMutation` 处理数据变更
4. **SSR 集成**: 使用 `@tanstack/react-router-ssr-query` 进行 SSR 数据预取

## TanStack Form 规范

1. **表单定义**: 使用 `useForm` Hook
2. **字段验证**: 使用 Zod schema
3. **字段组件**: 使用 `src/components/form/components/` 中的表单组件
4. **表单上下文**: 使用 `FormProvider` 提供表单上下文

## shadcn/ui 组件使用

1. **组件位置**: 所有 UI 组件在 `src/components/ui/` 目录
2. **组件导入**: 从 `@/components/ui/` 导入
   ```typescript
   import { Button } from '@/components/ui/button'
   import { Card, CardHeader, CardTitle } from '@/components/ui/card'
   ```
3. **组件变体**: 使用 `variant` prop 控制样式变体
4. **添加新组件**: 使用 shadcn CLI 添加组件
   ```bash
   pnpm dlx shadcn@latest add [component-name]
   ```

## Tailwind CSS 规范

1. **样式文件**: 主样式文件在 `src/styles.css`
2. **类名合并**: 使用 `cn()` 函数合并类名
3. **响应式**: 使用 Tailwind 响应式前缀 (`sm:`, `md:`, `lg:`, `xl:`)
4. **主题**: 使用 CSS 变量支持暗色模式
5. **自定义类**: 在 `styles.css` 中定义全局样式

## 状态管理

1. **Zustand**: 用于全局状态管理
   - Store 文件放在 `src/stores/` 目录
   - 使用 `create` 函数创建 store
2. **本地状态**: 优先使用 React `useState` 和 `useReducer`
3. **服务器状态**: 使用 TanStack Query 管理

## 数据验证

1. **Zod Schema**: 使用 Zod 定义数据验证规则
2. **表单验证**: 结合 `@hookform/resolvers` 使用
3. **API 验证**: 在 API 调用前后进行数据验证

## 目录结构规范

```
src/
├── assets/          # 静态资源（图标、图片等）
├── components/      # 可复用组件
│   ├── ui/         # shadcn/ui 组件
│   ├── form/       # 表单相关组件
│   └── layout/     # 布局组件
├── config/         # 配置文件
├── context/        # React Context Providers
├── data/           # 数据相关（类型、常量等）
├── features/       # 功能模块（按功能组织）
│   ├── auth/       # 认证功能
│   ├── dashboard/  # 仪表板
│   ├── users/      # 用户管理
│   └── ...
├── hooks/          # 自定义 Hooks
├── integrations/   # 第三方集成
│   └── tanstack-query/  # TanStack Query 配置
├── lib/            # 工具函数
├── routes/         # TanStack Router 路由文件
├── stores/         # Zustand stores
└── styles.css      # 全局样式
```

## 功能模块组织

1. **按功能组织**: 在 `src/features/` 下按功能模块组织代码
2. **模块结构**: 每个功能模块包含：
   - `index.tsx`: 主入口文件
   - `components/`: 模块特定组件
   - `data/`: 模块数据类型和常量
   - 其他相关文件

## 代码质量

1. **ESLint**: 使用 `@tanstack/eslint-config` 配置
2. **Prettier**: 使用项目配置的 Prettier 格式化代码
3. **类型检查**: 确保所有代码通过 TypeScript 类型检查
4. **未使用代码**: 删除未使用的导入和变量（TypeScript 严格模式会检查）

## 开发工具

1. **DevTools**: 项目集成了多个 TanStack DevTools
   - TanStack Router DevTools
   - TanStack Query DevTools
   - TanStack Form DevTools
2. **开发服务器**: 运行在端口 9527
   ```bash
   pnpm dev
   ```

## 最佳实践

1. **组件复用**: 优先使用现有组件，避免重复实现
2. **性能优化**: 
   - 使用 `React.memo` 优化组件渲染
   - 使用 `useMemo` 和 `useCallback` 优化计算和函数
   - 合理使用 TanStack Query 的缓存机制
3. **错误处理**: 
   - 使用错误边界处理组件错误
   - 使用 TanStack Query 的错误状态处理 API 错误
4. **可访问性**: 使用 Radix UI 组件确保可访问性
5. **国际化准备**: 考虑未来国际化需求，避免硬编码文本

## 提交前检查

在提交代码前，确保：
1. ✅ 运行 `pnpm check` (格式化 + ESLint)
2. ✅ 通过 TypeScript 类型检查
3. ✅ 测试相关功能
4. ✅ 检查控制台无错误和警告

## 注意事项

1. **包管理器**: 使用 `pnpm`，不要使用 `npm` 或 `yarn`
2. **路由生成**: 修改路由文件后，TanStack Router 会自动生成 `routeTree.gen.ts`
3. **样式变量**: 使用 CSS 变量实现主题切换，不要硬编码颜色值
4. **类型安全**: 充分利用 TypeScript 类型系统，避免类型断言

