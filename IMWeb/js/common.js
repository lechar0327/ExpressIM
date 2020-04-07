$(function () {
    var token = $.cookie("im-token");
    console.log(token);
    
    if (token) {
        $.ajax({
            type: "get",
            url: "/index",
            async: false,
            headers: {
                Authorization: token
            },
            data: {},
            success: function (res) {

                if(res.code==0){
                    var strHeader = ` <nav class="navbar navbar-dark bg-info navbar-expand-lg">
                    <a class="navbar-brand" href="/">
                        <img src="/images/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" />
                        <Bootstrap></Bootstrap>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="/chatRoom.html">聊天室</a>
                            </li>
                        </ul>
        
                        <ul id="navbar-nav-right" class="navbar-nav  nav-link">
                            <li class='nav-loginName'>当前登录人:
                                <span id="loginName">
                                    ${res.data.username}
                                </span>
                            </li>
                        </ul>
                    </div>
                </nav>`;
    
                    $("#header").html(strHeader);
    
                    $("#named").html(res.data.username);
                }
                else{
                    window.location.href = '/login.html';
                }
            
            }
        });
    }
    else {
        window.location.href = '/login.html';
    }

});