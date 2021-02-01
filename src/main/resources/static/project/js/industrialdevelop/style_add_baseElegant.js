(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','dictUtil','modalUtil'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,dictUtil,modalUtil) {
            var type = isUpdate() ? "put" : "post" ;

            uploadImg.init();

            var showStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);

            $("#cancel").unbind().on('click',function () {
                var url = "/industrialdevelop/style";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var baseStyleEntity;
                var addUpdateUrl;
                if(!isUpdate()){
                    addUpdateUrl = "/industrialdevelop/base-style";
                    baseStyleEntity = {
                        itemcode : stringUtil.getUUID(),
                        status : showStatus[0].id,
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/industrialdevelop/base-style";
                    baseStyleEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        status : showStatus[0].id,
                    }
                }

                fileUtil.handleFile(isUpdate(), baseStyleEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,baseStyleEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            var submitConfirmModal = {
                                modalBodyID :"myTopicSubmitTip",
                                modalTitle : "提示",
                                modalClass : "modal-lg",
                                cancelButtonStyle: "display:none",
                                modalConfirmFun:function (){
                                    var url = "/industrialdevelop/organization/tour";
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
                },false,true,type);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "muPublishIndustrial",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
                        var baseStyleEntity;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "/industrialdevelop/base-style";
                            baseStyleEntity = {
                                itemcode : stringUtil.getUUID(),
                                status : showStatus[1].id,
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/industrialdevelop/base-style";
                            baseStyleEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                status : showStatus[1].id,
                            }
                        }

                        fileUtil.handleFile(isUpdate(), baseStyleEntity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,baseStyleEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == ajaxUtil.successCode) {
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            var url = "/industrialdevelop/organization/tour";
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
                        },false,true,type);
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
