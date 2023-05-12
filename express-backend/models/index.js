/*
 * @Author: BreettySun
 * @Date: 2023-05-12 20:33:59
 * @LastEditors: BreettySun
 * @LastEditTime: 2023-05-12 22:47:17
 * @FilePath: \Bretty-Blog-Express\express-backend\models\index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by BreettySun, All Rights Reserved. 
 */
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-blog-backend')
  .then(() => {
    console.log("连接成功")
  }).catch(() => {
    console.log("连接失败")
  })

const Schema = mongoose.Schema

/**
 * @description: 定义文章表结构
 * @return {*}
 */
const ArticlesSchema = new Schema(
  {
    title: String,
    content: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    tag: String,
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)
const Article = mongoose.model('Article', ArticlesSchema)

/**
 * @description: 定义用户表结构
 * @return {*}
 */
const UserShema = new Schema(
  {
    username: String,
    password: String,
    nickname: String,
    headimg: String,
  },
  {
    timestamps: true
  }
)
const User = mongoose.model('User', UserShema)

/**
 * @description: 定义评论表结构
 * @return {*}
 */
const CommentSchema = new Schema(
  {
    content: String,
    article_id: { type: Schema.Types.ObjectId, ref: 'Article' },
    reply_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true
  }
)
const Comment = mongoose.model('Comment', CommentSchema)

/**
 * @description: 创建文章-插入数据库
 * @return {*}
 */
// Article.create({
//   title: '测试文章1',
//   content: '测试文章内容1',
//   tag: '测试',
//   author: '645e38e673cd5e8439994990'
// }).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
/**
 * @description: 查询文章-查询数据库
 * @return {*}
 */
Article.find({})
  .sort({ _id: -1 })
  .skip(0)
  .limit(10)
  .select({ updatedAt: 0, createdAt: 0, __v: 0 })
  .populate('author', { username: 1, nickname: 1, headimg: 1 })
  .exec()
  .then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })

/**
 * @description: 创建用户-插入数据库
 * @return {*}
 */
// User.create({
//   username: 'admin',
//   password: '123456',
//   nickname: '管理员',
//   headimg: 'https://avatars.githubusercontent.com/u/76878170?v=4'
// }).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })

/**
 * @description: 创建评论-插入数据库
 * @return {*}
 */
// Comment.create({
//   content: '测试评论内容',
//   article_id: '645e3dfbd295250f778cc43c',
//   reply_user_id: '645e38e673cd5e8439994990'
// }).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })
/**
 * @description: 查询评论-查询数据库
 * @return {*}
 */
Comment.find({ article_id: '645e3dfbd295250f778cc43c' })
  .then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
