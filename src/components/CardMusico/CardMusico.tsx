import styles from './GenreCollectionCard.module.css';

interface GenreCollectionCardProps {
  genre: string;
  image: string;
  bandCount?: number; // número de bandas do gênero, opcional
  onClick?: () => void;
}

export default function GenreCollectionCard({ genre, image, bandCount, onClick }: GenreCollectionCardProps) {
  return (
    <button className={styles.card} onClick={onClick}>
      <img src={image} alt={genre} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.genre}>{genre}</h3>
        {bandCount !== undefined && (
          <p className={styles.bandCount}>{bandCount} bandas</p>
        )}
      </div>
    </button>
  );
}
