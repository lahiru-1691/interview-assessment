/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-15
 */

import { put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { MovieListActions, GenreActions } from '../constants/movie-actions';
import { getMovieList, getGenres } from '../../services/movieListService';


/**
 * fetch movie data
 * @param payload
 * @return generator
 */
export function* fetchMovieData({ payload }) {
  try {

    // call get movie API
    const movies = yield getMovieList({
      requestCancelToken: payload?.requestCancelToken,
      filterTerm:payload?.term,
      filterGenre:payload?.genre,
      filterRating:payload?.rating,
      filterYear:payload?.year,
      filterOrderby:payload?.orderBy
    });
    // movies reducer call
    if (movies) {
      yield put({
        type: MovieListActions.FETCH_MOVIES_SUCCESS,
        payload: movies.data.results || [],
      });
    } else {
      throw {
        status: false,
        message: 'something went wrong!',
        response: movies,
      };
    }
  } catch (error) {
    // notify error
    yield put({
      type: MovieListActions.FETCH_MOVIES_FAIL,
      payload: null,
      error,
    });
  }
}

/**
 * fetch genre data
 * @param payload
 * @return generator
 */
 export function* fetchGenres({payload}){
  try {

    // call get genres data API
    const genres = yield getGenres({
      requestCancelToken: payload?.requestCancelToken
    });
    // genres reducer call
    if (genres) {
      yield put({
        type: GenreActions.FETCH_GENRE_SUCCESS,
        payload: genres.data || [],
      });
    } else {
      throw {
        status: false,
        message: 'something went wrong!',
        response: genres,
      };
    }
  } catch (error) {
    // notify error
    yield put({
      type: GenreActions.FETCH_GENRE_FAIL,
      payload: null,
      error,
    });
  }
 }

/**
 * watch FETCH_MOVIES action for calling fetchMovieData method
 * @return generator
 */
 function* movieListSaga() {
  yield all([
    takeEvery(MovieListActions.FETCH_MOVIES, fetchMovieData),
    takeEvery(GenreActions.FETCH_GENRE, fetchGenres)
  ]);
}

export default movieListSaga;
