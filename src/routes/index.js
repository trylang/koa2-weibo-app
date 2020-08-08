/*
 * @Author: Jane
 * @Date: 2020-07-28 15:16:05
 * @LastEditTime: 2020-08-08 16:57:37
 * @FilePath: \koa2-weibo-app\src\routes\index.js
 */
const router = require('koa-router')()
const {loginRedirect} = require('../middlewares/loginCheck');

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    isEmpty: false,
    blogList: [{
      id: 1,
      title: 'aaa'
    }, {
      id: 2,
      title: 'bbb'
    }, {
      id: 3,
      title: 'ccc'
    }]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = {title: 'koa2 string'}
})

router.get('/json', loginRedirect, async (ctx, next) => {
  const session = ctx.session;
  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

module.exports = router
