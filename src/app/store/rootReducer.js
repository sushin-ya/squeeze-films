import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import shelfReducer from '../../feature/shelfs/shelfReducer';
import asyncReducer from '../async/asyncReducer';
import modalReducer from '../common/modals/modalReducer';
import tmdbReducer from '../tmdb/tmdbReducer';
import authReducer from '../../feature/auth/authReducer';
import profileReducer from '../../feature/profile/profileReducer';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    shelf: shelfReducer,
    async: asyncReducer,
    tmdb: tmdbReducer,
    modals: modalReducer,
    auth: authReducer,
    profile: profileReducer,
  });

export default rootReducer;
