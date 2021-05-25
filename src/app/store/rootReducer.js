import { combineReducers } from 'redux';
import shelfReducer from '../../feature/shelfs/shelfReducer';
import asyncReducer from '../async/asyncReducer';
import tmdbReducer from '../tmdb/tmdbReducer';

const rootReducer = combineReducers({
  shelf: shelfReducer,
  async: asyncReducer,
  tmdb: tmdbReducer,
});

export default rootReducer;
