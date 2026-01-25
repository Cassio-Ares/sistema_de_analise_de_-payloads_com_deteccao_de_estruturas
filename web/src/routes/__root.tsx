import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const queryClient = new QueryClient();

const RootLayout = () => (
  <>
    {/* <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
    </div>
    <hr /> */}
    {/**Outlet = conteúdo da page similar o a react router 7 ex: se route for '/' ele mostra o conteúdo da página principal  createFileRoute('/') que é o index neste caso */}
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRoute({ component: RootLayout });
