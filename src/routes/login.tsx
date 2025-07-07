import { createFileRoute, redirect, useRouter, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import z from 'zod';
import { useAuth } from '../auth';
import { sleep } from '../utils';

const fallback = '/dashboard' as const;

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad({ context, search }) {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const isLoading = useRouterState({ select: state => state.isLoading });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username');
      const password = formData.get('password');
      if (!username || !password) {
        return;
      }
      await auth.login(username.toString(), password.toString());
      await router.invalidate();

      await sleep(1000);
      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-96 flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <fieldset className="fieldset">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input name="username" type="text" className="input" placeholder="Username" />
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input name="password" type="password" className="input" placeholder="Password" />
                <button type="submit" className="btn mt-4 btn-neutral">
                  {isLoggingIn ? <span className="loading-spin loading"></span> : 'Login'}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
