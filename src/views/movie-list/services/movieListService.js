/**
 * get movie list
 * @param requestCancelToken: for canceling request
 * @return promise
 */

import { fetch } from "../../../services/httpService";


 export const getMovieList = async ({
    requestCancelToken = null,
    filterData,
  }) => {
    const title =
      filterData && filterData !== undefined
        ? `&title=${filterData}`
        : '';

    const config = {
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US&${filterData}`,
    };
    console.log(config);
    if (requestCancelToken) {
      config.requestCancelToken = requestCancelToken;
    }
    
    const data = await fetch(config);
  
    return data;
  };