let express = require('express');
let router = express.Router();

let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public/images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

let upload = multer({
  storage: storage
}).single('image');


/* 上传图片请求 */
router.post('/', upload, function (req, res, next) {
  let file = req.file;
  console.log(file);
  let url = 'http://' + req.headers.host + '/images/' + file.filename;
  res.json({
    code: 200,
    success: true,
    message: url,
  });
});

module.exports = router;