function ResultCard({ result }) {
  const isReal = result.label === "REAL";

  return (
    <div style={{
      width: "100%",
      marginTop: "24px",
      background: "#1e293b",
      border: `1px solid ${isReal ? "#166534" : "#991b1b"}`,
      borderRadius: "16px",
      padding: "24px",
    }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#f1f5f9" }}>
          Analysis Result
        </h2>
        <span style={{
          padding: "6px 18px",
          borderRadius: "999px",
          fontSize: "14px",
          fontWeight: 700,
          background: isReal ? "#14532d" : "#450a0a",
          color: isReal ? "#4ade80" : "#f87171",
        }}>
          {isReal ? "✅ REAL" : "❌ FAKE"}
        </span>
      </div>

      {/* Explanation */}
      <p style={{ color: "#94a3b8", marginBottom: "20px", lineHeight: "1.6" }}>
        {result.explanation}
      </p>

      {/* Confidence Score */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ color: "#94a3b8", fontSize: "14px" }}>Confidence Score</span>
          <span style={{ color: "#f1f5f9", fontWeight: 700 }}>{result.confidence}%</span>
        </div>
        <div style={{ width: "100%", background: "#334155", borderRadius: "999px", height: "10px" }}>
          <div style={{
            width: `${result.confidence}%`,
            height: "10px",
            borderRadius: "999px",
            background: isReal ? "#22c55e" : "#ef4444",
            transition: "width 0.8s ease",
          }} />
        </div>
      </div>

      {/* Source Credibility */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span style={{ color: "#94a3b8", fontSize: "14px" }}>Source Credibility</span>
        <span style={{
          fontWeight: 700,
          color: result.source_score > 60 ? "#4ade80" : "#f87171"
        }}>
          {result.source_score}/100
        </span>
      </div>

      {/* Detection Type Badge */}
      <div style={{
        marginTop: "16px",
        padding: "10px 16px",
        background: "#0f172a",
        borderRadius: "10px",
        fontSize: "13px",
        color: "#64748b",
      }}>
        🧠 Detection type: <strong style={{ color: "#94a3b8" }}>{result.type.toUpperCase()}</strong>
        &nbsp;·&nbsp; Powered by DeBERTa + EfficientNet
      </div>

    </div>
  );
}

export default ResultCard;