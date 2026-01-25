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
         <WebhooksList />
  </Suspense>
````

rota com id => webhook.$id