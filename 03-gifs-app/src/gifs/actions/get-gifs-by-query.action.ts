import { giphyApi } from '../api/giphy.api';

import type { GiphyResponse } from '../interfaces/giphy.response';
import type { Gif } from '../interfaces/gif.interface';

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  //ENVEZ DE UTILIZAR ESTA FORMA NOS CRFEAMOS UNA INSTANCIA EN LA CARPETA API
  // const response = await axios.get<GiphyResponse>('https://api.giphy.com/v1/gifs/search', {
  //     params: {
  //         q:query,
  //        limit:10,
  //        lang:'es',
  //        apy_key: import.meta.env.VITE_GIPHY_API_KEY,
  //        //apy_key:'X2OttobsiCY2SOvdHpG2NKdLMxFzua2N'

  //     }
  // });

  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,
      limit: 10
    }
  });

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height)
  }));
};

