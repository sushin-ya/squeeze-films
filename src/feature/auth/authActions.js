import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants';
import firebase from '../../app/config/firebase';
import { APP_LOADED } from '../../app/async/asyncReducer';
import { signInWithEmail } from '../../app/firestore/firebaseService';

export function signInUser(creds) {
  console.log(creds);
  return async function (dispatch) {
    try {
      const result = await signInWithEmail(creds);
      dispatch({ type: SIGN_IN_USER, payload: result.user });
    } catch (error) {
      throw error;
    }
  };
}

export function verifyAuth() {
  return function (dispatch) {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(signInUser(user));
        dispatch({ type: APP_LOADED });
      } else {
        dispatch(signOutUser());
        dispatch({ type: APP_LOADED });
      }
    });
  };
}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  };
}
