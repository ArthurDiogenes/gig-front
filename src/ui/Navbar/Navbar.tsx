import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>gig</div>
            <input type="text" className={styles.search} placeholder="Pesquisar" />
            <div className={styles.menuIcon}>☰</div>
        </nav>
    );
}
