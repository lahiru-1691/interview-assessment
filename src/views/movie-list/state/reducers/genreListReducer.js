/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-14
 */

import {GenreActions} from "../constants/movie-actions";

const initialState = {
  genres: [],
};

/**
 * genres list reducer
 * @param state: current state
 * @param {type, payload}: type of action and payload
 * @returns
 */

 export const genreListReducer = (state = initialState, { type, payload, error }) => {
  switch (type) {
    case GenreActions.FETCH_GENRE:
      return {
        ...state,
      };
    case GenreActions.FETCH_GENRE_SUCCESS:
      return {
        ...state,
        genres: payload
      };
    case GenreActions.FETCH_GENRE_FAIL:
      return {
        ...state,
        genres: payload,
        error
      };
    default:
      return state;
  }
};



  