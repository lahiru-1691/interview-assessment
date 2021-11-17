/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-14
 *
 */
 import {MovieDetailActions} from '../constants/movie-detail-action';

 /**
 * fetch movies details
 * @param requestCancelToken: requestCancelToken
 * @returns object
 */

export const fetchMovieDetails = ({requestCancelToken, movieId} = {}) => {
  
  const payload = [];

  if (requestCancelToken) {
    payload.requestCancelToken = requestCancelToken;
  }

  if(movieId){
    payload.movieId = movieId;
  }

  return {
    type: MovieDetailActions.FETCH_MOVIE_DETAIL,
    payload: payload
  }

};
