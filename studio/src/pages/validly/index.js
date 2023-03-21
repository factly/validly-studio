import { UploadOutlined, CheckSquareTwoTone, StopTwoTone } from '@ant-design/icons';
import {
  addExpectationCard,
  addFiles,
  getValidationData,
  setUploadButton,
} from '../../actions/validly';
import React from 'react';
import 'antd/dist/antd.css';
import { Upload, Button, Collapse, Card, Row, Col, Spin, Radio, Form } from 'antd';
import customExpandIcon from '../../components/customexpandicon';
import ExpectationCard from '../../components/expectationcard';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSheetsForm from '../../components/googleSheets';
import {
  addMetaFactsExpectationCard,
  addMetaFactsFiles,
  getMetaFactsValidationData,
  setMetaFactsUploadButton,
} from '../../actions/metafactsValidly';
import useUploadForm from '../../components/upload';
const { Panel } = Collapse;
function Validly({ mode = 'datasets' }) {
  const dispatch = useDispatch();
  const { validations, expectations, files, uploadButton, loading } = useSelector((state) =>
    mode === 'datasets' ? state.validly : state.metafactsValidly,
  );
  const customRequest = () => {
    if (mode === 'metafacts') {
      dispatch(getMetaFactsValidationData(files));
      return;
    }
    dispatch(getValidationData(files));
  };
  const handleUpload = (file, fileList) => {
    if (mode === 'metafacts') {
      dispatch(addMetaFactsFiles(fileList));
      dispatch(setMetaFactsUploadButton(true));
      return false;
    }
    dispatch(addFiles(fileList));
    dispatch(setUploadButton(true));
    return false;
  };
  const updateExpectationsArray = (expectations, expectation, index) => {
    expectations[index] = expectation;
    return expectations;
  };
  const displayExpectation = (expectation, index) => {
    if (expectation.success) {
      return;
    }
    if (mode === 'metafacts') {
      dispatch(
        addMetaFactsExpectationCard(updateExpectationsArray(expectations, expectation, index)),
      );
      return;
    }
    dispatch(addExpectationCard(updateExpectationsArray(expectations, expectation, index)));
  };
  const [UploadForm, isDirectory] = useUploadForm();
  const uploadProps = {
    showUploadList: false,
    beforeUpload: handleUpload,
    multiple: true,
    accept : "text/csv",
    ...(isDirectory ? { directory: true } : {}),
  };
  return (
    <div className="App">
      <UploadForm></UploadForm>
      <Space size={'small'}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select Files</Button>
          <Button>
            {' '}
            {files.length !== 0 && uploadButton
              ? `${files.length} files selected`
              : `No file Uploaded`}
          </Button>
        </Upload>
        <Button onClick={customRequest} type="primary">
          {' '}
          Start Upload{' '}
        </Button>
        {mode === 'metafacts' ? <GoogleSheetsForm /> : null}
      </Space>
      {loading ? (
        <Spin size="default" style={{ display: 'block', marginTop: '15%' }} />
      ) : (
        validations.map((file, index) => (
          <Collapse
            style={
              file.is_datacompletely_valid
                ? { backgroundColor: '#effaf5', margin: '12px 12px 12px 0px' }
                : { backgroundColor: '#feecf0', margin: '12px 12px 12px 0px' }
            }
            expandIcon={(props) => customExpandIcon(props)}
            expandIconPosition="right"
            defaultActiveKey={null}
          >
            <Panel
              header={<b>{file.filename.split('/').pop().split('.')[0]}</b>}
              key={index + file.filename}
            >
              <Row gutter={16}>
                <Col span={8}>
                  <Card bodyStyle={{ padding: '6px' }}>
                    {file.expectations_Validated_List
                      .sort((a, b) => {
                        return a.success === b.success ? 0 : a.success ? 1 : -1;
                      })
                      .map((expectation) => (
                        <Card
                          hoverable
                          style={
                            expectation.success
                              ? { backgroundColor: '#effaf5', margin: '4px' }
                              : { backgroundColor: '#feecf0', margin: '4px' }
                          }
                          onClick={() => displayExpectation(expectation, index)}
                        >
                          {expectation.success ? (
                            <CheckSquareTwoTone
                              style={{ fontSize: '125%', fontWeight: 'bold', paddingRight: '4px' }}
                              twoToneColor="#48C78E"
                            />
                          ) : (
                            <StopTwoTone
                              style={{
                                fontSize: '125%',
                                fontWeight: 'bolder',
                                paddingRight: '4px',
                              }}
                              twoToneColor="#F14668"
                            />
                          )}
                          <b> {expectation.Expectation_name.replaceAll('_', ' ')} </b>
                        </Card>
                      ))}
                  </Card>
                </Col>
                <Col span={16}>
                  {expectations[index] ? (
                    <ExpectationCard Expectation={{...expectations[index]}} fileName={file.filename.split('/').pop().split('.')[0]} ></ExpectationCard>
                  ) : null}
                </Col>
              </Row>
            </Panel>
          </Collapse>
        ))
      )}
    </div>
  );
}
export default Validly;
