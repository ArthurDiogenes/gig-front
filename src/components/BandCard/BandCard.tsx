import styles from './BandCard.module.css';

interface BandCardProps {
    name: string;
    genre: string;
    image: string;
    onClick?: () => void;
}

export default function BandCard({ name, genre, image, onClick }: BandCardProps) {
    return (
        <button className={styles.bandCard} onClick={onClick}>
            <img src={image} alt={name} className={styles.image} />
            <div className={styles.info}>
                <h3>{name}</h3>
                <p>{genre}</p>
            </div>
        </button>
    );
}
