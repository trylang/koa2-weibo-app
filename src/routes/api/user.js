/*
 * @Author: your name
 * @Date: 2020-08-03 21:07:37
 * @LastEditTime: 2020-08-07 20:32:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \koa2-weibo-app\src\routes\api\user.js
 */
const router = require('koa-router')();
const { isExist, register } = require('../../controller/user');
const { registerFailInfo } = require('../../model/ErrorInfo');


router.prefix('/api/user')

// 注册路由
router.post('/register', async(ctx, next) => {
  const { userName, password, gendor} = ctx.request.body;
  ctx.body = await register({userName, password, gendor});
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
})

module.exports = router