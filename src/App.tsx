import { useState } from "react";
import "./index.css";

function App() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    setLoading(true);

    const res = await fetch("/api/grok", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    setChat([
      ...newChat,
      { role: "ai", text: data.reply }
    ]);

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="container">

      <h1>Lettura Facile AI</h1>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "user-msg" : "ai-msg"}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="ai-msg">Thinking...</div>}
      </div>

      <div className="input-box">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}

export default App;