(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker,modalUtil) {

          const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/healthCare/famPre";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var famPreEntity;
                var addUpdateUrl;
                if(!isUpdate()){
                    addUpdateUrl = "insertfampredo";
                    famPreEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        source : $("#source").val(),
                        prescription : $("#prescription").val(),
                        status :  '0',
                        type : $("#type").val(),
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatefampredo";
                    famPreEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        source : $("#source").val(),
                        prescription : $("#prescription").val(),
                        status : $("#status").val(),
                        type : $("#type").val(),
                        status :  '0',
                        content : editor.txt.html()
                    }
                }
                /* fileUtil.handleFile(isUpdate(), famPreEntity.itemcode, $("#upload_file")[0].files[0]);*/

                ajaxUtil.myAjax(null,addUpdateUrl,famPreEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/healthCare/famPre";
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
                        var famPreEntity;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "insertfampredo";
                            famPreEntity = {
                                name : $("#name").val(),
                                source : $("#source").val(),
                                prescription : $("#prescription").val(),
                                status :  '1',
                                type : $("#type").val(),
                                content : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "updatefampredo";
                            famPreEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                name : $("#name").val(),
                                source : $("#source").val(),
                                prescription : $("#prescription").val(),
                                status : '1',
                                type : $("#type").val(),
                                content : editor.txt.html()
                            }
                        }
                        /* fileUtil.handleFile(isUpdate(), famPreEntity.itemcode, $("#upload_file")[0].files[0]);*/

                        ajaxUtil.myAjax(null,addUpdateUrl,famPreEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        var url = "/healthCare/famPre";
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
                    $(".titleCSS").text("修改历史名方信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#source").val(tempdata.source);
                    $("#prescription").val(tempdata.prescription);
                    $("#status").val(tempdata.status);
                    $("#type").val(tempdata.type);
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