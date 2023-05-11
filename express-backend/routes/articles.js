var express = require('express');
var router = express.Router();

/* 文章发布请求 */
router.post('/', function (req, res, next) {
  console.log(req.body);
  console.log(req.auth);
  res.json({
    code: 200,
    success: true,
    message: 'Article created successfully',
    data: req.body
  });
});

/* 文章列表请求 */
router.get('/users/:uid', function (req, res, next) {
  console.log(req.params);
  res.json({
    code: 200,
    success: true,
    message: 'Article list obtained successfully',
    data: req.params
  });
});

/* 文章详情请求 */
router.get('/:aid', function (req, res, next) {
  console.log(req.params);
  res.json({
    code: 200,
    success: true,
    message: 'Article details obtained successfully',
    data: req.params
  });
});

/* 文章编辑请求 */
router.patch('/:aid', function (req, res, next) {
  console.log(req.params);
  console.log(req.body);
  res.json({
    code: 200,
    success: true,
    message: 'Article edited successfully',
    data: req.params
  });
});

/* 文章删除请求 */
router.delete('/:aid', function (req, res, next) {
  console.log(req.params);
  res.json({
    code: 200,
    success: true,
    message: 'Article deleted successfully',
    data: req.params
  });
});

module.exports = router;
