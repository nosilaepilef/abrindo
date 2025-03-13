import { useState } from "react";
import './App.css'; // Import the CSS file

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [customId, setCustomId] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleShorten = async () => {
    setError(null);
    setShortUrl(null);

    if (!url.trim()) {
      setError("Por favor, insira uma URL válida.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, customId: customId || undefined }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.error || "Erro ao encurtar a URL.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <h1>Encurtador de URL</h1>
      <input
        type="text"
        placeholder="Cole sua URL aqui"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="ID personalizado (opcional)"
        value={customId}
        onChange={(e) => setCustomId(e.target.value)}
      />
      <button onClick={handleShorten}>Encurtar</button>

      {shortUrl && (
        <div className="url-card">
          URL encurtada:{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}
