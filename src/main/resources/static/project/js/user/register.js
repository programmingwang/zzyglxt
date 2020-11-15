var codeStr = [];

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
}

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
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
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
}


// 输入框失去焦点后获取公司名称和机构代码，去数据库查询该机构的审核状态
$("#orgCode").on("blur", function () {
    let orgName = $("#orgName").val();
    let orgCode = $("#orgCode").val();
    console.log(orgName);
    console.log(orgCode);
    var userEntity = {"orgName": orgName, "orgCode": orgCode};
    myAjax(null, "/user/queryOrgStatus", userEntity, function (data) {
        console.log(data);
        if (data && data.code === 88888) {
            $("#status_text").text(data.data)
        } else {
            // error(data.msg)
            alert("查询失败")
        }
    }, false)
});

function validateLogin() {
    let orgName = $("#orgName").val();
    let orgType = $("#orgType option:selected").val();
    let orgCode = $("#orgCode").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let phone = $("#phone").val();

    let inputCode = $("#reg-code").val().toLowerCase();
    let canvasCode = codeStr.join("").toLowerCase();

    if (orgName == '') {
        alert('请输入机构名字！');
        return false;
    }
    if (orgType == '') {
        alert('请选择机构类型！');
        return false;
    }
    if (orgCode == '') {
        alert('请输入机构代码！');
        return false;
    }
    if (username == '') {
        alert('请输入用户名！');
        return false;
    }
    if (password == '') {
        alert('请输入密码！');
        return false;
    }
    if (phone == '') {
        alert('请输入手机号码！');
        return false;
    } else if (!(/^1[3456789]\d{9}$/.test(phone))) {
        alert("手机号码有误，请重填");
        return false;
    }


    if (inputCode == '') {
        alert('请输入验证码！');
        return false;
    } else if (inputCode == canvasCode) {
        alert('提交成功！');
        return true;
    } else {
        alert('验证码错误！请重新输入！');
        return false
    }
}

$("#btn_register").unbind("click").bind("click", function () {
    let orgName = $("#orgName").val();
    let orgType = $("#orgType option:selected").val();
    let orgCode = $("#orgCode").val();
    let username = $("#username").val();
    let password = $("#password").val();
    let phone = $("#phone").val();

    var userEntity = {
        "orgName": orgName,
        "orgIdentify": orgType,
        "orgCode": orgCode,
        "username": username,
        "password": password,
        "mobilePhone": phone
    };
    if (validateLogin()) {
        myAjax(null, "/user/register", userEntity, function (data) {
            if (data && data.code === 88888) {
                window.location.href = data.data
            } else {
                // error(data.msg)
                alert("注册失败")
            }
        }, false)
    }

})


var successCode = 88888;
var notLoggedInCode = 20001;


function success(data) {
    if (isEmptyObject(data)) {
        return false;
    }
    if (isBlank(data.code)) {
        return false;
    }
    if (successCode == data.code) {
        return true;
    } else {
        return false;
    }
}

//所要判段的字符串为空
function isBlank(str) {
    if (str != "" && str != null && str != "undefined") {
        return false;
    } else {
        return true;
    }
}

function notLoggedIn(data) {
    if (isEmptyObject(data)) {
        return false;
    }
    if (isBlank(data.code)) {
        return false;
    }
    if (notLoggedInCode == data.code) {
        return true;
    } else {
        return false;
    }
}

function myAjax(aButton, url, param, fun, async, isReqJson, type = "post") {
    var _setting =
        {
            url: url,
            async: (async == undefined) ? true : async,
            type: type,
            dataType: "json"
        }

    if (!strIsBlank(isReqJson)) {
        _setting.contentType = "application/json;charset=utf-8";
        _setting.data = JSON.stringify(param);
    } else {
        _setting.data = param;
    }

    _setting.beforeSend = function () {
        if (aButton != null) {
            aButton.attr({"disabled": "disabled"});
        }
    };
    _setting.success = function (data) {
        try {
            if (!isEmptyObject(data)) {
                if (notLoggedInCode == data.code) {
                    window.location.href = "/userLogin";
                }
            }
            fun(data);
        } catch (e) {

        } finally {
            if (aButton != null) {
                aButton.removeAttr("disabled");
            }
        }
    };
    // _setting.error = function (data) {
    //     if (data.responseJSON.msg) {
    //         error(data.responseJSON.msg);
    //     } else {
    //         error(data.responseJSON.message);
    //     }
    //
    //     console.log("请求失败URI：" + url);
    // };
    _setting.complete = function (XMLHttpRequest) {
        if (aButton != null) {
            aButton.removeAttr("disabled");
        }
    };

    $.ajax(_setting);
}

//所要判段的字符串为空
function strIsBlank(str) {
    if (str != "" && str != null && str != "undefined") {
        return false;
    } else {
        return true;
    }
}

//判断对象为空对象
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    ;
    return true
};

function error(str) {
    myNotify("错误信息：" + str, 'danger')
}

function myNotify(message, type) {
    $.notify({
        icon: 'glyphicon glyphicon-star',
        message: message
    }, {
        type: type,
        placement: {
            from: "top",
            align: "center"
        },
        offset: 50,
    });
}
