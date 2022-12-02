import {
  ADD_META_FILES,
  ADD_META_TABLE_DATA,
  SET_META_UPLOAD_BUTTON,
} from '../constants/metafacts';
import { SET_META_LOADING } from '../constants/metafacts';
import { parseJSON } from '../utils/fetch';
import { getFormData } from '../utils/form';

export const addFiles = (data) => ({
  type: ADD_META_FILES,
  payload: data,
});

export const addMetaTableData = (data) => ({
  type: ADD_META_TABLE_DATA,
  payload: data,
});

export const getMetaTableData = (files) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let data = new FormData();
    files.map((file) => data.append('csv_files', file));
    fetch(window.REACT_APP_METAFACTS_SERVER_URL + '/meta-data/files', {
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then((metaTabledata) => {
        dispatch(addMetaTableData(metaTabledata));
        dispatch(setUploadButton(false));
      })
      .finally(() => dispatch(setLoading(false)));
  };
};
export const getMetaTableDataFromS3 = (data) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    let metafactsdata = getFormData({
      ...data,
      resource: 's3',
      s3_access_key: '',
      s3_secret_key: '',
      s3_endpoint_url: '',
      file_format: 'csv',
    });
    return fetch(window.REACT_APP_METAFACTS_SERVER_URL + '/meta-data/s3', {
      method: 'POST',
      body: metafactsdata,
    })
      .then(parseJSON)
      .then(({status,ok,json:metaTabledata}) => {
        if(!ok)   throw {detail:metaTabledata.detail,status}
        dispatch(addMetaTableData(metaTabledata));
      })
      .finally(() => dispatch(setLoading(false)));
     
  };
};
export const setLoading = (data) => ({
  type: SET_META_LOADING,
  payload: data,
});

export const setUploadButton = (data) => ({
  type: SET_META_UPLOAD_BUTTON,
  payload: data,
});
