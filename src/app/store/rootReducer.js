import { combineReducers } from 'redux';
import shelfReducer from '../../feature/shelfs/shelfReducer';
import asyncReducer from '../async/asyncReducer';

const rootReducer = combineReducers({
  shelf: shelfReducer,
  async: asyncReducer,
});

export default rootReducer;
