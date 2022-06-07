import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';
import dwjscUploadRouter from './routers/dwjscUpload';
import plscUploadRouter from './routers/plscUpload';
import dwjplscRouter from './routers/dwjplsc'

const app = new Koa();

app.use(serve(__dirname + './../client'));
app.use(bodyParser());

// 单文件上传文件
app.use(dwjscUploadRouter);

// 批量上传
app.use(plscUploadRouter);

// 大文件批量上传
app.use(dwjplscRouter);

app.listen(8081, () => {
  console.log('启动');
});
