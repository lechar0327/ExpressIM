const express = require('express');

//引入控制器
const userController = require('../IMController/UserController.js');

//路由实例
const router = express.Router();

/**
 * @api {post} http://localhost:3000/login 
 * @apiDescription 用户登录
 * @apiName submit-login
 * @apiGroup User
 * @apiParam (body) {String} username 用户名称
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccessExample {json} Success-Response:
 * {
 *  code: 0,
 *  msg: "登录成功"
 * }
 * @apiSampleRequest http://localhost:3000/login 
 * @apiVersion 1.0.0
 */

router.post('/login', userController.login);

//暴露路由实例
module.exports = router;