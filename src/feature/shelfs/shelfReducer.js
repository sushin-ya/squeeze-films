import { sampleData } from '../../app/api/sampleData';
import { CREATE_SHELF, UPDATE_SHELF, DELETE_SHELF } from './shelfConstants';

const initialState = {
  shelfs: sampleData,
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
    default:
      return state;
  }
}
