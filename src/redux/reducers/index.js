import { combineReducers } from "redux";
import { movieListReducer,  genreListReducer} from "../../views/movie-list/state/reducers/";
import { movieDetailReducer } from "../../views/movie-detail/state/reducers/movieDetailReducer";

const rootReducer = combineReducers({
    movieList   : movieListReducer,
    movieDetail : movieDetailReducer,
    genre       : genreListReducer
});

export default rootReducer;