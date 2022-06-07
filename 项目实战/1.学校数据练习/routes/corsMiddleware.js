// 白名单
const allowOrigins = [
  'http://127.0.0.1:3000',
  'null'
];

module.exports = function(req, res, next) {

  // debugger
  if('origin' in req.headers && allowOrigins.includes(req.headers.origin)) {
    // 跨域处理
    res.header('access-control-allow-origin', req.headers.origin);
  }
  next()
}