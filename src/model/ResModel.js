/*
 * @Author: Jane
 * @Date: 2020-08-06 19:41:08
 * @LastEditTime: 2020-08-06 21:43:36
 * @LastEditors: Please set LastEditors
 * @Description: res的数据模型
 * @FilePath: \koa2-weibo-app\src\model\ResModel.js
 */

 /**
  * 基础模型
  * @class BaseModel
  */
 class BaseModel {
    constructor({errno, data, message}) {
      this.errno = errno;
      if (data) {
        this.data = data;
      }
      if (message) {
        this.message = message;
      }
    }
 }

 /**
  * 成功的数据模型
  * @class SuccessModel
  * @extends {BaseModel}
  */
 class SuccessModel extends BaseModel {
   constructor(data = {}) {
     super({
       errno: 0,
       data: data
     })
   }
 }

 class ErrorModel extends BaseModel {
   constructor({errno, message}) {
     super({errno, message});
   }
 }

 module.exports = {
  SuccessModel,
  ErrorModel
 }