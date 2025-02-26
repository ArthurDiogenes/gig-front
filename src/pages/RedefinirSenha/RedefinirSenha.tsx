import InputComponent from "../../ui/InputComponent/InputComponent";
// Removi a imagem

import styles from "./RedefinirSenha.module.css";
import Button from "../../ui/Button/Button";

export default function RedefinirSenha() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Solicitação de redefinição de senha enviada");
  };

  return (
    <div className={styles.container}>
      {/* Removida a seção da imagem */}
      <section className={styles.sectionForm}>
        <div className={styles.login}>
          <h1 className={styles.title}>Redefinir Senha</h1>
          <form onSubmit={handleSubmit}>

          <h4 className={styles.subtitulo}>Defina aqui sua senha de acesso à plataforma</h4>
            <InputComponent
              type="email"
              name="email"
              placeholder="Digite sua nova senha"
            />

            <InputComponent
              type="email"
              name="email"
              placeholder="Confirme sua senha"
            />



            <Button type="submit">Cadastrar senha</Button>
          </form>
        </div>
      </section>
    </div>
  );
}