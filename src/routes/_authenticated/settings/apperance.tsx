import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/settings/apperance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/settings/apperance"!</div>
}
