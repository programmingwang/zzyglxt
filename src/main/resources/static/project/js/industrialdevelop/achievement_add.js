(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'objectUtil', 'dictUtil', 'alertUtil','fileUtil'],
        function (jquery, ajaxUtil, stringUtil, objectUtil, dictUtil, alertUtil, fileUtil) {

            var type = isUpdate() ? "put" : "post";

            var itemcode = stringUtil.getUUID();

            const editor = objectUtil.wangEditorUtil();

            var showStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);

            var operateMsg;
            if(!isUpdate()){
                operateMsg = "新增成功";
            }else{
                operateMsg = "更新成功";
            }

            //后台数据交互地址
            var url = "/industrialdevelop/achievement";
            //页面请求地址
            var purl = url;


            $("#cancelBtn").unbind().on('click', function () {
                orange.redirect(purl);
            });

            function generateParam() {
                var param = {};
                param.industrialDevelopLeader = $("#industrialDevelopLeader").val();
                param.industrialDevelopName = $("#industrialDevelopName").val();
                param.projectName = $("#projectName").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.context = editor.txt.html();
                param.orgCode = sessionStorage.getItem("orgCode");
                if(!isUpdate()){
                    param.itemcode = itemcode;
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    param.itemcode = needData.itemcode;
                    param.itemid =  needData.itemid;
                }

                return param;
            }


            $("#saveBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.industrialDevelopStatus = showStatus[0].id;

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        fileUtil.handleFile(isUpdate(), param.itemcode, $("#upload_file")[0].files[0]);
                        alertUtil.success(operateMsg);
                        orange.redirect(url)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.industrialDevelopStatus = showStatus[1].id;
                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        fileUtil.handleFile(isUpdate(), param.itemcode, $("#upload_file")[0].files[0]);
                        alertUtil.success(operateMsg+"，信息将展示在主页");
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
                    $("#addFile").text(tempdata.fileName);
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


