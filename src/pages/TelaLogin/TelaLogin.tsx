import InputComponent from '../../ui/InputComponent/InputComponent';
import ImgCapa from '/images/img-login.png'
import styles from './TelaLogin.module.css';
import Button from '../../ui/Button/Button'
import { useState } from 'react';

interface User {
    email: string;
    password: string;
}

const mockUsers: User[] = [
    { email: 'teste@gmail.com', password: 'senha123' },
    { email: 'pl@gmail.com', password: 'senha' },
  ];

export default function TelaLogin(){

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Senha:',
        password);
        
        if(!email || !password){
            setError('Preencha todos os campos');
            return;
        }
    
        const user: User | undefined = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            setError('Usuário ou senha inválidos');
            // console.log('erro');
        }else{
            setError('');
            // console.log('logado');
        }

    }

    return(
        <div className={styles.container}>
            <section className={styles.sectionImg}><img className={styles.img} src={ImgCapa} alt="" /></section> 
                   
            <section className={styles.sectionForm}>
                <div className={styles.login}>
                    <h1 className={styles.title}>login</h1>
                    <form onSubmit={handleSubmit}>
                        <InputComponent 
                        type='email'
                        name='email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                        <InputComponent
                        type='password'
                        name='password'
                        placeholder='Digite sua senha'
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <Button  type='submit'>Entrar</Button>
                    </form>
                        {error && <p className={styles.error}>{error}</p>}
                    <h4 className={styles.esqueceu_senha}>Esqueceu a senha?</h4>
                    <h3 className={styles.cadastro}>Não tem conta? <a href="">Cadastre-se</a></h3>
                </div>
            </section>
        </div>
    )
}