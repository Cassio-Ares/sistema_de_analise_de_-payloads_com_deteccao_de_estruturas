import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { webhookListSchema } from "../http/schema/webhooks";
import { WebhooksListItem } from "./WebhooksListItem";
import { Loader, Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

export function WebhooksList() {
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver>(null)

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["webhooks"],
    queryFn: async ({ pageParam }) => {
     
      const url = new URL(`${import.meta.env.VITE_API_URL}/webhooks`);

      if (pageParam) {
        url.searchParams.set('cursor', pageParam)
      }

      const response = await fetch(url);
      const data = await response.json();
      return webhookListSchema.parse(data);
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    initialPageParam: undefined as string | undefined,
  });

  //converter o array de pages em um array unico de webhooks
  const webhooks = data.pages.flatMap((page) => page.webhooks);

    useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

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
      )}
    </div>
  );
}
