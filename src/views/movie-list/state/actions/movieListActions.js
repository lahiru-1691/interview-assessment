/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-14
 *
 */
 import {MovieListActions, GenreActions} from '../constants/movie-actions';

 /**
 * fetch movies
 * @param requestCancelToken: requestCancelToken
 * @returns object
 */

export const fetchMovieList = ({requestCancelToken, term, genre, rating, year, orderBy} = {}) => {
  
  const payload = [];

  if (requestCancelToken) {
    payload.requestCancelToken = requestCancelToken;
  }

  if(term){
    payload.term = term;
  }

  if(genre){
    payload.genre = genre;
  }

  if(rating){
    payload.rating = rating;
  }

  if(year){
    payload.year = year;
  }

  if(orderBy){
    payload.orderBy = orderBy;
  }

  return {
    type: MovieListActions.FETCH_MOVIES,
    payload: payload
  }

};


export const fetchGenres = ({requestCancelToken, data} = {}) => {
  
  const payload = [];

  if (requestCancelToken) {
    payload.requestCancelToken = requestCancelToken;
  }

  if(data){
    payload.data = data;
  }

  return {
    type: GenreActions.FETCH_GENRE,
    payload: payload
  }

};





