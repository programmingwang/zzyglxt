(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','objectUtil'],
        function ($,ajaxUtil,stringUtil,uploadImg, objectUtil) {

            var url = "/industrialdevelop/tec-ser-org/selectbyorgcode";

            var pathUrl = "/industrialdevelop/organization/lab";

            var itemcode = stringUtil.getUUID();

            var orgType = "lab";

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
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
                param.orgCode = "未定义";
                param.itemcode = itemcode;
                param.type = orgType;
                return param;
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "——";
                param.type = "lab";
                if (uploadImg.isUpdate()){
                    ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],"undefined","undefined")
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
                param.status = "——";
                param.type = "lab";
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
                    var tempdata;
                    ajaxUtil.myAjax(null, url, null,function (data) {
                        if(data && data.code == ajaxUtil.successCode) {
                            tempdata = data.data
                        }else{
                            alertUtil.error(data.msg)
                        }
                    },false,"","get");
                    console.log(tempdata);
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


