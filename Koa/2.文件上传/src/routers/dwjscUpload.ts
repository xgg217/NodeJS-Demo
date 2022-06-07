import Router from '@koa/router';
import multer from '@koa/multer';
import { resolve, extname  } from 'path';

const router = new Router({
  prefix: '/upload'
});

// 存放路径
let uploadPath = resolve(__dirname, './../upload');

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 设置文件的存储目录
    cb(null, uploadPath);
  },
  // 设置文件名
  filename: function (req, file, cb) {
    console.log(2222);
    const fileExtname = extname(file.originalname); // 获取后缀名
    // 获取文件名
    const fileName = file.originalname.split(`${fileExtname}`)[0];
    cb(null, `${fileName}-单文件上传-${Date.now()}${fileExtname}`);
  },
});

const multerUpload = multer({ storage });

router.post('/dwjsc', multerUpload.single("file"), (ctx, next) => {
  try {
    ctx.body = {
      code: 1,
      msg: "文件上传成功",
      url: `${uploadPath}/${ctx.file.filename}`,
    }
    next();
  } catch (error) {
    ctx.body = {
      code: 0,
      msg: "文件上传失败"
    };
  }
});

export default router.routes();
