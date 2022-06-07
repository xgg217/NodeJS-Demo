const express = require('express');


const { asyncHandler } = require('./../getSendResult')

const { loginFun } = require('./../../services/adminServices')

const router = express.Router();

router.post('/login', (req, res) => {

  console.log(req.body);
  const { loginId, loginIdPwd } = req.body;

  loginFun(loginId, loginIdPwd).then(data => {
    // 不存在
    if(!data) {
      res.send({
        msg: '账号或密码错误',
        code: 200,
        data: null
      });
      return;
    }

    const ids = data.id;

    // cookie 验证
    // res.header('set-cookie', `token=${ data.name }; path=/; domain=localhost; max-age=3600`);
    // res.cookie('token', ids, {
    //   path: '/',
    //   domain: 'localhost',
    //   maxAge: 3600 * 1000 // 毫秒
    // });

    // 适配其他端 如：手机端 手表
    // res.header('authorization', ids);

    // seccion 验证
    console.log(req.session);
    // req.session.loginUser = data;

    // 登录成功
    res.send({
      msg: '',
      code: 200,
      data
    });
  }).catch(err => {
    console.log(err);
    res.send({
      msg: err,
      code: 500,
      data: null
    })
  });
})

module.exports = router;
