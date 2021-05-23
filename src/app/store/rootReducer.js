import { combineReducers } from 'redux';
import shelfReducer from '../../feature/shelfs/shelfReducer';
import asyncReducer from '../async/asyncReducer';
import popularFilmReducer from '../../feature/popular/popularFIlmReducer';

const rootReducer = combineReducers({
  shelf: shelfReducer,
  async: asyncReducer,
  popular: popularFilmReducer,
});

export default rootReducer;
