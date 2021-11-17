import { all, fork } from 'redux-saga/effects';
import movieListSaga from '../../views/movie-list/state/sagas/fetchMovieListSaga';
import movieDetailsSaga from '../../views/movie-detail/state/sagas/movieDetailSaga';

export default function* rootSaga(){
    yield all([
        fork(movieListSaga),
        fork(movieDetailsSaga)
    ]);
}