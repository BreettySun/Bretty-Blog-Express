const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

/* 用户注册请求 */
router.post('/', function (req, res, next) {
  console.log(req.body);
  res.json({
    code: 200,
    success: true,
    message: 'User created successfully',
    data: req.body
  });
});

/* 用户登录请求 */
router.get('/', function (req, res, next) {
  if (req.query.username === 'Scream' && req.query.password === '123456') {
    let token = jwt.sign({ username: req.query.username }, 'test123456', { expiresIn: '3d', algorithm: 'HS256' });
    res.json({
      code: 200,
      success: true,
      message: 'User login successfully',
      token: token
    });
  } else {
    res.json({
      code: 200,
      success: false,
      message: 'User login failed',
      token: ''
    });
  }
});

module.exports = router;
