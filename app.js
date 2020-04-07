//引入expresss
const express = require('express');
//创建express实例
const app = express();

//引入socketIo模块
const socketIo = require('socket.io');

//引入express-async-errors
require('express-async-errors');

//配置环境变量
const dotenv = require('dotenv')
// dotenv 配置
dotenv.config()

//引入用户信息路由模块
const userRouters = require("./IMRouter/UserRouter");
//引入首页路由模块
const IndexRouters = require("./IMRouter/IndexRouter");

//处理静态资源中间件
app.use(express.static('./IMWeb'));

//处理req.body接收参数
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// 统一错误处理 处理异步产生的错误
app.use((err, req, res, next) => {
    // 可以将错误信息写入到某个文件中，方便后续去查看文件
    // fs 模块  fs.writeFile
    //     不能使用 fs.writeFile 要用 fs.appendFile
    console.error(err);
    res.status(500).send(err.message);
});

//调用路由
app.use('/', userRouters);
app.use(IndexRouters);

//监听端口,启动服务
const server = app.listen(3000, function () {
    console.log('服务启动成功');
});

//通过socket.io监听服务端口,与之关联
const io = socketIo.listen(server);

// 建立io的connect事件,处理客户端连接
io.on('connect', socket => {
    //提供一个事件,setName,供客户端设置名字

    //客户端连接之后,第一件事就是获取当前的名字,并设置
    socket.on('setName', username => {
        socket.username = username;

        //广播消息,告知其他客户端,谁进来了
        socket.broadcast.emit('message', {
            username: "system",
            message: `${socket.username}上线了！`
        });
    });

    //监听message事件,由客户端触发
    socket.on('message', data => {
        //转给当前的客户端
        socket.emit('message', {
            username: socket.username,
            message: data.message
        });

        //广播给其他客户端
        socket.broadcast.emit('message', {
            username: socket.username,
            message: data.message
        });
    });
});