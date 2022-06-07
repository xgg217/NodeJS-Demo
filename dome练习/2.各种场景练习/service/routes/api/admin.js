const express = require('express');
const { publish, verify } = require('./../jwt');

const { loginFun, addAdmin, getAdmin } = require('./../../services/adminServices');

const router = express.Router();

/**
 * 注册
 */
router.post('/add', (req, res) => {
  console.log(req.body);
  const { loginId, loginIdPwd, name } = req.body;
  addAdmin({ loginId, loginIdPwd, name }).then(data => {
    if(!data) {

      res.send({
        msg: '添加错误',
        code: 409,
        data: null
      });
      return;
    }

    res.send({
      msg: '',
      code: 200,
      data
    });
  }).catch(err => {
    console.error(err);
    res.send({
      msg: '添加错误',
      code: 400,
      data: null
    });
  })
})

/**
 * 登录
 */
router.post('/login', (req, res) => {
  console.log(req.body);
  const { loginId, loginIdPwd } = req.body;

  loginFun(loginId, loginIdPwd).then(data => {
    // 不存在 
    if(!data) {
      res.status(400).send({
        msg: '账号或密码错误',
        code: 400,
        data: null
      });
      return;
    }
    // 颁发 cookie 和 jwt
    publish(res, 3600 * 24, data.dataValues);

    // 登录成功
    res.send({
      msg: '',
      code: 200,
      data: data.dataValues
    });
  });
});

/**
 * 获取自己的信息
 */
router.get('/whoami', (req, res) => {
  console.log(req);

  // 此时 result一定存在值，因为验证已经通过了
  const { id } = verify(req);

  getAdmin(id).then(data => {
    res.send({
      msg: '请求自己',
      code: 200,
      data
    });
  }).catch(err => {
    console.error(err);
  })

})

module.exports = router;
