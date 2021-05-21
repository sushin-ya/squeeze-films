import { combineReducers } from 'redux';
import shelfReducer from '../../feature/shelfs/shelfReducer';

const rootReducer = combineReducers({
  shelf: shelfReducer,
});

export default rootReducer;
