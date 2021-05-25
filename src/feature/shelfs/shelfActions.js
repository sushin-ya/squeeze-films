import {
  CREATE_SHELF,
  UPDATE_SHELF,
  DELETE_SHELF,
  FETCH_SHELF,
} from './shelfConstants';

export function listenToEvents(shelfs) {
  return {
    type: FETCH_SHELF,
    payload: shelfs,
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
