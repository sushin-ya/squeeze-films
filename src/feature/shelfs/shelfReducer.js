import {
  CREATE_SHELF,
  UPDATE_SHELF,
  DELETE_SHELF,
  FETCH_SHELF,
  LISTEN_TO_SHELF_CHAT,
  CLEAR_COMMENT,
  LISTEN_TO_SELECTED_SHELF,
} from './shelfConstants';

const initialState = {
  shelfs: [],
  comments: [],
  moreShelfs: false,
  selectedShelf: null,
  lastVisible: null,
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
      console.log('state', state.shelfs);
      console.log('payload', payload.shelfs);
      return {
        ...state,
        shelfs: [...state.shelfs, ...payload.shelfs],
        moreShelfs: payload.moreShelfs,
        lastVisible: payload.lastVisible,
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
        moreShelfs: true,
        lastVisible: null,
      };
    case LISTEN_TO_SELECTED_SHELF:
      return {
        ...state,
        selectedShelf: payload,
      };
    default:
      return state;
  }
}
