//引入userModel
const indexDal = require('../IMDAL/IndexDAL.js');


//首页获取用户信息
const getUserInfo = async (req, res) => {
    // 获取页面传递过来的参数

    let result = await indexDal.getUserInfo(req.authToken.username);
    // 响应
    res.send(result);
}

module.exports={
    getUserInfo
}