// make a react, redux  Antd form component which open in a modal on click of a button with submit button

import React from 'react';
import { useState } from 'react';
import { Form, Button, Input, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { getMetaTableDataFromS3 } from '../actions/metafacts';
import { CloudUploadOutlined } from '@ant-design/icons';
import { setFormErrors } from '../utils/form';

function S3metafactsForm({ loading , style, ...props }) {
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
    dispatch(getMetaTableDataFromS3(values))
      .then(() => {
        handleCancel();
      })
      .catch((error) => {
        setFormErrors(error, form);
      });
  };
  return (
    <>
      <Button style={style} icon={<CloudUploadOutlined />} onClick={handleOpen}>
        S3 Storage
      </Button>
      <Modal
        destroyOnClose
        title="S3 Storage"
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
          onFinish={(values) => onSave(values)}
        >
          <Form.Item
            label="Bucket Name"
            name="s3_bucket"
            rules={[
              {
                required: true,
                message: 'Please input S3 bucket name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Path/Prefix" name="prefix">
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" loading={loading} htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default S3metafactsForm;
