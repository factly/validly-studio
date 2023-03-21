import { Button, Modal, Table, Typography, Space, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { useHistory } from 'react-router-dom';
import { addFiles, getMetaTableData, setUploadButton } from '../../actions/metafacts';
import S3metafactsForm from '../../components/s3metafacts';
import useUploadForm from '../../components/upload';
function Metafacts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const validlyDatasets = useSelector((state) => state.validly.files);
  const {
    files: metafactsDatasets,
    loading,
    metaTableData,
    uploadButton,
  } = useSelector((state) => state.metafacts);
  const filesValidity = useSelector((state) => state.validly.uploadedFilesValidity);
  const [show, setShow] = React.useState(!filesValidity);
  const showTable = Object.keys(metaTableData).length !== 0 ? true : false;
  // validlyDatasets.length ? true : Object.keys(metaTableData).length !== 0 ? true : false;
  const customRequest = () => {
    dispatch(getMetaTableData(metafactsDatasets));
  };
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
      key: 'is_public',
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
  // const columnsDynamic = Object.entries(metaTabledata).map((filenameValuePair, index) => {
  //   const columns = Object.entries(filenameValuePair[1]).map((columnValuePair, index) => {
  //     return {
  //       title: columnValuePair[0],
  //       dataIndex: columnValuePair[0],
  //       key: columnValuePair[0],
  //     };
  //   });
  //   return columns;
  // })[0];
  const headers = [
    { label: 'formats_available', key: 'formats_available' },
    { label: 'granularity', key: 'granularity' },
    { label: 'is_public', key: 'is_public' },
    { label: 'output_file_name', key: 'output_file_name' },
    { label: 'spatial_coverage', key: 'spatial_coverage' },
    { label: 'temporal_coverage', key: 'temporal_coverage' },
    { label: 'units', key: 'units' },
  ];
  React.useEffect(() => {
    if (
      validlyDatasets.length &&
      //  && Object.keys(metaTableData).length === 0
      metafactsDatasets.length === 0
    ) {
      dispatch(getMetaTableData(validlyDatasets));
    }
  }, [validlyDatasets, dispatch, metafactsDatasets.length]);
  
  const [UploadForm, isDirectory] = useUploadForm();
  const uploadProps = {
    showUploadList: false,
    ...(isDirectory ? { directory: true } : {}),
    accept: "text/csv",
    beforeUpload: (file, fileList) => {
      dispatch(addFiles(fileList));
      dispatch(setUploadButton(true));
      return false;
    },
    multiple: true,
  };
  return (
    <>
    <UploadForm></UploadForm>
      <Space size={'small'}>
        <Upload
          {...uploadProps}
        >
          <Button icon={<UploadOutlined />}>Select Local Files</Button>
          <Button>
            {' '}
            {metafactsDatasets.length !== 0 && uploadButton
              ? `${metafactsDatasets.length} files selected`
              : `No file Uploaded`}
          </Button>
        </Upload>
        <Button onClick={customRequest} type="primary">
          {' '}
          Upload Local Files{' '}
        </Button>
        <S3metafactsForm style={{ marginLeft: '75px' }} />
      </Space>
      {showTable ? (
        <Button style={{ marginBottom: '10px', float: 'right' }} type="primary">
          <CSVLink
            headers={headers}
            filename={'metafacts.csv'}
            data={Object.values(metaTableData).map((value, index) => {
              return { ...value, is_public: value['is_public'] ? 'True' : 'False' };
            })}
          >
            {<DownloadOutlined style={{ paddingRight: '5px' }} />} Download CSV
          </CSVLink>
        </Button>
      ) : null}
      {validlyDatasets.length &&
      // ( Object.keys(metaTableData).length === 0 )
      //  &&
      metafactsDatasets.length === 0 ? (
        <Modal
          visible={show}
          onOk={() => setShow(false)}
          title="Warning"
          onCancel={() => history.push('/')}
        >
          <Typography.Text type="error">
            {' '}
            You have errors in your validly Datasets would you still like to proceed{' '}
          </Typography.Text>
        </Modal>
      ) : null}
      {showTable ? (
        <Table
          loading={loading}
          pagination={{
            defaultPageSize: 100,
            hideOnSinglePage: true,
          }}
          scroll={{ x: 768 }}
          columns={columns}
          dataSource={Object.values(metaTableData).map((value, index) => {
            return { ...value, is_public: value['is_public'] ? 'True' : 'False' };
          })}
          bordered
          rowKey={(record) => record.output_file_name}
        />
      ) : null}
    </>
  );
}
export default Metafacts;
