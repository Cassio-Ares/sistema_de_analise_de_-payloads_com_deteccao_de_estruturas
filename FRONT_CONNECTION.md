pnpm i @tanstack/react-query

````
const queryClient = new QueryClient();

const RootLayout = () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
    
);
````