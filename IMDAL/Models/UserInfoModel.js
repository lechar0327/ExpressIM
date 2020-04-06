/**
 *  schema结构
 * 
 */

const db = require('../db.js');

//引入加密模块
const bcryptjs = require('bcryptjs');

const userInfoSchema = new db.Schema(
    {
        //用户名
        username: {
            type: String,
            required: true
        },

        //密码
        pwd: {
            type: String,
            required: true
        },
        //用户昵称
        nickname: {
            type: String
        },
        //头像
        photo: {
            type: String,
            default: "http://localhost:3000/images/avatar.png"
        }
    },
    {
        timestamps: true
    });

//钩子函数,保存时触发,注意,此处的回调函数不能用箭头函数,this指向问题
userInfoSchema.pre('save', function (next) {
    //bcryptjs密码加密
    this.pwd = bcryptjs.hashSync(this.pwd, 10);
    next();
});

//实例方法,类似于给schema实例添加原型方法,UserModel.proptype.comparePassword
userInfoSchema.methods.comparePassword = function (pwd) {
    //对比密码  
    return bcryptjs.compareSync(pwd, this.pwd);
}

//创建模型
const userModel = db.model("users", userInfoSchema);

//暴露模型
module.exports = userModel;