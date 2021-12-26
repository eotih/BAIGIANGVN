import AXIOS from 'axios';

console.log(process.env.REACT_APP_WEB_API);
const axios = AXIOS.create({
  baseURL: `${process.env.REACT_APP_WEB_API}`
});
export default axios;
