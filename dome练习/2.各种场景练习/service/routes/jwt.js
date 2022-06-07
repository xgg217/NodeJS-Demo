const secrect = 'xgg'; // 密钥
const cookieKey = 'token';
const jwt = require('jsonwebtoken');

/**
 * 颁发 jwt
 * 
 */
const publish = function(res, maxAge = 3600 * 24, info = {}) {
  const token = jwt.sign(info, secrect, {
    expiresIn: maxAge
  });

  // 添加到 cookie
  // res.cookie(cookieKey, token, {
  //   maxAge: maxAge * 1000,
  //   path: '/'
  // });

  // 添加其他传输
  res.header('authorization', `bearer ${token}`);
};


// 验证 jwt
const verify = function(req) {
  // 安装了 cookie-parser 才会在 req 属性上存在 cookies
  let token = req?.cookies?.[cookieKey] ?? '';
  // 查看 cookie 是否存在 token
  if(!token) {
    token = req.headers.authorization;
    // debugger

    // 请求头中是否存在 authorization
    if(!token) {
      return null;
    }

    token = token.split(' ')[1];
  }
  // 验证是否有效
  try {
    const result = jwt.verify(token, secrect);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  publish,
  verify
}
