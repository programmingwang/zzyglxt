(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'objectUtil', 'dictUtil', 'alertUtil'],
        function (jquery, ajaxUtil, stringUtil, objectUtil, dictUtil, alertUtil) {

            var type = isUpdate() ? "put" : "post";

            var itemcode = stringUtil.getUUID();

            const editor = objectUtil.wangEditorUtil();

            var showStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus)

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
                param.industrialDevelopStatus = showStatus[0].id;
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
                param.industrialDevelopStatus = showStatus[1].id;
                var file = $("#upload_file")[0].files[0];
                if (file != null) {
                    ajaxUtil.updateFile(itemcode, file, "admin", "aaaaa");
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

            /*
            上传文件
            */
            document.getElementById('upload_file').onchange = function () {
                var len = this.files.length;
                $("#addFile").empty("p");
                for (var i = 0; i < len; i++) {
                    var name = this.files[i].name;
                    var j = i + 1;
                    $("#addFile").append('<p>附件' + j + '：&nbsp;' + name + '&nbsp;</p>');
                    console.log(name);
                }
                ;
                if (len > 0) {
                    $("#clsfile").css("display", "block")
                }
            }
            document.getElementById('clsfile').onclick = function () {
                var obj = document.getElementById('upload_file');
                obj.outerHTML = obj.outerHTML;
                $("#clsfile").css("display", "none");
                $("#addFile").empty("p");
            }

        })
})();


