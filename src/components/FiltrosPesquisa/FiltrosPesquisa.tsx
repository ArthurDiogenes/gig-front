import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import styles from './FiltrosPesquisa.module.css';

interface FiltroOption {
  label: string;
  value: string;
}

const tiposOptions: FiltroOption[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Bandas', value: 'bandas' },
  { label: 'Estabelecimentos', value: 'estabelecimentos' }
];

const generoOptions: FiltroOption[] = [
  { label: 'Rock', value: 'rock' },
  { label: 'Sertanejo', value: 'sertanejo' },
  { label: 'Forró', value: 'forro' },
  { label: 'Pop', value: 'pop' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Eletrônico', value: 'eletronico' },
  { label: 'MPB', value: 'mpb' }
];

const cidadeOptions: FiltroOption[] = [
  { label: 'Fortaleza', value: 'fortaleza' },
  { label: 'São Paulo', value: 'sao-paulo' },
  { label: 'Rio de Janeiro', value: 'rio-de-janeiro' },
  { label: 'Brasília', value: 'brasilia' },
  { label: 'Salvador', value: 'salvador' }
];

interface FiltrosPesquisaProps {
  onFilterChange: (filtros: {
    tipo: string;
    genero: string;
    cidade: string;
  }) => void;
  className?: string;
}

export default function FiltrosPesquisa({ onFilterChange, className }: FiltrosPesquisaProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    genero: '',
    cidade: ''
  });

  const handleFilterChange = (tipo: 'tipo' | 'genero' | 'cidade', valor: string) => {
    const novosFiltros = {
      ...filtros,
      [tipo]: valor
    };
    
    setFiltros(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosLimpos = {
      tipo: 'todos',
      genero: '',
      cidade: ''
    };
    
    setFiltros(filtrosLimpos);
    onFilterChange(filtrosLimpos);
  };

  // Conta quantos filtros estão ativos (excluindo 'todos' do tipo)
  const filtrosAtivos = Object.values(filtros).filter(valor => valor && valor !== 'todos').length;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.header}>
        <button 
          className={styles.toggleButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Filter size={18} />
          <span>Filtros</span>
          {filtrosAtivos > 0 && <span className={styles.badge}>{filtrosAtivos}</span>}
        </button>
        
        {filtrosAtivos > 0 && (
          <button 
            className={styles.limparButton}
            onClick={limparFiltros}
          >
            <X size={16} />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      {(isExpanded || filtrosAtivos > 0) && (
        <div className={styles.filtrosContent}>
          <div className={styles.filtroGroup}>
            <h3 className={styles.filtroTitle}>Tipo</h3>
            <div className={styles.opcoes}>
              {tiposOptions.map(opcao => (
                <label key={opcao.value} className={styles.opcao}>
                  <input
                    type="radio"
                    name="tipo"
                    value={opcao.value}
                    checked={filtros.tipo === opcao.value}
                    onChange={() => handleFilterChange('tipo', opcao.value)}
                    className={styles.radioInput}
                  />
                  <span className={`${styles.radioLabel} ${filtros.tipo === opcao.value ? styles.selected : ''}`}>
                    {opcao.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filtroGroup}>
            <h3 className={styles.filtroTitle}>Gênero</h3>
            <div className={styles.opcoes}>
              {generoOptions.map(opcao => (
                <label key={opcao.value} className={styles.chipLabel}>
                  <input
                    type="radio"
                    name="genero"
                    value={opcao.value}
                    checked={filtros.genero === opcao.value}
                    onChange={() => handleFilterChange('genero', opcao.value)}
                    className={styles.chipInput}
                  />
                  <span className={`${styles.chipOption} ${filtros.genero === opcao.value ? styles.selected : ''}`}>
                    {opcao.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.filtroGroup}>
            <h3 className={styles.filtroTitle}>Cidade</h3>
            <div className={styles.opcoes}>
              {cidadeOptions.map(opcao => (
                <label key={opcao.value} className={styles.chipLabel}>
                  <input
                    type="radio"
                    name="cidade"
                    value={opcao.value}
                    checked={filtros.cidade === opcao.value}
                    onChange={() => handleFilterChange('cidade', opcao.value)}
                    className={styles.chipInput}
                  />
                  <span className={`${styles.chipOption} ${filtros.cidade === opcao.value ? styles.selected : ''}`}>
                    {opcao.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}