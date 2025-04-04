import InputComponent from '../../components/InputComponent/InputComponent';
import ImgCapa from '/images/img-cadastro.png';
import styles from './TelaCadastro.module.css';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
export default function TelaCadastro() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const validateName = (name: string) => {
        return /^[a-zA-Z]{2,}$/.test(name.trim());
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateName(firstName)) {
            setError('O nome deve ter pelo menos 2 caracteres e conter apenas letras.');
            return;
        }

        if (!validateName(lastName)) {
            setError('O sobrenome deve ter pelo menos 2 caracteres e conter apenas letras.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Insira um email válido.');
            return;
        }

        if (!validatePassword(password)) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (!termsAccepted) {
            setError('Você deve aceitar os termos e condições.');
            return;
        }

        try{
            const response = await api.post('/users', {
                firstName,
                lastName,
                email,
                password
            });
            toast.success(response.data.message, {
                onClose: () => navigate('/login'),
                autoClose: 1500
            });
        }catch(error){
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message,{
                    autoClose: 2500
                });
            } else {
                toast.error('Ocorreu um erro ao cadastrar usuário',{
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
                    <h1 className={styles.title}>cadastro</h1>
                    <p className={styles.loginRedirect}>
                        Já tem uma conta? <Link to="/login">Login</Link>
                    </p>
                    <form noValidate onSubmit={handleSubmit}>
                        <div className={styles.nameFields}>
                            <InputComponent
                                type="text"
                                name="firstName"
                                placeholder="Nome"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <InputComponent
                                type="text"
                                name="lastName"
                                placeholder="Sobrenome"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </section>
        </div>
    );
}
