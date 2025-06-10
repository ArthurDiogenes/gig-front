import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import styles from './Pesquisa.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import FiltrosPesquisa from '../../components/FiltrosPesquisa/FiltrosPesquisa';
import { BandCard } from '../../components/BandCardComponent/BandCardComponent';
import CardMusico from '../../components/CardMusico/CardMusico';
import api from '../../services/api';
import { useQuery } from '@tanstack/react-query';

// Define interface for the API response
interface BandSearchResponse {
  data: {
    id: number;
    bandName: string;
    city: string;
    genre: string;
    profilePicture?: string;
    userId?: {
      id: string;
    };
  }[];
  total: number;
  page: number;
  lastPage: number;
}

// Definindo tipos para os resultados
export type ResultadoTipo = 'banda' | 'estabelecimento';

export interface ResultadoBanda {
  id: string; // Changed to string to match BandCard expectations
  tipo: 'banda';
  title: string;
  profilePicture: string;
  year: string;
  rating: number;
  genre: string;
}

export interface ResultadoEstabelecimento {
  id: string; // Changed to string for consistency
  tipo: 'estabelecimento';
  name: string;
  profilePicture: string;
  genre: string;
}

export type ResultadoPesquisa = ResultadoBanda | ResultadoEstabelecimento;

export default function Pesquisa() {
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  
  const [termoPesquisa, setTermoPesquisa] = useState(queryFromUrl);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    genero: '',
    cidade: ''
  });

  useEffect(() => {
    setTermoPesquisa(queryFromUrl);
    setPaginaAtual(1); // Reset page when search term changes
  }, [queryFromUrl]);

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

  const { 
    data: searchResults, 
    isLoading,
    error
  } = useQuery({
    queryKey: ['search', termoPesquisa, paginaAtual],
    queryFn: searchBandsFromAPI,
    enabled: termoPesquisa.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const convertToResultados = (): ResultadoPesquisa[] => {
    if (!searchResults || !searchResults.data || searchResults.data.length === 0) {
      return [];
    }

    return searchResults.data.map(band => ({
      id: band.userId?.id || band.id.toString(), // Use userId.id if available, otherwise convert band.id to string
      tipo: 'banda' as const,
      title: band.bandName,
      profilePicture: band.profilePicture || '/placeholder.svg',
      year: '2024', // You might want to get this from the API if available
      rating: 4.5, // You might want to get this from the API if available
      genre: band.genre
    }));
  };

  const applyFilters = (resultados: ResultadoPesquisa[]): ResultadoPesquisa[] => {
    return resultados.filter(item => {
      // Filter by type
      if (filtros.tipo !== 'todos') {
        if (filtros.tipo === 'bandas' && item.tipo !== 'banda') return false;
        if (filtros.tipo === 'estabelecimentos' && item.tipo !== 'estabelecimento') return false;
      }
      
      // Filter by genre
      if (filtros.genero && item.genre.toLowerCase() !== filtros.genero.toLowerCase()) {
        return false;
      }
      
      // City filter would need to be implemented based on your requirements
      // For now, we'll skip it since the current API doesn't seem to filter by city
      
      return true;
    });
  };

  const resultadosFiltrados = applyFilters(convertToResultados());

  const handleFilterChange = (novosFiltros: { tipo: string; genero: string; cidade: string }) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1); // Reset to first page when filters change
  };

  const handlePageChange = (pagina: number) => {
    setPaginaAtual(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderResultado = (resultado: ResultadoPesquisa) => {
    if (resultado.tipo === 'banda') {
      return (
        <BandCard 
          band={{
            id: resultado.id,
            title: resultado.title,
            profilePicture: resultado.profilePicture,
            rating: resultado.rating
          }}
        />
      );
    } else {
      return (
        <CardMusico 
          name={resultado.name}
          genre={resultado.genre}
          profilePicture={resultado.profilePicture}
          onClick={() => console.log(`Clicou em ${resultado.name}`)}
        />
      );
    }
  };

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Buscando resultados...</p>
    </div>
  );

  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle size={48} className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h3>
      <p className="text-gray-600 mb-4">
        Não encontramos resultados para "<strong>{termoPesquisa}</strong>".
      </p>
      <div className="text-sm text-gray-500">
        <p>Dicas para melhorar sua busca:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Verifique a ortografia</li>
          <li>Tente termos mais gerais</li>
          <li>Use palavras-chave diferentes</li>
        </ul>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle size={48} className="text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao buscar resultados</h3>
      <p className="text-gray-600 mb-4">
        Ocorreu um erro ao buscar os resultados. Tente novamente.
      </p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );

  const totalResultados = searchResults?.total || 0;
  const totalPaginas = searchResults?.lastPage || 1;

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
          
          <div className="bg-white border-radius-12 box-shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                <span className="font-medium text-gray-900">
                  {totalResultados} {totalResultados === 1 ? 'resultado' : 'resultados'} encontrados
                </span>
                {termoPesquisa && (
                  <span>
                    para "<strong className="text-gray-900">{termoPesquisa}</strong>"
                  </span>
                )}
              </div>
            </div>

            {error ? (
              renderError()
            ) : isLoading ? (
              renderLoading()
            ) : resultadosFiltrados.length === 0 ? (
              renderEmpty()
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6">
                  {resultadosFiltrados.map((resultado) => (
                    <div key={`${resultado.tipo}-${resultado.id}`} className="transition-transform hover:-translate-y-1">
                      {renderResultado(resultado)}
                    </div>
                  ))}
                </div>

                {totalPaginas > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button 
                      className="flex items-center justify-center h-9 min-w-9 px-2 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={paginaAtual === 1}
                      onClick={() => handlePageChange(paginaAtual - 1)}
                      aria-label="Página anterior"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    
                    {Array.from({ length: Math.min(totalPaginas, 7) }).map((_, index) => {
                      let pagina: number;
                      
                      if (totalPaginas <= 7) {
                        pagina = index + 1;
                      } else {
                        if (paginaAtual <= 4) {
                          pagina = index + 1;
                        } else if (paginaAtual >= totalPaginas - 3) {
                          pagina = totalPaginas - 6 + index;
                        } else {
                          pagina = paginaAtual - 3 + index;
                        }
                      }

                      if (pagina < 1 || pagina > totalPaginas) return null;

                      return (
                        <button 
                          key={pagina}
                          className={`flex items-center justify-center h-9 min-w-9 px-2 border rounded transition-colors text-sm ${
                            paginaAtual === pagina 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white border-gray-300 hover:bg-gray-50'
                          }`}
                          onClick={() => handlePageChange(pagina)}
                        >
                          {pagina}
                        </button>
                      );
                    })}
                    
                    <button 
                      className="flex items-center justify-center h-9 min-w-9 px-2 border border-gray-300 rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={paginaAtual === totalPaginas}
                      onClick={() => handlePageChange(paginaAtual + 1)}
                      aria-label="Próxima página"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}