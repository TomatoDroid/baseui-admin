import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/display')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/settings/display"!</div>
}
