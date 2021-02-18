(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','datetimepicker','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,datetimepicker,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataNewsInf";
                orange.redirect(url);
            });

            var date= new Date();
            $("#dataDelayedRelease").datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',//显示格式
                startDate: date ,
                startView:2,
                minView:1,
                maxView :3,
                language: 'cn',
                autoclose: 1,//选择后自动关闭
                clearBtn:true,//清除按钮
                showMeridian:true,
            });

            $("#btn_save").unbind().on('click',function () {
                var newsInfEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/newsInf/insertNewsInf";
                    operateMessage = "新增新闻信息成功";
                    newsInfEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataDelayedRelease : $("#dataDelayedRelease").val(),
                        releaseOrNot : "y",
                        dataStatus : "0",
                        dataContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/newsInf/updateNewsInf";
                    newsInfEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataDelayedRelease : $("#dataDelayedRelease").val(),
                        dataContent : editor.txt.html()
                    };
                    operateMessage = "更新新闻信息成功";
                }

                ajaxUtil.myAjax(null,addUpdateUrl,newsInfEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/data/dataNewsInf";
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

            $("#submitbtn").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var newsInfEntity;
                        var addUpdateUrl;
                        var operateMessage;
                        if(!isUpdate()){
                            addUpdateUrl = "/datado/newsInf/insertNewsInf";
                            operateMessage = "新增新闻信息成功";
                            newsInfEntity = {
                                itemcode: stringUtil.getUUID(),
                                dataTitle : $("#dataTitle").val(),
                                dataAuthor : $("#dataAuthor").val(),
                                dataSource : $("#dataSource").val(),
                                dataFileType : $("#dataFileType").val(),
                                dataDelayedRelease : $("#dataDelayedRelease").val(),
                                releaseOrNot : "y",
                                dataStatus : "1",
                                dataContent : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "/datado/newsInf/updateNewsInf";
                            newsInfEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                dataTitle : $("#dataTitle").val(),
                                dataAuthor : $("#dataAuthor").val(),
                                dataSource : $("#dataSource").val(),
                                dataFileType : $("#dataFileType").val(),
                                dataDelayedRelease : $("#dataDelayedRelease").val(),
                                dataStatus : "1",
                                dataContent : editor.txt.html()
                            };
                            operateMessage = "更新新闻信息成功";
                        }

                        ajaxUtil.myAjax(null,addUpdateUrl,newsInfEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        var url = "/data/dataNewsInf";
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
                    $(".titleCSS").text("修改新闻");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataAuthor").val(tempdata.dataAuthor);
                    $("#dataSource").val(tempdata.dataSource);
                    $("#dataFileType").val(tempdata.dataFileType);
                    $("#dataDelayedRelease").val(tempdata.dataDelayedRelease);
                    editor.txt.html(tempdata.dataContent);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();
