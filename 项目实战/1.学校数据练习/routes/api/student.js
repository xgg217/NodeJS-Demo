const express = require('express');
const { getStudents } = require('./../../services/studentServices');
const router = express.Router();

/**
 * 获取学生列表
 */
router.get('/student', (req, res) => {
  console.log(req.query);
  const { page, limit } = req.query;
  
  getStudents(Number(page), Number(limit)).then(data => {
    console.log(data);
    if(!data) {
      res.send({
        msg: '',
        code: 200,
        data: null
      });
      return;
    }

    // 成功
    res.send({
      msg: '',
      code: 200,
      data
    });
  }).catch(err => {
    res.send({
      msg: err,
      code: 500,
      data: null
    })
  })
});

/**
 * 添加学生
 */
router.post('/student', (req, res) => {
  console.log('添加学生');
  res.send('添加学生');
});

module.exports = router;

