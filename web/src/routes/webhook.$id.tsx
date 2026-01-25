import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/webhook/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/webhook/$id"!</div>
}
