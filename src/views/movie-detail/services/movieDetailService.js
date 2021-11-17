/**
 * get movie details
 * @param requestCancelToken: for canceling request
 * @return promise
 */

 import { fetch } from "../../../services/httpService";


 export const getMovieDetails = async ({
    movieId,
    requestCancelToken = null
  }) => {

    const config = {
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US`,
    };
    
    if (requestCancelToken) {
      config.requestCancelToken = requestCancelToken;
    }
    
    const data = await fetch(config);
  
    return data;
  };