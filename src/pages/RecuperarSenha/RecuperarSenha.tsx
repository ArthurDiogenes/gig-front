import InputComponent from "../../components/InputComponent/InputComponent";
import styles from "./RecuperarSenha.module.css";
import Button from "../../components/Button/Button";
import { useState } from "react";
// import { useNavigate } from "react-router";

export default function RecuperarSenha() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateEmail(email)) {
      setError("Insira um email válido.");
      return;
    }

    setError("");
    console.log("Solicitação de redefinição de senha enviada para", email);
  };

  return (
    <div className={styles.container}>
      <section className={styles.sectionForm}>
        <div className={styles.login}>
          <h1 className={styles.title}>Recuperar senha</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <h4 className={styles.subtitulo}>Informe o email para qual deseja redefinir a senha</h4>
            <InputComponent
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit">Redefinir senha</Button>
          </form>
        </div>
      </section>
    </div>
  );
}