(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'objectUtil'],
        function (jquery, ajaxUtil, stringUtil, objectUtil) {

            var url = "/industrialdevelop/coorecord";

            var pathUrl = "/industrialdevelop/cooperation"

            const editor = objectUtil.wangEditorUtil();

            var type = isUpdate() ? "put" : "post";

            var itemcode = stringUtil.getUUID();


            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam() {
                var param = {};
                param.cooperationExchangeName = $("#cooperationExchangeName").val();
                param.cooperativeOrg = $("#cooperativeOrg").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.projectIntroduce = editor.txt.html();
                param.orgCode = sessionStorage.getItem("orgCode");
                param.itemcode = itemcode;
                return param;
            }

            $("#upload_file").change(function () {
                var file = $("#upload_file")[0].files[0];
                var file_span = $("#filename_span");
                file_span.text(file.name)
            });

            $("#saveBtn").unbind('click').on('click', function () {
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

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.status = "展示中";
                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(pathUrl)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);
                return false;
            })

            var init = function () {
                if (isUpdate()) {
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#cooperationExchangeName").val(tempdata.cooperationExchangeName);
                    $("#cooperativeOrg").val(tempdata.cooperativeOrg);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    editor.txt.html(tempdata.projectIntroduce);
                    itemcode = tempdata.itemcode
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


