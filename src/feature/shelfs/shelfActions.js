import { CREATE_SHELF, UPDATE_SHELF, DELETE_SHELF } from './shelfConstants';

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
export function createShelf(shelfId) {
  return {
    type: DELETE_SHELF,
    payload: shelfId,
  };
}
