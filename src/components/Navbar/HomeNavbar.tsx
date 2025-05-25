import { useState } from 'react';
import MenuHamburger from '../MenuHamburger/MenuHamburger';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router';
import CreatePost from '../CreatePost/CreatePost';
import { Button } from '../ui/button';

export default function HomeNavbar() {
	const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();
	const user = localStorage.getItem('user');
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			navigate(`/pesquisa?q=${encodeURIComponent(searchTerm)}`);
		}
	};

	return (
		<nav className={styles.navbar}>
			<Link to="/">
				<img
					src="/images/logo-gig 2.svg"
					alt="Gig Logo"
					className={styles.logo}
				/>
			</Link>
			<form onSubmit={handleSearch} className={styles.searchForm}>
				<input
					type="text"
					className={styles.search}
					placeholder="Pesquisar"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
			<div className={styles.navbarActions}>
				{user ? (
					<CreatePost />
				) : (
					<Button>
						<a href="/login" className={styles.loginButton}>
							Ir para login
						</a>
					</Button>
				)}
				<MenuHamburger />
			</div>
		</nav>
	);
}
