import axios, { AxiosResponse } from 'axios';

const axiosService = axios.create();

axiosService.interceptors.response.use((res: AxiosResponse<any, any>) => {
  return res.data;
});

export default axiosService;
