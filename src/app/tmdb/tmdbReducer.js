import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../async/asyncReducer';
import axios from 'axios';
import getYear from '../common/utility';

const FETCH_POPULAR_FILM = 'FETCH_POPULAR_FILM';
const FETCH_SUGGESTED_FILM = 'FETCH_SUGGESTED_FILM';

const initialState = {
  tmdbFilms: [],
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
          photoURL: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
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

export function fetchSuggestedFilm(value) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const inputLength = value.length;

      if (inputLength === 0) {
        return;
      }

      const films = await axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${value}&language=ja-JP`
        )
        .then((res) => {
          return res.data.results;
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
          photoURL: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
          title: film.title,
          release: getYear(film.release_date),
          director: directorName[index],
          description: film.overview,
        };
      });

      dispatch({ type: FETCH_SUGGESTED_FILM, payload: newFilms });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export default function tmdbReducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_POPULAR_FILM:
      return {
        ...state,
        popularFilms: payload,
      };
    case FETCH_SUGGESTED_FILM:
      return {
        ...state,
        popularFilms: payload,
      };
    default:
      return state;
  }
}