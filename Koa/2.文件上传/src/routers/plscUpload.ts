import Router from '@koa/router';
import multer from '@koa/multer';
import { resolve, extname } from 'path';

interface IFileObj {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number
}
interface IFiles {
  file: IFileObj[]
}


// 存放路径
let uploadPath = resolve(__dirname, './../upload');

const router = new Router({
  prefix: '/upload'
});

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
    cb(null, `${fileName}-批量上传-${Date.now()}${fileExtname}`);
  },
});

const multerUpload = multer({ storage });

router.post('/plsc', multerUpload.fields([{name: 'file', maxCount: 10},]), (ctx, next) => {
  try {
    console.log(ctx.files);
    const file:IFileObj[] = ((ctx.files as unknown) as IFiles).file;

    const urls = file.map(item => {
      return item.path;
    });
    ctx.body = {
      code: 1,
      msg: "文件上传成功",
      url: urls
    }
    next();
  } catch (error) {
    console.log(error);
    
    ctx.body = {
      code: 0,
      msg: "文件上传失败"
    };
  }
});

export default router.routes();