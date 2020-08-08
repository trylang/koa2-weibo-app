/*
 * @Author: Jane
 * @Date: 2020-08-08 16:45:36
 * @LastEditTime: 2020-08-08 16:55:31
 * @LastEditors: Please set LastEditors
 * @Description: 登录验证中间件
 * @FilePath: \koa2-weibo-app\src\middlewares\loginCheck.js
 */

const { ErrorModel } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/ErrorInfo');

/**
 * API 登录验证
 * @param {*} ctx
 * @param {*} next
 */
async function loginCheck(ctx, next) {
  if (ctx.session.userInfo) {
    await next();
    return;
  }
  return new ErrorModel(loginCheckFailInfo);
}

/**
 * 页面登录验证
 * @param {*} ctx
 * @param {*} next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session.userInfo) {
    await next();
    return;
  }
  // 未登录
  const curUrl = ctx.url;
  ctx.redirect(`/login?url=${encodeURIComponent(curUrl)}`)
}

module.exports = {
  loginCheck,
  loginRedirect
}