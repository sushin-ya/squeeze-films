import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { verifyAuth } from '../../feature/auth/authActions';
import rootReducer from './rootReducer';

import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const enhancer = applyMiddleware(routerMiddleware(history), thunk);

export function configureStore(preloadedState) {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    process.env.NODE_ENV !== 'production'
      ? composeWithDevTools(enhancer)
      : enhancer
  );

  store.dispatch(verifyAuth());

  return store;
}
