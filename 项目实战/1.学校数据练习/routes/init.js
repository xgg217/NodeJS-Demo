
const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');

/**
* 创建一个 express 应用
* app 实际上是一个函数，用于处理请求的函数
*/
const app = express();
const port = 3100;

const errorMiddleware = require('./errorMiddleware');


// app.get('/abc', (req, res, next) => {

//   console.log(1111);
//   console.log(req.headers); // 获取请求头-是一个对象
//   // console.log(req.path); // 获取路径- /abc

//   // 192.168.5.66:3000/abc?a=1&b=2
//   console.log(req.query); // { a: '1', b: '2' }
//   // res.send('Hello World!')
//   next();

// }, (req, res, next) => {
//   console.log(222);
//   next()
// })

// app.get('/abc', (req, res, next) => {

//   console.log(333);
  
//   next(new Error('辣鸡'));

// }, (err, req, res, next) => {
//   console.log(444);
//   res.send('发生了错误')
//   next()
// })

// app.get('/abc', (req, res, next) => {

//   console.log(333);
  
//   next(new Error('辣鸡'));

// }, errorMiddleware)

// app.use('/abc', (req, res, next) => {
//   console.log(111);
//   next();
// },(req, res, next) => {
//   console.log(222);
//   next();
// }, errorMiddleware);



// app.get('/a/:id/:a', (req, res) => {
//   res.send('Hello World!')
//   // 192.168.5.66:3000/a/456/1
//   console.log(req.params); // { id: '456', a: '1' }
//   res.redirect(302, "https://www.baidu.com/");
// });

// app.get('*', (req, res) => {
//   console.log(11);
//   res.send('Hello World!')
app.use(session({
  secret: 'keyboard cat',
  // resave: false,
  // saveUninitialized: true,
  // cookie: { secure: true }
}))
  
//   // 192.168.5.66:3000/a/456/1
//   // console.log(req.params); // { id: '456', a: '1' }
//   // res.redirect(302, "https://www.baidu.com/");
//   // res.send('Hello World!')
// });
const path = require('path');
const staticRoot = path.resolve(__dirname, '../public');
app.use(express.static(staticRoot));

// app.use(express.urlencoded({
//   extended: true
// }));

const student = require("./api/student");
const login = require("./api/login");
const tokenMiddleware = require('./tokenMiddleware');

/**
 * 处理跨域
 */
app.use(require('./corsMiddleware.js'))

/**
 * 加入 cookie-parser 中间件
 * 加入之后，会在 req 对象中注入 cookies 属性，用于获取所有传递过来的 cookie
 * 加入之后会在 req 对象中注入 cookie 方法，用于设置 cookie
 */
app.use(cookieParser());
debugger
app.use(require('./tokenMiddleware'));
debugger

app.use(express.urlencoded({extended: true}));
app.use(express.json());





app.use("/api/admin", login);
app.use("/api/student", student);

// app.post('/api/student', (req, res) => {
//   console.log("const packageName = require('packageName');");
//   console.log(req.body);
// })


// 监听端口
app.listen(port, () => console.log(`监听 ${port}!`));

module.exports = app;