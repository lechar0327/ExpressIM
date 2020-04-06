const indexDal = require('./Models/UserInfoModel');


/**
 * 首页获取用户完整信息
 * @param {string} authToken  
 */
const getUserInfo = async (username) => {
    let responseDto = { code: 0, msg: "查询成功", data: null };

    let userInfo = await indexDal.findOne(
        {
            username
        },
        //排除掉密码,不查询
        {
            pwd: 0
        });

    if (!userInfo) {
        responseDto.code = 203;
        responseDto.msg = "没有记录";
    }
    else {
        responseDto.data = userInfo;
    }
    return responseDto;
}

module.exports = {
    getUserInfo
}