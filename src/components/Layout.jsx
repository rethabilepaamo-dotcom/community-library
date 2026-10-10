import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const titles = {
  "/": "Dashboard",
  "/books": "Book Management",
  "/transactions": "Transactions",
  "/users": "User Management",
};

export default function Layout() {
  const { pathname } = useLocation();
  const title = titles[pathname] || "Library";

  // keep the browser tab title in step with the current page
  useEffect(() => {
    document.title = `${title} | Community Library`;
  }, [title]);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main">
        <Topbar title={title} />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
