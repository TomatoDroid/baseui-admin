import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function getContext() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // 在 SSR 场景下，禁用默认的 refetch
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        // 设置合理的 staleTime，避免不必要的重新获取
        staleTime: 1000 * 60 * 5, // 5 分钟
        // 设置合理的 cacheTime
        gcTime: 1000 * 60 * 10, // 10 分钟（React Query v5 使用 gcTime 替代 cacheTime）
      },
    },
  })
  return {
    queryClient,
  }
}

export function Provider({
  children,
  queryClient,
}: {
  children: React.ReactNode
  queryClient: QueryClient
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
