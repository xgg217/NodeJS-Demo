const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { resolve, extname } = require('path');
const fileTypeArr = ['.jpg', '.png', '.gif'];

//磁盘存储引擎
const storage = multer.diskStorage({
  // 存放路径
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, '../../public', 'upload'));
  },
  filename: function (req, file, cb) {
    const fileExtname = extname(file.originalname); // 获取后缀名
    const fileName = `${file.fieldname}-${Date.now()}${fileExtname}`
    cb(null, fileName);
  }
})

const upload = multer({
  // dest: resolve(__dirname, '../../public', 'upload'),
  storage,
  limits: {
    fileSize: 5 * 10 * 1024 // 单位 字节
  },
  fileFilter(req, file, cb) {
    // 验证文件后缀名

    const fileExtname = extname(file.originalname); // 获取后缀名
    const isBool = fileTypeArr.includes(fileExtname);
    if(isBool) {
      // 接受这个文件
      cb(null, true);
    } else {
      // 拒绝这个文件
      // cb(null, false)

      // 如果有问题，你可以总是这样发送一个错误:
      cb(new Error('不支持该类型文件，请上传指定文件格式'))
    }
  }
});

/**
 * 上传
 */
router.post('/add', upload.single('img'), (req, res) => {
  console.log(req.file);
  const fileUrl = '/upload/' + req.file.filename;
  res.send({
    code: 200,
    mes: '',
    data: fileUrl
  })
});

module.exports = router;
