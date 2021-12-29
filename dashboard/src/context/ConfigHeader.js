const configNormal = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
};
const configFormData = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
};
export { configNormal, configFormData };
