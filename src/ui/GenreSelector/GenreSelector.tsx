import styles from './GenreSelector.module.css';

const genres = ['Rock', 'Sertanejo', 'Forró', 'Pop', 'Jazz', 'Eletrônico'];

export default function GenreSelector() {
    return (
        <div className={styles.genreSelector}>
            {genres.map((genre, index) => (
                <button key={index} className={styles.genreButton}>{genre}</button>
            ))}
        </div>
    );
}
