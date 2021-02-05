(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/healthCare/healthsciKnow";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var sciKnowEntity;
                var addUpdateUrl;
                if(!isUpdate()){
                    addUpdateUrl = "inserthealthsciknowdo";
                    sciKnowEntity = {
                        itemcode: stringUtil.getUUID(),
                        scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                        scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                        scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                        scienceKnowledgeStatus : '0',
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatehealthsciknowdo";
                    sciKnowEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                        scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                        scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                        scienceKnowledgeStatus : '0',
                        content : editor.txt.html()
                    }
                }
                /*fileUtil.handleFile(isUpdate(), sciKnowEntity.itemcode, upload_file.getFiles()[0]);*/

                ajaxUtil.myAjax(null,addUpdateUrl,sciKnowEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/healthCare/healthsciKnow";
                                orange.redirect(url);
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
                        var sciKnowEntity;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "inserthealthsciknowdo";
                            sciKnowEntity = {
                                itemcode: stringUtil.getUUID(),
                                scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                                scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                                scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                                scienceKnowledgeStatus : '1',
                                content : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "updatehealthsciknowdo";
                            sciKnowEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                                scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                                scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                                scienceKnowledgeStatus : '1',
                                content : editor.txt.html()
                            }
                        }
                        /*fileUtil.handleFile(isUpdate(), sciKnowEntity.itemcode, upload_file.getFiles()[0]);*/

                        ajaxUtil.myAjax(null,addUpdateUrl,sciKnowEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        var url = "/healthCare/healthsciKnow";
                                        orange.redirect(url);
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();
                            }else {
                                alertUtil.alert(data.msg);
                            }
                        },false,true);
                        return true;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });
            (function init() {
                if (isUpdate()){
                    $(".titleCSS").text("修改科普知识信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#scienceKnowledgeName").val(tempdata.scienceKnowledgeName);
                    $("#scienceKnowledgeSource").val(tempdata.scienceKnowledgeSource);
                    $("#scienceKnowledgeAuthor").val(tempdata.scienceKnowledgeAuthor);
                    editor.txt.html(tempdata.content);
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);
                }
                else {
                    $("#distpicker").distpicker();
                }
                init = function () {

                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();