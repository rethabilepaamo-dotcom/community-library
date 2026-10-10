import { NavLink, useNavigate } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/books", label: "Book Management" },
  { to: "/transactions", label: "Transactions" },
  { to: "/users", label: "User Management" },
];

export default function Sidebar() {
  const { logout } = useLibrary();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="sidebar">
      <h2>📚 Library</h2>

      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          className={({ isActive }) => (isActive ? "nav-btn active" : "nav-btn")}
        >
          {link.label}
        </NavLink>
      ))}

      <button className="nav-btn logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}
