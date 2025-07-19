import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router';
import { useAuth } from '../../auth';

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
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
    <div>
      <div className="mb-2 navbar border-b border-neutral bg-base-100">
        <div className="flex-1">
          <a href="" className="btn text-xl btn-ghost">
            Reactsse
          </a>
        </div>
        <div className="flex gap-2">
          <input className="input-border input w-24 md:w-auto" />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn avatar btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu z-1 mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
