import axios from 'axios';
import { PROXY_URL } from '../config';

const axiosService = axios.create({
  baseURL: PROXY_URL,
});

export default axiosService;
