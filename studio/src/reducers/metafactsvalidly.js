import {
  ADD_METAFACTS_FILES,
  ADD_METAFACTS_VALIDATIONS,
  ADD_METAFACTS_EXPECTATIONS,
  SET_METAFACTS_UPLOAD_BUTTON,
  SET_METAFACTS_LOADING,
  UPLOADED_METAFACTS_FILES_VALIDITY,
} from '../constants/metafactsvalidly';

const initialState = {
  validations: [],
  files: [],
  expectations: [],
  uploadButton: false,
  loading: false,
  uploadedFilesValidity: false,
};

export default function validlyMetafactsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_METAFACTS_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case ADD_METAFACTS_VALIDATIONS:
      return {
        ...state,
        validations: action.payload,
      };
    case ADD_METAFACTS_EXPECTATIONS:
      return {
        ...state,
        expectations: action.payload,
      };
    case SET_METAFACTS_UPLOAD_BUTTON:
      return {
        ...state,
        uploadButton: action.payload,
      };
    case SET_METAFACTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case UPLOADED_METAFACTS_FILES_VALIDITY:
      return {
        ...state,
        uploadedFilesValidity: action.payload,
      };
    default:
      return state;
  }
}
