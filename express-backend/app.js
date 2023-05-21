const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const { expressjwt } = require('express-jwt')

const articlesRouter = require('./routes/articles')
const usersRouter = require('./routes/users')
const uploadRouter = require('./routes/upload')
const commentRouter = require('./routes/comments')

const app = express()

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/* 解析jwt */
app.use(
  expressjwt({
    secret: 'test123456',
    algorithms: ['HS256'],
  }).unless({
    path: [
      '/api/users',
      '/^\/api\/articles\/users\/\w+/',
      {
        url: /^\/api\/articles\/\w+/,
        methods: ['GET']
      }
    ],
  })
)

app.use('/api/articles', articlesRouter)
app.use('/api/users', usersRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/comments', commentRouter)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      code: 401,
      success: false,
      msg: 'Invalid Token',
      message: 'Unauthorized'
    })
  } else {
    next(err)
  }
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
