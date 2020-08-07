/*
 * @Author: Jane
 * @Date: 2020-08-07 20:48:56
 * @LastEditTime: 2020-08-07 21:18:35
 * @LastEditors: Please set LastEditors
 * @Description: 验证中间件
 * @FilePath: \koa2-weibo-app\src\middlewares\validator.js
 */
const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');

// 中间件，返回一个函数
function genValidator(validatorFn) {
  async function validator(ctx, next) {
    //  校验
    const data = ctx.request.body;
    const error = validatorFn(data);
    if (error) {
      // ! 写中间件一定要注意：返回错误要写成ctx.body = xxx; 切不能直接return，否则不生效。
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
      // return new ErrorModel(jsonSchemaFileInfo)
    } else {
      await next();
    }
  }
  // 返回一个函数
  return validator;
}

module.exports = {
  genValidator
};
