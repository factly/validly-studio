import {
  ADD_METAFACTS_EXPECTATIONS,
  ADD_METAFACTS_VALIDATIONS,
  SET_METAFACTS_LOADING,
  SET_METAFACTS_UPLOAD_BUTTON,
  UPLOADED_METAFACTS_FILES_VALIDITY,
} from '../constants/metafactsvalidly';
import { getValidationDataArray } from './validly';

export const getMetaFactsValidationData = (files) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let data = new FormData();
    files.map((file) => data.append('datasets', file));
    data.append('result_type', 'COMPLETE');
    fetch(window.REACT_APP_VALIDLY_SERVER_URL + `/expectations/metadata/file`, {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((validationData) => {
        const validationDataArray = getValidationDataArray(validationData);
        const areUploadedfilesCompletelyValid = validationDataArray.every(
          (file) => file.is_datacompletely_valid,
        );
        dispatch(setFilesValidity(areUploadedfilesCompletelyValid));
        dispatch(setUploadButton(false));
        dispatch(addExpectationCard(new Array(files.length).fill(null)));
        dispatch(addValidationData(validationDataArray));
      })
      .finally(() => dispatch(setLoading(false)));
  };
};
export const getGoogleSheetsValidations = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let raw = JSON.stringify(data);
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    return fetch('http://localhost:8000/expectations/metadata/gsheet', requestOptions)
      .then((response) => response.json())
      .then((validationData) => {
        const validationDataArray = getValidationDataArray(validationData);
        const areUploadedfilesCompletelyValid = validationDataArray.every(
          (file) => file.is_datacompletely_valid,
        );
        dispatch(setFilesValidity(areUploadedfilesCompletelyValid));
        dispatch(setUploadButton(false));
        dispatch(addMetaFactsExpectationCard(new Array(1).fill(null)));
        dispatch(addValidationData(validationDataArray));
      })
      .finally(() => dispatch(setLoading(false)));
  };
};
const addValidationData = (data) => ({
  type: ADD_METAFACTS_VALIDATIONS,
  payload: data,
});
const setFilesValidity = (data) => ({
  type: UPLOADED_METAFACTS_FILES_VALIDITY,
  payload: data,
});

export const addMetaFactsExpectationCard = (data) => ({
  type: ADD_METAFACTS_EXPECTATIONS,
  payload: data,
});

const setUploadButton = (data) => ({
  type: SET_METAFACTS_UPLOAD_BUTTON,
  payload: data,
});

const setLoading = (data) => ({
  type: SET_METAFACTS_LOADING,
  payload: data,
});
