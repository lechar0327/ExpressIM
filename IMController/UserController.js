//引入userModel
const userDal = require('../IMDAL/UserDAL.js');

//登录逻辑处理
const login = async (req, res) => {
    // 获取页面传递过来的参数
    const { username, password } = req.body;
    console.log(password);

    let result = await userDal.loginfn(username, password);
    // 响应
    res.send(result);
}

module.exports = {
    login
}