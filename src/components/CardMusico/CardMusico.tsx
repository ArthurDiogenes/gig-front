import styles from './CardMusico.module.css';

interface CardMusicoProps {
  name: string;
  genre: string;
  profilePicture: string;
  bandCount?: number;
  onClick?: () => void;
}

export default function CardMusico({ name, genre, profilePicture, bandCount, onClick }: CardMusicoProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={profilePicture} alt={genre} className={styles.thumbnail} />
      <div className={styles.content}>
        
        <h3 className={styles.name}>{name}</h3>
        {bandCount !== undefined && (
          <span className={styles.bandCount}>{bandCount} bandas</span>
        )}
      </div>
    </div>
  );
}