import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://myprogram-io.firebaseio.com/'
});

export default instance;