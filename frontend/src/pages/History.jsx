import { useEffect, useState } from "react";

function History() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/results")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "700px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px", color: "#f1f5f9" }}>
        📋 Analysis History
      </h2>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        All past detection results stored in database
      </p>

      {loading && <p style={{ color: "#94a3b8" }}>Loading...</p>}

      {!loading && results.length === 0 && (
        <p style={{ color: "#94a3b8" }}>No results yet. Go analyze something first!</p>
      )}

      {results.map((r) => (
        <div key={r.id} style={{
          background: "#1e293b",
          border: `1px solid ${r.label === "FAKE" ? "#991b1b" : "#166534"}`,
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "12px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{
                fontSize: "12px",
                background: "#0f172a",
                color: "#64748b",
                padding: "2px 10px",
                borderRadius: "999px",
                marginRight: "8px",
              }}>
                #{r.id} · {r.type.toUpperCase()}
              </span>
              <span style={{
                fontSize: "12px",
                color: "#475569",
              }}>
                {new Date(r.created_at).toLocaleString()}
              </span>
            </div>
            <span style={{
              padding: "4px 14px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: 700,
              background: r.label === "FAKE" ? "#450a0a" : "#14532d",
              color: r.label === "FAKE" ? "#f87171" : "#4ade80",
            }}>
              {r.label === "FAKE" ? "❌ FAKE" : "✅ REAL"}
            </span>
          </div>

          {r.input_text && (
            <p style={{
              marginTop: "10px",
              color: "#94a3b8",
              fontSize: "13px",
              background: "#0f172a",
              padding: "8px 12px",
              borderRadius: "8px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              "{r.input_text}"
            </p>
          )}

          {r.file_name && (
            <p style={{ marginTop: "10px", color: "#94a3b8", fontSize: "13px" }}>
              📎 {r.file_name}
            </p>
          )}

          <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Confidence: <strong style={{ color: "#f1f5f9" }}>{r.confidence}%</strong>
            </span>
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Source Score: <strong style={{
                color: r.source_score > 60 ? "#4ade80" : "#f87171"
              }}>{r.source_score}/100</strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default History;