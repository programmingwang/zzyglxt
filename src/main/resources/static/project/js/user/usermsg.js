(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'alertUtil', 'modalUtil', 'objectUtil'],
        function (jquery, ajaxUtil, stringUtil, uploadImg, alertUtil, modalUtil, objectUtil) {
            // 发送请求获取用户数据渲染到界面
            ajaxUtil.myAjax(null, "/user/usermsg", null, function (data) {
                if (data && data.code === 88888) {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    uploadImg.init();
                    uploadImg.setImgSrc(data.data.portrait);
                    $("#username").val(data.data.username);
                    $("#name").val(data.data.name);
                    $("#gender").val(data.data.gender);
                    $("#email").val(data.data.email);
                    $("#idcardType").val(data.data.idcardType);
                    $("#idcardNo").val(data.data.idcardNo);
                    $("#contacts").val(data.data.contacts);
                    $("#mobilephone").val(data.data.mobilephone);
                } else {
                    alertUtil.error(data.msg)
                }
            }, false, "", "get");

            // 取消按钮返回上一页面
            $("#cancelBtn").click(function () {
                window.history.back()
            });

            // 点击修改信息按钮向上滑动，信息输入框变得可输入，修改密码输入框不可输入
            $(document).ready(function () {
                $("#modifymsgBtn").click(function () {
                    $(".updataP").slideUp("slow");
                    $(".msg").removeAttr("disabled");
                    $(".pwd").attr("disabled", "disabled");
                });
            });

            // 点击修改密码按钮向上向下滑动，信息输入框变得不可输入，修改密码输入框可输入
            $(document).ready(function () {
                $("#modifypwdBtn").click(function () {
                    $(".updataP").slideToggle("slow");
                    $(".msg").attr("disabled", "disabled");
                    $(".pwd").removeAttr("disabled");
                });
            });

            $("#confirmBtn").unbind().on('click', function () {
                var portrait = uploadImg.getBase64();
                var localportroit = JSON.parse(localStorage.getItem('user')).portrait;
                // 如果输入框没有disabled属性，则取输入框的值
                if (typeof ($(".msg").attr("disabled")) == "undefined") {
                    if (portrait == localportroit) {    // 如果修改后的头像和原头像一样，设置一个标记
                        portrait = 1;
                    }
                    var username = $("#username").val();
                    var name = $("#name").val();
                    var gender = $("#gender").val();
                    var email = $("#email").val();
                    var idcardType = $("#idcardType").val();
                    var idcardNo = $("#idcardNo").val();
                    var contacts = $("#contacts").val();
                    var mobilephone = $("#mobilephone").val();
                    if (!stringUtil.isBlank(username) && !stringUtil.isBlank(name) && !stringUtil.isBlank(gender) &&
                        !stringUtil.isBlank(email) && !stringUtil.isBlank(idcardType) && !stringUtil.isBlank(idcardNo) &&
                        !stringUtil.isBlank(contacts) && !stringUtil.isBlank(mobilephone)) {
                        if (portrait == 1) {    // 已被标记则表示与原头像一样，则设置为空，传到后端不被更新
                            portrait = null
                        }
                        var user = {
                            "portrait": portrait,
                            "username": username,
                            "name": name,
                            "gender": gender,
                            "email": email,
                            "idcardType": idcardType,
                            "idcardNo": idcardNo,
                            "contacts": contacts,
                            "mobilephone": mobilephone
                        };
                        ajaxUtil.myAjax(null, "/user/updateusermsg", user, function (data) {
                            if (data && data.code == 88888) {
                                alertUtil.success('修改成功');
                                sessionStorage.setItem('username', user.username);//将修改后的用户名更新到sessionStorage中显示在欢迎您后面
                                $(".msg").attr("disabled", "disabled");
                            } else {
                                alertUtil.error(data.msg)
                            }
                        }, false, true)
                    } else {
                        alertUtil.info('输入不能为空')
                    }
                } else if (typeof ($(".pwd").attr("disabled")) == "undefined") {
                    var password = $("#oldPwd").val();
                    var mobilePhone = $("#phone").val();
                    var newPassword = $("#newPwd").val();
                    var checkNewPassword = $("#checkPwd").val();
                    console.log(newPassword);
                    if (!stringUtil.isBlank(password) && !stringUtil.isBlank(mobilePhone) &&
                        !stringUtil.isBlank(newPassword) && !stringUtil.isBlank(checkNewPassword)) {
                        var pwd = {
                            "password": password,
                            "mobilePhone": mobilePhone,
                            "newPassword": newPassword,
                            "checkNewPassword": checkNewPassword
                        };
                        ajaxUtil.myAjax(null, "/user/updatepwd", pwd, function (data) {
                            if (data && data.code == 88888) {
                                alertUtil.success('修改成功');
                                window.location.href = '/userLogin';//密码修改成功后重新登陆
                            } else {
                                alertUtil.error(data.msg)
                            }
                        }, false, "", "put")
                    } else {
                        alertUtil.info('输入不能为空')
                    }
                    // 修改密码时如果头像也改了也可以修改成功
                    if (portrait !== localportroit) {
                        var uportroit = {
                            "portrait": portrait
                        };
                        ajaxUtil.myAjax(null, "/user/updateuserimg", uportroit, function (data) {
                            if (data && data.code == 88888) {
                                alertUtil.success('修改头像成功');
                            } else {
                                alertUtil.error(data.msg)
                            }
                        }, false, true)
                    }
                } else {
                    if (portrait !== localportroit) {// 不与原头像相同才请求更新
                        var uportroit = {
                            "portrait": portrait
                        };
                        ajaxUtil.myAjax(null, "/user/updateuserimg", uportroit, function (data) {
                            if (data && data.code == 88888) {
                                alertUtil.success('修改头像成功');
                            } else {
                                alertUtil.error(data.msg)
                            }
                        }, false, true)
                    }
                }

            });
        });
})();


