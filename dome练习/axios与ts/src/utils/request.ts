import axios from "axios";

const request = axios.create({
  timeout: 5000,
  // baseURL: 'http://192.168.10.1:3100'
});


export default request;
