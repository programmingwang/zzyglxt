(function() {
    require(['jquery','stringUtil','alertUtil'], function (jquery,stringUtil,alertUtil) {


        $("#btn_Login").unbind("click").bind("click",function () {
            //获取表单中的值
            var inputUsername = $("#inputUsername").val();
            var inputPassword = $("#inputPassword").val();

            if(stringUtil.isBlank(inputUsername)){
                alertUtil.error("用户账户不能为空");
                return
            }
            if(stringUtil.isBlank(inputPassword)){
                alertUtil.error("用户密码不能为空");
                return
            }


            var userEntity = {"userAccountName":inputUsername,"userAccountPassword":inputPassword};
            $.ajax({
                /*登录*/
                url: "/api/user/userLogin",
                type: "post",
                dataType: 'json',
                data: userEntity,
                success: function(data) {
                    if(data && data.code === "000") {
                        window.location.href = "/"
                    }else{
                        alertUtil.error(data.msg)
                    }
                },
                error: function() {
                    window.location.href = "/"
                },
            });
        })

        $("#return").unbind("click").bind("click",function () {
            window.location.href = "/"
        })


    })
})();