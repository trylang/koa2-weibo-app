/*
 * @Author: Jane
 * @Date: 2020-08-06 19:12:17
 * @LastEditTime: 2020-08-08 15:55:37
 * @LastEditors: Please set LastEditors
 * @Description: user services
 * @FilePath: \koa2-weibo-app\src\services\user.js
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');
const user = require('../controller/user');

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, {password});
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  // 未找到
  if (result === null) return result;
  // 格式化
  const formatRes = formatUser(result.dataValues)
  return formatRes;
}

/**
 * 创建用户
 * @param {*} {userName, password, gender = 3, nickName}
 * @returns
 */
async function createUser({userName, password, gender = 3, nickName}) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName || userName,
    gender
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  createUser
}