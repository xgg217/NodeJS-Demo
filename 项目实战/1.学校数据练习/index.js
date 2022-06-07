// require("./models/sync")
// require('./models/relation');
// require('./mock/mockStudent');

// const Admin = require("./models/Admin");
// const { addAdmin, delAdmin, updateAdmin } = require("./services/adminServices");
// const { addBook, delBook, updateBook } = require("./services/bookServices");
// const { addClass, delClass, updateClass } = require("./services/classServices");
// const { addStudent, delStudent, updateStudent } = require("./services/studentServices");


// addBook({
//   name:'小花',
//   imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3355464299,584008140&fm=26&gp=0.jpg',
//   publicationTime: '2012-4',
//   author: '小刚刚'
// });
// delBook(1);
// updateBook(1, {
//   name:'1'
  
// })




// 新增 方法1
// 同步方法，构建一个模型实例
// const ins = Admin.build({
//   loginId: "abc",
//   loginIdPwd: "123",
//   name: "小刚刚"
// });

// // 将数据添加到数据库
// ins.save().then(() => {
//   console.log("新建管理员成功");
// }).catch(err => {
//   console.log(err);
// })


// 新增 方法2
// Admin.create({
//   loginId: "bcd",
//   loginIdPwd: "234",
//   name: "小花"
// }).then((data) => {
//   console.log("新建管理员成功2");
//   console.log(data);
//   console.log(data.id); // 
//   console.log(data.loginId); // "bcd"
//   console.log(data.loginIdPwd); // "234"
//   console.log(data.name); // "小花"
// }).catch(err => {
//   console.log(err);
// })


// addAdmin({
//   loginId: "abc",
//   loginIdPwd: "123",
//   name: "abc"
// }).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// })
// addAdmin({
//   loginId: "xgg",
//   loginIdPwd: "123",
//   name: "小刚刚"
// }).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// })
// addAdmin({
//   loginId: "xh",
//   loginIdPwd: "123",
//   name: "小花"
// }).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// })
// delAdmin(3);

// updateAdmin(2, { name: "小蜜糖" });


// const { loginFun, getAdmin, getAllAdmin } = require('./services/adminServices')

// loginFun('abc', '123').then(data => {
//   if(data) {
//     console.log(data.toJSON());
//     return
//   }
//   return data
  
// }).catch(err => {
//   console.log(err);
// });
// getAdmin(1).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// })
// getAdmin(1).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// });

// getAllAdmin().then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// })

// const { getStudents } = require('./services/studentServices');

// getStudents(1, 10, 1).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// });


// var md5 = require('md5');

// console.log(md5('小刚刚'));

// const validate = require("validate.js");

// // 验证规则
// const rule = {
//   name: {
//     // presence: true // name必填 
//     presence: {
//       allowEmpty: false, // 
//       message: '请传入名字' // name必填 
//     },
//     type: 'string', // name 类型
//     length: {
//       minimum: 2,
//       maximum: 5
//     }
//   }
// };
// const obj = {
//   name: '123456'
// }

// const resule = validate.validate(obj, rule);
// console.log(resule);

// const { getStudents } = require('./services/studentServices');
// getStudents(1, 10).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// });

// const log4js = require("log4js");
// const path = require('path');

// log4js.configure({
//   // 出口
//   appenders: {
//     sql: {
//       type: 'file',
//       filename: path.resolve(__dirname, 'logs', 'sql', 'loggimg.log')
//     },
//     // 设置默认分类
//     default: {
//       type: 'file',
//       filename: path.resolve(__dirname, 'logs', 'sql', 'loggimg.log')
//     }
//   },
//   // 分类
//   categories: {
//     sql: {
//       appenders: ['sql'], // 该分类使用出口sql的配置写入日志
//       level: 'all'
//     },
//     // 设置默认分类
//     default: {
//       appenders: ['default'],
//       level: 'all'
//     }
//   }
// });

// // 当程序退出的时候，完成未记录的日志
// process.on('exit', () => {
//   log4js.shutdown();
// })


// const logger = log4js.getLogger('sql');
// // logger.level = "all";
// logger.info('abc')



// const http = require('http');
// http.createServer((req,res) => {
//   // 处理 GET POST 请求，需要进行各种判断
// })






require('./init')

