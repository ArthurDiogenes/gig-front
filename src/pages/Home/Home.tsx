import Navbar from '../../components/Navbar/Navbar.tsx';
import GenreSelector from '../../components/GenreSelector/GenreSelector.tsx';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel.tsx';
import BandCard from '../../components/BandCard/BandCard.tsx';
import DepoimentoCard from '../../components/DepoimentoCard/DepoimentoCard.tsx';
import styles from './Home.module.css';
import ImgAudioslave from '/images/audioslave.jpg';
import ImgSoundgarden from '/images/soundgarden.jpg';
import ImgMetallica from '/images/metallica.jpg';
import ImgSystem from '/images/system.jpg';
import ImgTheDoors from '/images/thedoors.jpg';
import ImgNirvana from '/images/nirvana.jpg';
import ImgQotsa from '/images/qotsa.jpg';
import ImgMj from '/images/mj.jpg';
import ImgPanchiko from '/images/panchiko.jpg';
import ImgSafadao from '/images/safadao.jpg';
import { useNavigate } from 'react-router';
import Footer from '../../components/Footer/Footer.tsx';


const bands = [
    { name: 'Audioslave', genre: 'Grunge', image: ImgAudioslave },
    { name: 'SoundGarden', genre: 'Grunge', image: ImgSoundgarden },
    { name: 'Metallica', genre: 'Metal', image: ImgMetallica },
    { name: 'System of a Down', genre: 'Rock', image: ImgSystem },
    { name: 'The Doors', genre: 'Classic Rock', image: ImgTheDoors },
    { name: 'Nirvana', genre: 'Grunge', image: ImgNirvana },
    { name: 'Queens of the Stone Age', genre: 'Rock', image: ImgQotsa },
    { name: 'Michael Jackson', genre: 'Pop', image: ImgMj },
    { name: 'Panchiko', genre: 'Alternative', image: ImgPanchiko },
    { name: 'Wesley Safadão', genre: 'Forró', image: ImgSafadao },
];

const depoimentos = [
    { name: 'Suzana', text: 'O Gig mudou a forma como encontro bandas para tocar nos meus eventos. Plataforma incrível!', image: '/images/user1.png' },
    { name: 'Livia', text: 'A experiência de contratar bandas nunca foi tão simples. Recomendo demais!', image: '/images/user2.png' },
    { name: 'Katia', text: 'Encontrei a banda perfeita para o meu casamento em poucos minutos. Excelente serviço!', image: '/images/user3.png' },
    { name: 'Matheus', text: 'Adorei a praticidade! Diversidade de bandas e músicos de qualidade.', image: '/images/user4.png' },
];

export default function Home() {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <Navbar />
            <GenreSelector onGenreSelect={(genero) => navigate(`/genero/${genero.toLowerCase()}`)} />
            <ImageCarousel />
            <section className={styles.bandsSection}>
                <h2 className={styles.title}>Bandas</h2>
                <div className={styles.bandGrid}>
                    {bands.map((band, index) => (
                        <BandCard key={index} {...band} />
                    ))}
                </div>
            </section>
            <section className={styles.depoimentosSection}>
                <h2 className={styles.title}>Depoimentos</h2>
                <div className={styles.depoimentosCarousel}>
                    {depoimentos.map((depoimento, index) => (
                        <DepoimentoCard key={index} {...depoimento} />
                    ))}
                </div>
            </section>
            <Footer/>
        </div>
    );
}
