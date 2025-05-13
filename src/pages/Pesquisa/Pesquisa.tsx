import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pesquisa.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FiltrosPesquisa from '../../components/FiltrosPesquisa/FiltrosPesquisa';
import ResultadosPesquisa, { 
  ResultadoPesquisa,
  ResultadoBanda,
  ResultadoEstabelecimento
} from '../../components/ResultadosPesquisa/ResultadosPesquisa';

// Dados de exemplo estáticos
const bandas: ResultadoBanda[] = [
  { id: 1, tipo: 'banda', title: 'Rock Legends', image: '/images/selvaprocuradelei.jpg', year: '2001', rating: 4.5, genre: 'Rock' },
  { id: 2, tipo: 'banda', title: 'Nirvana', image: '/images/nirvana.jpg', year: '1987', rating: 5, genre: 'Rock' },
  { id: 3, tipo: 'banda', title: 'The Doors', image: '/images/thedoors.jpg', year: '1965', rating: 4.8, genre: 'Rock' },
  { id: 4, tipo: 'banda', title: 'Gustavo Mioto', image: '/images/gustavo-mioto.jpg', year: '2015', rating: 4.2, genre: 'Sertanejo' },
  { id: 5, tipo: 'banda', title: 'Metallica', image: '/images/metallica.jpg', year: '1981', rating: 4.7, genre: 'Rock' },
  { id: 8, tipo: 'banda', title: 'Selvagens à Procura de Lei', image: '/images/selvaprocuradelei.jpg', year: '2010', rating: 4.6, genre: 'Rock' },
  { id: 9, tipo: 'banda', title: 'Wesley Safadão', image: '/images/safadao.jpg', year: '2012', rating: 4.3, genre: 'Forró' },
  { id: 10, tipo: 'banda', title: 'Mastruz com Leite', image: '/images/mastruz-leite.jpg', year: '1990', rating: 4.4, genre: 'Forró' },
];

const estabelecimentos: ResultadoEstabelecimento[] = [
  { id: 6, tipo: 'estabelecimento', name: 'Hard Rock Cafe', image: '/images/hard-rock.png', genre: 'Restaurante' },
  { id: 7, tipo: 'estabelecimento', name: 'Pub do Rock', image: '/placeholder.svg', genre: 'Bar' },
  { id: 11, tipo: 'estabelecimento', name: 'Boteco Cearense', image: '/placeholder.svg', genre: 'Bar' },
  { id: 12, tipo: 'estabelecimento', name: 'Casa de Show Dragão do Mar', image: '/placeholder.svg', genre: 'Casa de show' },
];

// Combinando bandas e estabelecimentos em um único array
const dadosExemplo: ResultadoPesquisa[] = [...bandas, ...estabelecimentos];

export default function Pesquisa() {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  
  // Estados básicos para a página
  const [termoPesquisa, setTermoPesquisa] = useState(queryFromUrl);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    genero: '',
    cidade: ''
  });

  // Atualiza o termo de pesquisa quando a URL muda
  useEffect(() => {
    setTermoPesquisa(queryFromUrl);
  }, [queryFromUrl]);

  // Filtra os resultados com base no termo e filtros
  const resultadosFiltrados = dadosExemplo.filter(item => {
    // Filtro por termo de pesquisa
    if (termoPesquisa) {
      const termo = termoPesquisa.toLowerCase();
      const matchesTerm = item.tipo === 'banda' 
        ? item.title.toLowerCase().includes(termo) || item.genre.toLowerCase().includes(termo)
        : item.name.toLowerCase().includes(termo) || item.genre.toLowerCase().includes(termo);
      
      if (!matchesTerm) return false;
    }
    
    // Filtro por tipo
    if (filtros.tipo !== 'todos') {
      if (filtros.tipo === 'bandas' && item.tipo !== 'banda') return false;
      if (filtros.tipo === 'estabelecimentos' && item.tipo !== 'estabelecimento') return false;
    }
    
    // Filtro por gênero
    if (filtros.genero && item.genre.toLowerCase() !== filtros.genero.toLowerCase()) {
      return false;
    }
    
    // Filtro por cidade (simulado - não temos cidade nos dados de exemplo)
    if (filtros.cidade) {
      // Em um caso real, verificaríamos a cidade aqui
      // Por enquanto, retorna verdadeiro para não filtrar por cidade
    }
    
    return true;
  });
  
  // Paginação simples
  const itensPorPagina = 6;
  const totalPaginas = Math.ceil(resultadosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const resultadosPaginados = resultadosFiltrados.slice(inicio, fim);

  // Handler para filtros
  const handleFilterChange = (novosFiltros: { tipo: string; genero: string; cidade: string }) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  // Handler para paginação
  const handlePageChange = (pagina: number) => {
    setPaginaAtual(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.pesquisaContainer}>
      <Navbar />
      
      <main className={styles.mainContent}>
        <div className={styles.pesquisaHeader}>
          <h1 className={styles.title}>Pesquisa</h1>
          <p className={styles.subtitle}>
            Encontre bandas, músicos e estabelecimentos que combinam com seu estilo
          </p>
          {termoPesquisa && (
            <p className={styles.searchTerm}>
              Resultados para: <strong>"{termoPesquisa}"</strong>
            </p>
          )}
        </div>
        
        <div className={styles.pesquisaBox}>
          <FiltrosPesquisa onFilterChange={handleFilterChange} />
          
          <ResultadosPesquisa 
            resultados={resultadosPaginados}
            isLoading={false}
            termo={termoPesquisa}
            totalResultados={resultadosFiltrados.length}
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            onChangePagina={handlePageChange}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}