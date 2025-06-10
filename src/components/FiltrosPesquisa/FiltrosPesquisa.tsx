import { useState } from 'react';
import styles from './FiltrosPesquisa.module.css';

interface FiltroOption {
  label: string;
  value: string;
}

const generoOptions: FiltroOption[] = [
  { label: 'Rock', value: 'rock' },
  { label: 'Sertanejo', value: 'sertanejo' },
  { label: 'Forró', value: 'forro' },
  { label: 'Pop', value: 'pop' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Eletrônico', value: 'eletronico' },
  { label: 'MPB', value: 'mpb' }
];

interface FiltrosPesquisaProps {
  onFilterChange: (filtros: { genero: string }) => void;
  className?: string;
}

export default function FiltrosPesquisa({ onFilterChange, className }: FiltrosPesquisaProps) {
  const [filtros, setFiltros] = useState({ genero: '' });

  const handleFilterChange = (valor: string) => {
    const novosFiltros = { genero: valor };
    setFiltros(novosFiltros);
    onFilterChange(novosFiltros);
  };

  const limparFiltros = () => {
    const filtrosLimpos = { genero: '' };
    setFiltros(filtrosLimpos);
    onFilterChange(filtrosLimpos);
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <div className={styles.filtrosContent}>
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
                  onChange={() => handleFilterChange(opcao.value)}
                  className={styles.chipInput}
                />
                <span className={`${styles.chipOption} ${filtros.genero === opcao.value ? styles.selected : ''}`}>
                  {opcao.label}
                </span>
              </label>
            ))}
            <button className={styles.limparButton} onClick={limparFiltros}>
              Limpar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
