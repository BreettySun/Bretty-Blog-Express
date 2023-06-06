const express = require('express')
const router = express.Router()
const { Article } = require('../models/index')

/**
 * @description: 文章发布
 * @return {*}
 */
router.post('/', function (req, res, next) {
  console.log(req.body)
  console.log(req.auth)
  Article.create({
    ...req.body,
    author: req.auth.uid
  }).then((response) => {
    res.json({
      code: 200,
      success: true,
      message: '文章发布成功'
    })
  }).catch((err) => {
    res.json({
      code: 200,
      success: false,
      message: '文章发布失败'
    })
  })
})

/**
 * @description: 获取文章列表
 * @return {*}
 */
router.get('/users/:uid', function (req, res, next) {
  console.log(req.params)
  Article.find({ author: req.params.uid })
    .populate('author', { password: 0 })
    .populate('comments')
    .then((response) => {
      res.json({
        code: 200,
        success: true,
        message: '获取文章列表成功',
        data: response
      })
    }).catch((err) => {
      res.json({
        code: 200,
        success: false,
        message: '获取文章列表失败',
        error: err
      })
    })
})

/**
 * @description: 获取文章详情
 * @return {*}
 */
router.get('/:aid', function (req, res, next) {
  console.log(req.params)
  Article.findByIdAndUpdate(
    { _id: req.params.aid },
    { $inc: { views: 1 } },
    { new: true }
  ).then((response) => {
    res.json({
      code: 200,
      success: true,
      message: '获取文章详情成功',
      data: response
    })
  }).catch((err) => {
    res.json({
      code: 200,
      success: false,
      message: '获取文章详情失败'
    })
  })
})

/**
 * @description: 文章删除
 * @return {*}
 */
router.delete('/:aid', function (req, res, next) {
  console.log(req.params)
  Article.findByIdAndDelete(req.params.aid)
    .then((response) => {
      if (response) {
        res.json({
          code: 200,
          success: true,
          message: '文章删除成功'
        })
      } else {
        res.json({
          code: 200,
          success: false,
          message: '文章删除失败--文章消失了'
        })
      }
    }).catch((err) => {
      res.json({
        code: 200,
        success: false,
        message: '文章删除失败'
      })
    })
})

/**
 * @description: 文章编辑
 * @return {*}
 */
router.patch('/:aid', function (req, res, next) {
  console.log(req.params)
  console.log(req.body)
  Article.findByIdAndUpdate(
    req.params.aid,
    { ...req.body },
    { new: true }
  ).then((response) => {
    res.json({
      code: 200,
      success: true,
      message: '文章编辑成功',
      data: response
    })
  }).catch((err) => {
    res.json({
      code: 200,
      success: false,
      message: '文章编辑失败'
    })
  })
})

module.exports = router