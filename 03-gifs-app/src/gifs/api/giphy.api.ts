import axios from 'axios';


// CREAMOS UNA INSTANCIA ESTO SERIA LA BASE PARA TODAS LAS PETICIONES QUE LLAMEN A ESTA API
export const giphyApi = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  params: {
    lang: 'es',
    api_key: import.meta.env.VITE_GIPHY_API_KEY,
  },
});