import { createFileRoute, linkOptions } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
export const navigationLinks = linkOptions([
  {
    to: '/dashboard',
    label: 'Dashboard',
  },
  {
    to: '/about',
    label: 'About',
    activeOptions: {
      exact: true,
    },
  },
]);

function RouteComponent() {
  return <div className="container">index</div>;
}
