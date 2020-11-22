(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'objectUtil', 'distpicker','fileUtil'],
        function ($, ajaxUtil, stringUtil, uploadImg, objectUtil, distpicker, fileUtil) {

            var url = "/industrialdevelop/schoolmsg";

            var opurl = "/industrialdevelop/school";

            var pathUrl = "/school/school_msg";

            var itemcode = null;

            var fileitemcode = stringUtil.getUUID();

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam() {
                var param = {};
                param.schoolName = $("#schoolName").val();
                param.schoolIntroduce = $("#schoolIntroduce").val();
                param.secondaryCollege = $("#secondaryCollege").val();
                param.enrollmentMajor = $("#enrollmentMajor").val();
                param.graduateEnrollmentMajor = $("#graduateEnrollmentMajor").val();
                param.phone = $("#phone").val();
                param.onlineAddress = $("#onlineAddress").val();
                param.addressPro = $("#addressPro").val()
                param.addressCity = $("#addressCity").val()
                param.addressCountry = $("#addressCountry").val()
                param.address = $("#address").val()
                param.schoolText = editor.txt.html();
                param.itemcode = itemcode;
                return param;
            }

            $("#saveBtn").unbind('click').on('click', function () {
                var param = generateParam();
                // param.status = "——";
                if (uploadImg.isUpdate()) {
                    ajaxUtil.fileAjax(fileitemcode, uploadImg.getFiles()[0], "undefined", "undefined")
                }
                ajaxUtil.myAjax(null, opurl, param, function (data) {
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
                // param.status = "——";
                if (uploadImg.isUpdate()) {
                    ajaxUtil.fileAjax(fileitemcode, uploadImg.getFiles()[0], "undefined", "undefined")
                }
                ajaxUtil.myAjax(null, opurl, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(pathUrl)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", "put");
                return false;
            });

            var init = function () {
                ajaxUtil.myAjax(null, url, null, function (data) {
                    if (ajaxUtil.success(data)) {
                        var tempdata = data.data;
                        $("#schoolName").val(tempdata.schoolName);
                        $("#schoolIntroduce").val(tempdata.schoolIntroduce);
                        $("#secondaryCollege").val(tempdata.secondaryCollege);
                        $("#enrollmentMajor").val(tempdata.enrollmentMajor);
                        $("#distpicker").distpicker({
                            province: tempdata.addressPro,
                            city: tempdata.addressCity,
                            district: tempdata.addressCountry
                        });
                        $("#address").val(tempdata.address);
                        $("#graduateEnrollmentMajor").val(tempdata.graduateEnrollmentMajor);
                        $("#phone").val(tempdata.phone);
                        $("#onlineAddress").val(tempdata.onlineAddress);
                        $("#intruduce").val(tempdata.intruduce);
                        $(".w-e-text").html(tempdata.schoolText);
                        itemcode = tempdata.itemcode
                    } else {
                        alertUtil.error(data.msg)
                    }
                }, null, "123", "get")
            };
            init();
        })
})();


