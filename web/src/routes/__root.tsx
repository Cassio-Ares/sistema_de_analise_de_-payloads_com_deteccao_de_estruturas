import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Sidebar } from "../components/Sidebar";

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
      <div className="h-screen bg-zinc-900">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20} minSize={15} maxSize={40}>
            <Sidebar />
          </Panel>

          <PanelResizeHandle className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />
          <Panel defaultSize={80} minSize={60}>
            <Outlet />
          </Panel>
        </PanelGroup>
      </div>
    </QueryClientProvider>
    {/* <TanStackRouterDevtools /> */}
  </>
);

export const Route = createRootRoute({ component: RootLayout });
