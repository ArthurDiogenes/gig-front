import MenuHamburger from '../MenuHamburger/MenuHamburger';
import styles from './Navbar.module.css';
import { Link } from 'react-router';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img src='/images/logo-gig 2.svg' alt='Gig Logo' className={styles.logo} />
            </Link>
            <input type="text" className={styles.search} placeholder="Pesquisar" />
            <MenuHamburger />
        </nav>
    );
}
