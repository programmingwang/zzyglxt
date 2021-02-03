(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/chineseCultural/resource/traditionalCultural";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var traCulEntity ;
                var addUpdateUrl;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/res/traCul/addTraCul";
                    traCulEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/res/traCul/updTraCul";
                    traCulEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    }
                }

                ajaxUtil.myAjax(null,addUpdateUrl,traCulEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/chineseCultural/resource/traditionalCultural";
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
                        var traCulEntity ;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "/cul/res/traCul/addTraCul";
                            traCulEntity = {
                                itemcode: stringUtil.getUUID(),
                                chineseCulturalName : $("#chineseCulturalName").val(),
                                chineseCulturalSource : $("#chineseCulturalSource").val(),
                                chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                                chineseCulturalStatus : '1',
                                chineseCulturalContent : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/cul/res/traCul/updTraCul";
                            traCulEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                chineseCulturalName : $("#chineseCulturalName").val(),
                                chineseCulturalSource : $("#chineseCulturalSource").val(),
                                chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                                chineseCulturalStatus : '1',
                                chineseCulturalContent : editor.txt.html()
                            }
                        }

                        ajaxUtil.myAjax(null,addUpdateUrl,traCulEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        var url = "/chineseCultural/resource/traditionalCultural";
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
                    $(".titleCSS").text("修改中医医史信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
