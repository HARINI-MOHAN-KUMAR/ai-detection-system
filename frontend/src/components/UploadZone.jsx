import { useState } from "react";
import { Upload, Link } from "lucide-react";

function UploadZone({ onResult }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    try {
      let response;

      if (url) {
        response = await fetch("http://127.0.0.1:8000/api/url/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } else if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const isAudio = file.type.startsWith("audio");
        const endpoint = isAudio
          ? "http://127.0.0.1:8000/api/audio/detect"
          : "http://127.0.0.1:8000/api/image/detect";
        response = await fetch(endpoint, { method: "POST", body: formData });
      } else if (text) {
        response = await fetch("http://127.0.0.1:8000/api/text/detect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      } else {
        setError("Please enter text, a URL, or upload a file.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      onResult(data);

    } catch (err) {
      setError("Cannot connect to backend. Make sure it is running on port 8000.");
    }

    setLoading(false);
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); setFile(e.dataTransfer.files[0]); }}
        onClick={() => document.getElementById("fileInput").click()}
        style={{
          border: `2px dashed ${dragging ? "#60a5fa" : "#475569"}`,
          borderRadius: "16px",
          padding: "40px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "#1e3a5f" : "#1e293b",
          transition: "all 0.2s",
        }}
      >
        <Upload style={{ margin: "0 auto 12px", color: "#94a3b8", display: "block" }} size={36} />
        {file ? (
          <p style={{ color: "#4ade80", fontWeight: 600 }}>Attached: {file.name}</p>
        ) : (
          <>
            <p style={{ color: "#cbd5e1", fontWeight: 500 }}>Drag & drop image, video or audio</p>
            <p style={{ color: "#64748b", fontSize: "14px", marginTop: "6px" }}>or click to browse files</p>
          </>
        )}
      </div>

      <input
        id="fileInput"
        type="file"
        accept="image/*,audio/*,video/*"
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* URL Input */}
      <div style={{ position: "relative", marginTop: "16px" }}>
        <Link style={{ position: "absolute", left: "14px", top: "14px", color: "#64748b" }} size={18} />
        <input
          type="text"
          placeholder="Or paste a news article URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 14px 14px 42px",
            borderRadius: "12px",
            background: "#1e293b",
            border: "1px solid #475569",
            color: "#e2e8f0",
            fontSize: "15px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Text Area */}
      <textarea
        rows={4}
        placeholder="Or paste news text / article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          marginTop: "12px",
          padding: "16px",
          borderRadius: "12px",
          background: "#1e293b",
          border: "1px solid #475569",
          color: "#e2e8f0",
          fontSize: "15px",
          resize: "none",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      {error && (
        <p style={{ color: "#f87171", fontSize: "14px", marginTop: "8px" }}>
          {error}
        </p>
      )}

      <button
        onClick={handleAnalyze}
        disabled={loading || (!file && !text && !url)}
        style={{
          marginTop: "16px",
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          background: loading || (!file && !text && !url) ? "#334155" : "#2563eb",
          color: loading || (!file && !text && !url) ? "#64748b" : "#ffffff",
          fontWeight: 600,
          fontSize: "16px",
          border: "none",
          cursor: loading || (!file && !text && !url) ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Now"}
      </button>
    </div>
  );
}

export default UploadZone;