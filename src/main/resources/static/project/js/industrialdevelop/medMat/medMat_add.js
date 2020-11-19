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

            function addMedMat(add,update,message){
                var entity;
                var requestUrl;
                var operateMessage;
                if (!updateStatus){
                    requestUrl = "/industrialdevelop/medmat/add";
                    operateMessage = "保存药材成功";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                    };
                    entity["status"] = add
                }
                else {
                    requestUrl = "/industrialdevelop/medmat/update";
                    operateMessage = "更新药材成功";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode
                    };
                    entity["status"] = update
                }
                if (message == "上架"){
                    operateMessage = "药材上架成功";
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
                        alertUtil.info(operateMessage);
                        orange.redirect(jumpUrl);
                    }else {
                        alertUtil.error(data.msg);
                    }
                },false,true,"POST");
            }

            /*保存按钮处理*/
            $("#btn_insert").unbind().on('click',function () {
                var update;
                if (updateStatus){
                    update = tempdata.status
                }
                addMedMat(medStatus[0].id, update,null)
            });

            $("#shelve").unbind().on('click',function () {
                var myShelveMedMatModalData ={
                    modalBodyID :"myShelveMedMat",
                    modalTitle : "上架",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        console.log("modalConfirmFun" + "此函数执行了吗");
                        addMedMat(medStatus[1].id, medStatus[1].id,"上架")
                    }
                };
                var myShelveModal = modalUtil.init(myShelveMedMatModalData);
                myShelveModal.show();
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
