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
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SearchNavbar from '../../components/Navbar/SearchNavbar';
// Define interface for the API response
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

interface VenueSearchResponse {
  data: {
    id: string;
    name: string;
    type: string;
    city: string;
    description?: string;
    contact?: string;
    address?: string;
    cep?: string;
    user?: {
      id: string;
      role: string;
    };
  }[];
  total: number;
  page: number;
  lastPage: number;
}

// Definindo tipos para os resultados
export type ResultadoTipo = 'banda' | 'estabelecimento';

export interface ResultadoBanda {
  id: string;
  tipo: 'banda';
  title: string;
  profilePicture: string;
  year: string;
  rating: number;
  genre: string;
}

export interface ResultadoEstabelecimento {
  id: string;
  tipo: 'estabelecimento';
  name: string;
  profilePicture: string;
  type: string;
  city: string;
}

export type ResultadoPesquisa = ResultadoBanda | ResultadoEstabelecimento;

type TabType = 'bandas' | 'estabelecimentos';

export default function Pesquisa() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  
  const [termoPesquisa, setTermoPesquisa] = useState(queryFromUrl);
  const [activeTab, setActiveTab] = useState<TabType>('bandas');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    genero: '',
    cidade: ''
  });

  useEffect(() => {
    setTermoPesquisa(queryFromUrl);
    setPaginaAtual(1);
  }, [queryFromUrl]);

  // Function to search bands
  const searchBandsFromAPI = async (): Promise<BandSearchResponse> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any = {
        page: paginaAtual,
        limit: 10
      };
      
      // Only add name parameter if there's a search term
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

  // Function to get all bands when no search term
  const getAllBands = async (): Promise<BandSearchResponse> => {
    try {
      const response = await api.get('/bands', {
        params: {
          page: paginaAtual,
          limit: 10
        }
      });
      
      // Transform the response to match the expected format
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

  // Function to search venues
  const searchVenuesFromAPI = async (): Promise<VenueSearchResponse> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const params: any = {
        page: paginaAtual,
        limit: 10
      };
      
      if (termoPesquisa.trim()) {
        params.name = termoPesquisa;
      }
      
      const response = await api.get('/venues', { params });
      
      // Transform the response to match the expected format
      const venues = response.data;
      const total = venues.length;
      const lastPage = Math.ceil(total / 10);
      
      return {
        data: venues,
        total,
        page: paginaAtual,
        lastPage
      };
    } catch (error) {
      console.error('Error searching venues:', error);
      return { data: [], total: 0, page: paginaAtual, lastPage: 1 };
    }
  };

  // Query for bands
  const { 
    data: bandsResults, 
    isLoading: bandsLoading,
    error: bandsError
  } = useQuery({
    queryKey: ['bands', termoPesquisa, paginaAtual],
    queryFn: termoPesquisa.trim() ? searchBandsFromAPI : getAllBands,
    staleTime: 1000 * 60 * 5,
  });

  // Query for venues
  const { 
    data: venuesResults, 
    isLoading: venuesLoading,
    error: venuesError
  } = useQuery({
    queryKey: ['venues', termoPesquisa, paginaAtual],
    queryFn: searchVenuesFromAPI,
    enabled: activeTab === 'estabelecimentos',
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
        tipo: 'banda' as const,
        title: band.bandName,
        profilePicture: '/placeholder.svg',
        year: new Date(band.createdAt).getFullYear().toString(),
        rating: 4.5,
        genre: band.genre
      }));
  };

  const convertVenuesToResultados = (): ResultadoEstabelecimento[] => {
    if (!venuesResults || !venuesResults.data || venuesResults.data.length === 0) {
      return [];
    }

    return venuesResults.data
      .filter(venue => venue.user?.id)
      .map(venue => ({
        id: venue.user!.id,
        tipo: 'estabelecimento' as const,
        name: venue.name,
        profilePicture: '/placeholder.svg',
        type: venue.type,
        city: venue.city
      }));
  };

  const applyFilters = (resultados: ResultadoPesquisa[]): ResultadoPesquisa[] => {
    return resultados.filter(item => {
      // Filter by genre for bands
      if (filtros.genero && item.tipo === 'banda' && item.genre.toLowerCase() !== filtros.genero.toLowerCase()) {
        return false;
      }
      
      // Filter by city
      if (filtros.cidade) {
        if (item.tipo === 'banda') {
          // For bands, we'd need to add city filtering logic
          return true;
        } else {
          return item.city.toLowerCase().includes(filtros.cidade.toLowerCase());
        }
      }
      
      return true;
    });
  };

  const handleFilterChange = (novosFiltros: { tipo: string; genero: string; cidade: string }) => {
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
    // Update URL params
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    } else {
      setSearchParams({});
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setPaginaAtual(1);
  };

  // Get current results based on active tab
  const getCurrentResults = () => {
    if (activeTab === 'bandas') {
      return applyFilters(convertBandsToResultados());
    } else {
      return applyFilters(convertVenuesToResultados());
    }
  };

  const isLoading = activeTab === 'bandas' ? bandsLoading : venuesLoading;
  const error = activeTab === 'bandas' ? bandsError : venuesError;
  const currentResults = getCurrentResults();
  const totalResultados = activeTab === 'bandas' ? (bandsResults?.total || 0) : (venuesResults?.total || 0);
  const totalPaginas = activeTab === 'bandas' ? (bandsResults?.lastPage || 1) : (venuesResults?.lastPage || 1);

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
        <Link 
          to={`/venue/${resultado.id}`}
          className="block overflow-hidden transition-transform rounded-lg shadow group hover:scale-105"
        >
          <div className="relative">
            <img
              src={resultado.profilePicture || "/placeholder.svg"}
              alt={resultado.name}
              className="object-cover w-full aspect-[2/3]"
              width={300}
              height={450}
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-sm font-medium text-white">{resultado.name}</h3>
              <p className="text-xs text-white/80">{resultado.type}</p>
              <p className="text-xs text-white/60">{resultado.city}</p>
            </div>
          </div>
        </Link>
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
        {termoPesquisa ? (
          <>Não encontramos resultados para "<strong>{termoPesquisa}</strong>".</>
        ) : (
          <>Nenhum {activeTab === 'bandas' ? 'banda' : 'estabelecimento'} encontrado.</>
        )}
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

  return (
    <div className={styles.pesquisaContainer}>
      <SearchNavbar />
      
      <main className={styles.mainContent}>
        <div className={styles.pesquisaHeader}>
          <h1 className={styles.title}>Pesquisa</h1>
          <p className={styles.subtitle}>
            Encontre bandas, músicos e estabelecimentos que combinam com seu estilo
          </p>
        </div>

        {/* Internal Search Bar */}
        <div className="mb-6">
          <BarraPesquisa
            placeholder={`Pesquisar ${activeTab === 'bandas' ? 'bandas' : 'estabelecimentos'}...`}
            value={termoPesquisa}
            onChange={setTermoPesquisa}
            onSearch={handleSearch}
          />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'bandas' ? 'default' : 'ghost'}
              onClick={() => handleTabChange('bandas')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'bandas' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Bandas
            </Button>
            <Button
              variant={activeTab === 'estabelecimentos' ? 'default' : 'ghost'}
              onClick={() => handleTabChange('estabelecimentos')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'estabelecimentos' 
                  ? 'bg-white text-black shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Estabelecimentos
            </Button>
          </div>
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