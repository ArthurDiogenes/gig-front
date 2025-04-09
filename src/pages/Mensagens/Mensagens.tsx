import React, { useState, useEffect, useRef } from "react";
import "./Mensagens.css";

type Mensagem = {
  texto: string;
  autor: "eu" | "outro";
};

type Contato = {
  id: number;
  nome: string;
  avatar: string;
  mensagens: Mensagem[];
};

const contatosIniciais: Contato[] = [
  {
    id: 1,
    nome: "Rock Legends",
    avatar: "/avatars/rock_legends.png",
    mensagens: [],
  },
  {
    id: 2,
    nome: "Paulo Luan",
    avatar: "/avatars/paulo_luan.png",
    mensagens: [],
  },
  {
    id: 3,
    nome: "Panchiko",
    avatar: "/avatars/panchiko.png",
    mensagens: [],
  },
  {
    id: 4,
    nome: "Hard Rock Cafe",
    avatar: "images/avatars/hard_rock_cafe.png",
    mensagens: [],
  },
];

export default function Mensagens() {
  const [contatos, setContatos] = useState<Contato[]>(contatosIniciais);
  const [contatoAtivo, setContatoAtivo] = useState<Contato>(contatos[0]);
  const [mensagem, setMensagem] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mensagem.trim() === "") return;

    const novaMensagem: Mensagem = {
      texto: mensagem,
      autor: "eu",
    };

    const contatosAtualizados = contatos.map((contato) => {
      if (contato.id === contatoAtivo.id) {
        return {
          ...contato,
          mensagens: [...contato.mensagens, novaMensagem],
        };
      }
      return contato;
    });

    setContatos(contatosAtualizados);
    setContatoAtivo({
      ...contatoAtivo,
      mensagens: [...contatoAtivo.mensagens, novaMensagem],
    });
    setMensagem("");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [contatoAtivo.mensagens]);

  return (
    <div className="container">
      <aside className="sidebar">
        <img src="/logo.png" alt="Gig Chats" className="logo" />
        <ul>
          {contatos.map((contato) => (
            <li
              key={contato.id}
              className={contato.id === contatoAtivo.id ? "activeChat" : ""}
              onClick={() => setContatoAtivo(contato)}
            >
              <img
                src={contato.avatar}
                alt={contato.nome}
                className="avatar"
              />
              <span>{contato.nome}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="chatWindow">
        <header className="chatHeader">
          <img
            src={contatoAtivo.avatar}
            alt={contatoAtivo.nome}
            className="chatAvatar"
          />
          <h2>{contatoAtivo.nome}</h2>
        </header>

        <div className="messages">
          <div ref={messagesEndRef} />
          {[...contatoAtivo.mensagens].reverse().map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.autor === "eu" ? "me" : "other"}`}
            >
              {msg.texto}
            </div>
          ))}
        </div>


        <form onSubmit={handleSubmit} className="chatInput">
          <input
            type="text"
            placeholder="Digite a mensagem aqui..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="input"
          />
          <button
            type="submit"
            className="sendButton"
            aria-label="Enviar mensagem"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.6666 11.3333L12.6666 15.3333M25.0506 2.04134C25.1772 1.99768 25.3134 1.9905 25.4438 2.02061C25.5742 2.05072 25.6935 2.11691 25.7881 2.21162C25.8827 2.30633 25.9487 2.42574 25.9786 2.55619C26.0085 2.68664 26.0012 2.82289 25.9573 2.94934L18.0586 25.5227C18.0114 25.6576 17.9247 25.7752 17.8097 25.8603C17.6948 25.9453 17.557 25.9939 17.4141 25.9996C17.2712 26.0054 17.1299 25.9681 17.0086 25.8925C16.8872 25.817 16.7913 25.7067 16.7333 25.576L12.4413 15.92C12.3691 15.7594 12.2406 15.6309 12.08 15.5587L2.42398 11.2653C2.29371 11.2072 2.18387 11.1113 2.10865 10.9901C2.03344 10.8688 1.9963 10.7278 2.00204 10.5853C2.00779 10.4427 2.05614 10.3052 2.14086 10.1904C2.22559 10.0756 2.34278 9.98884 2.47731 9.94134L25.0506 2.04134Z"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </main>
    </div>
  );
}
