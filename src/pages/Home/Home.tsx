import Navbar from '../../ui/Navbar/Navbar.tsx';
import GenreSelector from '../../ui/GenreSelector/GenreSelector.tsx';
import ImageCarousel from '../../ui/ImageCarousel/ImageCarousel.tsx';
import BandCard from '../../ui/BandCard/BandCard.tsx';
import DepoimentoCard from '../../ui/DepoimentoCard/DepoimentoCard.tsx';
import styles from './Home.module.css';

const bands = [
    { name: 'Audioslave', genre: 'Grunge', image: '/images/audioslave.jpg' },
    { name: 'SoundGarden', genre: 'Grunge', image: '/images/soundgarden.jpg' },
    { name: 'Metallica', genre: 'Metal', image: '/images/metallica.jpg' },
    { name: 'System of a Down', genre: 'Rock', image: '/images/system.jpg' },
    { name: 'The Doors', genre: 'Classic Rock', image: '/images/thedoors.jpg' },
    { name: 'Nirvana', genre: 'Grunge', image: '/images/nirvana.jpg' },
    { name: 'Queens of the Stone Age', genre: 'Rock', image: '/images/qotsa.jpg' },
    { name: 'Michael Jackson', genre: 'Pop', image: '/images/mj.jpg' },
];

const depoimentos = [
    { name: 'Suzana', text: 'Lorem ipsum dolor sit amet...', image: '/images/user1.jpg' },
    { name: 'Livia', text: 'Lorem ipsum dolor sit amet...', image: '/images/user2.jpg' },
    { name: 'Katia', text: 'Lorem ipsum dolor sit amet...', image: '/images/user3.jpg' },
    { name: 'Matheus', text: 'Lorem ipsum dolor sit amet...', image: '/images/user4.jpg' },
];

export default function Home() {
    return (
        <div className={styles.container}>
            <Navbar />
            <GenreSelector />
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
        </div>
    );
}
