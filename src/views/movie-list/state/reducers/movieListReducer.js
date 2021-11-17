/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-14
 */

import {MovieListActions} from "../constants/movie-actions";

const initialState = {
    movies: [],
};

/**
 * movie list reducer
 * @param state: current state
 * @param {type, payload}: type of action and payload
 * @returns
 */

 export const movieListReducer = (state = initialState, { type, payload, error }) => {
    switch (type) {
      // case MovieListActions.FETCH_MOVIES:
      //   return {
      //     ...state,
      //   };
      case MovieListActions.FETCH_MOVIES_SUCCESS:
        return {
          ...state,
          movies: payload
        };
      case MovieListActions.FETCH_MOVIES_FAIL:
        return {
          ...state,
          movies: payload,
          error
        };
      default:
        return state;
    }
  };