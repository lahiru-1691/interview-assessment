/**
 * get movie list
 * @param requestCancelToken: for canceling request
 * @return promise
 */

import { fetch } from "../../../services/httpService";


 export const getMovieList = async ({
    requestCancelToken = null,
    filterTerm,
    filterGenre,
    filterRating,
    filterYear,
    filterOrderby,
  }) => {
    const term =
      filterTerm && filterTerm !== undefined
        ? `&query=${filterTerm}`
        : '';
    
    const genre =
    filterGenre && filterGenre !== undefined
      ? `&with_genres=${filterGenre}`
      : '';

    const rating =
    filterRating && filterRating !== undefined
      ? `&vote_average.gte=${filterRating}`
      : '';

    const year =
    filterYear && filterYear !== undefined
        ? `year=${filterYear}`
        : '';

    const orderBy =
    filterOrderby && filterOrderby !== undefined
        ? `sort_by=${filterOrderby}`
        : '';
      
    var config = '';
    if(!filterTerm && !filterYear && !filterGenre && !filterRating && !filterOrderby){
      config = {
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US`,
      };
    }else{
      if(term){
        config = {
          url: `https://api.themoviedb.org/3/search/movie?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US&${term}${year}${genre}${rating}${orderBy}`,
        };
      }else{
        config = {
          url: `https://api.themoviedb.org/3/discover/movie?api_key=a6b81c8b73eac8b5d0498bf5575f0276&language=en-US&${year}${genre}${rating}${orderBy}`,
        };
      }
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
