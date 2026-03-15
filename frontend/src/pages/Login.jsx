import { useState } from "react";

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const endpoint = isRegister
      ? "http://127.0.0.1:8000/api/auth/register"
      : "http://127.0.0.1:8000/api/auth/login";

    const body = isRegister
      ? { username, email, password }
      : { username, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Something went wrong");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        onLogin(data.username);
      }
    } catch (err) {
      setError("Cannot connect to backend.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f172a",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "#1e293b",
        borderRadius: "20px",
        padding: "40px",
        border: "1px solid #334155",
      }}>
        {/* Title */}
        <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px" }}>
          AI Detection System
        </h1>
        <p style={{ color: "#64748b", marginBottom: "32px", fontSize: "14px" }}>
          {isRegister ? "Create a new account" : "Sign in to your account"}
        </p>

        {/* Username */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#0f172a",
              border: "1px solid #334155",
              color: "#e2e8f0",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Email (only for register) */}
        {isRegister && (
          <div style={{ marginBottom: "16px" }}>
            <label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                background: "#0f172a",
                border: "1px solid #334155",
                color: "#e2e8f0",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        )}

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label style={{ color: "#94a3b8", fontSize: "13px", display: "block", marginBottom: "6px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              background: "#0f172a",
              border: "1px solid #334155",
              color: "#e2e8f0",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: "#f87171", fontSize: "13px", marginBottom: "16px" }}>
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            background: loading ? "#334155" : "#2563eb",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "15px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "16px",
          }}
        >
          {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: "center", color: "#64748b", fontSize: "13px" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            style={{ color: "#60a5fa", cursor: "pointer", marginLeft: "6px" }}
          >
            {isRegister ? "Sign In" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;