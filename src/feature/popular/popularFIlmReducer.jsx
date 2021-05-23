import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import axios from 'axios';

const FETCH_POPULAR_FILM = 'FETCH_POPULAR_FILM';

const initialState = {
  popularFilms: [],
};

export function fetchPopularFilm() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const films = await axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ja-JP&page=1`
        )
        .then((res) => {
          return res.data.results;
        });
      dispatch({ type: FETCH_POPULAR_FILM, payload: films });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export default function popularFilmReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case FETCH_POPULAR_FILM:
      return {
        ...state,
        popularFilms: payload,
      };
    default:
      return state;
  }
}
