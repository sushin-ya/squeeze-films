import {
  CREATE_SHELF,
  UPDATE_SHELF,
  DELETE_SHELF,
  FETCH_SHELF,
  LISTEN_TO_SHELF_CHAT,
} from './shelfConstants';

export function listenToShelfs(shelfs) {
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

export function listenToShelfChat(comments) {
  return {
    type: LISTEN_TO_SHELF_CHAT,
    payload: comments,
  };
}
