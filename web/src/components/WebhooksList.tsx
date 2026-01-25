import { useSuspenseQueries } from "@tanstack/react-query";
import { webhookListSchema } from "../http/schema/webhooks";
import { WebhooksListItem } from "./WebhooksListItem";

export function WebhooksList() {
  const [{ data }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ["webhooks"],
        queryFn: async () => {
          //const response = await fetch("http://localhost:3333/api/webhooks");
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/webhooks`);
          const data = await response.json();
          return webhookListSchema.parse(data);
        },
      },
    ],
  });

  //console.log(data);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {data.webhooks.map((webhook) => {
          return <WebhooksListItem key={webhook.id} webhook={webhook} />;
        })}
      </div>
    </div>
  );
}
