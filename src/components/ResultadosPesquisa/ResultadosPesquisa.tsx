import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Grid, List } from 'lucide-react';
import styles from './ResultadosPesquisa.module.css';
import { BandCard } from '../BandCardComponent/BandCardComponent';
import CardMusico from '../CardMusico/CardMusico';

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

interface ResultadosPesquisaProps {
  resultados: ResultadoPesquisa[];
  isLoading: boolean;
  termo: string;
  totalResultados?: number;
  paginaAtual: number;
  totalPaginas: number;
  onChangePagina: (pagina: number) => void;
  className?: string;
  error?: boolean;
  onRetry?: () => void;
}

export default function ResultadosPesquisa({ 
  resultados,
  isLoading,
  termo,
  totalResultados = 0,
  paginaAtual,
  totalPaginas,
  onChangePagina,
  className,
  error = false,
  onRetry
}: ResultadosPesquisaProps) {
  const [visualizacao, setVisualizacao] = useState<'grid' | 'lista'>('grid');
  
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

  // Estado de erro
  if (error) {
    return (
      <div className={`${styles.emptyContainer} ${className || ''}`}>
        <AlertCircle size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>Erro ao carregar resultados</h3>
        <p className={styles.emptyText}>
          Ocorreu um erro ao buscar os resultados. Tente novamente.
        </p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
          >
            Tentar novamente
          </button>
        )}
      </div>
    );
  }

  // Estado de carregamento
  if (isLoading) {
    return (
      <div className={`${styles.loadingContainer} ${className || ''}`}>
        <div className={styles.spinner}></div>
        <p>Buscando resultados...</p>
      </div>
    );
  }

  // Estado de nenhum resultado
  if (resultados.length === 0 && !isLoading) {
    return (
      <div className={`${styles.emptyContainer} ${className || ''}`}>
        <AlertCircle size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>Nenhum resultado encontrado</h3>
        <p className={styles.emptyText}>
          Não encontramos resultados para "<strong>{termo}</strong>".
        </p>
      </div>
    );
  }

  // Função para gerar números de página inteligentes
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPaginas <= maxVisiblePages) {
      // Se temos poucas páginas, mostra todas
      for (let i = 1; i <= totalPaginas; i++) {
        pages.push(i);
      }
    } else {
      // Sempre mostra a primeira página
      pages.push(1);

      if (paginaAtual <= 4) {
        // Próximo ao início
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
        if (totalPaginas > 6) pages.push('...');
        pages.push(totalPaginas);
      } else if (paginaAtual >= totalPaginas - 3) {
        // Próximo ao final
        if (totalPaginas > 6) pages.push('...');
        for (let i = totalPaginas - 4; i <= totalPaginas; i++) {
          if (i > 1) pages.push(i);
        }
      } else {
        // No meio
        pages.push('...');
        for (let i = paginaAtual - 1; i <= paginaAtual + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPaginas);
      }
    }

    return pages;
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.resultadosHeader}>
        <div className={styles.resultadosInfo}>
          <span className={styles.totalResultados}>
            {totalResultados} {totalResultados === 1 ? 'resultado' : 'resultados'} encontrados
          </span>
          {termo && (
            <span className={styles.termoBusca}>
              para "<strong>{termo}</strong>"
            </span>
          )}
        </div>
        
        <div className={styles.viewToggle}>
          <button 
            className={`${styles.viewButton} ${visualizacao === 'grid' ? styles.active : ''}`}
            onClick={() => setVisualizacao('grid')}
            aria-label="Visualização em grid"
            title="Visualização em grade"
          >
            <Grid size={16} />
          </button>
          <button 
            className={`${styles.viewButton} ${visualizacao === 'lista' ? styles.active : ''}`}
            onClick={() => setVisualizacao('lista')}
            aria-label="Visualização em lista"
            title="Visualização em lista"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className={`${styles.resultadosGrid} ${visualizacao === 'lista' ? styles.listaView : ''}`}>
        {resultados.map((resultado) => (
          <div key={`${resultado.tipo}-${resultado.id}`} className={styles.resultadoItem}>
            {renderResultado(resultado)}
          </div>
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageButton}
            disabled={paginaAtual === 1}
            onClick={() => onChangePagina(paginaAtual - 1)}
            aria-label="Página anterior"
            title="Página anterior"
          >
            <ChevronLeft size={16} />
          </button>
          
          {generatePageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className={styles.pageEllipsis}>
                ...
              </span>
            ) : (
              <button 
                key={`page-${page}`}
                className={`${styles.pageButton} ${paginaAtual === page ? styles.activePage : ''}`}
                onClick={() => onChangePagina(page as number)}
                aria-label={`Ir para página ${page}`}
                title={`Página ${page}`}
              >
                {page}
              </button>
            )
          ))}
          
          <button 
            className={styles.pageButton}
            disabled={paginaAtual === totalPaginas}
            onClick={() => onChangePagina(paginaAtual + 1)}
            aria-label="Próxima página"
            title="Próxima página"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}