import InputComponent from '../../components/InputComponent/InputComponent';
import SelectComponent from '../../components/SelectComponent/SelectComponent';
import ImgCapa from '/images/img-cadastro.png';
import styles from './TelaCadastroBanda.module.css';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { z } from 'zod';


const generos: Array<string> = ["Rock", "Pop", "MPB", "Forró", "Sertanejo", "Eletrônica", "Outro"]

export default function TelaCadastro() {
    const [bandName, setbandName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const navigate = useNavigate();

    const cadastroSchema = z.object({
        bandName: z.string().min(1, "Nome da banda é obrigatório"),
        email: z.string().email("Email inválido"),
        genero: z.string().min(1, "Gênero é obrigatório"),
        city: z.string().min(2, "Cidade é obrigatória"),
        password: z.string().min(6, "A Senha deve ter no mínimo 6 caracteres"),
        termsAccepted: z.literal(true, {
            errorMap: () => ({ message: "Você deve aceitar os termos" }),
        }),
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = {
            bandName,
            email,
            genero,
            city,
            password,
            termsAccepted,
        };
    
        const result = cadastroSchema.safeParse(formData);
    
        if (!result.success) {
            const firstError = result.error.errors[0]?.message || "Dados inválidos";
            toast.error(firstError, {
                autoClose: 2500
            });
            return;
        }
    
        try {
            const response = await api.post('/banda', {
                bandName,
                city,
                genero,
                email,
                password
            });
            toast.success(response.data.message, {
                onClose: () => navigate('/login'),
                autoClose: 1500
            });
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message, {
                    autoClose: 2500
                });
            } else {
                toast.error('Ocorreu um erro ao cadastrar usuário', {
                    autoClose: 2500
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

                    <p className={styles.establishmentRedirect}>É um estabelecimento? <Link to="/cadastro-estabelecimento">Crie sua conta aqui</Link></p>

                    <form noValidate onSubmit={handleSubmit}>
                        <InputComponent
                            type="text"
                            name="bandName"
                            placeholder="Nome da Banda"
                            value={bandName}
                            onChange={(e) => setbandName(e.target.value)}
                        />
                        <div className={styles.nameFields}>

                            <SelectComponent
                                array={generos}
                                placeholder="Selecione o gênero"
                                name="generos"
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
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
                            <span>Li e concordo com os <Link to="/termos">termos e condições</Link>.</span>
                        </div>
                        <Button type="submit">Criar conta</Button>
                    </form>
                </div>
            </section>
        </div>
    );
}
