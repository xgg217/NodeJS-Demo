const { verify } = require('./jwt');


// 白名单 不需要验证 token
const whiteList = [
  { method: "POST", path: '/api/admin/login' }
];

// 用于解析token
module.exports = (req, res, next) => {
  const findInd =  whiteList.findIndex(item => {
    return (item.method === req.method) && (item.path === req.path)
  });

  // 白名单通过
  if(findInd !== -1) {
    next();
    return;
  }

  const result = verify(req);
  if(result) {
    // 认证通过
    next();
  } else {
    // 认证失败
    res.status(403).send('认证失败，请重新登录');
  }
}


