(function () {
    require(['jquery','objectUtil','bootstrapTableUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil','selectUtil'],
        function (jquery,objectUtil,bootstrapTableUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil,selectUtil) {

            const editor = objectUtil.wangEditorUtil();

            var rolename = sessionStorage.getItem("rolename");
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.reportStatus);
            var username = sessionStorage.getItem("username");
            var row = JSON.parse(localStorage.getItem("viewRowData"));
            var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
            //检验审核意见是否为空
            $.fn.validate = function (tips) {
                if ($(this).val() == "" || $.trim($(this).val()).length == 0) {
                    alertUtil.error(tips + "不能为空！");
                    throw SyntaxError(); //如果验证不通过，则不执行后面
                }
            };

            //审核意见
            if (rolename === "政务资源科员") {
                    $('#opinin25').attr('style', "display:block;");

                    $('#opinin23').attr('style', "display:block;");

                    $('#opinin21').attr('style', "display:block;");

            } else if (rolename === "政务资源处长") {
                if (tempdata.reason === "") {
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin24').attr('style', "display:block;");
                } else {
                    $('#opinin25').attr('style', "display:block;");
                }
                $('#opinin23').attr('style', "display:block;");

                $('#opinin21').attr('style', "display:block;");

            }else if(rolename === "政务资源分管局长"){
                if (tempdata.reasonone === ""){
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin22').attr('style', "display:block; height:100px;");
                }else {
                    $('#opinin23').attr('style', "display:block;margin-bottom:10px");
                }
                $('#opinin25').attr('style', "display:block;");

                $('#opinin21').attr('style', "display:block;");
            } else if (rolename === "政务资源局长") {
                if (tempdata.reasontwo === "") {
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin20').attr('style', "display:block; height:100px;");
                } else {
                    $('#opinin21').attr('style', "display:block;margin-bottom:10px");
                }
                $('#opinin25').attr('style', "display:block;");

                $('#opinin23').attr('style', "display:block;");
            }

            $("#fail").unbind().on('click',function () {
                    var myFailPostModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                        var isSuccess = false;
                        var ReportEntity;
                        var submitOpinion;
                        var d = new Date();
                        ReportEntity = {
                            "reportDataStatus": ""
                        };

                        if (sessionStorage.getItem("rolename") == "政务资源处长") {
                            ReportEntity.reportDataStatus = webStatus[4].id;
                        } else if (sessionStorage.getItem("rolename") == "政务资源分管局长") {
                            ReportEntity.reportDataStatus = webStatus[5].id;
                        } else if (sessionStorage.getItem("rolename") == "政务资源局长") {
                            ReportEntity.reportDataStatus = webStatus[6].id;
                        }

                        if (sessionStorage.getItem("rolename") == "政务资源处长") {
                            $("#reasonc").validate("审核意见");
                            submitOpinion = {
                                reason: $("#reasonc").val(),
                                updaterf: username,
                                updatef: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
                                itemid: row.itemid,
                                itemcode: row.itemcode,
                            };
                        } else if (sessionStorage.getItem("rolename") == "政务资源分管局长") {
                            $("#reasonf").validate("审核意见");
                            submitOpinion = {
                                reasonone: $("#reasonf").val(),
                                updaterone: username,
                                updateone: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
                                itemid: row.itemid,
                                itemcode: row.itemcode,
                            };
                        } else if (sessionStorage.getItem("rolename") == "政务资源局长") {
                            $("#reasonj").validate("审核意见");
                            submitOpinion = {
                                reasontwo: $("#reasonj").val(),
                                updatertwo: username,
                                updatetwo: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
                                itemid: row.itemid,
                                itemcode: row.itemcode,
                            };
                        }
                        ajaxUtil.myAjax(null, "updaterequestreport", submitOpinion, function (data) {
                            if (data && ajaxUtil.success(data)) {
                                ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, ReportEntity, function (data) {
                                    if (ajaxUtil.success(data)) {
                                        if (data.code == 88888) {
                                            var submitConfirmModal = {
                                                modalBodyID :"myTopicSubmitTip",
                                                modalTitle : "提示",
                                                modalClass : "modal-lg",
                                                cancelButtonStyle: "display:none",
                                                modalConfirmFun:function (){
                                                    alertUtil.success("文件驳回成功");
                                                    var url = "/document/report";
                                                    orange.redirect(url);
                                                    return true;
                                                }
                                            }
                                            var submitConfirm = modalUtil.init(submitConfirmModal);
                                            submitConfirm.show();
                                            isSuccess = true;
                                            refreshTable();
                                        } else {
                                            alertUtil.error(data.msg);
                                        }
                                    }
                                }, false);
                            }
                        }, false, true);
                        return isSuccess;
                       }
                    };
                var myFailModal = modalUtil.init(myFailPostModalData);
                myFailModal.show();
            });

            $("#pass").unbind().on('click',function () {
                var myPassPostModalData ={
                    modalBodyID :"myPassModal",
                    modalTitle : "审核通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var ReportEntity;
                        var submitOpinion;
                        var d = new Date();
                        ReportEntity = {
                            "reportDataStatus": ""
                        };

                        if (sessionStorage.getItem("rolename") == "政务资源处长") {
                            ReportEntity.reportDataStatus = webStatus[2].id;
                        } else if (sessionStorage.getItem("rolename") == "政务资源分管局长") {
                            ReportEntity.reportDataStatus = webStatus[3].id;
                        } else if (sessionStorage.getItem("rolename") == "政务资源局长") {
                            ReportEntity.reportDataStatus = webStatus[9].id;
                        }

                        if (sessionStorage.getItem("rolename") == "政务资源处长") {
                            $("#reasonc").validate("审核意见");
                            submitOpinion = {
                                reason: $("#reasonc").val(),
                                updaterf: username,
                                updatef: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
                                itemid: row.itemid,
                                itemcode: row.itemcode,
                            };
                        } else if (sessionStorage.getItem("rolename") == "政务资源分管局长") {
                            $("#reasonf").validate("审核意见");
                            submitOpinion = {
                                reasonone: $("#reasonf").val(),
                                updaterone: username,
                                updateone: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
                                itemid: row.itemid,
                                itemcode: row.itemcode,
                            };
                        } else if (sessionStorage.getItem("rolename") == "政务资源局长") {
                            $("#reasonj").validate("审核意见");
                            submitOpinion = {
                                reasontwo: $("#reasonj").val(),
                                updatertwo: username,
                                updatetwo: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(),
                                itemid: row.itemid,
                                itemcode: row.itemcode,
                            };
                        }
                        ajaxUtil.myAjax(null, "updaterequestreport", submitOpinion, function (data) {
                            if (data && ajaxUtil.success(data)) {
                                ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, ReportEntity, function (data) {
                                    if (ajaxUtil.success(data)) {
                                        if (data.code == 88888) {
                                            var submitConfirmModal = {
                                                modalBodyID :"myTopicSubmitTip",
                                                modalTitle : "提示",
                                                modalClass : "modal-lg",
                                                cancelButtonStyle: "display:none",
                                                modalConfirmFun:function (){
                                                    alertUtil.success("审核通过");
                                                    var url = "/document/report";
                                                    orange.redirect(url);
                                                    return true;
                                                }
                                            }
                                            var submitConfirm = modalUtil.init(submitConfirmModal);
                                            submitConfirm.show();
                                            isSuccess = true;
                                            refreshTable();
                                        } else {
                                            alertUtil.error(data.msg);
                                        }
                                    }
                                }, false);
                            }
                        }, false, true);
                        return isSuccess;
                    }
                    };
                var myPassModal = modalUtil.init(myPassPostModalData);
                myPassModal.show();
                return false;

            });

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/report";
                orange.redirect(url);
            });

            (function init() {
                if (isView()){
                    $("#reportTitle").val(tempdata.reportTitle);
                    $("#reportContent").val(tempdata.reportContent);
                    $("#reason").val(tempdata.reason);
                    $("#reasonone").val(tempdata.reasonone);
                    $("#reasontwo").val(tempdata.reasontwo);
                    $("#reasonth").val(tempdata.reasonth);

                    $("#updaterf").val(tempdata.updaterf);
                    $("#updaterone").val(tempdata.updaterone);
                    $("#updatertwo").val(tempdata.updatertwo);
                    $("#updaterth").val(tempdata.updaterth);

                    $("#updateone").val(tempdata.updateone);
                    $("#updatetwo").val(tempdata.updatetwo);
                    $("#updatef").val(tempdata.updatef);
                    $("#updateth").val(tempdata.updateth);

                    $("#creater").val(tempdata.creater);
                    $("#itemcreateat").val(tempdata.itemcreateat);
                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);
                }
            }());

            function isView() {
                return (localStorage.getItem("viewRowData") != null || localStorage.getItem("viewRowData") != undefined)
            }

            var files= document.getElementById('upload_file').files;
            if(files){
                if(files.length>0){
                    $("#addFile").empty("p");
                    var name = files.name;
                    $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                }
            }
        })
})();