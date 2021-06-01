import {
  CREATE_SHELF,
  UPDATE_SHELF,
  DELETE_SHELF,
  FETCH_SHELF,
  LISTEN_TO_SHELF_CHAT,
  CLEAR_COMMENT,
  LISTEN_TO_SELECTED_SHELF,
  RETAIN_STATE,
} from './shelfConstants';

const initialState = {
  shelfs: [],
  comments: [],
  moreShelfs: false,
  selectedShelf: null,
  lastVisible: null,
  retainState: false,
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
        shelfs: [...state.shelfs, ...payload.shelfs],
        moreShelfs: payload.moreShelfs,
        lastVisible: payload.lastVisible ?? null,
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
    case LISTEN_TO_SELECTED_SHELF:
      return {
        ...state,
        selectedShelf: payload,
      };
    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };
    default:
      return state;
  }
}
