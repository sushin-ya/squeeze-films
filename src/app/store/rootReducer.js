import { combineReducers } from 'redux';
import shelfReducer from '../../feature/shelfs/shelfReducer';
import asyncReducer from '../async/asyncReducer';
import tmdbReducer from '../tmdb/tmdbReducer';
import popularFilmReducer from '../../feature/popular/popularFilmReducer';

const rootReducer = combineReducers({
  shelf: shelfReducer,
  async: asyncReducer,
  popular: popularFilmReducer,
  tmdb: tmdbReducer,
});

export default rootReducer;
