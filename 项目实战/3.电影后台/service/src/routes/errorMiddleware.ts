/**
 * 处理错误的中间件
 */

import { getErr, getResult } from './getSendResult';

module.exports = (err, req, res, next) => {
 
  // 发生了错误
  if(err) {
 
    // // 上传错误
    // if(err instanceof multer.MulterError) {
    //   // 发生错误
    //   res.status(400).send(getErr(err.message));
    //   return;
    // }
 
    const errObj = {
      code: 500,
      msg: err instanceof Error ? err.message : err
    }
    res.status(500).send(getErr(errObj.msg));
    return;
  }
  next();
};