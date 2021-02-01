(function () {
    require(['jquery','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg,modalUtil) {

            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/industrialdevelop/medMat/medMat"
            var medStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.medStatus);

            uploadImg.init();

            /*返回按钮处理*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            function addMedMat(button){
                var postStatus;
                var entity;
                var requestUrl;
                if (!updateStatus){
                    requestUrl = "/industrialdevelop/medmat/add";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                    };
                    postStatus = medStatus[0].id;
                }
                else {
                    requestUrl = "/industrialdevelop/medmat/update";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode
                    };
                    postStatus = tempdata.status;
                }
                if (button==="上架"){
                    entity["status"] = medStatus[1].id;
                }
                else {
                    entity["status"] = postStatus;
                }
                entity["name"] = $("#name").val();
                entity["specifications"] = $("#specifications").val();
                entity["price"] = $("#price").val();
                entity["place"] = $("#place").val();
                entity["contacts"] = $("#contacts").val();
                entity["phone"] = $("#phone").val();

                fileUtil.handleFiles(updateStatus, entity.itemcode, uploadImg.getFiles());

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                orange.redirect(jumpUrl);
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                    }else {
                        alertUtil.error(data.msg);
                    }
                },false,true,"POST");
                return false;
            }

            /*保存按钮处理*/
            $("#btn_insert").unbind().on('click',function () {
                addMedMat("保存");
            });
            //上架按钮处理
            $("#shelve").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "myShelveMedMat",
                    modalTitle: "上架",
                    modalClass: "modal-lg",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        addMedMat("上架");
                        return false;
                    }
                };
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            function isUpdate() {
                return (tempdata != null || tempdata != undefined)
            }
            /*初始化数据*/
            (function init() {
                if (updateStatus){
                    $("#name").val(tempdata.name);
                    $("#specifications").val(tempdata.specifications);
                    $("#price").val(tempdata.price);
                    $("#place").val(tempdata.place);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    uploadImg.setImgSrcs(tempdata.filePath);
                }
            }());
        });
})();
