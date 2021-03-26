(function () {
    require(['jquery','objectUtil','bootstrapTableUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil','selectUtil'],
        function (jquery,objectUtil,bootstrapTableUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil,selectUtil) {

            var row = JSON.parse(localStorage.getItem("viewRowData"));
            const editor = objectUtil.wangEditorUtil();
//角色信息
            var rolename = sessionStorage.getItem("rolename");
            var username = sessionStorage.getItem("username");

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.receiptStatus);

            var tempdata = JSON.parse(localStorage.getItem("viewRowData"));

            //检验审核意见是否为空
            $.fn.validate = function(tips){
                if($(this).val() == "" || $.trim($(this).val()).length == 0){
                    alertUtil.error(tips + "不能为空！");
                    throw SyntaxError(); //如果验证不通过，则不执行后面
                }
            };

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                localStorage.getItem("comeFromMain") === "true" ?
                    orange.redirect("/data/mainPage")
                    :
                    orange.redirect("/document/receipt");
                localStorage.removeItem("comeFromMain");
            });


            //审核意见处理
            if(rolename === "政务资源科员"||rolename === "政务资源处长"||rolename === "政务资源县部门"||rolename === "政务资源市部门"){
                $('#opinin20').attr('style', "display:block;margin-bottom:10px");
                if (tempdata.reasont !== ""){
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tempdata.reasonh !== ""){
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tempdata.reasonf !== ""){
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tempdata.reasonv !== ""){
                    $('#opinin223').attr('style', "display:block;");
                }
                if (tempdata.reasont === "" && tempdata.reasonh === "" && tempdata.reasonf === "" && tempdata.reasonv === ""){
                    $('#opinin220').attr('style', "display:block;");

                }
                $('#opinin32').attr('style', "display:block;");
            }else if(rolename === "政务资源综合处处长"){
                if (tempdata.reasons === ""){
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin31').attr('style', "display:block; height:200px;");
                }else {
                    $('#opinin32').attr('style', "display:block;");
                }
                $('#opinin20').attr('style', "display:block;margin-bottom:10px");
                if (tempdata.reasont !== ""){
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tempdata.reasonh !== ""){
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tempdata.reasonf !== ""){
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tempdata.reasonv !== ""){
                    $('#opinin223').attr('style', "display:block;");
                }
                if (tempdata.reasont === "" && tempdata.reasonh === "" && tempdata.reasonf === "" && tempdata.reasonv === ""){
                    $('#opinin220').attr('style', "display:block;");

                }
                $('#opinin20').attr('style', "display:block;");
                $('#opinin32').attr('style', "display:block;");
            }else if(rolename === "中医处分管局长"){
                if (tempdata.reasont === ""){
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                }else {
                    if (tempdata.reasont !== ""){
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tempdata.reasonh !== ""){
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tempdata.reasonf !== ""){
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tempdata.reasonv !== ""){
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin20').attr('style', "display:block;");

                $('#opinin32').attr('style', "display:block;");
            }else if(rolename === "中药处分管局长"){
                if (tempdata.reasonh === ""){
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                }else {
                    if (tempdata.reasont !== ""){
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tempdata.reasonh !== ""){
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tempdata.reasonf !== ""){
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tempdata.reasonv !== ""){
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin20').attr('style', "display:block;");

                $('#opinin32').attr('style', "display:block;");
            }else if(rolename === "综合处分管局长"){
                if (tempdata.reasonf === ""){
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                }else {
                    if (tempdata.reasont !== ""){
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tempdata.reasonh !== ""){
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tempdata.reasonf !== ""){
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tempdata.reasonv !== ""){
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin20').attr('style', "display:block;");

                $('#opinin32').attr('style', "display:block;");

            }else if(rolename === "法规监督处分管局长"){
                if (tempdata.reasonv === ""){
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                }else {
                    if (tempdata.reasont !== ""){
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tempdata.reasonh !== ""){
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tempdata.reasonf !== ""){
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tempdata.reasonv !== ""){
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin20').attr('style', "display:block;");

                $('#opinin32').attr('style', "display:block;");

            }else if(rolename === "政务资源局长"){
                if (tempdata.reasono === ""){
                    $('#fail').attr('style', "display:block;");
                    $('#pass').attr('style', "display:block;");
                    $('#opinin19').attr('style', "display:block; height:100px;");
                }else {
                    $('#opinin20').attr('style', "display:block;margin-bottom:10px");
                }
                if (tempdata.reasont !== ""){
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tempdata.reasonh !== ""){
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tempdata.reasonf !== ""){
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tempdata.reasonv !== ""){
                    $('#opinin223').attr('style', "display:block;");
                }

                $('#opinin32').attr('style', "display:block;");
            }

            $("#pass").unbind().on('click',function () {
                var myPassPostModalData ={
                    modalBodyID :"myPassModal",
                    modalTitle : "审核通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var ReceiptEntity;
                        var submitOpinion;
                        var nowTime = stringUtil.formatDateTime(new Date());
                        ReceiptEntity = {
                            "receivingDataStatus": "",
                        };
                        submitOpinion = {
                            "itemid": row.itemid,
                            "itemcode": row.itemcode,
                            "receiptReason" : ""
                        };
                        if (sessionStorage.getItem("rolename") == "政务资源综合处处长") {
                            ReceiptEntity.receivingDataStatus = webStatus[2].id;
                        } else if (sessionStorage.getItem("rolename") == "中医处分管局长" || sessionStorage.getItem("rolename") == "中药处分管局长" || sessionStorage.getItem("rolename") == "综合处分管局长" || sessionStorage.getItem("rolename") == "法规监督处分管局长") {
                            ReceiptEntity.receivingDataStatus = webStatus[5].id;
                        } else if (sessionStorage.getItem("rolename") == "政务资源局长") {
                            ReceiptEntity.receivingDataStatus = webStatus[16].id;
                        }

                        if (sessionStorage.getItem("rolename") == "政务资源综合处处长") {
                            $("#reasonsView").validate("审核意见");
                            submitOpinion = {
                                "reasons": $("#reasonsView").val(),
                                "names": username,
                                "dates": nowTime,
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                            };
                            submitOpinion.receiptReason = "1";
                        } else if (sessionStorage.getItem("rolename") == "中医处分管局长"||sessionStorage.getItem("rolename") == "中药处分管局长"||sessionStorage.getItem("rolename") =="综合处分管局长"||sessionStorage.getItem("rolename") =="法规监督处分管局长") {
                            $("#reasonView").validate("审核意见");
                            if (sessionStorage.getItem("rolename") == "中医处分管局长"){
                                submitOpinion = {
                                    "reasont": $("#reasonView").val(),
                                    "namet": username,
                                    "datet": nowTime,
                                    "itemid": row.itemid,
                                    "itemcode": row.itemcode,
                                };
                            }else if (sessionStorage.getItem("rolename") == "中药处分管局长"){
                                submitOpinion = {
                                    "reasonh" : $("#reasonView").val(),
                                    "nameh" : username,
                                    "dateh" : nowTime,
                                    "itemid": row.itemid,
                                    "itemcode": row.itemcode,
                                };
                       }else if (sessionStorage.getItem("rolename") =="综合处分管局长"){
                        submitOpinion = {
                            "reasonf" : $("#reasonView").val(),
                            "namef" : username,
                            "datef" : nowTime,
                            "itemid": row.itemid,
                            "itemcode": row.itemcode,
                    };
                }else if (sessionStorage.getItem("rolename") =="法规监督处分管局长") {
                       submitOpinion = {
                           "reasonv": $("#reasonView").val(),
                           "namev": username,
                           "datev": nowTime,
                           "itemid": row.itemid,
                           "itemcode": row.itemcode,
                       };
                            }
                            submitOpinion.receiptReason = "2";
                        }else if (sessionStorage.getItem("rolename") == "政务资源局长"){
                           $("#reasonoView").validate("审核意见");
                            submitOpinion = {
                                "reasono" : $("#reasonoView").val(),
                                "nameo" : username,
                                "dateo" : nowTime,
                                "itemid" : row.itemid,
                                "itemcode" : row.itemcode,
                    };
                            submitOpinion.receiptReason = "3";
                }
                        ajaxUtil.myAjax(null, "updatereceipt", submitOpinion, function (data) {
                            if (data && ajaxUtil.success(data)) {
                                ajaxUtil.myAjax(null, "changestatustoreceipt/" + row.itemid + "/" + row.itemcode, ReceiptEntity, function (data) {
                                    if (ajaxUtil.success(data)) {
                                        if (data.code == 88888) {
                                            var submitConfirmModal = {
                                                modalBodyID :"myTopicSubmitTip",
                                                modalTitle : "提示",
                                                modalClass : "modal-lg",
                                                cancelButtonStyle: "display:none",
                                                modalConfirmFun:function (){
                                                    alertUtil.success("审核通过");
                                                    var url = "/document/receipt";
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

            $("#fail").unbind().on('click',function () {
                    var myFailPostModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                        var isSuccess = false;
                        var ReceiptEntity;
                        var submitOpinion;
                        var nowTime = stringUtil.formatDateTime(new Date());
                        ReceiptEntity = {
                            "receivingDataStatus": ""
                        };
                            submitOpinion = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "receiptReason" : ""
                            };
                        if (sessionStorage.getItem("rolename") == "政务资源综合处处长") {
                           ReceiptEntity.receivingDataStatus = webStatus[3].id;
                        } else if (sessionStorage.getItem("rolename") == "中医处分管局长"||sessionStorage.getItem("rolename") == "中药处分管局长"||sessionStorage.getItem("rolename") == "综合处分管局长"||sessionStorage.getItem("rolename") == "法规监督处分管局长") {
                            ReceiptEntity.receivingDataStatus = webStatus[6].id;
                        } else if (sessionStorage.getItem("rolename") == "政务资源局长") {
                            ReceiptEntity.receivingDataStatus = webStatus[17].id;
                        }
                        if (sessionStorage.getItem("rolename") == "政务资源综合处处长") {
                            $("#reasonsView").validate("审核意见");
                            submitOpinion = {
                                "reasons": $("#reasonsView").val(),
                                "names": username,
                                "dates": nowTime,
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                            };
                            submitOpinion.receiptReason = "1";
                        } else if (sessionStorage.getItem("rolename") == "中医处分管局长"||sessionStorage.getItem("rolename") == "中药处分管局长"||sessionStorage.getItem("rolename") =="综合处分管局长"||sessionStorage.getItem("rolename") =="法规监督处分管局长") {
                            $("#reasonView").validate("审核意见");
                            if (sessionStorage.getItem("rolename") == "中医处分管局长"){
                            submitOpinion = {
                                "reasont": $("#reasonView").val(),
                                "namet": username,
                                "datet": nowTime,
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                            };
                        } else if (sessionStorage.getItem("rolename") == "中药处分管局长") {
                            submitOpinion = {
                                "reasonh": $("#reasonView").val(),
                                "nameh": username,
                                "dateh": nowTime,
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                            };
                        } else if (sessionStorage.getItem("rolename") == "综合处分管局长") {
                            submitOpinion = {
                                "reasonf": $("#reasonView").val(),
                                "namef": username,
                                "datef": nowTime,
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                            };
                        } else if (sessionStorage.getItem("rolename") == "法规监督处分管局长") {
                                submitOpinion = {
                                    "reasonv": $("#reasonView").val(),
                                    "namev": username,
                                    "datev": nowTime,
                                    "itemid": row.itemid,
                                    "itemcode": row.itemcode,
                                };
                            }
                            submitOpinion.receiptReason = "2";
                        } else if (sessionStorage.getItem("rolename") == "政务资源局长") {
                            $("#reasonoView").validate("审核意见");
                            submitOpinion = {
                                "reasono": $("#reasonoView").val(),
                                "nameo": username,
                                "dateo": nowTime,
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                            };
                            submitOpinion.receiptReason = "3";
                        }
                            ajaxUtil.myAjax(null, "updatereceipt", submitOpinion, function (data) {
                                if (data && ajaxUtil.success(data)) {
                                    ajaxUtil.myAjax(null, "changestatustoreceipt/" + row.itemid + "/" + row.itemcode, ReceiptEntity, function (data) {
                                        if (ajaxUtil.success(data)) {
                                            if (data.code == 88888) {
                                                var submitConfirmModal = {
                                                    modalBodyID :"myTopicSubmitTip",
                                                    modalTitle : "提示",
                                                    modalClass : "modal-lg",
                                                    cancelButtonStyle: "display:none",
                                                    modalConfirmFun:function (){
                                                        alertUtil.success("文件驳回成功");
                                                        var url = "/document/receipt";
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

            (function init() {
                if(localStorage.getItem("comeFromMain") === "true"){
                    $("#fail").remove();
                    $("#pass").remove();
                    $("input").attr("disabled","true")
                }
                if (isView()){

                    $("#receivingNum").val(tempdata.receivingNum);
                    var receivingDateOfReceipt=tempdata.receivingDateOfReceipt;
                    var receiptArry = receivingDateOfReceipt.split("-");
                    $("#Year").val(receiptArry[0]);
                    $("#Month").val(receiptArry[1]);
                    $("#Day").val(receiptArry[2]);
                    $("#receivingTitle").val(tempdata.receivingTitle);
                    $("#receivingUnitOfCommun").val(tempdata.receivingUnitOfCommun);
                    $("#fileNo").val(tempdata.fileNo);
                    $("#number").val(tempdata.number);
                    $("#secretLevel").val(tempdata.secretLevel);
                    $("#timeLimit").val(tempdata.timeLimit);
                    $("#receivingDataStatus").val(webStatus[tempdata.receivingDataStatus].text);
                    $("#creater").val(tempdata.creater);
                    $("#receivingDegreeOfUrgency").val(pl[tempdata.receivingDegreeOfUrgency].text);

                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);

                    $("#reasono").val(tempdata.reasono);
                    $("#reasont").val(tempdata.reasont);
                    $("#reasonh").val(tempdata.reasonh);
                    $("#reasonf").val(tempdata.reasonf);
                    $("#reasonv").val(tempdata.reasonv);
                    $("#reasons").val(tempdata.reasons);

                    $("#nameo").val(tempdata.nameo);
                    $("#namet").val(tempdata.namet);
                    $("#nameh").val(tempdata.nameh);
                    $("#namef").val(tempdata.namef);
                    $("#namev").val(tempdata.namev);
                    $("#names").val(tempdata.names);

                    $("#dateo").val(tempdata.dateo);
                    $("#datet").val(tempdata.datet);
                    $("#dateh").val(tempdata.dateh);
                    $("#datef").val(tempdata.datef);
                    $("#datev").val(tempdata.datev);
                    $("#dates").val(tempdata.dates);
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