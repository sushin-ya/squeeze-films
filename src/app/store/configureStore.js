import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { verifyAuth } from '../../feature/auth/authActions';
import rootReducer from './rootReducer';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk))
  );

  store.dispatch(verifyAuth());

  return store;
}
