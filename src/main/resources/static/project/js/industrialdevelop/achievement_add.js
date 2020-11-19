(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'objectUtil'],
        function (jquery, ajaxUtil, stringUtil, objectUtil) {

            var type = isUpdate() ? "put" : "post";

            var itemcode = stringUtil.getUUID();

            const editor = objectUtil.wangEditorUtil();

            //后台数据交互地址
            var url = "/industrialdevelop/achievement";
            //页面请求地址
            var purl = url;



            $("#cancelBtn").unbind().on('click', function () {
                orange.redirect(purl);
            });

            function generateParam() {
                var param = {};
                param.itemcode = itemcode;
                param.industrialDevelopLeader = $("#industrialDevelopLeader").val();
                param.industrialDevelopName = $("#industrialDevelopName").val();
                param.projectName = $("#projectName").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.context = editor.txt.html();
                param.orgCode = sessionStorage.getItem("orgCode");
                return param;
            }

            //附件名显示
            $("#upload_file").change(function () {
                var file = $("#upload_file")[0].files[0];
                var file_span = $("#filename_span");
                file_span.text(file.name)
            });

            $("#saveBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.industrialDevelopStatus = "——";
                var file = $("#upload_file")[0].files[0];

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        if (file != null) {
                            ajaxUtil.fileAjax(itemcode, file, "admin", "aaaaaaa");
                        }
                        orange.redirect(url)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.industrialDevelopStatus = "展示中";
                var file = $("#upload_file")[0].files[0];
                if (file != null) {
                    ajaxUtil.updateFile(itemcode, file,"admin","aaaaa");
                }
                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(url)
                    }
                }, true, "123", type);
                return false;
            });


            var init = function () {
                if (isUpdate()) {
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#industrialDevelopLeader").val(tempdata.industrialDevelopLeader);
                    $("#industrialDevelopName").val(tempdata.industrialDevelopName);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $("#projectName").val(tempdata.projectName);
                    editor.txt.html(tempdata.context);
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


