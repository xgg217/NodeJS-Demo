// const URL = require("url");

// 不需要认证的
const needTokenApi = [
  { method: 'POST', path: '/api/admin/login' },
  { method: 'get', path: '/api/student/student' },
];

/**
 * 
 * @param {[method:string, path: string]} arr 
 * @param {string} method
 * @param {string} path
 * @requires boolean
 */
const siNeed = function siNeed(arr, method, path) {
  return arr.filter(item => {
    console.log(item.path);
    console.log(path);
    console.log('path');
    if((item.method === method) && (item.path === path)) {
      return true
    }
  })
}

/**
 * 处理没有认证的情况
 */
function handleNonToken(req, res, next) {
  res.status(403).send({
    code: '403',
    msg: '你没有登录认证',
  });
}


/**
 * 解析 cookie
 * 1.查看是否存在 token
 *   1.1 通关就继续后续处理
 *   1.2 未通过 给与错误
 */
module.exports = function(req, res, next) {
  // debugger
  const arr = siNeed(needTokenApi, req.method, req.path);
  if(arr.length) {
    // 不用登录
    console.log('不用登陆');
    next();
    return
  }
  
  
  // cookie 验证
  // let { token = '' } = req.cookies;
  // console.log(req);

  // console.log(req.session);

  // if(!token) {
  //   // 从 header 的 authorization 中获取
  //   console.log(req.headers.authorization);
  //   token = req.headers.authorization;
  // }

  // if(!token) {
  //   // 没有认证,执行结束
  //   console.log('验证不通过');
  //   handleNonToken(req, res, next);
  //   return;
  // }

  // session
  // console.log(req.session.loginUser);
  if(!req?.session?.loginUser?.id) {
    console.log('验证不通过');
    res.status(403).send({
      code: '403',
      msg: '你没有登录认证',
    });
    return;
  }

  // 验证token
  console.log('验证通过');
  next();
}



