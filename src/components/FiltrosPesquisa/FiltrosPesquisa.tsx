import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import styles from './FiltrosPesquisa.module.css';

interface FiltroOption {
  label: string;
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const tipoEstabelecimentoOptions: FiltroOption[] = [
  { label: 'Restaurante', value: 'restaurante' },
  { label: 'Bar', value: 'bar' },
  { label: 'Casa de show', value: 'casa-de-show' },
  { label: 'Pub', value: 'pub' },
  { label: 'Cafeteria', value: 'cafeteria' },
  { label: 'Outro', value: 'outro' }
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
    tipoEstabelecimento: string;
    cidade: string;
  }) => void;
  className?: string;
  activeTab?: 'bandas' | 'estabelecimentos';
}

export default function FiltrosPesquisa({ 
  onFilterChange, 
  className,
  activeTab = 'bandas'
}: FiltrosPesquisaProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    genero: '',
    tipoEstabelecimento: '',
    cidade: ''
  });

  const handleFilterChange = (tipo: 'tipo' | 'genero' | 'tipoEstabelecimento' | 'cidade', valor: string) => {
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
      tipoEstabelecimento: '',
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
          {/* Mostrar gênero apenas para bandas */}
          {activeTab === 'bandas' && (
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
          )}

          {/* Mostrar tipo de estabelecimento apenas para estabelecimentos */}
          {activeTab === 'estabelecimentos' && (
            <div className={styles.filtroGroup}>
              <h3 className={styles.filtroTitle}>Tipo de Estabelecimento</h3>
              <div className={styles.opcoes}>
                {tipoEstabelecimentoOptions.map(opcao => (
                  <label key={opcao.value} className={styles.chipLabel}>
                    <input
                      type="radio"
                      name="tipoEstabelecimento"
                      value={opcao.value}
                      checked={filtros.tipoEstabelecimento === opcao.value}
                      onChange={() => handleFilterChange('tipoEstabelecimento', opcao.value)}
                      className={styles.chipInput}
                    />
                    <span className={`${styles.chipOption} ${filtros.tipoEstabelecimento === opcao.value ? styles.selected : ''}`}>
                      {opcao.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Cidade sempre visível */}
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