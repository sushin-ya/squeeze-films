import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import { popularFilms } from '../../app/api/sampleData';

const FETCH_POPULAR_FILM = 'FETCH_POPULAR_FILM';

const initialState = {
  popularFilms: [],
};

export function fetchPopularFilm() {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const films = await Promise.resolve(popularFilms);
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
