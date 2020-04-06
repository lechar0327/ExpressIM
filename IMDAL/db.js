const mongoose = require('mongoose');



/**
 * mongodb:  必须使用mongodb协议
 * 端口号:27017
 * IM数据库名称
 */
const dbContext = "mongodb://localhost:27017/IM";


//连接数据库
mongoose.connect(dbContext, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("数据库连接成功");
}).catch((error) => {
    console.log(error);
    
    console.log("数据库连接失败");
});

module.exports = mongoose;