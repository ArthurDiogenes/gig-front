import { useState } from 'react';
import styles from './ImageCarousel.module.css';

const images = [
    '/images/carousel1.jpg',
    '/images/carousel2.jpg',
    '/images/carousel3.jpg'
];

export default function ImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={styles.carousel}>
            <button className={styles.prev} onClick={prevSlide}>&#10094;</button>
            <img src={images[currentIndex]} alt="Carousel" className={styles.image} />
            <button className={styles.next} onClick={nextSlide}>&#10095;</button>
        </div>
    );
}
