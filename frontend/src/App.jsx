import { useState } from "react";
import UploadZone from "./components/UploadZone";
import ResultCard from "./components/ResultCard";
import History from "./pages/History";

function App() {
  const [result, setResult] = useState(null);
  const [page, setPage] = useState("analyze");

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      {/* Header */}
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, textAlign: "center", marginBottom: "0.5rem" }}>
        🔍 AI Detection System
      </h1>
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
          🔍 Analyze
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
          📋 History
        </button>
      </div>

      {/* Pages */}
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