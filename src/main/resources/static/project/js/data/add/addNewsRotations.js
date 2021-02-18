(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,uploadImg,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            /*下拉框值*/
            $("#dataLocation").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dataLocation));

            /**
             * 校验文本是否为空
             * tips：提示信息
             * 使用方法：$("#id").validate("提示文本");
             * @itmyhome
             */
            $.fn.validate = function(tips){

                if($(this).val() == "" || $.trim($(this).val()).length == 0){
                    alert(tips + "不能为空！");
                    throw SyntaxError(); //如果验证不通过，则不执行后面
                }
            }

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataNewsRotations";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                //提示必填信息
                $("#dataTitle").validate("新闻标题");

                var newsRotationsEntity;
                var addUpdateUrl;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/newsInf/insertNewsInf";
                    
                    newsRotationsEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataContent : editor.txt.html(),
                        releaseOrNot : "y",
                        dataStatus : "0",
                        dataLocation : $("#dataLocation").val(),
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/newsInf/updateNewsInf";
                    newsRotationsEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataContent : editor.txt.html(),
                        dataLocation : $("#dataLocation").val(),
                    }
                    
                }

                fileUtil.handleFile(isUpdate(), newsRotationsEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,newsRotationsEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            var submitConfirmModal = {
                                modalBodyID :"myTopicSubmitTip",
                                modalTitle : "提示",
                                modalClass : "modal-lg",
                                cancelButtonStyle: "display:none",
                                modalConfirmFun:function (){
                                    var url = "/data/dataNewsRotations";
                                    orange.redirect(url);
                                    return true;
                                }
                            }
                            var submitConfirm = modalUtil.init(submitConfirmModal);
                            submitConfirm.show();

                        }else{
                            alertUtil.alert(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            $("#submitbtn").unbind().on('click',function () {
                //提示必填信息
                $("#dataTitle").validate("新闻标题");

                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var newsRotationsEntity;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "/datado/newsInf/insertNewsInf";
                            
                            newsRotationsEntity = {
                                itemcode: stringUtil.getUUID(),
                                dataTitle : $("#dataTitle").val(),
                                dataSource : $("#dataSource").val(),
                                dataAuthor : $("#dataAuthor").val(),
                                dataContent : editor.txt.html(),
                                releaseOrNot : "y",
                                dataStatus : "1",
                                dataLocation : $("#dataLocation").val(),
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/datado/newsInf/updateNewsInf";
                            newsRotationsEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                dataTitle : $("#dataTitle").val(),
                                dataSource : $("#dataSource").val(),
                                dataAuthor : $("#dataAuthor").val(),
                                dataStatus : "1",
                                dataContent : editor.txt.html(),
                                dataLocation : $("#dataLocation").val(),
                            }
                        }

                        fileUtil.handleFile(isUpdate(), newsRotationsEntity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,newsRotationsEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == ajaxUtil.successCode) {
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            var url = "/data/dataNewsRotations";
                                            orange.redirect(url);
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();

                                }else{
                                    alertUtil.alert(data.msg);
                                }
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
                    $(".titleCSS").text("修改新闻轮播图");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataSource").val(tempdata.dataSource);
                    $("#dataAuthor").val(tempdata.dataAuthor);
                    $("#dataLocation").val(tempdata.dataLocation);
                    editor.txt.html(tempdata.dataContent);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                    //$("#dataLocation option[value="+tempdata.dataLocation+"] ").attr("selected",true);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();



