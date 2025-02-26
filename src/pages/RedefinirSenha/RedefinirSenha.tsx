import InputComponent from "../../ui/InputComponent/InputComponent";
import styles from "./RedefinirSenha.module.css";
import Button from "../../ui/Button/Button";
import { useState } from "react";

export default function RedefinirSenha() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validatePassword(password)) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
    console.log("Senha redefinida com sucesso");
  };

  return (
    <div className={styles.container}>
      <section className={styles.sectionForm}>
        <div className={styles.login}>
          <h1 className={styles.title}>Redefinir Senha</h1>
          <form onSubmit={handleSubmit}>
            <h4 className={styles.subtitulo}>Defina aqui sua senha de acesso à plataforma</h4>
            <InputComponent
              type="password"
              name="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputComponent
              type="password"
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit">Cadastrar senha</Button>
          </form>
        </div>
      </section>
    </div>
  );
}