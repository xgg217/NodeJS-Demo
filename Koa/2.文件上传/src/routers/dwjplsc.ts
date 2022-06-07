import Router from '@koa/router';
import multer from '@koa/multer';
import util from 'util';
import { resolve, extname, join  } from 'path';

import fs from 'fs';
import fse from 'fs-extra';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

const router = new Router({
  prefix: '/upload'
});


// 存放路径
let UPLOAD_DIR  = resolve(__dirname, './../upload');
const TMP_DIR = join(__dirname, "tmp"); // 临时目录
const IGNORES = [".DS_Store"]; // 忽略的文件列表

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    let fileMd5 = file.originalname.split("-")[0];
    const fileDir = join(TMP_DIR, fileMd5);
    await fse.ensureDir(fileDir);
    cb(null, fileDir);
  },
  filename: function (req, file, cb) {
    let chunkIndex = file.originalname.split("-")[1];
    cb(null, `${chunkIndex}`);
  },
});

const multerUpload = multer({ storage });

router.get("/exists", async (ctx) => {
  const { name: fileName, md5: fileMd5 } = ctx.query;
  debugger
  const filePath = join(UPLOAD_DIR, fileName + '');
  const isExists = await fse.pathExists(filePath);
  if (isExists) {
    ctx.body = {
      status: "success",
      data: {
        isExists: true,
        url: `http://localhost:3000/${fileName}`,
      },
    };
  } else {
    let chunkIds:any[] = [];
    const chunksPath = join(TMP_DIR, fileMd5 + '');
    const hasChunksPath = await fse.pathExists(chunksPath);
    if (hasChunksPath) {
      let files = await readdir(chunksPath);
      chunkIds = files.filter((file) => {
        return IGNORES.indexOf(file) === -1;
      });
    }
    ctx.body = {
      status: "success",
      data: {
        isExists: false,
        chunkIds,
      },
    };
  }
});

router.post(
  "/single",
  multerUpload.single("file"),
  async (ctx, next) => {
    ctx.body = {
      code: 1,
      data: ctx.file,
    };
  }
);

router.get("/upload/concatFiles", async (ctx) => {
  const { name: fileName, md5: fileMd5 = '' } = ctx.query;
  await concatFiles(
    join(TMP_DIR, fileMd5 + ''),
    join(UPLOAD_DIR, fileName + '')
  );
  ctx.body = {
    status: "success",
    data: {
      url: `http://localhost:3000/${fileName}`,
    },
  };
});

async function concatFiles(sourceDir:string, targetPath:string) {
  const readFile = (file:string, ws:fs.WriteStream) =>
    new Promise((resolve, reject) => {
      fs.createReadStream(file)
        .on("data", (data) => ws.write(data))
        .on("end", resolve)
        .on("error", reject);
    });
  const files = await readdir(sourceDir);
  debugger
  const sortedFiles = files
    .filter((file) => {
      return IGNORES.indexOf(file) === -1;
    }).sort((a,b) => {
      return a.charCodeAt(0) - b.charCodeAt(0);
    })
  const writeStream = fs.createWriteStream(targetPath);
  for (const file of sortedFiles) {
    let filePath = join(sourceDir, file);
    await readFile(filePath, writeStream);
    await unlink(filePath); // 删除已合并的分块
  }
  writeStream.end();
}

export default router.routes();

