/*
 * @Author: Jane
 * @Date: 2020-08-06 19:21:35
 * @LastEditTime: 2020-08-06 19:33:03
 * @LastEditors: Please set LastEditors
 * @Description: 数据格式化
 * @FilePath: \koa2-weibo-app\src\services\_format.js
 */

const { DEFAULT_PICTURE } = require('../conf/constant');

/**
 * 用户默认头像
 * @param {Object} obj 用户对象
 */
function _formatUserPicture(obj) {
  if (obj.picture === null) {
    obj.picture = DEFAULT_PICTURE;
  } 
  return obj;
}

/**
 * 格式化用户信息
 * @param {Array | Object} list 用户列表或单个用户对象
 */
function formatUser(list) {
  if (list === null) return list;
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }
  return _formatUserPicture(list);
}

module.exports = {
  formatUser
}
