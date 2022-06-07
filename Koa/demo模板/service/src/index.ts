import Koa from 'koa';
import koaStatic from 'koa-static';
import http from 'http';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { join } from 'path';
import testRouter from './routers/test'

const app = new Koa();
const server = http.createServer(app.callback());

// 处理静态资源
app.use(koaStatic(join(__dirname + './../public')));

// 解析请求体的中间件，支持 x-www-form-urlencoded, application/json格式的请求体
app.use(bodyParser());

// 跨域
app.use(cors());

// 测试路由
app.use(testRouter);

server.listen(8082, () => {
  console.log('启动1');
});
