(function () {
    require(['jquery','objectUtil','bootstrapTableUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil','selectUtil'],
        function (jquery,objectUtil,bootstrapTableUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil,selectUtil) {

            const editor = objectUtil.wangEditorUtil();


            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.reportStatus);
            var username = sessionStorage.getItem("username");
            var row = JSON.parse(localStorage.getItem("viewRowData"));

            $("#fail").unbind().on('click',function () {
                var ReportEntity;
                var submitOpinion;
                var d=new Date();
                ReportEntity = {
                    "reportDataStatus": ""
                };

                if (sessionStorage.getItem("rolename") == "政务资源处长"){
                    ReportEntity.reportDataStatus = webStatus[4].id;
                }else if (sessionStorage.getItem("rolename") == "政务资源分管局长"){
                    ReportEntity.reportDataStatus = webStatus[5].id;
                }else if (sessionStorage.getItem("rolename") == "政务资源局长"){
                    ReportEntity.reportDataStatus = webStatus[6].id;
                }

                if (sessionStorage.getItem("rolename") == "政务资源处长"){
                    submitOpinion = {
                        reason : $("#reason").val(),
                        updaterf : username,
                        updatef : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                        itemid : row.itemid,
                        itemcode : row.itemcode,
                    };
                }else if (sessionStorage.getItem("rolename") == "政务资源分管局长"){
                    submitOpinion = {
                        reasonone : $("#reasonone").val(),
                        updaterone : username,
                        updateone : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                        itemid : row.itemid,
                        itemcode : row.itemcode,
                    };
                }else if (sessionStorage.getItem("rolename") == "政务资源局长"){
                    submitOpinion = {
                        reasontwo : $("#reasontwo").val(),
                        updatertwo : username,
                        updatetwo : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                        itemid : row.itemid,
                        itemcode : row.itemcode,
                    };
                }
                if(sessionStorage.getItem("rolename") == "政务资源处长"||(sessionStorage.getItem("rolename") == "政务资源分管局长")||sessionStorage.getItem("rolename") == "政务资源局长") {
                    ajaxUtil.myAjax(null, "updaterequestreport", submitOpinion, function (data) {
                        if (data && ajaxUtil.success(data)) {
                            ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, ReportEntity, function (data) {
                                if (ajaxUtil.success(data)) {
                                    if (data.code == 88888) {
                                        alertUtil.success("文件驳回成功");
                                        var url = "/document/report";
                                        orange.redirect(url);
                                        isSuccess = true;
                                        refreshTable();
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false);
                        }
                    }, false, true);
                } else {
                    alertUtil.error("您没有操作权限");
                }
                return false;
            });

            $("#pass").unbind().on('click',function () {
                var ReportEntity;
                var submitOpinion;
                var d=new Date();
                ReportEntity = {
                    "": ""
                };

                if (sessionStorage.getItem("rolename") == "政务资源处长"){
                    ReportEntity.reportDataStatus = webStatus[2].id;
                }else if (sessionStorage.getItem("rolename") == "政务资源分管局长"){
                    ReportEntity.reportDataStatus = webStatus[3].id;
                }else if (sessionStorage.getItem("rolename") == "政务资源局长"){
                    ReportEntity.reportDataStatus = webStatus[9].id;
                }

                if (sessionStorage.getItem("rolename") == "政务资源处长"){
                    submitOpinion = {
                        reason : $("#reason").val(),
                        updaterf : username,
                        updatef : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                        itemid : row.itemid,
                        itemcode : row.itemcode,
                    };
                }else if (sessionStorage.getItem("rolename") == "政务资源分管局长"){
                    submitOpinion = {
                        reasonone : $("#reasonone").val(),
                        updaterone : username,
                        updateone : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                        itemid : row.itemid,
                        itemcode : row.itemcode,
                    };
                }else if (sessionStorage.getItem("rolename") == "政务资源局长"){
                    submitOpinion = {
                        reasontwo : $("#reasontwo").val(),
                        updatertwo : username,
                        updatetwo : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                        itemid : row.itemid,
                        itemcode : row.itemcode,
                    };
                }
                if(sessionStorage.getItem("rolename") == "政务资源处长"||(sessionStorage.getItem("rolename") == "政务资源分管局长")||sessionStorage.getItem("rolename") == "政务资源局长") {
                    ajaxUtil.myAjax(null, "updaterequestreport", submitOpinion, function (data) {
                        if (data && ajaxUtil.success(data)) {
                            ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, ReportEntity, function (data) {
                                if (ajaxUtil.success(data)) {
                                    if (data.code == 88888) {
                                        alertUtil.success("审核通过");
                                        var url = "/document/report";
                                        orange.redirect(url);
                                        isSuccess = true;
                                        refreshTable();
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false);
                        }
                    }, false, true);
                } else {
                    alertUtil.error("您没有操作权限");
                }
                return false;
            });

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/report";
                orange.redirect(url);
            });

            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
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