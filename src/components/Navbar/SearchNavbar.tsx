import MenuHamburger from '../MenuHamburger/MenuHamburger';
import styles from './Navbar.module.css';
import { Link } from 'react-router';
import { Button } from '../ui/button';
import { getUser } from '@/services/users';

export default function SearchNavbar() {
    const user = getUser();

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <img src='/images/logo-gig 2.svg' alt='Gig Logo' className={styles.logo} />
            </Link>
            
            {/* Empty div to maintain spacing */}
            <div className="flex-1"></div>
            
            <div className={styles.navbarActions}>
                {user ? (
                    <MenuHamburger />
                ) : (
                    <Button>
                        <a href="/login" className={styles.loginButton}>
                            Ir para login
                        </a>
                    </Button>
                )}
            </div>
        </nav>
    );
}