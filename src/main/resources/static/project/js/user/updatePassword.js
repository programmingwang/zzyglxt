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

        $("#btn_Retrieve").unbind("click").bind("click",function (data) {
            let username = $("#userAccountName").val();
            let cardType = $("#cardType").val();
            let idNum = $("#idNum").val();
            let newPassword = $("#newPassword").val();
            let newVPassword = $("#newVPassword").val();
            if(checkUtil.isNullStr(username)){
                tcmscs.messageBox("请输入用户名");
                return false;
            }
            if(checkUtil.isNullStr(cardType)){
                tcmscs.messageBox("请选择证件类型");
                return false;
            }
            if(checkUtil.isNullStr(idNum)){
                tcmscs.messageBox("请输入证件号码");
                return false;
            }
            if(checkUtil.isNullStr(newPassword)){
                tcmscs.messageBox("请设置新的密码");
                return false;
            }
            if(checkUtil.isNullStr(newVPassword)){
                tcmscs.messageBox("请再次输入密码");
                return false;
            }
            if(newPassword != newVPassword){
                tcmscs.messageBox("两次输入密码不一致");
                return false;
            }
            let updatePasswordEntity = {"username":username,"cardType":cardType,"idNum":idNum,"password":tcmscs.encrypt(newPassword)}
            tcmscs.myAjax($("#btn_Retrieve"),"user/updatePassword",updatePasswordEntity,function (data) {
                if(data&&data.code == "000"){

                    if(!tcmscs.isBlank(data.data)){
                        tcmscs.infoBox(data.data);
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