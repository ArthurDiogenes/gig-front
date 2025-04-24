import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import BandCard from "../../components/BandCard/BandCard";
import styles from "./TelaGenero.module.css";

const bandas = [
  {name: "Selvagens a Procura de Lei", genre: "rock", image: "/images/selvaprocuradelei.jpg",},
  {name: "Corja", genre: "rock", image: "/images/corja.jpg",},
  {name: "Garotos da Capital", genre: "rock", image: "/images/garotos-da-capital.jpg",},
  {name: "Audiolave", genre: "rock", image: "/images/audioslave.jpg",},
  {name: "Metallica", genre: "rock", image: "/images/metallica.jpg",},
  {name: "System of a Down", genre: "rock", image: "/images/system.jpg",},
  {name: "Sound Garden", genre: "rock", image: "/images/soundgarden.jpg",},
  {name: "The Doors", genre: "rock", image: "/images/thedoors.jpg",},
  {name: "Nirvana", genre: "rock", image: "/images/nirvana.jpg",},
  {name: "Queen of the Stone Age", genre: "rock", image: "/images/qotsa.jpg",},
  

  {name: "Gustavo Mioto", genre: "sertanejo", image: "/images/gustavo-mioto.jpg",},
  {name: "Ana Castela", genre: "sertanejo", image: "/images/ana-castela.jpg",},
  {name: "Simone", genre: "sertanejo", image: "/images/simone.jpg",},
  {name: "Luan Santana", genre: "sertanejo", image: "/images/ls.jpg",},


  {name: "Mastruz com Leite", genre: "forró", image: "/images/mastruz-leite.jpg",},
  {name: "Wesley Safadão", genre: "forró", image: "/images/safadao.jpg",},
  {name: "Xand Avião", genre: "forró", image: "/images/xand-aviao.jpg",},
  {name: "Solange", genre: "forró", image: "/images/solange.jpg",},

  {name: "Dualipa", genre: "pop", image: "/images/dualipa.jpg",},
  {name: "Michal Jackson", genre: "pop", image: "/images/mj.jpg",},

  {name: "Jazz Brothers", genre: "jazz", image: "/images/jazzbrothers.jpg",},
];


export default function TelaGenero() {
  const { genero } = useParams();

  const generoFormatado = genero
    ? genero
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  const bandasFiltradas = bandas.filter(
    (banda) => banda.genre.toLowerCase() === genero?.toLowerCase()
  );

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.mainContent}>
        <h1 className={styles.title}>Músicos de {generoFormatado}</h1>
        <p className={styles.subTitle}>
          Bandas e artistas de {generoFormatado} para energizar seu evento
        </p>

        <div className={styles.grid}>
          {bandasFiltradas.length > 0 ? (
            bandasFiltradas.map((banda, index) => (
              <BandCard
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
