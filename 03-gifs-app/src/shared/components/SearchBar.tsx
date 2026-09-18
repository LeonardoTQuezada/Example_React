import { useEffect, useState, type KeyboardEvent } from 'react';

interface Props {
  placeholder?: string;

  onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = 'Buscar', onQuery }: Props) => {
  const [query, setQuery] = useState('');

  //se disdpara tan pronto el componente este montado
  useEffect(() => {

    // el time 
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);
    // se llama cuando el componente deja de existir es decir una funcion de limpieza
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]); //depèndencias que activa el efecto

  const handleSearch = () => {
    onQuery(query);
    // setQuery('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};