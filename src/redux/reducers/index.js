import { combineReducers } from "redux";
import { movieListReducer } from "../../views/movie-list/state/reducers/movieListReducer";
import { movieDetailReducer } from "../../views/movie-detail/state/reducers/movieDetailReducer";

const rootReducer = combineReducers({
    movieList : movieListReducer,
    movieDetail:movieDetailReducer
});

export default rootReducer;