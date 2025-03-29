import styles from './DepoimentoCard.module.css';

interface DepoimentoCardProps {
    name: string;
    text: string;
    image: string;
}

export default function DepoimentoCard({ name, text, image }: DepoimentoCardProps) {
    return (
        <div className={styles.depoimentoCard}>
            <p className={styles.text}>&ldquo;{text}&rdquo;</p>
            <div className={styles.userInfo}>
                <img src={image} alt={name} className={styles.userImage} />
                <h4 className={styles.userName}>{name}</h4>
            </div>
        </div>
    );
}
