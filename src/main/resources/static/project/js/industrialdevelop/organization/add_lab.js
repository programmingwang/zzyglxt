(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','urlUtil','objectUtil','distpicker'],
        function ($,ajaxUtil,stringUtil,uploadImg,urlUtil, objectUtil,distpicker) {

            var url = "/industrialdevelop/tec-ser-org";

            var pathUrl = "/userLogin";

            var itemcode = stringUtil.getUUID();

            var orgType = "lab";

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                var username = sessionStorage.getItem("username");
                var orgName = sessionStorage.getItem("orgName");
                var orgCode = sessionStorage.getItem("orgCode");
                var userdto = {
                    "username": username,
                    "orgName": orgName,
                    "orgCode": orgCode
                }
                ajaxUtil.myAjax(null,"/user/deletuser",userdto,function (data) {

                },false,true);
                window.history.back()
            });

            function generateParam(){
                var param = {};
                param.name = $("#name").val();
                param.projectCost = $("#projectCost").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val();
                param.addressCity = $("#addressCity").val();
                param.addressCountry = $("#addressCountry").val();
                param.address = $("#address").val()
                param.intruduce = $(".w-e-text").html();
                param.orgCode = sessionStorage.getItem("orgCode");
                param.onlineAddress = $("#onlineAddress").val()
                param.itemcode = itemcode;
                param.type = orgType;
                return param;
            }

            $("#submitBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "1";
                param.type = "lab";
                if (uploadImg.isUpdate()){
                    if (isUpdate()){
                        ajaxUtil.updateFile(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("username"));
                    }else {
                        ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("username"))
                    }

                }
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        window.location.href = pathUrl;
                        // orange.redirect(pathUrl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#projectCost").val(tempdata.projectCost);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $("#distpicker").distpicker({
                        province: tempdata.addressPro,
                        city: tempdata.addressCity,
                        district: tempdata.addressCountry
                    });
                    $("#address").val(tempdata.address);
                    editor.txt.html(tempdata.intruduce);
                    uploadImg.setImgSrc(tempdata.filePath)
                    itemcode = tempdata.itemcode;
                }else {
                    $("#name").val(sessionStorage.getItem('orgName'));
                    $("#phone").val(sessionStorage.getItem('phone'));
                    $("#distpicker").distpicker();
                }
                init = function () {

                }
            };
            init();


            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1)
            }

        })
})();


