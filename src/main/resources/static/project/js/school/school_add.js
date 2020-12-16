(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','objectUtil'],
        function ($,ajaxUtil,stringUtil,uploadImg, objectUtil) {

            var url = "/industrialdevelop/ser-pro";

            var pathUrl = "/serviceItems/tecserviceorg";

            var itemcode = stringUtil.getUUID();

            var orgType = "tec";

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

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
                param.itemcode = itemcode;
                return param;
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = 0;
                if (uploadImg.isUpdate()){
                    ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                }

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl);
                    }else {
                        alert(data.msg);
                    }
                },true,"123",type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = 1;
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#serviceProject").val(tempdata.serviceProject);
                    $("#projectCost").val(tempdata.projectCost);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    editor.txt.html(tempdata.projectIntroduce);
                    itemcode = tempdata.itemcode;
                    // uploadImg.setImgSrc(tempdata.filePath)
                }else {
                    $("#distpicker").distpicker();
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


