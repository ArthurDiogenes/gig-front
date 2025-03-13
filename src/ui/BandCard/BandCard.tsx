import styles from './BandCard.module.css';

interface BandCardProps {
    name: string;
    genre: string;
    image: string;
}

export default function BandCard({ name, genre, image }: BandCardProps) {
    return (
        <div className={styles.bandCard}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.info}>
                <h3>{name}</h3>
                <p>{genre}</p>
            </div>
        </div>
    );
}
