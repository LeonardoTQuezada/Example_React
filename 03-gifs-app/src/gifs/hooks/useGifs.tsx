import { useState } from 'react';
import { getGifsByQuery } from '../actions/get-gifs-by-query.action';
import type { Gif } from '../interfaces/gif.interface';

export const useGifs = () => {
  // para traer los gifs
  const [gifs, setGifs] = useState<Gif[]>([]);

  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  const handleTermClicked = async (term: string) => {
      const gifs = await getGifsByQuery(term);
      setGifs(gifs);
      console.log("entro")
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
  };

  return {
     // Properties
    gifs,

    // Methods
    handleSearch,
    handleTermClicked,
    previousTerms,
  };
};
