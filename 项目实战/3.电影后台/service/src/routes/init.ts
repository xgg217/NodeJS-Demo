import express from 'express';
import { resolve } from 'path'
// const path = require('path');
import adminRoute from './api/admin'
const staticRoot = resolve(__dirname, '../public');

const app = express();
const port = 3100;

app.use(express.static(staticRoot));

app.use(express.urlencoded({extended: true}));
app.use(express.json());


// 登录
app.use('/api/admin', adminRoute);

// 错误处理中间件
// app.use(require('./errorMiddleware'))

// 监听端口
app.listen(port, () => console.log(`监听 ${port}!`));

export default app;

