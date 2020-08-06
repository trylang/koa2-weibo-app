/*
 * @Author: Jane
 * @Date: 2020-08-06 19:00:16
 * @LastEditTime: 2020-08-06 20:40:51
 * @LastEditors: Please set LastEditors
 * @Description: user contaoller
 * @FilePath: \koa2-weibo-app\src\controller\user.js
 */

const { getUserInfo } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo');

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  // 统一返回格式
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}
