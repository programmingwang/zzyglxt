(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'objectUtil', 'distpicker'],
        function ($, ajaxUtil, stringUtil, uploadImg, objectUtil, distpicker) {

            var url = "/industrialdevelop/tec-ser-org/selectbyorgcode";

            var pathUrl = "/serviceItems/tecserviceorg_msg";

            var itemcode = stringUtil.getUUID();

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
                param.orgCode = sessionStorage.getItem("orgCode");
                param.itemcode = itemcode;
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
                }, true, "123", "put");
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
                }, true, "123", "put");
                return false;
            });

            var init = function () {
                ajaxUtil.myAjax(null,url,null,function (data) {
                    if(data && data.code == 88888) {
                        var tempdata = data.data;
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
                    }else{
                        alertUtil.error(data.msg)
                    }
                },null,"123","get")
            };
            init();

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
