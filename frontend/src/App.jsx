import { useState, useEffect } from "react";
import UploadZone from "./components/UploadZone";
import ResultCard from "./components/ResultCard";
import History from "./pages/History";
import Login from "./pages/Login";

function App() {
  const [result, setResult] = useState(null);
  const [page, setPage] = useState("analyze");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={(username) => setUser(username)} />;
  }

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#f1f5f9" }}>
          AI Detection System
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#64748b", fontSize: "13px" }}>
            Hi, <strong style={{ color: "#94a3b8" }}>{user}</strong>
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              background: "#1e293b",
              color: "#f87171",
              border: "1px solid #334155",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "1.5rem" }}>
        Detect misinformation, deepfakes, and unreliable sources
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", justifyContent: "center" }}>
        <button
          onClick={() => setPage("analyze")}
          style={{
            padding: "8px 24px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            background: page === "analyze" ? "#2563eb" : "#1e293b",
            color: page === "analyze" ? "#ffffff" : "#94a3b8",
          }}
        >
          Analyze
        </button>
        <button
          onClick={() => setPage("history")}
          style={{
            padding: "8px 24px",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "14px",
            background: page === "history" ? "#2563eb" : "#1e293b",
            color: page === "history" ? "#ffffff" : "#94a3b8",
          }}
        >
          History
        </button>
      </div>

      {page === "analyze" && (
        <>
          <UploadZone onResult={setResult} />
          {result && <ResultCard result={result} />}
        </>
      )}
      {page === "history" && <History />}
    </div>
  );
}

export default App;