(function () {
    require(['jquery','ajaxUtil','stringUtil','objectUtil'],
        function (jquery,ajaxUtil,stringUtil, objectUtil) {

            var url = "/industrialdevelop/ser-pro";

            var pathUrl = "/industrialdevelop/tecservice"

            var type = isUpdate() ? "put":"post";


            var itemcode = stringUtil.getUUID();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam(){
                var param = {};
                param.serviceProject = $("#serviceProject").val();
                param.projectCost = $("#projectCost").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.projectIntroduce = $(".w-e-text").html();
                param.orgCode = "未定义";
                param.itemcode = itemcode;
                return param;
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "——";

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "——";
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            })

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#serviceProject").val(tempdata.serviceProject);
                    $("#projectCost").val(tempdata.projectCost);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $(".w-e-text").html(tempdata.projectIntroduce);
                    itemcode = tempdata.itemcode;
                }
                init = function () {

                }
            };
            init();


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
    })
})();


