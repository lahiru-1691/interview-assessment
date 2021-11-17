/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-14
 *
 */
 import {MovieListActions} from '../constants/movie-actions';

 /**
 * fetch movies
 * @param requestCancelToken: requestCancelToken
 * @returns object
 */

export const fetchMovieList = ({requestCancelToken, data} = {}) => {
  
  const payload = [];

  if (requestCancelToken) {
    payload.requestCancelToken = requestCancelToken;
  }

  if(data){
    payload.data = data;
  }

  return {
    type: MovieListActions.FETCH_MOVIES,
    payload: payload
  }

};


