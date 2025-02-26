import InputComponent from "../../ui/InputComponent/InputComponent";
// Removi a imagem

import styles from "./RecuperarSenha.module.css";
import Button from "../../ui/Button/Button";

export default function RecuperarSenha() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Solicitação de redefinição de senha enviada");
  };

  return (
    <div className={styles.container}>
      {/* Removida a seção da imagem */}
      <section className={styles.sectionForm}>
        <div className={styles.login}>
          <h1 className={styles.title}>Recuperar senha</h1>
          <form onSubmit={handleSubmit}>

          <h4 className={styles.subtitulo}>Informe o email para qual deseja redefinir a senha</h4>
            <InputComponent
              type="email"
              name="email"
              placeholder="Digite seu email"
            />




            <Button type="submit" style={{ backgroundColor: 'purple', color: 'white', border: 'none', padding: '0.5rem 1rem' }}>Redefinir senha</Button>
          </form>
        </div>
      </section>
    </div>
  );
}