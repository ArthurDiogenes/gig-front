import React, { useState, useEffect, useRef } from "react";
import styles from "./Mensagens.module.css";
import { useNavigate } from "react-router-dom";

type Mensagem = {
  texto: string;
  autor: "eu" | "outro";
  timestamp?: string;
};

type Contato = {
  id: number;
  nome: string;
  avatar: string;
  status?: "online" | "offline" | "ausente";
  ultimaMensagem?: string;
  mensagens: Mensagem[];
};

const contatosIniciais: Contato[] = [
  {
    id: 1,
    nome: "Rock Legends",
    avatar: "images/avatars/chatsidebar1.png",
    status: "online",
    ultimaMensagem: "Vamos fechar o contrato hoje?",
    mensagens: [],
  },
  {
    id: 2,
    nome: "Paulo Luan",
    avatar: "images/avatars/chatsidebar2.png",
    status: "online",
    ultimaMensagem: "Ótimo! Estamos combinados.",
    mensagens: [],
  },
  {
    id: 3,
    nome: "Panchiko",
    avatar: "images/avatars/chatsidebar3.png",
    status: "ausente",
    ultimaMensagem: "Podemos discutir valores na próxima semana?",
    mensagens: [],
  },
  {
    id: 4,
    nome: "Hard Rock Cafe",
    avatar: "images/avatars/chatsidebar4.png",
    status: "offline",
    ultimaMensagem: "Quando vocês estarão disponíveis?",
    mensagens: [],
  },
];

export default function Mensagens() {
  const [contatos, setContatos] = useState<Contato[]>(contatosIniciais);
  const [contatoAtivo, setContatoAtivo] = useState<Contato>(contatos[0]);
  const [mensagem, setMensagem] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (mensagem.trim() === "") return;

    const novaMensagem: Mensagem = {
      texto: mensagem,
      autor: "eu",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const contatosAtualizados = contatos.map((contato) => {
      if (contato.id === contatoAtivo.id) {
        return {
          ...contato,
          mensagens: [...contato.mensagens, novaMensagem],
          ultimaMensagem: mensagem
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
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <img 
            src="images/logo-gig 2.svg" 
            alt="Gig Chats" 
            className={styles.logo} 
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }} 
          />
          <h1 className={styles.logoText}>Conversas</h1>
        </div>
        
        <div className={styles.searchContainer}>
          <div className={styles.searchBar}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar..." 
              className={styles.searchInput} 
            />
          </div>
        </div>
        
        <div className={styles.chatsSection}>
          <h3 className={styles.chatSectionTitle}>Conversas Recentes</h3>
          <ul>
            {contatos.map((contato) => (
              <li
                key={contato.id}
                className={contato.id === contatoAtivo.id ? styles.activeChat : ""}
                onClick={() => setContatoAtivo(contato)}
              >
                <img
                  src={contato.avatar}
                  alt={contato.nome}
                  className={styles.avatar}
                />
                <div className={styles.contactInfo}>
                  <div className={styles.contactName}>{contato.nome}</div>
                  <div className={styles.lastMessage}>{contato.ultimaMensagem}</div>
                </div>
                <span className={styles.messageTime}>11:42</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className={styles.chatWindow}>
        <header className={styles.chatHeader}>
          <div className={styles.chatHeaderLeft}>
            <img
              src={contatoAtivo.avatar}
              alt={contatoAtivo.nome}
              className={styles.chatAvatar}
            />
            <div className={styles.chatInfo}>
              <h2>{contatoAtivo.nome}</h2>
              <div className={styles.chatStatus}>
                <div className={styles.statusDot}></div>
                Online
              </div>
            </div>
          </div>
          
          <div className={styles.chatActions}>
            <button className={styles.actionButton}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 5.5C3 4.11929 4.11929 3 5.5 3H18.5C19.8807 3 21 4.11929 21 5.5V18.5C21 19.8807 19.8807 21 18.5 21H5.5C4.11929 21 3 19.8807 3 18.5V5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className={styles.actionButton}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.messages}>
          <div ref={messagesEndRef} />
          {[...contatoAtivo.mensagens].reverse().map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageGroup}`}
            >
              <div className={`${styles.message} ${msg.autor === "eu" ? styles.me : styles.other}`}>
                {msg.texto}
              </div>
              {msg.timestamp && (
                <span className={styles.messageTime}>
                  {msg.timestamp}
                </span>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className={styles.chatInput}>
          <button type="button" className={styles.attachButton}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.1525 10.8995L12.1369 19.9151C10.0866 21.9654 6.77783 21.9654 4.72754 19.9151C2.67725 17.8648 2.67725 14.556 4.72754 12.5057L13.7431 3.49014C15.0719 2.16136 17.2265 2.16136 18.5553 3.49014C19.8841 4.81892 19.8841 6.97356 18.5553 8.30234L10.4605 16.3971C9.79609 17.0615 8.71887 17.0615 8.05446 16.3971C7.39004 15.7327 7.39004 14.6554 8.05446 13.991L14.5657 7.47978" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Digite a mensagem aqui..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.sendButton}
            aria-label="Enviar mensagem"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5004 12L20.4 4.5M10.5004 12L14.0002 19.5C14.1669 19.8333 14.4669 20 14.9002 20C15.3335 20 15.6335 19.8333 15.8002 19.5L20.4 4.5M10.5004 12L3.5 8.5C3.16667 8.33333 3 8.03333 3 7.6C3 7.16667 3.16667 6.86667 3.5 6.7L20.4 4.5"
                stroke="white"
                strokeWidth="2"
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