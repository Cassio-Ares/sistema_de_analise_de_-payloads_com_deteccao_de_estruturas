pnpm i @tanstack/react-query

```
const queryClient = new QueryClient();

const RootLayout = () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>

);
```

```
 const {data, isLoading} = useQuery({
    queryKey: ["webhooks"],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/api/webhooks');

      const data = await response.json();
      return webhookListSchema.parse(data);
    },
  })

```

```
 <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
         <WebhooksList />
  </Suspense>
```

rota com id => webhook.$id

  <Link to="/webhook/$id" params={{ id: webhook.id }} className="flex flex-1 min-w-0 items-start gap-3">

paginação infinita
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
