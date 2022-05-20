import React from 'react';
import { PlusOutlined , MinusOutlined } from '@ant-design/icons';

export default function customExpandIcon(props){
    if (props.isActive) {
      return (
         < MinusOutlined></MinusOutlined>
      );
    } else {
      return (
         < PlusOutlined ></PlusOutlined>
      );
    }
  }