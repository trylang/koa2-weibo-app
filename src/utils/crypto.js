/*
 * @Author: your name
 * @Date: 2020-08-07 20:25:05
 * @LastEditTime: 2020-08-07 20:29:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \koa2-weibo-app\src\utils\crypto.js
 */
/**
 * @description 加密方法
 * @author 双越老师
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
    const md5 = crypto.createHash('md5')
    // hex:指的是返回16进制格式
    return md5.update(content).digest('hex')
}

/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = doCrypto
