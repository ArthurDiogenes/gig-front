import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import styles from './ResultadosPesquisa.module.css';
import { BandCard } from '../BandCardComponent/BandCardComponent';
import CardMusico from '../CardMusico/CardMusico';

// Definindo tipos para os resultados
export type ResultadoTipo = 'banda' | 'estabelecimento';

export interface ResultadoBanda {
  id: number;
  tipo: 'banda';
  title: string;
  image: string;
  year: string;
  rating: number;
  genre: string;
}

export interface ResultadoEstabelecimento {
  id: number;
  tipo: 'estabelecimento';
  name: string;
  image: string;
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
}

export default function ResultadosPesquisa({ 
  resultados,
  isLoading,
  termo,
  totalResultados = 0,
  paginaAtual,
  totalPaginas,
  onChangePagina,
  className
}: ResultadosPesquisaProps) {
  const [visualizacao, setVisualizacao] = useState<'grid' | 'lista'>('grid');
  
  const renderResultado = (resultado: ResultadoPesquisa) => {
    if (resultado.tipo === 'banda') {
      return (
        <BandCard 
          band={{
            id: resultado.id,
            title: resultado.title,
            image: resultado.image || '/placeholder.svg',
            year: resultado.year,
            rating: resultado.rating
          }}
        />
      );
    } else {
      return (
        <CardMusico 
          name={resultado.name}
          genre={resultado.genre}
          image={resultado.image || '/placeholder.svg'}
          onClick={() => console.log(`Clicou em ${resultado.name}`)}
        />
      );
    }
  };

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
  if (resultados.length === 0) {
    return (
      <div className={`${styles.emptyContainer} ${className || ''}`}>
        <AlertCircle size={48} className={styles.emptyIcon} />
        <h3 className={styles.emptyTitle}>Nenhum resultado encontrado</h3>
        <p className={styles.emptyText}>
          Não encontramos resultados para "<strong>{termo}</strong>".
        </p>
        <div className={styles.sugestoes}>
          <p>Sugestões:</p>
          <ul>
            <li>Verifique se a palavra foi digitada corretamente</li>
            <li>Tente utilizar palavras-chave diferentes</li>
            <li>Utilize termos mais gerais</li>
            <li>Reduza o número de filtros aplicados</li>
          </ul>
        </div>
      </div>
    );
  }

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
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
          <button 
            className={`${styles.viewButton} ${visualizacao === 'lista' ? styles.active : ''}`}
            onClick={() => setVisualizacao('lista')}
            aria-label="Visualização em lista"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M3 19H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`${styles.resultadosGrid} ${visualizacao === 'lista' ? styles.listaView : ''}`}>
        {resultados.map((resultado, index) => (
          <div key={`${resultado.tipo}-${resultado.id || index}`} className={styles.resultadoItem}>
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
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPaginas }).map((_, index) => {
            const pagina = index + 1;
            // Mostrar sempre a primeira, a última e as páginas ao redor da atual
            if (
              pagina === 1 || 
              pagina === totalPaginas || 
              (pagina >= paginaAtual - 1 && pagina <= paginaAtual + 1)
            ) {
              return (
                <button 
                  key={pagina}
                  className={`${styles.pageButton} ${paginaAtual === pagina ? styles.activePage : ''}`}
                  onClick={() => onChangePagina(pagina)}
                >
                  {pagina}
                </button>
              );
            } else if (
              (pagina === paginaAtual - 2 && paginaAtual > 3) || 
              (pagina === paginaAtual + 2 && paginaAtual < totalPaginas - 2)
            ) {
              // Mostrar reticências para indicar páginas ocultas
              return <span key={pagina} className={styles.pageEllipsis}>...</span>;
            }
            return null;
          })}
          
          <button 
            className={styles.pageButton}
            disabled={paginaAtual === totalPaginas}
            onClick={() => onChangePagina(paginaAtual + 1)}
            aria-label="Próxima página"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}