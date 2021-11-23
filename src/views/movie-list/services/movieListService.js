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
    const string =
      filterData && filterData !== undefined
        ? `&query=${filterData}`
        : '';
    var config = '';
    if(!filterData){
      config = {
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US`,
      };
    }else{
      config = {
        url: `https://api.themoviedb.org/3/search/movie?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US&${string}`,
      };
    }

    if (requestCancelToken) {
      config.requestCancelToken = requestCancelToken;
    }
    
    const data = await fetch(config);
  
    return data;
  };


  //Fetch genres
  export const getGenres = async ({
    requestCancelToken = null,
  }) => {
    
    const config = {
      url:`https://api.themoviedb.org/3/genre/movie/list?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US`
    };

    if (requestCancelToken) {
      config.requestCancelToken = requestCancelToken;
    }
    
    const data = await fetch(config);
  
    return data;

  }
