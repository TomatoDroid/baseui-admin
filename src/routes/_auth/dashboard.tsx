import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../auth';

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="text-2xl">Username: {auth.user}</div>
    </div>
  );
}
