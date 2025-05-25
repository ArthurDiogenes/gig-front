import InputComponent from "../../components/InputComponent/InputComponent";
import SelectComponent from "../../components/SelectComponent/SelectComponent";
import ImgCapa from "/images/img-cadastro.png";
import styles from "./TelaCadastroBanda.module.css";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../services/api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { z } from "zod";

const genres: Array<string> = [
  "Rock",
  "Pop",
  "MPB",
  "Forró",
  "Sertanejo",
  "Eletrônica",
  "Outro",
];

export default function TelaCadastro() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const navigate = useNavigate();

  const cadastroSchema = z.object({
    name: z.string().min(1, "Nome da banda é obrigatório"),
    email: z.string().email("Email inválido"),
    genre: z.string().min(1, "Gênero é obrigatório"),
    city: z.string().min(2, "Cidade é obrigatória"),
    password: z.string().min(6, "A Senha deve ter no mínimo 6 caracteres"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "Você deve aceitar os termos" }),
    }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      genre,
      city,
      password,
      termsAccepted,
    };

    const result = cadastroSchema.safeParse(formData);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || "Dados inválidos";
      toast.error(firstError, {
        autoClose: 2500,
      });
      return;
    }

    try {
      const response = await api.post("/users", {
        name,
        city,
        genre,
        email,
        password,
        role: "band",
      });

      toast.success(response.data.message, {
        onClose: () => navigate("/login"),
        autoClose: 1500,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message, {
          autoClose: 2500,
        });
      } else {
        toast.error("Ocorreu um erro ao cadastrar usuário", {
          autoClose: 2500,
        });
      }
      return;
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.sectionImg}>
        <img className={styles.img} src={ImgCapa} alt="Imagem de cadastro" />
      </section>

      <section className={styles.sectionForm}>
        <div className={styles.cadastro}>
          <h1 className={styles.title}>Cadastro</h1>
          <p className={styles.loginRedirect}>
            Já tem uma conta? <Link to="/login">Login</Link>
          </p>

          <p className={styles.establishmentRedirect}>
            É um estabelecimento?{" "}
            <Link to="/cadastro-estabelecimento">Crie sua conta aqui</Link>
          </p>

          <form noValidate onSubmit={handleSubmit}>
            <InputComponent
              type="text"
              name="name"
              placeholder="Nome da Banda"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className={styles.nameFields}>
              <SelectComponent
                array={genres}
                placeholder="Selecione o gênero"
                name="genres"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <InputComponent
                type="text"
                name="city"
                placeholder="Cidade/Estado"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <InputComponent
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputComponent
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.terms}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span>
                Li e concordo com os{" "}
                <Link to="/termos">termos e condições</Link>.
              </span>
            </div>
            <Button type="submit">Criar conta</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
