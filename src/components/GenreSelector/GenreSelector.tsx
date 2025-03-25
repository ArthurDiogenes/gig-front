import styles from './GenreSelector.module.css';

const genres = ['Rock', 'Sertanejo', 'Forró', 'Pop', 'Jazz', 'Eletrônico'];

export default function GenreSelector({ onGenreSelect }: { onGenreSelect: (genre: string) => void }) {
    return (
        <div className={styles.genreSelector}>
            {genres.map((genre, index) => (
                <button key={index} className={styles.genreButton} onClick={() => onGenreSelect(genre)}>{genre}</button>
            ))}
        </div>
    );
}
