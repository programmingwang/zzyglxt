(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','distpicker','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,distpicker,modalUtil) {


            uploadImg.init();

            var type = isUpdate() ? "put":"post";

            $("#cancel").unbind().on('click', function (){
                orange.redirect("/industrialdevelop/chinesemed/saledrug");
            })

            $("#saveBtn").unbind().on('click',function () {
                var traDocEntity ;
                var addUpdateUrl;
                if(!isUpdate()){
                    addUpdateUrl = "/industrialdevelop/sale-drug";
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
                        status : 0
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
                        status : 0
                    }
                }
                fileUtil.handleFile(isUpdate(), traDocEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,traDocEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            var submitConfirmModal = {
                                modalBodyID :"myTopicSubmitTip",
                                modalTitle : "提示",
                                modalClass : "modal-lg",
                                cancelButtonStyle: "display:none",
                                modalConfirmFun:function (){
                                    var url = "/industrialdevelop/chinesemed/saledrug";
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
                        alertUtil.alert(data.msg);
                    }
                },true,"123",type);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "myShelveMedMat",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
                        var traDocEntity ;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "/industrialdevelop/sale-drug";
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
                                status : 1
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
                                status : 1
                            }
                        }
                        fileUtil.handleFile(isUpdate(), traDocEntity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,traDocEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == ajaxUtil.successCode) {
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            var url = "/industrialdevelop/chinesemed/saledrug";
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
                                alertUtil.alert(data.msg);
                            }
                        },true,"123",type);
                        return true;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            (function init() {
                if (isUpdate()){
                    $(".titleCSS").html("修改销售药品信息")
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
