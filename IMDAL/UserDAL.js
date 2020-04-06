const userModel = require('./Models/UserInfoModel.js');
const jsonwebtoken = require('jsonwebtoken');

/**
 * 登录方法  
 * @param {string} username 
 * @param {string} pwd 
 * 
 * 如果有注册就登录,未注册就给注册
 */
const loginfn = async (username, pwd) => {
    //存储返回对象数据
    let responseDTO = { code: 0, msg: "" };

    //查询当前用户对象
    let userInfo = await userModel.findOne({
        username
    });

    //不存在,就注册
    if (!userInfo) {
        await userModel.create({
            username,
            pwd
        });

        responseDTO.msg = "注册成功";
    }
    else {
        //
        if (userInfo.comparePassword(pwd)) {
            /**
             * 生成token
             */
            const token = jsonwebtoken.sign(
                {
                    // 思考将那些信息写入到token中，一般是用户角色信息、用户Id信息、用户的一些不敏感的信息
                    // 不要写入太多的数据进去。

                    userId: userInfo._id,
                    username: userInfo.nickname || userInfo.username
                },
                "IM",
                {
                    expiresIn: "2h"
                }
            );

            responseDTO.msg = "登录成功";
            responseDTO.token = token;
        } else {
            responseDTO = {
                code: 203,
                msg: "用户名或密码不正确"
            }
        }
    }
    console.log(responseDTO);


    return responseDTO;
}



//暴露登录方法
module.exports = { loginfn };