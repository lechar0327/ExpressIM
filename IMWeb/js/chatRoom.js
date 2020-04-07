$(function () {
    //连接socketio
    // const socket = io("http://localhost:3000");
    const socket = io();
    var token = $.cookie("im-token");
    if (token) {
        $.ajax({
            type: "get",
            url: "/chatRoom",
            async: false,
            headers: {
                Authorization: token
            },
            data: {},
            success: function (res) {
                if (res.code == 0) {
                    $(".btnsendmessage").click(function () {
                        var content = $("#txtContent").val();

                        if (content.length == 0) {
                            return;
                        }

                        socket.emit("message", {
                            message: content
                        });

                        addMessage("right", content);

                        $("#txtContent").val('');
                    });

                    socketIO(res.data.username)
                }
                else {
                    window.location.href = '/login.html';
                }

            }
        });
    }

    //处理聊天室通信
    function socketIO(username) {

        //触发setName事件,不能写死名字,需要获取当前登录的名字
        socket.emit('setName', username);

        //监听服务端触发的事件
        socket.on('message', (data) => {
            if (data.username == username) {
                addMessage("right", content);
            }
            else {
                addMessage("left", data.message);
            }
        });


    }

    //构建发消息的结构
    function addMessage(type, content) {
        var chatBox = document.querySelector('.chat-box');
        var chatitem = document.createElement("div");
        chatitem.setAttribute("class", "chat-item ");

        chatitem.setAttribute("class", chatitem.className + type);
        chatBox.appendChild(chatitem);

        var imgheader = document.createElement("img");

        imgheader.setAttribute("class", "header-img");
        imgheader.setAttribute("src", "images/boss_17.jpg");
        chatitem.appendChild(imgheader);

        var chatmessageBox = document.createElement("div");
        chatmessageBox.setAttribute("class", "chatmessage-box");
        chatitem.appendChild(chatmessageBox);

        var chatmessageSpan = document.createElement("span");
        chatmessageSpan.setAttribute("class", "chat-message");
        chatmessageBox.appendChild(chatmessageSpan);

        var chatmessageEm = document.createElement("em");
        chatmessageBox.appendChild(chatmessageEm);

        chatmessageSpan.innerText = content;

        chatBox.scrollTop = chatBox.scrollHeight;
    }
});