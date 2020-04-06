
$(function () {
    $('.alert-close').on('click', function (c) {
        $('.message').fadeOut('slow', function (c) {
            $('.message').remove();
        });
    });

    $("#btnLogin").click(function () {
        let username = $("#username").val();
        let password = $("#pwd").val();
        if (!username) {
            alert("请输入用户名");
            return;
        }

        if (!password) {
            alert("请输入密码");
            return;
        }
        $.ajax({
            type: "post",
            url: "/login",
            data: {
                username,
                password
            },
            success: function (res) {
                if (res.code == 0) {
                    var expiresDate = new Date();
                    //8*60是加8个小时时间 设置cookie2个小时后过期
                    expiresDate.setTime(expiresDate.getTime() + 60 * 10 * 60 * 1000);

                    $.cookie("im-token", res.token, {
                        expires: expiresDate
                    });

                    window.location.href = '/index.html';
                }
                else {
                    alert(res.msg);
                }
            }
        });
    });
});
