const express = require('express')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')
const router = express.Router()

/* 用户注册请求 */
router.post('/', function (req, res, next) {
  const { username, password, nickname, headImg } = req.body
  if (username && password && nickname && headImg) {
    User.create(req.body)
      .then((response) => {
        console.log(req.body)
        res.json({
          code: 200,
          success: true,
          message: '注册成功',
        })
      })
      .catch((err) => {
        console.log(req.body)
        res.json({
          code: 200,
          success: false,
          message: '注册失败',
          error: err
        })
      })
  } else {
    res.json({
      code: 200,
      success: false,
      message: '注册失败-缺少参数'
    })
  }
})

/* 用户登录请求 */
router.get('/', function (req, res, next) {
  const { username, password } = req.query
  User.findOne({ username, password })
    .select('username nickname headImg')
    .then((response) => {
      console.log(response)
      if (response) {
        let token = jwt.sign({ username: req.query.username }, 'test123456', { expiresIn: '3d', algorithm: 'HS256' })
        res.json({
          code: 200,
          success: true,
          message: '登录成功',
          token: token
        })
      } else {
        res.json({
          code: 200,
          success: false,
          message: '登录失败',
          token: ''
        })
      }
    })
})

module.exports = router
