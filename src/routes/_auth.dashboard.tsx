import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../auth';

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  return (
    <div>
      {auth.user}
      Hello "/_auth/dashabord"!
    </div>
  );
}
