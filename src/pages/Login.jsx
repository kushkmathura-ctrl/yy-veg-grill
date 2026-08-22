import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/admin/login`,
  {
    username,
    password,
  }
);

      if (response.data.success) {
        localStorage.setItem(
          "adminToken",
          response.data.token
        );

        navigate("/admin");
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message ||
          "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Animated background */}
      <div className="login-orb orb-one"></div>
      <div className="login-orb orb-two"></div>
      <div className="login-orb orb-three"></div>

      <div className="login-card">

        <div className="login-logo">
          🍔
        </div>

        <div className="login-brand">
          Y&Y Veg Grill
        </div>

        <h1>Admin Login</h1>

        <p className="login-subtitle">
          Welcome back! Sign in to manage your restaurant.
        </p>

        <form onSubmit={handleLogin}>

          <div className="login-field">
            <span>👤</span>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <span>🔐</span>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="login-error">
              ⚠️ {error}
            </p>
          )}

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner"></span>
                Logging in...
              </>
            ) : (
              <>
                Login
                <span>→</span>
              </>
            )}
          </button>

        </form>

        <div className="login-footer">
          🔒 Secure Admin Access
        </div>

      </div>
    </div>
  );
}

export default Login;