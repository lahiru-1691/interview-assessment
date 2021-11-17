/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-15
 */

import { put, takeEvery, all, takeLatest } from 'redux-saga/effects';
import { MovieListActions } from '../constants/movie-actions';
import { getMovieList } from '../../services/movieListService';


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
      filterData:payload?.data,
    });
    console.log(movies);
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
 * watch FETCH_MOVIES action for calling fetchMovieData method
 * @return generator
 */
 function* movieListSaga() {
  yield all([
    takeEvery(MovieListActions.FETCH_MOVIES, fetchMovieData)
  ]);
}

export default movieListSaga;
