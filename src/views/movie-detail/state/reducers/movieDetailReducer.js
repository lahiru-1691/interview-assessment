/**
 * @author Lahiru Perera
 * @email lahiru.perera1691@gmail.com
 * @date 2021-11-14
 */

 import {MovieDetailActions} from "../constants/movie-detail-action";

 const initialState = {
    movieDetail: [],
 };
 
 /**
  * movie detail reducer
  * @param state: current state
  * @param {type, payload, error}: type of action and payload
  * @returns
  */
 
  export const movieDetailReducer = (state = initialState, { type, payload, error }) => {
     switch (type) {
       case MovieDetailActions.FETCH_MOVIE_DETAIL:
         return {
           ...state,
         };
       case MovieDetailActions.FETCH_MOVIE_DETAIL_SUCCESS:
         return {
           ...state,
           movieDetail: payload
         };
       case MovieDetailActions.FETCH_MOVIE_DETAIL_FAIL:
         return {
           ...state,
           movieDetail: payload,
           error
         };
       default:
         return state;
     }
   };