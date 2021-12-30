const token = `Bearer ${localStorage.getItem('token')}`;
const configNormal = {
  headers: {
    Authorization: token
  }
};
const configFormData = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: token
  }
};
export { configNormal, configFormData };
