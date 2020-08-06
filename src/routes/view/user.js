/*
 * @Author: your name
 * @Date: 2020-08-03 20:48:00
 * @LastEditTime: 2020-08-06 20:06:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \koa2-weibo-app\src\routes\view\user.js
 */
/**
 * @description user view 路由
 * @author 双越老师
 */

const router = require('koa-router')()
// const { loginRedirect } = require('../../middlewares/loginChecks')

/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

// router.get('/setting', loginRedirect, async (ctx, next) => {
//     await ctx.render('setting', ctx.session.userInfo)
// })

module.exports = router
