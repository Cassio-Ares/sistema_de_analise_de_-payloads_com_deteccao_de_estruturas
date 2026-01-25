pnpm i @tanstack/react-query

````
const queryClient = new QueryClient();

const RootLayout = () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
    
);
````


````
 const {data, isLoading} = useQuery({
    queryKey: ["webhooks"],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/api/webhooks');
     
      const data = await response.json();
      return webhookListSchema.parse(data);
    },
  })

````


````
 <Suspense fallback={<div className="flex-1 flex items-center justify-center">Loading...</div>}>
         <WebhooksList /> 31>:21
  </Suspense>
````

rota com id => webhook.$id

  <Link to="/webhook/$id" params={{ id: webhook.id }} className="flex flex-1 min-w-0 items-start gap-3">