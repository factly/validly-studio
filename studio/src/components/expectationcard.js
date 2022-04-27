import React from 'react';
import { Tag } from "antd";
import { Card } from "antd";
function ExpectationCard(Expectation) {
 const {Expectation_name,success}=Expectation
 const isResultNested = ()=>{
     if(Expectation.results){
         return true
     }
     return false
 } 
const getPartial_unexepected_list = () => {
     if(isResultNested()){
        return Expectation.results[0].result.partial_unexpected_list
     }
     return Expectation.result.partial_unexpected_index_list
    }
const getUnexpectedCount = () => {
        if(isResultNested()){
           return Expectation.results[0].result.unexpected_count
        }
        return Expectation.result.unexpected_count
       }
   return ( 
   <Card >
<p><b> {Expectation_name}</b></p>
<p><span> Unwanted values count: </span>  {getUnexpectedCount()}  </p>
<p><span> {`Few Unwanted present in ${isResultNested()?"Column":"Row Number"}:`}</span></p>
<p>{getPartial_unexepected_list().map((value,index)=> {if (index > 5 ){ return } return <Tag color='warning'> {value} </Tag>})}
</p>
 </Card> );
}
export default ExpectationCard;