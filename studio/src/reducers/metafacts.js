import {
  ADD_META_FILES,
  ADD_META_TABLE_DATA,
  SET_META_LOADING,
  SET_META_UPLOAD_BUTTON,
} from '../constants/metafacts';

const initialState = {
  files: [],
  metaTableData: {},
  loading: false,
  uploadButton: false,
};

export default function metafactsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_META_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case ADD_META_TABLE_DATA:
      return {
        ...state,
        metaTableData: action.payload,
      };
    case SET_META_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_META_UPLOAD_BUTTON:
      return {
        ...state,
        uploadButton: action.payload,
      };
    default:
      return state;
  }
}
