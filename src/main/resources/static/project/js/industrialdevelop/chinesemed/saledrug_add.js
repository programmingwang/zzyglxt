(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg) {

          const editor = objectUtil.wangEditorUtil();

            uploadImg.init();



            $("#btn_insert").unbind().on('click',function () {
                var traDocEntity ;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/industrialdevelop/sale-drug";
                    operateMessage = "添加药品成功";
                    traDocEntity = {
                        itemcode: stringUtil.getUUID(),
                        drugName : $("#drugName").val(),
                        functionIndications : $("#functionIndications").val(),
                        usage : $("#usage").val(),
                        adverseReactions : $("#adverseReactions").val(),
                        taboo : $("#taboo").val(),
                        specifications : $("#specifications").val(),
                        careful : $("#careful").val(),
                        storage : $("#storage").val(),
                        packing : $("#packing").val(),
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/industrialdevelop/sale-drug";
                    traDocEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        drugName : $("#drugName").val(),
                        functionIndications : $("#functionIndications").val(),
                        usage : $("#usage").val(),
                        adverseReactions : $("#adverseReactions").val(),
                        taboo : $("#taboo").val(),
                        specifications : $("#specifications").val(),
                        careful : $("#careful").val(),
                        storage : $("#storage").val(),
                        packing : $("#packing").val(),
                    }
                    operateMessage = "更新药品信息成功";
                }
                fileUtil.handleFile(isUpdate(), traDocEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,traDocEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            var url = "/industrialdevelop/chinesemed/saledrug";
                            orange.redirect(url);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);


            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#drugName").val(tempdata.drugName);
                    $("#functionIndications").val(tempdata.functionIndications);
                    $("#usage").val(tempdata.usage);
                    $("#adverseReactions").val(tempdata.adverseReactions);
                    $("#taboo").val(tempdata.taboo);
                    $("#specifications").val(tempdata.specifications);
                    $("#careful").val(tempdata.careful);
                    $("#storage").val(tempdata.storage);
                    $("#packing").val(tempdata.packing);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
