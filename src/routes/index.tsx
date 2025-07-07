import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import { useAuth } from '../auth';
import viteLogo from '/vite.svg';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [count, setCount] = useState(0);
  const auth = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();

  function handleLogout() {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: '/login' });
      });
    });
  }

  return (
    <div className="mt-5 flex flex-col items-center gap-3">
      <button className="btn btn-ghost" onClick={handleLogout}>
        logout
      </button>
      <div className="flex h-48 w-48 justify-center gap-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="size-full" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="size-full motion-safe:animate-spin" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button className="btn mb-2" onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>routes/index.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}
