import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import styles from './TelaGenero.module.css';
import Footer from '../../components/Footer/Footer';

export default function TelaGenero() {
    const { genero } = useParams();
    const generoFormatado = genero ? genero.charAt(0).toUpperCase() + genero.slice(1) : '';
    
    return (
        <div className={styles.container}>
            <Navbar/>
            <div className={styles.mainContent}>
                <h1 className={styles.title}>Músicos de {generoFormatado}</h1>
                <p className={styles.subTitle}>Bandas e artistas de {generoFormatado} para energizar seu evento</p>
            </div>
            <Footer/>
        </div>
    );
}