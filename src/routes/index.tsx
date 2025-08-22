import { Navbar } from '@/components/ui/shadcn-io/navbar-01';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Navbar navigationLinks={[{ label: 'Dashboard', href: '/dashboard' }]}></Navbar>;
}
