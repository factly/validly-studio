import { Form, Radio } from 'antd';
import React, { useState } from 'react';

function useUploadForm() {
  const [isDirectory, setIsDirectory] = useState(false);

  const onChange = (e) => {
    setIsDirectory(e.target.value);
  };

  function UploadForm() {
    return (
      <Form
        name="basic"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item label="Upload by">
          <Radio.Group onChange={onChange} value={isDirectory}>
            <Radio value={false}>Files</Radio>
            <Radio value={true}>Directory</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    );
  }

  return [UploadForm, isDirectory];
}

export default useUploadForm;
