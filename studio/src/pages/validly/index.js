import { UploadOutlined, CheckSquareTwoTone, StopTwoTone } from '@ant-design/icons';
import {
  addExpectationCard,
  addFiles,
  getValidationData,
  setUploadButton,
} from '../../actions/validly';
import React, { useEffect, useState, useCallback } from 'react';
import 'antd/dist/antd.css';
import { Upload, Button, Collapse, Card, Row, Col, Spin } from 'antd';
import customExpandIcon from '../../components/customexpandicon';
import ExpectationCard from '../../components/expectationcard';
import { Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSheetsForm from '../../components/googleSheets';
import {
  addMetaFactsExpectationCard,
  getMetaFactsValidationData,
} from '../../actions/metafactsValidly';
const { Panel } = Collapse;
function Validly({ mode = 'datasets' }) {
  const dispatch = useDispatch();
  const { validations, expectations, files, uploadButton, loading } = useSelector((state) =>
    mode === 'datasets' ? state.validly : state.metafactsValidly,
  );
  const customRequest = () => {
    if (mode === 'metafacts') {
      dispatch(getMetaFactsValidationData(files, 'sheet'));
      return;
    }
    dispatch(getValidationData(files, 'sheet'));
  };
  const handleUpload = (file, fileList) => {
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
    if ((mode = 'metafacts')) {
      dispatch(
        addMetaFactsExpectationCard(updateExpectationsArray(expectations, expectation, index)),
      );
      return;
    }
    dispatch(addExpectationCard(updateExpectationsArray(expectations, expectation, index)));
  };
  return (
    <div className="App">
      <Space size={'small'}>
        <Upload showUploadList={false} beforeUpload={handleUpload} multiple>
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
                    {file.expectations_Validated_List.map((expectation) => (
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
                            style={{ fontSize: '125%', fontWeight: 'bolder', paddingRight: '4px' }}
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
                    <ExpectationCard {...expectations[index]}></ExpectationCard>
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
