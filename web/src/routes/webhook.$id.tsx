import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { WebhookDetails } from "../components/WebhookDetails";

export const Route = createFileRoute("/webhook/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <WebhookDetails id={id} />
   </Suspense>
  );
}
