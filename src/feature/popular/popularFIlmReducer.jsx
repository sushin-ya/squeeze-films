import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import axios from 'axios';
import getYear from '../../app/common/utility';

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
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ja-JP&page=1`
        )
        .then((res) => {
          return res.data.results.slice(0, 5);
        });

      const directorPromises = films.map(async (film) => {
        const dirct = await axios
          .get(
            `https://api.themoviedb.org/3/movie/${film.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=ja-JP&page=1`
          )
          .then((res) => {
            return res.data.crew;
          })
          .then((crew) => {
            const dir = crew.filter((person) => person.job === 'Director');
            return dir[0];
          });
        return dirct;
      });

      const directors = await Promise.all(directorPromises).then((res) => res);
      const directorName = directors.map((d) => d.name);

      const newFilms = films.map((film, index) => {
        return {
          id: film.id,
          photoURL: `https://image.tmdb.org/t/p/w342${film.poster_path}`,
          title: film.title,
          release: getYear(film.release_date),
          director: directorName[index],
          description: film.overview,
        };
      });

      dispatch({ type: FETCH_POPULAR_FILM, payload: newFilms });
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
