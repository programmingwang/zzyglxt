(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'objectUtil','alertUtil'],
        function ($, ajaxUtil, stringUtil, uploadImg, objectUtil,alertUtil) {

            var url = "/industrialdevelop/tec-ser-org/selectbyorgcode";

            var pathUrl = "/serviceItems/tecserviceorg_msg";

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put" : "post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam() {
                var param = {};
                param.name = $("#name").val();
                param.projectName = $("#projectName").val();
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

            $("#saveBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.status = "——";
                if (uploadImg.isUpdate()) {
                    ajaxUtil.fileAjax(itemcode, uploadImg.getFiles()[0], "undefined", "undefined")
                }

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(pathUrl);
                    } else {
                        alert(data.msg);
                    }
                }, true, "123", type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.status = "——";
                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(pathUrl)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);
                return false;
            });

            var init = function () {
                var tempdata;
                ajaxUtil.myAjax(null, url, null,function (data) {
                    if(data && data.code === "88888") {
                        tempdata = data.data
                    }else{
                        alertUtil.error(data.msg)
                    }
                },false,"","get");
                $("#name").val(tempdata.name);
                $("#projectName").val(tempdata.projectName);
                $("#contacts").val(tempdata.contacts);
                $("#phone").val(tempdata.phone);
                $("#distpicker").distpicker({
                    province: tempdata.addressPro,
                    city: tempdata.addressCity,
                    district: tempdata.addressCountry
                });
                $("#address").val(tempdata.address);
                $(".w-e-text").html(tempdata.intruduce);
                itemcode = tempdata.itemcode;
                uploadImg.setImgSrc(tempdata.filePath)
            };
            init();

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();


