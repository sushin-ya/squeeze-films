import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from '../../app/async/asyncReducer';
import {
  dataFromSnapshot,
  fetchShelfsFromFirestore,
} from '../../app/firestore/firestoreService';
import {
  CREATE_SHELF,
  UPDATE_SHELF,
  DELETE_SHELF,
  FETCH_SHELF,
  LISTEN_TO_SHELF_CHAT,
  LISTEN_TO_SELECTED_SHELF,
  CLEAR_SELECTED_SHELF,
  CLEAR_SHELFS,
} from './shelfConstants';

export function fetchShelfs(limit, lastDocSnapshot) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      const snapshot = await fetchShelfsFromFirestore(
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreShelfs = snapshot.docs.length >= limit;
      const shelfs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_SHELF,
        payload: { shelfs, moreShelfs, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}

export function listenToSelectedShelf(shelf) {
  return {
    type: LISTEN_TO_SELECTED_SHELF,
    payload: shelf[0],
  };
}

export function clearSelectedShelf() {
  return {
    type: CLEAR_SELECTED_SHELF,
  };
}

export function createShelf(shelf) {
  return {
    type: CREATE_SHELF,
    payload: shelf,
  };
}

export function updateShelf(shelf) {
  return {
    type: UPDATE_SHELF,
    payload: shelf,
  };
}
export function deleteShelf(shelfId) {
  return {
    type: DELETE_SHELF,
    payload: shelfId,
  };
}

export function listenToShelfChat(comments) {
  return {
    type: LISTEN_TO_SHELF_CHAT,
    payload: comments,
  };
}

export function clearShelfs() {
  return {
    type: CLEAR_SHELFS,
  };
}
