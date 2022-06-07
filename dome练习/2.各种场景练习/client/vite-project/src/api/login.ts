import service from '@/utils/request';

/**
 * 用户登录
 * @param loginId 账号
 * @param loginIdPwd 密码
 * @returns 
 */
const apiLogin = (loginId:string, loginIdPwd:string) => {
  return service.post('/api/admin/login', { loginId, loginIdPwd });
};

/**
 * 注销
 * 删除本地
 */
const apiLoginOut = () => {
  return new Promise<void>((resolve, reject) => {
    localStorage.removeItem('token');
    resolve();
  })
}

export {
  apiLogin,
  apiLoginOut
}


