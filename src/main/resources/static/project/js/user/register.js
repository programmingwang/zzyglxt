(function() {
    require(['jquery', 'dict', 'select2','tcmscs','checkUtil'], function (jquery, dict,select2,tcmscs,checkUtil) {
        let aHH = window.screen.availHeight - 45 - 200;
        $("#tmc_content").css("height",aHH)
        $("#tmc_content").css("display","flex");
        $("#cardType").select2({
            placeholder: "请选择证件类型",
            width: '158px',
            allowClear: true,
            data:dict.getDictList("c436863f-31f1-4620-be8b-d9033f7f3627"),
            minimumResultsForSearch: Infinity,
        }).val('').trigger("change");


        //点击注册
        $("#btn_reg").unbind("click").bind("click",function () {
            //获取表单中的值
            let username = $("#userAccountName").val();
            let name = $("#userRealName").val();
            let cardType = $("#cardType").val();
            let idNum = $("#idNum").val();
            let password = $("#userPassword").val();
            let userVPassword = $("#userVPassword").val();

            if(!checkUtil.vailUsername(username)){
                tcmscs.messageBox("用户名为6-12英文、数字的组合")
                return false;
            }
            if(checkUtil.isNullStr(name)){
                tcmscs.messageBox("姓名不能为空")
                return false;
            }
            if(checkUtil.isNullStr(cardType)){
                tcmscs.messageBox("证件类型不能为空")
                return false;
            }
            if(cardType == 2){
                if(!checkUtil.isCardNo){
                    tcmscs.messageBox("请输入正确的证件类型")
                    return false;
                }
            }
            if(checkUtil.isNullStr(password)){
                tcmscs.messageBox("请输入密码")
                return false;
            }
            if(checkUtil.isNullStr(userVPassword)){
                tcmscs.messageBox("请再次输入密码")
                return false;
            }

            if(password != userVPassword){
                tcmscs.messageBox("两次密码不相同")
                return false;
            }


            let userEntity = {"username":username,"name":name,"cardType":cardType,"idNum":idNum,"password":tcmscs.encrypt(password)}
            tcmscs.myAjax($("#btn_reg"),"/user/register",userEntity,function (data) {
                if(data&&data.code == "000"){
                    if(!tcmscs.isBlank(data.data)){
                        tcmscs.infoBox(data.data)
                        window.location.href = "/"
                    }
                }else {
                    tcmscs.messageBox(data.msg);
                }
            })
        })
        
        $("#return").unbind("click").bind("click",function () {
            window.location.href = "/"
        })

    })
})();