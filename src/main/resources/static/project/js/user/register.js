(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'selectUtil', 'stringUtil', 'dictUtil'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, selectUtil, stringUtil, dictUtil) {

            const codeStr = [];

            /**生成一个随机数**/
            function randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            }

            /**生成一个随机色**/
            function randomColor(min, max) {
                var r = randomNum(min, max);
                var g = randomNum(min, max);
                var b = randomNum(min, max);
                return "rgb(" + r + "," + g + "," + b + ")";
            }

            drawPic(codeStr);
            document.getElementById("canvas").onclick = function (e) {
                e.preventDefault();
                drawPic(codeStr);
            };

            const sel = dictUtil.getDictByCode(dictUtil.DICT_LIST.orgType);
            $("#orgType").selectUtil(sel);

            /**绘制验证码图片**/
            function drawPic(codeStr) {
                var canvas = document.getElementById("canvas");
                var width = canvas.width;
                var height = canvas.height;
                var ctx = canvas.getContext('2d');
                ctx.textBaseline = 'bottom';

                /**绘制背景色**/
                ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
                ctx.fillRect(0, 0, width, height);
                /**绘制文字**/
                var str = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                for (var i = 0; i < 4; i++) {
                    var txt = str[randomNum(0, str.length)];
                    codeStr[i] = txt;
                    ctx.fillStyle = randomColor(50, 160);  //随机生成字体颜色
                    ctx.font = randomNum(16, 25) + 'px SimHei'; //随机生成字体大小
                    var x = 10 + i * 25;
                    var y = randomNum(25, 30);
                    var deg = randomNum(-45, 45);
                    //修改坐标原点和旋转角度
                    ctx.translate(x, y);
                    ctx.rotate(deg * Math.PI / 180);
                    ctx.fillText(txt, 0, 0);
                    //恢复坐标原点和旋转角度
                    ctx.rotate(-deg * Math.PI / 180);
                    ctx.translate(-x, -y);
                }
                //绘制干扰线
                for (var i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.strokeStyle = randomColor(50, 160);
                    ctx.moveTo(randomNum(0,30),randomNum(0,40));
                    ctx.lineTo(randomNum(90,110),randomNum(0,40));
                    ctx.stroke();
                }

            };

            $("#checkpassword").on("blur", function () {
                let password = $("#password").val();
                let checkpwd = $("#checkpassword").val();
                if (checkpwd != password){
                    alertUtil.info("两次输入的密码不一致")
                }
            });

            // 机构审核状态
            $("#orgCode").on("blur", function () {
                let i = 0;
                let orgName = $("#orgName").val();
                // let orgType = $("#orgType option:selected").val();
                let orgType = dictUtil.getName(dictUtil.DICT_LIST.orgType, $("#orgType").val());
                let orgCode = $("#orgCode").val();
                var userEntity = {"orgName": orgName, "orgIdentify": orgType, "orgCode": orgCode};
                if (!stringUtil.isBlank(orgCode) && !stringUtil.isBlank(orgName)){
                    $.ajax({
                        url:"/user/queryOrgStatus",
                        type:'POST',
                        async: false,
                        data:userEntity,
                        dataType: "json",
                        success:function(data){
                            if (data && data.code === 88888) {
                                const div = document.getElementById('showStatusdiv');
                                let tag;
                                let index;
                                if (i == 0) {
                                    tag = "<p id='showStatus'></p> ";
                                    div.insertAdjacentHTML("beforeEnd", tag);
                                    i++;
                                }

                                var str = data.data;
                                if (isContains(str, '修改信息')) {
                                    index = data.data.indexOf('修改信息');
                                    const modify = data.data.slice(index);
                                    data.data = data.data.slice(0, index);
                                    if (i == 1) {
                                        var p = document.getElementById('showStatus');
                                        tag = "<a id='modify'></a> ";
                                        div.insertAdjacentHTML("beforeEnd", tag);
                                        i++;
                                    }
                                    // 这个得发请求到后端去查询数据库拿到数据后修改进行更新
                                    let m = document.getElementById('modify');
                                    if (isContains('中药材种植园', orgType)) {
                                        // document.getElementById('modify').href = 'http://localhost:8989/plantation_add';
                                        // 这样子会报Uncaught TypeError: Cannot set property 'href' of null
                                        // 原因 “document.getElementById(“modify”)”这里，代码没有获取到Id为“modify”的元素，那么就是null，null是没有办法set属性的
                                        m.href = 'http://localhost:8989/plantation_add';
                                    } else if (isContains('中药材加工企业', orgType)) {
                                        m.href = 'http://localhost:8989/process_add';
                                    } else if (isContains('中药材制药企业', orgType)) {
                                        m.href = 'http://localhost:8989/produce_add';
                                    } else if (isContains('科研院所', orgType)) {
                                        m.href = 'http://localhost:8989/lab_add';
                                    } else if (isContains('技术服务机构', orgType)) {
                                        m.href = 'http://localhost:8989/tecservice_add';
                                    } else if (isContains('旅游康养机构', orgType)) {
                                        m.href = 'http://localhost:8989/tour_add';
                                    } else {
                                        m.href = '#';
                                    }
                                    $("#modify").text(modify)
                                }
                                if(!isContains(str, '修改信息') && document.getElementById("modify")){
                                    $("#modify").remove();
                                }

                                if (isContains(str, '登录')) {
                                    index = data.data.indexOf('登录');
                                    const login = data.data.slice(index);
                                    data.data = data.data.slice(0, index);
                                    if (i == 1) {
                                        var p = document.getElementById('showStatus');
                                        tag = "<a id='login'></a> ";
                                        div.insertAdjacentHTML("beforeEnd", tag);
                                        i++;
                                    }

                                    let l = document.getElementById('login');
                                    l.href = 'http://localhost:8989/userLogin';
                                    $("#login").text(login)
                                }
                                if(!isContains(str, '登录') && document.getElementById("login")){
                                    $("#login").remove();
                                }

                                $("#showStatus").text(data.data);

                                $.each($('p'),function(){// 去除空白的p标签
                                    if(!$(this).text()){
                                        $(this).remove();
                                    }
                                });
                            } else {
                                alertUtil.error("查询审核状态失败")
                            }
                        },
                        error: function(data){
                            alertUtil.error(data.msg)
                        }
                    });
                } else {
                    alertUtil.info("请输入企业名称或统一社会信用代码！")
                }

            });

            function validateLogin() {
                let orgName = $("#orgName").val();
                let orgType = $("#orgType option:selected").val();
                let orgCode = $("#orgCode").val();
                let username = $("#username").val();
                let password = $("#password").val();
                let checkpwd = $("#checkpassword").val();
                let phone = $("#phone").val();
                let inputCode = $("#reg-code").val().toLowerCase();
                let canvasCode = codeStr.join("").toLowerCase();

                if (orgName == '') {
                    alertUtil.error('请输入机构名字！');
                    return false;
                }
                if (orgType == '') {
                    alertUtil.error('请选择机构类型！');
                    return false;
                }
                if (orgCode == '') {
                    alertUtil.error('请输入机构代码！');
                    return false;
                }
                if (username == '') {
                    alertUtil.error('请输入用户名！');
                    return false;
                }
                if (password == '') {
                    alertUtil.error('请输入密码！');
                    return false;
                }
                if (checkpwd == '') {
                    alertUtil.error('请确认密码！');
                    return false;
                }
                if (phone == '') {
                    alertUtil.error('请输入电话号码或手机号码！');
                    return false;
                }
                if (password != checkpwd){
                    alertUtil.info("两次输入的密码不一致");
                    return false
                }
                if (inputCode == '') {
                    alertUtil.error('请输入验证码！');
                    return false;
                } else if (inputCode == canvasCode) {
                    return true;
                } else {
                    alertUtil.error('验证码错误！请重新输入！');
                    return false
                }
            };

            $("#btn_register").unbind("click").bind("click", function () {
                let orgName = $("#orgName").val();
                let orgType = dictUtil.getName(dictUtil.DICT_LIST.orgType,$("#orgType").val());
                let orgCode = $("#orgCode").val();
                let username = $("#username").val();
                let password = $("#password").val();
                let phone = $("#phone").val();

                sessionStorage.setItem('username',username);
                sessionStorage.setItem('orgCode',orgCode);
                sessionStorage.setItem('orgName',orgName);
                sessionStorage.setItem('phone',phone);

                var userEntity = {
                    "orgName": orgName,
                    "orgIdentify": orgType,
                    "orgCode": orgCode,
                    "username": username,
                    "password": password,
                    "mobilePhone": phone
                };
                if (validateLogin()) {
                    ajaxUtil.myAjax(null, "/user/register", userEntity, function (data) {
                        if (data && data.code === 88888) {
                            window.location.href = data.data
                        } else {
                            alertUtil.error(data.msg);
                        }
                    }, false)
                }
            });

            // 判断str中是否含有substr
            function isContains(str, substr) {
                return new RegExp(substr).test(str);
            }
        })
})();
