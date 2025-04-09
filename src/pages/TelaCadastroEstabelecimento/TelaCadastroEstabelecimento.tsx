import { Link, useNavigate } from 'react-router-dom';
import styles from './TelaCadastroEstabelecimento.module.css';
import Button from '../../components/Button/Button';
import InputComponent from '../../components/InputComponent/InputComponent';
import ImgCapa from '/images/img-cadastro.png';
import SelectComponent from '../../components/SelectComponent/SelectComponent';
import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { AxiosError } from 'axios';

const tiposEstabelecimento: Array<string> = ["Restaurante", "Bar", "Casa de show", "Pub", "Sertanejo", "Outro"]


const TelaCadastroEstabelecimento = () => {
    const [venue, setVenue] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const navigate = useNavigate();

    const cadastroSchema = z.object({
        venue: z.string().min(1, "Nome do estabelecimento é obrigatório"),
        email: z.string().email("Email inválido"),
        tipo: z.string().min(1, "Gênero é obrigatório"),
        cep: z.string().min(2, "Cep é obrigatório"),
        password: z.string().min(6, "A Senha deve ter no mínimo 6 caracteres"),
        termsAccepted: z.literal(true, {
            errorMap: () => ({ message: "Você deve aceitar os termos" }),
        }),
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = {
            venue,
            email,
            tipo,
            cep,
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
            const response = await api.post('/venue', {
                venue,
                cep,
                tipo,
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

                    <p className={styles.establishmentRedirect}>É uma banda? <Link to="/cadastro">Crie sua conta aqui</Link></p>

                    <form noValidate onSubmit={handleSubmit}>
                        <InputComponent
                            type="text"
                            name="venue"
                            placeholder="Nome do estabelecimento"
                            value={venue}
                            onChange={(e) => setVenue(e.target.value)}
                        />
                        


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
                        <div className={styles.nameFields}>

                            <SelectComponent
                                array={tiposEstabelecimento}
                                placeholder="Selecione o tipo de estabelecimento"
                                name="tipos"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            />
                            <InputComponent
                                type="text"
                                name="cep"
                                placeholder="CEP"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                            />
                        </div>
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

export default TelaCadastroEstabelecimento;