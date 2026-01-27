import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { webhookListSchema } from "../http/schema/webhooks";
import { WebhooksListItem } from "./WebhooksListItem";
import { Loader, Loader2 } from "lucide-react";

export function WebhooksList() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["webhooks"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/webhooks`);
      const data = await response.json();
      return webhookListSchema.parse(data);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: undefined,
  });

  //converter o array de pages em um array unico de webhooks
  const webhooks = data.pages.flatMap((page) => page.webhooks);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-1 p-2">
        {webhooks.map((webhook) => {
          return <WebhooksListItem key={webhook.id} webhook={webhook} />;
        })}
      </div>

  {hasNextPage && (
        <div className="p-2" ref={loadMoreRef}>
          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="size-5 animate-spin text-zinc-500" />
            </div>
          )}
        </div>

    </div>
  );
}
