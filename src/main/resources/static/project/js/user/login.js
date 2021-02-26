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
                if(data && data.code === 88888) {
                    var userName = data.data.username;
                    var name = data.data.name;
                    var rolename = data.data.rolename;
                    var orgCode = data.data.orgCode;
                    var orgName = data.data.orgName;
                    var itemCode = data.data.itemcode;
                    var orgItemCode = data.data.orgItemCode;
                    var cityid = data.data.cityId;
                    sessionStorage.setItem('username',userName);
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('rolename',rolename);
                    sessionStorage.setItem('orgCode',orgCode);
                    sessionStorage.setItem('orgName',orgName);
                    sessionStorage.setItem('itemcode',itemCode);
                    sessionStorage.setItem('orgItemCode',orgItemCode);
                    sessionStorage.setItem('cityId',cityid);
                    if(rolename==='专家'){
                        window.location.href = "/main#/scientificProject/centralizedReview";
                    }else if (rolename === '科研项目-市级'){
                        window.location.href = "/main#/scientificProject/topicManagement";
                    }else if (rolename === '科研项目-省级'){
                        window.location.href = "/main#/industrialdevelop/chinesemed/timerecord";
                    }else if (rolename === '科研项目申报单位'){
                        window.location.href = "/main#/scientificProject/topicManagement";
                    }else if (rolename === '主研人'){
                        window.location.href = "/main#/scientificProject/topicManagement";
                    }else if(rolename === '文化宣传处长'||rolename === '文化宣传科员'||rolename === '文化宣传综合处处长'){
                        window.location.href = "/main#/chineseCultural/resource/traditionalCultural";
                    }else if (rolename === '政务资源处长'||rolename === '政务资源科员' || rolename === '政务资源市部门' || rolename === '政务资源县部门'){
                        window.location.href = "/main#/data/mainPage";
                    }else if (rolename === '政务资源综合处处长'){
                        window.location.href = "/main#/data/mainPage";
                    }else if (rolename === '政务资源分管局长'){
                        window.location.href = "/main#/data/mainPage";
                    }else if (rolename === '政务资源局长'){
                        window.location.href = "/main#/data/mainPage";
                    }else if(rolename==='中药材种植园'){
                        window.location.href = "/main#/industrialdevelop/medMat/medMat";
                    }else if (rolename === '中药材加工企业'){
                        window.location.href = "/main#/industrialdevelop/medMat/medMat";
                    }else if (rolename === '中药材制药企业'){
                        window.location.href = "/main#/industrialdevelop/chinesemed/saledrug";
                    }else if (rolename === '中药材销售企业'){
                        window.location.href = "/main#/industrialdevelop/chinesemed/saledrug";
                    }else if (rolename === '中医医疗机构'){
                        window.location.href = "/main#/industrialdevelop/achievement";
                    }else if(rolename==='高等医学院校'){
                        window.location.href = "/main#/industrialdevelop/achievement";
                    }else if (rolename === '科研院所'){
                        window.location.href = "/main#/industrialdevelop/achievement";
                    }else if (rolename === '技术服务机构'){
                        window.location.href = "/main#/serviceItems/tecserviceorg";
                    }else if (rolename === '旅游康养机构'){
                        window.location.href = "/main#/industrialdevelop/organization/tour";
                    }else if (rolename === '产业发展-市级' || rolename === '产业发展-省级'){
                        window.location.href = "/main#/industrialdevelop/audit";
                    }else{
                        window.location.href = "/main"
                    }
                }else{
                    alertUtil.error(data.msg)
                }
            },false)
        })

        $("#btn_Register").unbind("click").bind("click",function () {
            window.location.href = "/register"
        })

        //回车事件绑定，密码框输完密码按回车课实现登录
        $('#inputPassword').bind('keyup', function(event) {
            if (event.keyCode === 13) {
                //回车执行登录
                $('#btn_Login').click();
            }
        });
    })
})();
