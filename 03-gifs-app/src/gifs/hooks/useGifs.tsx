import { useRef, useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

// const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  // para traer los gifs
  const [gifs, setGifs] = useState<Gif[]>([]);

  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
//hook para mantener el valor cuando se renderiza useRef
  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }
    const gifs = await getGifsByQuery(term);
    setGifs(gifs);
  };

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();

    if (query.length === 0) return;

    if (previousTerms.includes(query)) return;

    setPreviousTerms([query, ...previousTerms].splice(0, 8));

    // para tener los gifs de mi peticion
    const gifs = await getGifsByQuery(query);
    //establecer los gifs
    setGifs(gifs);

    gifsCache.current[query] = gifs;
    console.log(gifsCache);
  };

  return {
    // Properties
    gifs,

    // Methods
    handleSearch,
    handleTermClicked,
    previousTerms
  };
};
