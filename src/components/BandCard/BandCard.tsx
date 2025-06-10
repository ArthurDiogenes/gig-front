import styles from './BandCard.module.css';

interface BandCardProps {
    name: string;
    genre: string;
    profilePicture: string;
    onClick?: () => void;
}

export default function BandCard({ name, genre, profilePicture, onClick }: BandCardProps) {
    return (
        <button className={styles.bandCard} onClick={onClick}>
            <img src={profilePicture} alt={name} className={styles.image} />
            <div className={styles.info}>
                <h3>{name}</h3>
                <p>{genre}</p>
            </div>
        </button>
    );
}