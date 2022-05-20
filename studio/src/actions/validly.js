
import { ADD_FILES, RESET_PANEL_FLAG, SET_LOADING } from "../constants/validly";
import { ADD_VALIDATIONS , UPLOADED_FILES_VALIDITY } from "../constants/validly";
import { ADD_EXPECTATIONS } from "../constants/validly";
import { SET_UPLOAD_BUTTON } from "../constants/validly";
export const addFiles = (data) => ({
    type: ADD_FILES,
    payload: data,
  });
export const getValidationData = (files)=>{
  return (dispatch)=>{
    dispatch(setLoading(true))
   let data = new FormData()
  files.map((file)=> data.append('datasets',file))
  data.append("result_type" , "COMPLETE")
 fetch(window.REACT_APP_VALIDLY_SERVER_URL, {
    method: 'POST',
    body: data
  })
 .then(response => response.json())
 .then((validationData)=>{  
  let validationDataArray=[]
 Object.keys(validationData).map((filename)=> {
 let expectationsValidatedList = []
 let is_data_completely_valid 
 Object.keys(validationData[filename]).map((Expectation,index,array)=>{
  if(validationData[filename][Expectation]['success']===false && is_data_completely_valid===undefined ) {
    is_data_completely_valid=false
 }
 if( is_data_completely_valid === undefined && ( array.length-1 === index ) ) {
  is_data_completely_valid=true
 }
 expectationsValidatedList.push({ Expectation_name:Expectation , ...validationData[filename][Expectation]}) 
} )
 validationDataArray.push({filename:filename,is_datacompletely_valid:is_data_completely_valid,expectations_Validated_List:expectationsValidatedList })
 }
  )
  const areUploadedfilesCompletelyValid = validationDataArray.reduce(( totalBool , currentFile) => currentFile.is_datacompletely_valid && totalBool  , true )
   dispatch(setFilesValidity(areUploadedfilesCompletelyValid ))
   dispatch(setUploadButton(false))
   dispatch(addExpectationCard(new Array(files.length).fill(null)))
   dispatch(addValidationData(validationDataArray))
})
.finally(()=>dispatch(setLoading(false)))}
}
  export const addValidationData = (data) => ({
    type:ADD_VALIDATIONS,
    payload: data,
  }); 
  
  export const setFilesValidity = (data) => ({
    type:UPLOADED_FILES_VALIDITY,
    payload: data,
  }); 

  export const addExpectationCard = (data) => ({
    type:ADD_EXPECTATIONS,
    payload:data
  })

  export const setUploadButton = (data) => ({
    type:SET_UPLOAD_BUTTON,
    payload:data
  })
  export const resetPanelFlag = (data) => ({
    type:RESET_PANEL_FLAG,
    payload:data
  })
  export const setLoading = (data) =>({
    type:SET_LOADING,
    payload:data
  })