import axios from 'axios';

export const axiosInst = axios.create({
  baseURL: 'https://15.design.htmlacademy.pro/six-cities',
  timeout: 5000
});
