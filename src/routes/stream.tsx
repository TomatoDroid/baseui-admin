import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/stream')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/stream"!</div>;
}
