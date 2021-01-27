(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'alertUtil', 'modalUtil', 'objectUtil'],
        function (jquery, ajaxUtil, stringUtil, uploadImg, alertUtil, modalUtil, objectUtil) {

            var roleName = sessionStorage.getItem("rolename");

            if (roleName === '文化宣传处长'||roleName === '文化宣传科员'||roleName === '文化宣传综合处处长') {
                $(".tTile").css("display","none");
                $("#xczy").css("display","block");
            }
            if (roleName === '政务资源处长'||roleName === '政务资源科员'||roleName === '政务资源综合处处长'){
                $(".tTile").css("display","none");
                $("#zwbg").css("display","block");
            }
            if (roleName === '主研人'||roleName === '科研项目申报单位'||roleName === '科研项目-省级'||
                roleName === '科研项目-市级'||roleName === '专家'||roleName === '产业发展-市级' || roleName === '产业发展-省级'){
                $(".tTile").css("display","none");
                $("#kyxm").css("display","block");
            }
            if (roleName === '中药材种植园' || roleName === '中药材加工企业'||roleName === '中药材制药企业'||
                roleName === '中药材销售企业'||roleName === '中医医疗机构'||roleName === '高等医学院校'||
                roleName === '科研院所'||roleName === '技术服务机构'||roleName === '旅游康养机构'){
                $(".tTile").css("display","none");
                $("#cyfz").css("display","block");
            }
            // 发送请求获取用户数据渲染到界面
            ajaxUtil.myAjax(null, "/user/usermsg", null, function (data) {
                if (data && data.code === 88888) {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    uploadImg.init();
                    uploadImg.setImgSrc(data.data.portrait);
                    $("#uname").val(data.data.username);
                    $("#name").val(data.data.name);
                    $("#gender").val(data.data.gender);
                    $("#email").val(data.data.email);
                    $("#idcardType").val('居民身份证');
                    $("#idcardNo").val(data.data.idcardNo);
                    $("#contacts").val(data.data.contacts);
                    $("#mobilephone").val(data.data.mobilephone);
                } else {
                    alertUtil.error(data.msg)
                }
            }, false, "", "get");

            $("#userName").text(sessionStorage.getItem('name'));

            $("#logout").on("click", function () {
                ajaxUtil.myAjax(null, "/logout", null, function (data) {
                    if (data && data.code === 88888) {
                        sessionStorage.clear();
                        localStorage.clear();
                        window.location.href = "/userLogin";
                    } else {
                        alertUtil.alert(data.msg);
                    }
                }, false)
            });

            // 取消按钮返回上一页面
            $("#cancelBtn").click(function () {
                window.history.back()
            });
            $("#return").click(function () {
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

            var a = 0;

            // 点击修改密码按钮向上向下滑动，信息输入框变得不可输入，修改密码输入框可输入
            $(document).ready(function () {
                $("#modifypwdBtn").click(function () {
                    if (a == 0){
                        $(".updataP").slideDown("slow");
                        if (typeof ($(".msg").attr("disabled")) == "undefined") {
                            $(".msg").attr("disabled", "disabled");
                        }
                        $(".pwd").removeAttr("disabled");
                        a = 1;
                    }else if (a == 1){
                        $(".updataP").slideUp("slow");
                        $(".pwd").attr("disabled", "disabled");
                        a = 0;
                    }
                });
            });

            $("#confirmBtn").unbind().on('click', function () {
                var portrait = uploadImg.getBase64();
                var usermsg = JSON.parse(localStorage.getItem('user'));
                var localportroit = usermsg.portrait;
                // 如果输入框没有disabled属性，则取输入框的值
                if (typeof ($(".msg").attr("disabled")) == "undefined") {

                    var username = $("#uname").val();
                    var name = $("#name").val();
                    var gender = $("#gender").val();
                    var email = $("#email").val();
                    var idcardType = $("#idcardType").val();
                    var idcardNo = $("#idcardNo").val();
                    var contacts = $("#contacts").val();
                    var mobilephone = $("#mobilephone").val();

                    if (usermsg.username == username && usermsg.name == name && usermsg.gender == gender &&
                        usermsg.email == email && usermsg.idcardType == idcardType && usermsg.idcardNo == idcardNo &&
                        usermsg.contacts == contacts && usermsg.mobilephone == mobilephone) {
                        alertUtil.info('没有需要修改的值')
                    } else {
                        if (!stringUtil.isBlank(username) && !stringUtil.isBlank(name) && !stringUtil.isBlank(gender) &&
                            !stringUtil.isBlank(email) && !stringUtil.isBlank(idcardType) && !stringUtil.isBlank(idcardNo) &&
                            !stringUtil.isBlank(contacts) && !stringUtil.isBlank(mobilephone)) {
                            if (portrait == localportroit) {    // 与原头像一样，则设置为空，传到后端不被更新
                                portrait = 'null'
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
                    }

                } else if (typeof ($(".pwd").attr("disabled")) == "undefined") {
                    var password = $("#oldPwd").val();
                    var mobilePhone = $("#phone").val();
                    var newPassword = $("#newPwd").val();
                    var checkNewPassword = $("#checkPwd").val();
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
                    // if (portrait != localportroit) {
                    //     var uportroit = {
                    //         "portrait": portrait
                    //     };
                    //     ajaxUtil.myAjax(null, "/user/updateuserimg", uportroit, function (data) {
                    //         if (data && data.code == 88888) {
                    //             alertUtil.success('修改头像成功');
                    //         } else {
                    //             alertUtil.error(data.msg)
                    //         }
                    //     }, false, true)
                    // }
                } else {
                    if (portrait != localportroit) {// 不与原头像相同才请求更新
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
                return false;
            });
        });
})();


