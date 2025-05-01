import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import CardMusico from "../../components/CardMusico/CardMusico";
import styles from "./TelaGenero.module.css";

const bandas = [
  {
    name: "Selvagens a Procura de Lei",
    genre: "Rock",
    image: "/images/selvaprocuradelei.jpg",
  },
  { name: "Corja", genre: "Rock", image: "/images/corja.jpg" },
  {
    name: "Garotos da Capital",
    genre: "Rock",
    image: "/images/garotos-da-capital.jpg",
  },
  { name: "Audiolave", genre: "Rock", image: "/images/audioslave.jpg" },
  { name: "Metallica", genre: "Rock", image: "/images/metallica.jpg" },
  { name: "System of a Down", genre: "Rock", image: "/images/system.jpg" },
  { name: "Sound Garden", genre: "Rock", image: "/images/soundgarden.jpg" },
  { name: "The Doors", genre: "Rock", image: "/images/thedoors.jpg" },
  { name: "Nirvana", genre: "Rock", image: "/images/nirvana.jpg" },
  { name: "Queen of the Stone Age", genre: "Rock", image: "/images/qotsa.jpg" },

  {
    name: "Gustavo Mioto",
    genre: "Sertanejo",
    image: "/images/gustavo-mioto.jpg",
  },
  { name: "Ana Castela", genre: "Sertanejo", image: "/images/ana-castela.jpg" },
  { name: "Simone", genre: "Sertanejo", image: "/images/simone.jpg" },
  { name: "Luan Santana", genre: "Sertanejo", image: "/images/ls.jpg" },

  {
    name: "Mastruz com Leite",
    genre: "Forró",
    image: "/images/mastruz-leite.jpg",
  },
  { name: "Wesley Safadão", genre: "Forró", image: "/images/safadao.jpg" },
  { name: "Xand Avião", genre: "Forró", image: "/images/xand-aviao.jpg" },
  { name: "Solange", genre: "Forró", image: "/images/solange.jpg" },

  { name: "Dualipa", genre: "Pop", image: "/images/dualipa.jpg" },
  { name: "Michal Jackson", genre: "Pop", image: "/images/mj.jpg" },

  { name: "Jazz Brothers", genre: "Jazz", image: "/images/jazzbrothers.jpg" },

  { name: "Panchiko", genre: "Eletrônico", image: "/images/panchiko.jpg" },
];

export default function TelaGenero() {
  const { genero } = useParams();

  const generoFormatado = genero
    ? genero
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  const bandasFiltradas = bandas
    .filter((banda) => banda.genre.toLowerCase() === genero?.toLowerCase())
    .sort((a, b) => a.name.localeCompare(b.name)); // ⬅️ Aqui está a ordenação alfabética

  return (
    <div className={styles.container}>
      <Navbar />
      {/* <GenreSelector onGenreSelect={(genero) => navigate(`/genero/${genero.toLowerCase()}`)} /> */}

      <div className={styles.mainContent}>
        <h1 className={styles.title}>Músicos de {generoFormatado}</h1>
        <p className={styles.subTitle}>
          Bandas e artistas de {generoFormatado} para energizar seu evento
        </p>

        <div className={styles.grid}>
          {bandasFiltradas.length > 0 ? (
            bandasFiltradas.map((banda, index) => (
              <CardMusico
                key={index}
                name={banda.name}
                genre={banda.genre}
                image={banda.image}
                onClick={() => console.log(`Clicou em ${banda.name}`)}
              />
            ))
          ) : (
            <p>Nenhum artista encontrado para este gênero.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
