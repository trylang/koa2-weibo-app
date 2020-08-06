/*
 * @Author: Jane
 * @Date: 2020-08-06 19:12:17
 * @LastEditTime: 2020-08-06 20:41:10
 * @LastEditors: Please set LastEditors
 * @Description: user services
 * @FilePath: \koa2-weibo-app\src\services\user.js
 */

const { User } = require('../db/model/index');
const { formatUser } = require('./_format');

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
    Object.assign(whereOpt, password);
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  // 未找到
  console.log(result)
  debugger
  if (result === null) return result;

  // 格式化
  const formatRes = formatUser(result.dataValues)
  return formatRes;

}

module.exports = {
  getUserInfo
}