import { Button, Modal, Table, Typography } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import React from "react";
import { useSelector } from "react-redux";
 import {CSVLink} from "react-csv"
import { useHistory } from "react-router-dom";
function Metafacts() {
 const[metaTabledata,setMetaTabledata ] = React.useState({})
 const[loading,setLoading ] = React.useState(true)
 const history=useHistory()
 const datasets = useSelector((state) => state.validly.files )
 const filesValidity = useSelector((state) => state.validly.uploadedFilesValidity)
 const [show, setShow] = React.useState(!filesValidity);
 const columns = [
    {
      title: 'formats_available',
      dataIndex: 'formats_available',
      key: 'formats_available',
    },
    {
      title: 'granularity',
      dataIndex: 'granularity',
      key: 'granularity',
    },
    {
      title: 'is_public',
      dataIndex: 'is_public',
      key: 'is_public'
    },
    {
        title: 'output_file_name',
      dataIndex: 'output_file_name',
      key: 'output_file_name',
    },
    {
        title: 'spatial_coverage',
      dataIndex: 'spatial_coverage',
      key: 'spatial_coverage',
    }, 
    {
        title: 'temporal_coverage',
      dataIndex: 'temporal_coverage',
      key: 'temporal_coverage',
    },
    {
        title: 'units',
      dataIndex: 'units',
      key: 'units',
    },
];
const columnsDynamic = Object.entries(metaTabledata).map((filenameValuePair,index)=>{
 const columns =Object.entries(filenameValuePair[1]).map((columnValuePair,index)=>{
 return{ 
   title:columnValuePair[0],
   dataIndex:columnValuePair[0],
   key:columnValuePair[0]}
 })
 return columns 
})[0]
const  headers = [
  { label: "formats_available", key: "formats_available" },
  { label: "granularity", key: "granularity" },
  { label: "is_public", key: "is_public" },
  { label: "output_file_name", key: "output_file_name" },
  { label: "spatial_coverage", key: "spatial_coverage" },
  { label: "temporal_coverage", key: "temporal_coverage" },
  { label: "units", key: "units" },
];
 React.useEffect(()=>{
    if(datasets.length){
        let data = new FormData()
        datasets.map((file)=> data.append('csv_files',file))
         fetch(window.REACT_APP_METAFACTS_SERVER_URL,{
            method: 'POST',
            body: data
         }).then(response => response.json())
           .then((metaTabledata)=>{setMetaTabledata(metaTabledata)})
           .finally(()=> setLoading(false))
        }
  },[datasets])
    return (
 <>   
 <Button  style={{marginBottom:'10px', float:'right'}} type="primary" >
  <CSVLink headers={headers} filename={"metafacts.csv"} data={Object.values(metaTabledata).map((value,index)=>{return {...value,is_public:value['is_public']?"True":"False"}})} > 
  {<DownloadOutlined style={{paddingRight:'5px'}}/>} Download CSV 
  </CSVLink>
</Button>
  <Modal visible={show} onOk={()=>setShow(false)}  title="Warning" onCancel={()=>history.push("/")}>
    <Typography.Text type="waring"> You have errors in your Datasets would you still like to proceed </Typography.Text>
  </Modal>
  <Table  
 loading={loading}
 pagination={{
   defaultPageSize:100,
   hideOnSinglePage:true,
 }}
 scroll={{ x: 768}}
 columns={columns}
dataSource={Object.values(metaTabledata).map((value,index)=>{return {...value,is_public:value['is_public']?"True":"False"}})}
 bordered   
 rowKey={(record)=>record.output_file_name}
 />
    </>
    );
}
export default Metafacts;