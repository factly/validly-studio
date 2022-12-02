// write a util function to create form data object from object properties

export function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
}

export function setFormErrors(error, form) {
  if (error.status === 400) {
    switch (error.detail.Code) {
      case 'NoSuchBucket':
        form.setFields([{ name: 's3_bucket', errors: [error.detail.Message] }]);
        break;
      case 'NoSuchPrefix':
        form.setFields([{ name: 'prefix', errors: [error.detail.Message] }]);
        break;
      default:
        form.setFields([{ name: 's3_bucket', errors: [error.detail.Message] }]);
    }
    return;
  }
  form.setFields([{ name: 's3_bucket', errors: ['Server error please try again'] }]);
}
