const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { REDIS_CONF } = require('./conf/db')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置， 在注册路由之前将session注入
app.keys = ['UIssssd_754343'];
app.use(session({
  key: 'weibo.sid', // cookie name 默认是 koa.sid
  prefix: 'weibo:sess:', // redis key 的前缀，默认是 koa:sess:
  cookie: { 
    path: '/', // cookie 对于根目录内容有效
    httpOnly: true, // 客户端无法修改cookie
    maxAge: 24*60*60*1000 // cookie过期时间
  },
  ttl: 24*60*60*1000, // redis过期时间
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}` // redis 存储地址
  })
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
