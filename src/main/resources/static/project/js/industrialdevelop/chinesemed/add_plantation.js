(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'urlUtil', 'objectUtil', 'distpicker'],
        function (jquery, ajaxUtil, stringUtil, uploadImg, urlUtil, objectUtil, distpicker) {

            var url = "/industrialdevelop/chi-med";

            var pathUrl = "/userLogin";

            var orgType = "plant";

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put" : "post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                var username = sessionStorage.getItem("username");
                var orgName = sessionStorage.getItem("orgName");
                var userdto = {
                    "username": username,
                    "orgName": orgName
                }
                ajaxUtil.myAjax(null, "/user/deletuser", userdto, function (data) {

                }, false, true);
                window.history.back()
            });

            function generateParam() {
                var param = {};
                param.name = $("#name").val();
                param.plantType = $("#plantType").val();
                param.areaCoverd = $("#areaCoverd").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val();
                param.addressCity = $("#addressCity").val();
                param.addressCountry = $("#addressCountry").val();
                param.address = $("#address").val();
                param.intruduce = $(".w-e-text").html();
                param.type = orgType;
                param.itemcode = itemcode;
                return param;
            }

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.status = "1";

                if (uploadImg.isUpdate()){
                    if (isUpdate()){
                        ajaxUtil.updateFile(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("username"));
                    }else {
                        ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("username"))
                    }

                }

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        window.location.href = pathUrl;
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);
                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#plantType").val(tempdata.plantType);
                    $("#areaCoverd").val(tempdata.areaCoverd);
                    $("#contacts").val(tempdata.contacts);
                    $("#distpicker").distpicker({
                        province: tempdata.addressPro,
                        city: tempdata.addressCity,
                        district: tempdata.addressCountry
                    });
                    $("#address").val(tempdata.address);
                    $("#phone").val(tempdata.phone);
                    editor.txt.html(tempdata.intruduce);
                    itemcode = tempdata.itemcode;
                    uploadImg.setImgSrc(tempdata.filePath)
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


