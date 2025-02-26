import InputComponent from '../../ui/InputComponent/InputComponent';
import ImgCapa from '/images/img-cadastro.png';
import styles from './TelaCadastro.module.css';
import Button from '../../ui/Button/Button';
import { useState } from 'react';

export default function TelaCadastro() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const validateName = (name: string) => {
        return /^[a-zA-Z]{2,}$/.test(name);
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

        setError('');
        console.log('Nome:', firstName);
        console.log('Sobrenome:', lastName);
        console.log('Email:', email);
        console.log('Senha:', password);
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
                        Já tem uma conta? <a href="/login">Login</a>
                    </p>
                    <form onSubmit={handleSubmit}>
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
                            <span>Li e concordo com os <a href="/termos">termos e condições</a>.</span>
                        </div>
                        <Button type="submit">Criar conta</Button>
                    </form>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </section>
        </div>
    );
}
