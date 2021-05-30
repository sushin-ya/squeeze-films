import {
  CREATE_SHELF,
  UPDATE_SHELF,
  DELETE_SHELF,
  FETCH_SHELF,
  LISTEN_TO_SHELF_CHAT,
  CLEAR_COMMENT,
} from './shelfConstants';

const initialState = {
  shelfs: [],
  comments: [],
};

export default function shelfReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_SHELF:
      return {
        ...state,
        shelfs: [...state.shelfs, payload],
      };
    case UPDATE_SHELF:
      return {
        ...state,
        shelfs: [
          ...state.shelfs.filter((shelf) => shelf.id !== payload.id),
          payload,
        ],
      };
    case DELETE_SHELF:
      return {
        ...state,
        shelfs: [...state.shelfs.filter((shelf) => shelf.id !== payload)],
      };
    case FETCH_SHELF:
      return {
        ...state,
        shelfs: payload,
      };
    case LISTEN_TO_SHELF_CHAT:
      return {
        ...state,
        comments: payload,
      };
    case CLEAR_COMMENT:
      return {
        ...state,
        comments: [],
      };
    default:
      return state;
  }
}
