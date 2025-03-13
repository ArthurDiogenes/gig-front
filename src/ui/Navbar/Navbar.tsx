import React from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <img src='/images/logo-gig 2.svg' alt='Gig Logo' className={styles.logo} />
            <input type="text" className={styles.search} placeholder="Pesquisar" />
            <div className={styles.menuIcon}>☰</div>
        </nav>
    );
}
