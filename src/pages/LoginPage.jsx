import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useLibrary } from "../context/LibraryContext";

export default function LoginPage() {
  const { currentUser, login } = useLibrary();
  const navigate = useNavigate();
  const location = useLocation();

  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (currentUser) return <Navigate to="/" replace />;

  function handleSubmit(event) {
    event.preventDefault();

    if (!membershipId.trim() || !password) {
      setError("Enter your membership ID and password.");
      return;
    }

    if (login(membershipId.trim(), password)) {
      navigate(location.state?.from || "/", { replace: true });
    } else {
      setError("Invalid membership ID or password.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Community Library</h1>
        <p>Library Management System</p>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Membership ID"
            id="membershipId"
            type="text"
            placeholder="Enter membership ID"
            value={membershipId}
            onChange={(e) => {
              setMembershipId(e.target.value);
              setError("");
            }}
          />

          <FormField
            label="Password"
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />

          <button type="submit" className="primary">
            Login
          </button>

          {error && <div className="message">{error}</div>}
        </form>

        <div className="hint">
          Demo accounts: ADMIN001 / admin123 &nbsp;|&nbsp; LIB001 / lib123
        </div>
      </div>
    </div>
  );
}
