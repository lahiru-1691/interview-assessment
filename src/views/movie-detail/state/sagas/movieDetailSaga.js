/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-15
 */

 import { put, takeEvery, all, takeLatest } from 'redux-saga/effects';
 import { MovieDetailActions } from '../constants/movie-detail-action';
 import { getMovieDetails } from '../../services/movieDetailService';
 
 
 /**
  * fetch movie details
  * @param payload
  * @return generator
  */
 export function* fetchMovieDetails({ payload }) {
   try {
     // call get movie detail API
     const moviesDetails = yield getMovieDetails({
       requestCancelToken: payload?.requestCancelToken,
       movieId:payload?.movieId
     });
     // movies reducer call
     if (moviesDetails) {
       yield put({
         type   : MovieDetailActions.FETCH_MOVIE_DETAIL_SUCCESS,
         payload: moviesDetails.data || [],
       });
     } else {
       throw {
         status: false,
         message: 'something went wrong!',
         response: moviesDetails,
       };
     }
   } catch (error) {
     // notify error
     yield put({
       type: MovieDetailActions.FETCH_MOVIE_DETAIL_FAIL,
       payload: null,
       error,
     });
   }
 }
 
 /**
  * watch FETCH_MOVIES_DETAILS action for calling fetchMovieDetails method
  * @return generator
  */
  function* movieDetailsSaga() {
   yield all([
     takeEvery(MovieDetailActions.FETCH_MOVIE_DETAIL, fetchMovieDetails)
   ]);
 }
 
 export default movieDetailsSaga;
 