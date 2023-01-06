import { ADD_FILES, RESET_PANEL_FLAG, SET_LOADING } from '../constants/validly';
import { ADD_VALIDATIONS, UPLOADED_FILES_VALIDITY } from '../constants/validly';
import { ADD_EXPECTATIONS } from '../constants/validly';
import { SET_UPLOAD_BUTTON } from '../constants/validly';
import { getFormData } from '../utils/form';
export const addFiles = (data) => ({
  type: ADD_FILES,
  payload: data,
});
export const getValidationData = (files) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let data = new FormData();
    files.map((file) => data.append('datasets', file));
    data.append('result_type', 'COMPLETE');
    fetch(window.REACT_APP_VALIDLY_SERVER_URL + `/expectation/datasets/?format=json`, {
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
export const getExpectationsValidatedList = (validationData) => {
  const expectationsValidatedList = [];
  Object.keys(validationData).map((Expectation) => {
    expectationsValidatedList.push({
      Expectation_name: Expectation,
      ...validationData[Expectation],
    });
  });
  return expectationsValidatedList;
};
export const getValidationDataArray = (validationData) => {
  const validationDataArray = [];
  Object.keys(validationData).map((filename) => {
    const expectationsValidatedList = getExpectationsValidatedList(validationData[filename]);
    const is_datacompletely_valid = expectationsValidatedList.every(
      (expectation) => expectation.success,
    );
    validationDataArray.push({
      filename: filename,
      is_datacompletely_valid,
      expectations_Validated_List: expectationsValidatedList,
    });
  });
  return validationDataArray;
};

export const addValidationData = (data) => ({
  type: ADD_VALIDATIONS,
  payload: data,
});

export const setFilesValidity = (data) => ({
  type: UPLOADED_FILES_VALIDITY,
  payload: data,
});

export const addExpectationCard = (data) => ({
  type: ADD_EXPECTATIONS,
  payload: data,
});

export const setUploadButton = (data) => ({
  type: SET_UPLOAD_BUTTON,
  payload: data,
});
export const resetPanelFlag = (data) => ({
  type: RESET_PANEL_FLAG,
  payload: data,
});
export const setLoading = (data) => ({
  type: SET_LOADING,
  payload: data,
});
