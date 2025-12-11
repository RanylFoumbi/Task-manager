import { useState } from "react";
import "./index.css";
import { AppHeader, AppSidebar } from "./components/layout";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      <AppSidebar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AppHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">Hello!</h1>
            <p className="text-slate-600 mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mb-6">
            {/* Content goes here */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
