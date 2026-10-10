import { useLibrary } from "../context/LibraryContext";

export default function Topbar({ title }) {
  const { currentUser } = useLibrary();

  return (
    <div className="topbar">
      <h1>{title}</h1>
      <p>
        Welcome, {currentUser.name} ({currentUser.role})
      </p>
    </div>
  );
}
