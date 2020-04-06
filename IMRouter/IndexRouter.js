const express = require('express');

//引入控制器
const IndexController = require('../IMController/IndexController.js');

const authToken = require("../middlewares/token");

//路由实例
const router = express.Router();

/**
 * @api {get} http://localhost:3000/index 
 * @apiDescription 获取用户信息
 * @apiName getUserInfo
 * @apiGroup Index
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccessExample {json} Success-Response:
 * {
 *  code: 0,
 *  msg: "获取用户信息成功"
 * }
 * @apiSampleRequest http://localhost:3000/index 
 * @apiVersion 1.0.0
 */

router.get('/index', authToken, IndexController.getUserInfo);


/**
 * @api {get} http://localhost:3000/chatRoom 
 * @apiDescription 进入聊天室获取信息
 * @apiName getUserInfo
 * @apiGroup chatRoom
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccessExample {json} Success-Response:
 * {
 *  code: 0,
 *  msg: "获取用户信息成功"
 * }
 * @apiSampleRequest http://localhost:3000/chatRoom 
 * @apiVersion 1.0.0
 */

router.get('/chatRoom', authToken, IndexController.getUserInfo);

//暴露路由实例
module.exports = router;