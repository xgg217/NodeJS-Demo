const express = require("express");
const cookieParser = require('cookie-parser');
const path = require('path');
const staticRoot = path.resolve(__dirname, '../public');

const app = express();
const port = 3100;

// 使用代理
app.use(require('./proxyMid'));

app.use(express.static(staticRoot));

app.use(cookieParser());
app.use(require('./tokenMiddleware'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// 登录
app.use('/api/admin', require('./api/admin'));
// 上传
app.use('/api/upload', require('./api/upload'));

// 错误处理中间件
app.use(require('./errorMiddleware'))

// 监听端口
app.listen(port, () => console.log(`监听 ${port}!`));

module.exports = app;