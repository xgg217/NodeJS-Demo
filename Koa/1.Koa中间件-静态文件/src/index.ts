import Koa from 'koa';
import koaStatic from './koa-static';
import koaFallback from './koa-fallback'
import http from 'http';
import { resolve } from 'path';
const app = new Koa();
const server = http.createServer(app.callback());

// 当访问 http://localhost:8081/a/b 自动定位到 http://localhost:8081/index.html
app.use(koaFallback);
// 静态资源
app.use(koaStatic(resolve(__dirname, './../public')));
app.use(function(ctx, next) {
  console.log(2);
  next();
});


server.listen(8081, () => {
  console.log('启动1');
});
