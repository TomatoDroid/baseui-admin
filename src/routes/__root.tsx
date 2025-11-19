import type { QueryClient } from '@tanstack/react-query'
import { TanStackDevtools } from '@tanstack/react-devtools'
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/context/theme-provider'
import { FontProvider } from '@/context/font-provider'
import { DirectionProvider } from '@/context/direction-provider'
import { AuthProvider } from '../auth'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'
import appCss from '../styles.css?url'

const googleFontsHref =
  'https://fonts.googleapis.com/css2?family=Borel&family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@200..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: googleFontsHref,
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" className="font-system">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <FontProvider>
            <DirectionProvider>
              <AuthProvider>
                <Outlet />
              </AuthProvider>
            </DirectionProvider>
            <Toaster duration={5000} />
          </FontProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
            FormDevtoolsPlugin(),
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
