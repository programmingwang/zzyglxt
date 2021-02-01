(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                var url = "/chineseCultural/travel/travel";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var travelEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/trav/trav/addTrav";
                    operateMessage = "新增旅游景点成功";
                    travelEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/trav/trav/updTrav";
                    travelEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新旅游景点成功";
                }

                fileUtil.handleFile(isUpdate(), travelEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,travelEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            var submitConfirmModal = {
                                modalBodyID :"myTopicSubmitTip",
                                modalTitle : "提示",
                                modalClass : "modal-lg",
                                cancelButtonStyle: "display:none",
                                modalConfirmFun:function (){
                                    var url = "/chineseCultural/travel/travel";
                                    orange.redirect(url);
                                    return true;
                                }
                            }
                            var submitConfirm = modalUtil.init(submitConfirmModal);
                            submitConfirm.show();

                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.error(data.msg);
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
                        var travelEntity;
                        var addUpdateUrl;
                        var operateMessage;
                        if(!isUpdate()){
                            addUpdateUrl = "/cul/trav/trav/addTrav";
                            operateMessage = "新增旅游景点成功";
                            travelEntity = {
                                itemcode: stringUtil.getUUID(),
                                chineseCulturalName : $("#chineseCulturalName").val(),
                                chineseCulturalSource : $("#chineseCulturalSource").val(),
                                chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                                chineseCulturalStatus : '1',
                                chineseCulturalContent : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/cul/trav/trav/updTrav";
                            travelEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                chineseCulturalName : $("#chineseCulturalName").val(),
                                chineseCulturalSource : $("#chineseCulturalSource").val(),
                                chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                                chineseCulturalStatus : '1',
                                chineseCulturalContent : editor.txt.html()
                            }
                            operateMessage = "更新旅游景点成功";
                        }

                        fileUtil.handleFile(isUpdate(), travelEntity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,travelEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == ajaxUtil.successCode) {
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            var url = "/chineseCultural/travel/travel";
                                            orange.redirect(url);
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();

                                }else{
                                    alertUtil.error(data.msg);
                                }
                            }else {
                                alertUtil.error(data.msg);
                            }
                        },false,true);
                        return false;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;

            });


            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    var img = tempdata.filePath;

                    // var imgName=tempdata.fileName;
                    uploadImg.setImgSrc(img);
                    // $("#upload_file").attr("value",imgName);

                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            };
        })
})();
