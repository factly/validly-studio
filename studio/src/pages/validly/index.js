import { UploadOutlined ,CheckSquareTwoTone , StopTwoTone  } from '@ant-design/icons';
import { addExpectationCard, addFiles, addValidationData, getValidationData, resetPanelFlag, setLoading, setUploadButton } from '../../actions/validly';
import React, { useEffect, useState , useCallback }  from "react";
import 'antd/dist/antd.css';
import { Upload,Button , Collapse , Card , Row, Col,Spin} from 'antd';
import customExpandIcon from '../../components/customexpandicon';
import ExpectationCard from '../../components/expectationcard';
import { Helmet } from 'react-helmet';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
const { Panel } = Collapse;
function Validly() {
  const dispatch = useDispatch();
  const { validations ,expectations,files,uploadButton,resetPanelsFlag,loading}= useSelector((state)=>state.validly)
 const customRequest= ()=>{
   dispatch(getValidationData(files))
 }
 return(
   <div className="App">
   <Helmet title={'Homepage'} />
   <Space size={"small"}>
    <Upload 
     showUploadList={false}
     beforeUpload={(file, fileList)=>{
     dispatch(addFiles(fileList))
     dispatch(setUploadButton(true))
     return false
     }}
    multiple 
      > 
        <Button  icon={<UploadOutlined />
      }>Select Files</Button>
         <Button > {files.length!==0 && uploadButton ?`${files.length} files selected`:`No file Uploaded`} 
         </Button>
        </Upload>
    <Button 
    onClick={customRequest}
    type='primary'> Start Upload </Button>
   </Space>
   {loading?<Spin size="default" style={{display:'block',marginTop:'15%'}} />:validations.map(( file , index )=><Collapse 
   style={file.is_datacompletely_valid?{backgroundColor:"#effaf5",margin:"12px 12px 12px 0px"}:{backgroundColor:"#feecf0",margin:"12px 12px 12px 0px"}} expandIcon={(props) =>customExpandIcon(props)} expandIconPosition="right" defaultActiveKey={null}  >
   <Panel  header={<b>{file.filename.split("/").pop().split(".")[0]}</b>}  key={index+file.filename} >
       <Row gutter={16}>  
          <Col span={8}>
          <Card bodyStyle={{padding:"6px"}} >
          { file.expectations_Validated_List.map((expectation)=>
       <Card hoverable style={expectation.success?{backgroundColor:"#effaf5",margin:"4px"}:{backgroundColor:"#feecf0",margin:"4px"}}
        onClick={()=>{
        if(expectation.success){
         return
       } 
       let copy_expectationCardArray =[...expectations].filter((item,Expectationindex) => Expectationindex !== index);
       copy_expectationCardArray.splice(index, 0, expectation );
         dispatch(addExpectationCard(copy_expectationCardArray))  
       }}>
         {expectation.success?<CheckSquareTwoTone style={{fontSize:"125%",fontWeight:"bold",paddingRight:"4px"}} twoToneColor="#48C78E"/>:<StopTwoTone  style={{fontSize:"125%",fontWeight:"bolder",paddingRight:"4px"}} twoToneColor="#F14668"/>} 
       <b> {expectation.Expectation_name.replaceAll("_"," ")} </b>  
       </Card>
   )
 }</Card>
            </Col> 
            <Col span={16}>
            { expectations[index]?<ExpectationCard {...expectations[index]}></ExpectationCard>:null } 
            </Col>
          </Row>
   </Panel>
   </Collapse>
   )
}
    </div>
  );
}
export default Validly;
