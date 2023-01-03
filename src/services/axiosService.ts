import axios, { AxiosResponse } from 'axios';
import { PROXY_URL } from '../config';

const axiosService = axios.create({
  baseURL: PROXY_URL,
});

axiosService.interceptors.response.use((res: AxiosResponse<any, any>) => {
  return res.data;
});

export default axiosService;
