(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'objectUtil', 'dictUtil', 'alertUtil','fileUtil','modalUtil'],
        function (jquery, ajaxUtil, stringUtil, objectUtil, dictUtil, alertUtil, fileUtil,modalUtil) {

            var type = isUpdate() ? "put" : "post";

            var itemcode = stringUtil.getUUID();

            const editor = objectUtil.wangEditorUtil();

            var showStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);

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

            function checkParam(param) {
                if (stringUtil.isBlank(param.industrialDevelopLeader)){
                    alertUtil.error("主研人不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.industrialDevelopName)){
                    alertUtil.error("研究成果不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.contacts)){
                    alertUtil.error("联系人不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.phone)){
                    alertUtil.error("联系方式不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.context)){
                    alertUtil.error("成果简介不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.projectName)){
                    alertUtil.error("项目简介不能为空")
                    return false
                }
                return true
            }


            $("#saveBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.industrialDevelopStatus = showStatus[0].id;

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        fileUtil.handleFile(isUpdate(), param.itemcode, $("#upload_file")[0].files[0]);
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                orange.redirect(url)
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();

                    } else {
                        alertUtil.error(data.msg)
                    }
                }, true, "123", type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var mySubmitToCZ = {
                    modalBodyID: "muPublishIndustrial",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
                        var param = generateParam();
                        if (!checkParam(param)){
                            return
                        }
                        param.industrialDevelopStatus = showStatus[1].id;
                        ajaxUtil.myAjax(null, url, param, function (data) {
                            if (ajaxUtil.success(data)) {
                                fileUtil.handleFile(isUpdate(), param.itemcode, $("#upload_file")[0].files[0]);
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        orange.redirect(url)
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();
                            }else{
                                alertUtil.error(data.msg)
                            }
                        }, true, "123", type);
                        return true;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });


            var init = function () {
                if (isUpdate()) {
                    $(".titleCSS").text("修改科研成果")
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#industrialDevelopLeader").val(tempdata.industrialDevelopLeader);
                    $("#industrialDevelopName").val(tempdata.industrialDevelopName);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $("#projectName").val(tempdata.projectName);
                    editor.txt.html(tempdata.context);
                    $("#addFile").text(tempdata.fileName);
                }
                $("input").attr("required","required")
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
                $('#upload_file').val('');
                $("#clsfile").css("display", "none");
                $("#addFile").empty("p");
            }

        })
})();


