(function() {
    require(['jquery','stringUtil','alertUtil','ajaxUtil'], function (jquery,stringUtil,alertUtil,ajaxUtil) {


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


            var userEntity = {"username":inputUsername,"password":inputPassword};
            ajaxUtil.myAjax(null,"/userLogin",userEntity,function (data) {
                if(data && data.errorCode === 88888) {
                    window.location.href = "/main"
                }else{
                    alertUtil.error(data.errorMsg)
                }
            },false)
            // $.ajax({
            //     /*登录*/
            //     url: "http://localhost:8989/userLogin",
            //     type: "post",
            //     dataType: 'form-data',
            //     contentType: 'form-data',
            //     data: inputUsername,inputPassword,
            //     success: function(data) {
            //         if(data && data.code === "88888") {
            //             window.location.href = "/main"
            //         }else{
            //             alertUtil.error("aaaaa")
            //         }
            //     },
            //     error: function() {
            //         window.location.href = "/userLogin"
            //     },
            // });
        })

        $("#return").unbind("click").bind("click",function () {
            window.location.href = "/"
        })


    })
})();
