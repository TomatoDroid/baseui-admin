import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { AuthContext } from '../auth';

interface MyRootContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRootContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
