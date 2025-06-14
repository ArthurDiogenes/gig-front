import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import styles from './Pesquisa.module.css';
import Footer from '../../components/Footer/Footer';
import FiltrosPesquisa from '../../components/FiltrosPesquisa/FiltrosPesquisa';
import { BandCard } from '../../components/BandCardComponent/BandCardComponent';
import BarraPesquisa from '../../components/BarraPesquisa/BarraPesquisa';
import api from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import SearchNavbar from '../../components/Navbar/SearchNavbar';

interface BandSearchResponse {
  data: {
    id: number;
    bandName: string;
    city: string;
    genre: string;
    description?: string;
    contact?: string;
    members?: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
    userId?: {
      id: string;
      role: string;
    };
  }[];
  total: number;
  page: number;
  lastPage: number;
}

export interface ResultadoBanda {
  id: string;
  title: string;
  profilePicture: string;
  year: string;
  rating: number;
  genre: string;
}

export default function Pesquisa() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const [termoPesquisa, setTermoPesquisa] = useState(queryFromUrl);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState({ genero: '' });

  useEffect(() => {
    setTermoPesquisa(queryFromUrl);
    setPaginaAtual(1);
  }, [queryFromUrl]);

  const searchBandsFromAPI = async (): Promise<BandSearchResponse> => {
    try {
      const params: any = {
        page: paginaAtual,
        limit: 10
      };

      if (termoPesquisa.trim()) {
        params.name = termoPesquisa;
      }

      const response = await api.get('/bands/pesquisa', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching bands:', error);
      return { data: [], total: 0, page: paginaAtual, lastPage: 1 };
    }
  };

  const getAllBands = async (): Promise<BandSearchResponse> => {
    try {
      const response = await api.get('/bands', {
        params: {
          page: paginaAtual,
          limit: 10
        }
      });

      const bands = response.data;
      const total = bands.length;
      const lastPage = Math.ceil(total / 10);

      return {
        data: bands,
        total,
        page: paginaAtual,
        lastPage
      };
    } catch (error) {
      console.error('Error fetching all bands:', error);
      return { data: [], total: 0, page: paginaAtual, lastPage: 1 };
    }
  };

  const { data: bandsResults, isLoading, error } = useQuery({
    queryKey: ['bands', termoPesquisa, paginaAtual],
    queryFn: termoPesquisa.trim() ? searchBandsFromAPI : getAllBands,
    staleTime: 1000 * 60 * 5,
  });

  const convertBandsToResultados = (): ResultadoBanda[] => {
    if (!bandsResults || !bandsResults.data || bandsResults.data.length === 0) {
      return [];
    }

    return bandsResults.data
      .filter(band => band.userId?.id)
      .map(band => ({
        id: band.userId!.id,
        title: band.bandName,
        profilePicture: '/placeholder.svg',
        year: new Date(band.createdAt).getFullYear().toString(),
        rating: 4.5,
        genre: band.genre
      }));
  };

  const applyFilters = (resultados: ResultadoBanda[]): ResultadoBanda[] => {
    return resultados.filter(item => {
      if (filtros.genero && item.genre.toLowerCase() !== filtros.genero.toLowerCase()) {
        return false;
      }
      return true;
    });
  };

  const handleFilterChange = (novosFiltros: { genero: string }) => {
    setFiltros(novosFiltros);
    setPaginaAtual(1);
  };

  const handlePageChange = (pagina: number) => {
    setPaginaAtual(pagina);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (searchTerm: string) => {
    setTermoPesquisa(searchTerm);
    setPaginaAtual(1);
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  const currentResults = applyFilters(convertBandsToResultados());
  const totalResultados = bandsResults?.total || 0;
  const totalPaginas = bandsResults?.lastPage || 1;

  const renderResultado = (resultado: ResultadoBanda) => (
    <BandCard 
      band={{
        id: resultado.id,
        title: resultado.title,
        profilePicture: resultado.profilePicture,
        rating: resultado.rating
      }}
    />
  );

  const renderLoading = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600">Buscando resultados...</p>
    </div>
  );

  const renderEmpty = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle size={48} className="text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma banda encontrada</h3>
      <p className="text-gray-600 mb-4">
        {termoPesquisa ? (
          <>Não encontramos resultados para "<strong>{termoPesquisa}</strong>".</>
        ) : (
          <>Nenhuma banda encontrada</>
        )}
      </p>
    </div>
  );

  const renderError = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle size={48} className="text-red-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Erro ao buscar resultados</h3>
      <p className="text-gray-600 mb-4">Ocorreu um erro ao buscar os resultados. Tente novamente.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );

  return (
    <div className={styles.pesquisaContainer}>
      <SearchNavbar />

      <main className={styles.mainContent}>
        <div className={styles.pesquisaHeader}>
          <h1 className={styles.title}>Pesquisa</h1>
          <p className={styles.subtitle}>
            Encontre bandas e músicos que combinam com seu estilo
          </p>
        </div>

        <div className="mb-6">
          <BarraPesquisa
            placeholder="Pesquisar bandas..."
            value={termoPesquisa}
            onChange={setTermoPesquisa}
            onSearch={handleSearch}
          />
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
            ) : currentResults.length === 0 ? (
              renderEmpty()
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-6">
                  {currentResults.map((resultado) => (
                    <div key={resultado.id} className="transition-transform hover:-translate-y-1">
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
