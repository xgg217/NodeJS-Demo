/**
 * 处理错误的中间件
 */

const getMsg = require("./getSendResult");
const multer = require("multer");

module.exports = (err, req, res, next) => {

  // 发生了错误
  if(err) {

    // 上传错误
    if(err instanceof multer.MulterError) {
      // 发生错误
      res.status(400).send(getMsg.getErr(err.message));
      return;
    }

    const errObj = {
      code: 500,
      msg: err instanceof Error ? err.message : err
    }
    res.status(500).send(getMsg.getErr(errObj));
    return;
  }
  next();
};