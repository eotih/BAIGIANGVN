import AXIOS from 'axios';

const axios = AXIOS.create({
  baseURL: `http://localhost:3333/`
});
export default axios;
