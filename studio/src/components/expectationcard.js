import React from 'react';
import { Modal, Tag , Table , Button} from "antd";
import { Card } from "antd";
import {InfoCircleFilled , DownloadOutlined} from '@ant-design/icons';
import { Typography, Space } from 'antd';
import {CSVLink} from "react-csv"
const { Text, Link } = Typography;
function ExpectationCard(Expectation) {
 const {Expectation_name,success }=Expectation
 const [show, setShow] = React.useState(false);
 const isResultNested = ()=>{
     if(Expectation.results){
         return true
     }
     return false
 } 
const getPartial_unexepected_list = () => {
     if(isResultNested()){
        return[... new Set(Expectation.results[0].result.unexpected_list)]
     }
     return Expectation.result.partial_unexpected_index_list.map((index)=>index+1) 
    }
const isMoreHidden = isResultNested() ? ( getPartial_unexepected_list().length > 5 ? true : false ) : true 
const getUnexpectedCount = () => {
        if(isResultNested()){
           return Expectation.results[0].result.unexpected_count
        }
        return Expectation.result.unexpected_count
       }
const getUnexpected_list = () => {
    if(isResultNested()){
       return Expectation.results[0].result.unexpected_list
    }
    return  addIndexProperty(Expectation.result.unexpected_list)
   }
const addIndexProperty = (unexpected_list)=>{
 const incrementedIndexList = Expectation.result.unexpected_index_list.map((index)=>index+1) 
 const unexpected_list_with_index= unexpected_list.map((object,index)=>{ return {...object,1:incrementedIndexList[index]}})   
 return  unexpected_list_with_index
}
const getCsvHeaders = ()=> Object.keys(getUnexpected_list()[0]).map((key)=>{
  return {
      label:key==='1'?'Row':key,
      key:key
  }
})

const getUnexpectedColumns = () =>{
   let unexpectedColumns = Object.keys(getUnexpected_list()[0]).map((key)=>{
    return {title: key==='1'?'Row':key,
       dataIndex: key,
       key: key,
    }
   })
   return unexpectedColumns
}   
const getExpectationErrorMessage=()=>isResultNested()?Expectation.results[0].expectation_config.meta.expectation_error_message:Expectation.expectation_config.meta.expectation_error_message
const getCleaningPdfLink=()=>isResultNested()?Expectation.results[0].expectation_config.meta.cleaning_pdf_link:Expectation.expectation_config.meta.cleaning_pdf_link
const unexpectedColumns = getUnexpectedColumns()
const unexpectedList = getUnexpected_list()

   return ( 
   <Card >
<p><b> {Expectation_name}</b></p>
<p><span> Unwanted values count: </span>  {getUnexpectedCount()}  </p>
<p><span> {`Few Unwanted present in ${isResultNested()?"Column":"Row Number"}:`}</span></p>
<p>
        <span>
    {getPartial_unexepected_list().map((value,index)=> {if (index > 5 ){ return } return <Tag color='warning'> {value} </Tag>})}</span>
{ isMoreHidden && <Link onClick={()=>setShow(true)}> 
    ...more
    </Link> }
</p> 
<p> <Card style={{backgroundColor:"#feecf0"}}>{getExpectationErrorMessage()}
{/* <Link  href={getCleaningPdfLink()} target="_blank" rel="noopener noreferrer"><InfoCircleFilled style={{fontSize:"125%"}}/></Link>  */}
<Button style={{paddingLeft:"10px"}} target="_blank" href={getCleaningPdfLink()} rel="noopener noreferrer" type="link"> Know more </Button>
</Card> 
</p>

    <Modal
     visible={show}
     closable
     footer={null}
    onCancel={() => setShow(false)}
    // closable={false}
     width={'1200px'}
    >
{ !isResultNested() ?
   <>
  <div  style={{padding:'12px 24px 0px 0px', float:'right', clear:'both'}} > <Button  type="primary" >
  <CSVLink headers={getCsvHeaders()} filename={`${Expectation_name}.csv`} data={unexpectedList} > 
  {<DownloadOutlined style={{paddingRight:'5px'}}/>} Download CSV 
  </CSVLink>
</Button> </div>
<Table
style={{padding:'12px 24px 24px 24px'}}
dataSource={unexpectedList}
columns={unexpectedColumns}
bordered
pagination={{
    defaultPageSize:100,
    hideOnSinglePage:true,
  }}

  scroll={{ x: 1000 , y:500}}
/></>:getPartial_unexepected_list().map((value,index)=> <Tag color='warning'> {value} </Tag>)} 
    </Modal>
 </Card> );
}
export default ExpectationCard;