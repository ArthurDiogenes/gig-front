import { Link } from "react-router";
import styles from './Footer.module.css';

export default function Footer(){
    return(
        <footer className={styles.footerMain}>
        <div className={styles.container}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} GIG - Todos os direitos reservados.
          </p>
          <nav className={styles.nav}>
            <Link to="#" className={styles.link}>
              Termos
            </Link>
            <Link to="#" className={styles.link}>
              Privacidade
            </Link>
            <Link to="#" className={styles.link}>
              Contato
            </Link>
          </nav>
        </div>
      </footer>
    )
}