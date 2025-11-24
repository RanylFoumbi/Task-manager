import "./index.css";
import Header from "./components/layout/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
