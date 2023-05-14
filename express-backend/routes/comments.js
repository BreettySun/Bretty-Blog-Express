const express = require('express')
const router = express.Router()
const { Comment, Article } = require('../models/index')

/**
 * @description: 发布评论
 * @return {*}
 */
router.post("/", (req, res) => {
  const { article_id, content } = req.body
  Comment.create({
    content: content,
    article_id: article_id,
    reply_user_id: req.auth.uid
  }).then((response) => {
    res.json({
      code: 200,
      success: true,
      msg: '发布评论成功',
    })
  }).catch((err) => {
    res.json({
      code: 200,
      success: false,
      msg: '发布评论失败',
    })
  })
})

/**
 * @description: 获取评论列表
 * @return {*}
 */
router.get("/articles/:aid", (req, res) => {
  Comment.find({ article_id: req.params.aid })
    .populate('reply_user_id', { password: 0 })
    .then((response) => {
      res.json({
        code: 200,
        success: true,
        msg: '获取评论列表成功',
        data: response
      })
    }).catch((err) => {
      res.json({
        code: 200,
        success: false,
        msg: '获取评论列表失败',
      })
    })
})

/**
 * @description: 删除评论
 * @return {*}
 */
router.delete("/:cid", async (req, res) => {
  const commentObj = await Comment.findById(req.params.cid).populate("article_id")
  const author_id = commentObj.article_id._id
  if (author_id === req.auth.uid) {
    Comment.findByIdAndDelete(req.params.cid)
      .then((response) => {
        if (response) {
          res.json({
            code: 200,
            success: true,
            msg: '删除评论成功',
          })
        } else {
          res.json({
            code: 200,
            success: false,
            msg: '删除评论失败--评论消失了',
          })
        }
      }).catch((err) => {
        res.json({
          code: 200,
          success: false,
          msg: '删除评论失败',
        })
      })
  } else {
    res.json({
      code: 200,
      success: false,
      msg: '删除评论失败-无权限',
    })
  }
})

module.exports = router