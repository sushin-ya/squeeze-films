import { combineReducers } from 'redux';
import shelfReducer from '../../feature/shelfs/shelfReducer';
import asyncReducer from '../async/asyncReducer';
import modalReducer from '../common/modals/modalReducer';
import tmdbReducer from '../tmdb/tmdbReducer';

const rootReducer = combineReducers({
  shelf: shelfReducer,
  async: asyncReducer,
  tmdb: tmdbReducer,
  modals: modalReducer,
});

export default rootReducer;
