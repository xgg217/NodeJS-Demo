/**
 * 1. 发送请求的时候，如果有token时，需要附加到请求头中
 * 2. 响应的时候，如果有token，保存到token到本地（cookie、localstorage）
 * 3. 响应的时候，如果响应的消息码是 403（没有token 或 token失效）在本地删除token
 */

import axios from 'axios';
import { ElMessage } from 'element-plus'

let token = '';
try {
  const str = localStorage.getItem('token');
  if(str) {
    token = str;
  }
} catch (error) {
  console.error(error);
}

/* 创建axios实例 */
const service = axios.create({
  timeout: 5000, // 请求超时时间
  // baseURL: 'http://192.168.1.2', // 基础地址
  headers: {
    authorization: token
  }
});

/* request拦截器 */
service.interceptors.request.use(config => {
  // 1.发送请求的时候，如果有token时，需要附加到请求头中
  const token = localStorage.getItem('token') || '';
  if(!token.length) {
    config.headers.authorization = 'bearer ' + token;
  }
  return config;

}, (error: any) => {
  Promise.reject(error);
});

/* respone拦截器 */
service.interceptors.response.use(response => {
  // 2. 响应的时候，如果有token，保存到token到本地（cookie、localstorage）
  const token = response.headers.authorization;
  if(token) {
    localStorage.setItem('token', token);
  }
  const res = response.data;

  if(res.code === 200) {
    return res.data;
  } else {
    return Promise.reject('error');
  }

}, (error: any) => {
  // 异常处理
  console.log(error)

  if(error.response.status === 403) {
    ElMessage.warning({
      message: '403 token认证出错',
      type: 'warning'
    });
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error(error);
    }
  }
  return Promise.reject(error);
});

export default service;
