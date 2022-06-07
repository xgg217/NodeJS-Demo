import express from 'express';

import { addAdmin } from './../../services/adminServices'

const router = express.Router();

/**
 * 添加用户
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
    res.status(400).send('添加错误')
  })
});

export default router;
