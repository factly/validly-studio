import React from 'react';
import { Modal, Tag , Table} from "antd";
import { Card } from "antd";
import {InfoCircleFilled } from '@ant-design/icons';
import { Typography, Space } from 'antd';
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
     return Expectation.result.partial_unexpected_index_list 
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
    return Expectation.result.unexpected_list
   }
const getUnexpectedColumns = () =>{
   let unexpectedColumns = Object.keys(getUnexpected_list()[0]).map((key)=>{
       return {title: key,
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
<p> <Card style={{backgroundColor:"#feecf0"}}>{getExpectationErrorMessage()}<Link style={{paddingLeft:"5px"}} href={getCleaningPdfLink()}><InfoCircleFilled style={{fontSize:"125%"}}/></Link> </Card> </p>
    <Modal
     visible={show}
     closable
     footer={null}
    onCancel={() => setShow(false)}
    // closable={false}
     width={'1200px'}
    >
{ !isResultNested() ? <Table
style={{padding:'24px'}}
dataSource={unexpectedList}
columns={unexpectedColumns}
bordered
pagination={{
    defaultPageSize:100,
    hideOnSinglePage:true,
  }}

  scroll={{ x: 1000}}
/>:getPartial_unexepected_list().map((value,index)=> <Tag color='warning'> {value} </Tag>)} 
    </Modal>
 </Card> );
}
export default ExpectationCard;