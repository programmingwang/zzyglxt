(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg) {


            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/medicalService/hosp"

            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var hospitalLevel = dictUtil.getDictByCode(dictUtil.DICT_LIST.hospitalLevel)
            var specialtyName = dictUtil.getDictByCode(dictUtil.DICT_LIST.dept)
            const editor = objectUtil.wangEditorUtil();


            /*设置下拉框的值*/
            $("#hospitalLevel").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.hospitalLevel));
            /*返回按钮处理*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            /*确认按钮处理*/
            $("#btn_insert").unbind().on('click',function () {
                var entity;
                var requestUrl;
                var operateMessage;
                if (!updateStatus){
                    requestUrl = "/medicalService/hosp/add";
                    operateMessage = "新增医院成功";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                    };
                }
                else {
                    requestUrl = "/medicalService/hosp/update";
                    operateMessage = "更新医院成功";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode
                    };
                }
                entity["hospitalName"] = $("#hospitalName").val();
                entity["hospitalLevel"] = $("#hospitalLevel").val();
                entity["hospitalTelephone"] = $("#hospitalTelephone").val();
                entity["hospitalAddressCity"] = $("#hospitalAddressCity").val();
                entity["hospitalAddressCountry"] = $("#hospitalAddressCountry").val();
                entity["hospitalAddress"] = $("#hospitalAddress").val();
                entity["hospitalLink"] = $("#hospitalLink").val();
                entity["hospitalIntroduce"] = editor.txt.html()

                fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        orange.redirect(jumpUrl);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
            });

            function isUpdate() {
                return (tempdata != null || tempdata != undefined)
            }


            /*初始化数据*/
            var  init = function () {
                uploadImg.init();
                if (updateStatus){
                    $("#hospitalName").val(tempdata.hospitalName);
                    $("#hospitalLevel  option[value="+tempdata.hospitalLevel+"] ").attr("selected",true);
                    uploadImg.setImgSrc(tempdata.filePath);
                    $("#hospitalTelephone").val(tempdata.hospitalTelephone);
                    $("#distpicker").distpicker({
                        province: "河北省",
                        city: tempdata.hospitalAddressCity,
                        district: tempdata.hospitalAddressCountry
                    });
                    $("#hospitalAddress").val(tempdata.hospitalAddress);
                    $("#hospitalLink").val(tempdata.hospitalLink);
                    $("#hospitalAddressCountry").val(tempdata.hospitalAddressCountry);
                    $(".w-e-text").html(tempdata.hospitalIntroduce);
                }else {
                    localStorage.removeItem("rowData");
                    $("#distpicker").distpicker({
                        province: "河北省",
                    });//新增页面使用
                }
                init = function () {

                }
            }
            init();


        });
})();
