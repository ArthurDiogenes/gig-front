import InputComponent from '../../components/InputComponent/InputComponent';
import ImgCapa from '/images/img-login.png';
import styles from './TelaLogin.module.css';
import Button from '../../components/Button/Button';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import api from '../../services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export default function TelaLogin() {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate('/');
		}
	}, [navigate]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error('Preencha todos os campos', {
				autoClose: 2500,
			});
			return;
		}

		try {
			const response = await api.post('auth/login', {
				email,
				password,
			});
			localStorage.setItem('token', response.data.accessToken);
			localStorage.setItem('user', JSON.stringify(response.data.user));
			navigate('/');
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data.message, {
					autoClose: 2500,
				});
			}
		}
	};

	return (
		<div className={styles.container}>
			<section className={styles.sectionImg}>
				<img className={styles.img} src={ImgCapa} alt="Concert crowd silhouette" />
			</section>

			<section className={styles.sectionForm}>
				<div className={styles.login}>
					<h1 className={styles.title}>Login</h1>
					<form onSubmit={handleSubmit} className={styles.form}>
						<InputComponent
							type="email"
							name="email"
							placeholder="Digite seu email"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
						/>
						<InputComponent
							type="password"
							name="password"
							placeholder="Digite sua senha"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
						/>
						<Button type="submit">Entrar</Button>
					</form>
					<h4 className={styles.esqueceu_senha}>Esqueceu a senha?</h4>
					<h3 className={styles.cadastro}>
						Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
					</h3>
				</div>
			</section>
		</div>
	);
}