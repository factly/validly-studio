// make a react, redux  Antd form component which open in a modal on click of a button with submit button

import React from 'react';
import { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getMetaTableDataFromS3 } from '../actions/metafacts';
import { CloudUploadOutlined } from '@ant-design/icons';
import { getGoogleSheetsValidations } from '../actions/metafactsValidly';
// import { setFormErrors } from '../utils/form';

function GoogleSheetsForm({ style, ...props }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  const onSave = (values) => {
    values.worksheet = values.worksheet ? values.worksheet : '';
    dispatch(getGoogleSheetsValidations(values)).then(() => {
      handleCancel();
    });
    //   .catch((error) => {
    //     setFormErrors(error, form);
    //   });
   
  };
  return (
    <>
      <Button style={style} icon={<CloudUploadOutlined />} onClick={handleOpen}>
        Google Sheet
      </Button>
      <Modal
        destroyOnClose
        title="Google Sheet"
        visible={showModal}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onCancel={handleCancel}
          onFinish={(values) => onSave({ ...values, result_type: 'COMPLETE' })}
        >
          <Form.Item
            label="Sheet Id"
            name="sheet_id"
            rules={[
              {
                required: true,
                message: 'Please input Google Sheet Id',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Path/Prefix" name="worksheet">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default GoogleSheetsForm;
