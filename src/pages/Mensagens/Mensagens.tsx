import React, { useState } from "react";
import "./Mensagens.css"; // Importação do CSS global
import ImgCapa from "../../images/logo-gig 2.svg"; 

export default function Mensagens() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "") return;

    setMessages([...messages, message]);
    setMessage("");
  };

  return (
    <div className="container">
      <aside className="sidebar">
        {/*<h2 className="title">gig Chats</h2>*/}
        <img src="/logo.png" alt="Gig Chats" className="logo" />
        <ul>
          <li className="activeChat">Fulano 1</li>
          <li>Fulano 2</li>
          <li>Fulano 3</li>
          <li>Fulano 4</li>
        </ul>
      </aside>
      
      <main className="chatWindow">
        <header className="chatHeader">
          <h2>Fulano 1</h2>
          
        </header>

        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">{msg}</div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="chatInput">
          <input
            type="text"
            placeholder="Digite a mensagem aqui..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input"
          />
          <button type="submit" className="sendButton">
            📩
          </button>
        </form>
      </main>
    </div>
  );
}
