import styles from './CardMusico.module.css';

interface CardMusicoProps {
  name: string;
  genre: string;
  image: string;
  bandCount?: number;
  onClick?: () => void;
}

export default function CardMusico({ name, genre, image, bandCount, onClick }: CardMusicoProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt={genre} className={styles.thumbnail} />
      <div className={styles.content}>
        
        <h3 className={styles.name}>{name}</h3>
        {bandCount !== undefined && (
          <span className={styles.bandCount}>{bandCount} bandas</span>
        )}
      </div>
    </div>
  );
}
