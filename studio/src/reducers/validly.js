

import { ADD_EXPECTATIONS, ADD_FILES, RESET_PANEL_FLAG, SET_LOADING, SET_UPLOAD_BUTTON , UPLOADED_FILES_VALIDITY } from "../constants/validly";
import { ADD_VALIDATIONS } from "../constants/validly";

const initialState = {
  validations:[] , 
  files:[],
  expectations:[], 
  uploadButton:false,
  resetPanelsFlag:false,
  loading:false,
  uploadedFilesValidity:false,
}

export default function validlyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case ADD_FILES:
        return {
          ...state,files:action.payload
        }
        case ADD_VALIDATIONS:
          return {
            ...state,validations:action.payload
           }
        case ADD_EXPECTATIONS:    
          return{ 
            ...state,expectations:action.payload
          }
        case SET_UPLOAD_BUTTON:
         return{
           ...state,uploadButton:action.payload
         }  
        case RESET_PANEL_FLAG:
          return{
            ...state,resetPanelsFlag:action.payload
          } 
        case SET_LOADING:
            return{
              ...state,loading:action.payload
            } 
        case UPLOADED_FILES_VALIDITY:
              return{
                ...state,uploadedFilesValidity:action.payload
              } 
      default:
        return state;
    }
  }
  