import { useState } from 'react';
import { Search, X } from 'lucide-react';
import styles from './BarraPesquisa.module.css';

interface BarraPesquisaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  className?: string;
}

export default function BarraPesquisa({ 
  placeholder = 'Pesquisar...',
  value, 
  onChange, 
  onSearch,
  className
}: BarraPesquisaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className={`${styles.container} ${className}`} onSubmit={handleSubmit}>
      <div className={`${styles.searchContainer} ${isFocused ? styles.focused : ''}`}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
        {value && (
          <button 
            type="button" 
            className={styles.clearButton} 
            onClick={handleClear}
          >
            <X size={18} />
          </button>
        )}
      </div>
      <button type="submit" className={styles.searchButton}>
        Buscar
      </button>
    </form>
  );
}