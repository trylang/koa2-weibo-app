/*
 * @Author: Jane
 * @Date: 2020-08-06 19:00:16
 * @LastEditTime: 2020-08-07 20:33:11
 * @LastEditors: Please set LastEditors
 * @Description: user contaoller
 * @FilePath: \koa2-weibo-app\src\controller\user.js
 */

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { registerUserNameNotExistInfo, registerFailInfo } = require('../model/ErrorInfo');
const doCrypto = require('../utils/crypto');



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

/**
 * 注册
 * @param {*} {userName, password, gender}
 * @returns
 */
async function register({userName, password, gender}) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return ErrorModel(registerUserNameNotExistInfo);
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.log(ex, ex.message, ex.stack);
    return new ErrorModel(registerFailInfo)
  }

}


module.exports = {
  isExist,
  register
}
