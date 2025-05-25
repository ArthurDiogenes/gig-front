import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './Pesquisa.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FiltrosPesquisa from '../../components/FiltrosPesquisa/FiltrosPesquisa';
import ResultadosPesquisa, { 
  ResultadoPesquisa
} from '../../components/ResultadosPesquisa/ResultadosPesquisa';
import api from '../../services/api';
import { useQuery } from '@tanstack/react-query';

// Define interface for the API response
interface BandSearchResponse {
  data: {
    id: number;
    bandName: string;
    city: string;
    genre: string;
  }[];
  total: number;
  page: number;
  lastPage: number;
}

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

  // Update search term when URL changes
  useEffect(() => {
    setTermoPesquisa(queryFromUrl);
  }, [queryFromUrl]);

  // Create search function
  const searchBandsFromAPI = async (): Promise<BandSearchResponse> => {
    if (!termoPesquisa) {
      return { data: [], total: 0, page: 1, lastPage: 1 };
    }
    
    try {
      const response = await api.get('/bands/pesquisa', {
        params: {
          name: termoPesquisa,
          page: paginaAtual,
          limit: 10
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error searching bands:', error);
      return { data: [], total: 0, page: paginaAtual, lastPage: 1 };
    }
  };

  // Use React Query to fetch search results
  const { 
    data: searchResults, 
    isLoading
  } = useQuery({
    queryKey: ['search', termoPesquisa, paginaAtual],
    queryFn: searchBandsFromAPI,
    enabled: termoPesquisa.length > 0,
  });

  // Convert API results to the format expected by ResultadosPesquisa
  const convertToResultados = (): ResultadoPesquisa[] => {
    if (!searchResults || !searchResults.data || searchResults.data.length === 0) {
      return [];
    }

    return searchResults.data.map(band => ({
      id: band.id,
      tipo: 'banda',
      title: band.bandName,
      image: '/images/placeholder.svg',
      year: '2024', // Using a default since we don't have the year in the API response
      rating: 4.5, // Default rating
      genre: band.genre
    }));
  };

  // Apply filters to results
  const applyFilters = (resultados: ResultadoPesquisa[]): ResultadoPesquisa[] => {
    return resultados.filter(item => {
      // Filter by tipo
      if (filtros.tipo !== 'todos') {
        if (filtros.tipo === 'bandas' && item.tipo !== 'banda') return false;
        if (filtros.tipo === 'estabelecimentos' && item.tipo !== 'estabelecimento') return false;
      }
      
      // Filter by gênero
      if (filtros.genero && item.genre.toLowerCase() !== filtros.genero.toLowerCase()) {
        return false;
      }
      
      // Filter by cidade (if we have city data in the future)
      if (filtros.cidade) {
        // In a real implementation, check city data here
      }
      
      return true;
    });
  };

  // Get the final results
  const resultadosFiltrados = applyFilters(convertToResultados());

  // Handler for filters
  const handleFilterChange = (novosFiltros: { tipo: string; genero: string; cidade: string }) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  // Handler for pagination
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
            resultados={resultadosFiltrados}
            isLoading={isLoading}
            termo={termoPesquisa}
            totalResultados={searchResults?.total || 0}
            paginaAtual={paginaAtual}
            totalPaginas={searchResults?.lastPage || 1}
            onChangePagina={handlePageChange}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}