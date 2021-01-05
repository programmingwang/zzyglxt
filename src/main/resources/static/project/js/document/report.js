(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil','datetimepicker'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil,datetimepicker) {

            var url = "selectallrequestreport";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.reportStatus);
            url = getRoleTable(sessionStorage.getItem("rolename"),url,"reportDataStatus",webStatus);
            var aParam = {
            };


            var date= new Date();
            $("#updatef").datetimepicker({
                format: 'yyyy-mm-dd ',//显示格式
                startDate: date ,
                startView:2,
                minView:1,
                maxView :3,
                language: 'cn',
                autoclose: 1,//选择后自动关闭
                clearBtn:true,//清除按钮
                showMeridian:true,
            });
            $("#updateone").datetimepicker({
                format: 'yyyy-mm-dd ',//显示格式
                startDate: date ,
                startView:2,
                minView:1,
                maxView :3,
                language: 'cn',
                autoclose: 1,//选择后自动关闭
                clearBtn:true,//清除按钮
                showMeridian:true,
            });
            $("#updatetwo").datetimepicker({
                format: 'yyyy-mm-dd ',//显示格式
                startDate: date ,
                startView:2,
                minView:1,
                maxView :3,
                language: 'cn',
                autoclose: 1,//选择后自动关闭
                clearBtn:true,//清除按钮
                showMeridian:true,
            });

            //操作
            function operation(value, row, index){
                return getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.reportDataStatus,webStatus)
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/document/report_add");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeletereportModal",
                        modalTitle : "删除请示报告数据",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deleterequestreport/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除请示报告信息数据成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,true,"delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .pass' : function (e, value, row, index) {
                    var myPassReportModalData = {
                        modalBodyID: "myPassReportModal",
                        modalTitle: "处室审核通过意见",
                        modalClass: "modal-lg",
                        modalConfirmFun: function () {
                            var isSuccess = false;
                            var d=new Date();
                            var PassReport = {
                                reason : $("#reason").val(),
                                updaterf:"政务资源处长",
                                //updatef : $("#updatef").val(),
                                updatef:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var submitStatus = {
                                "reportDataStatus":getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null, "updaterequestreport", PassReport, function (data) {
                                if (data && ajaxUtil.success(data)) {
                                    if (data.code == ajaxUtil.successCode) {
                                        ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, submitStatus, function (data) {
                                            if (ajaxUtil.success(data)) {
                                                if (data.code == 88888) {
                                                    alertUtil.success("提交成功");
                                                    isSuccess = true;
                                                    refreshTable();
                                                } else {
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        }, false);
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false, true);
                            return isSuccess;
                        }
                    };
                    var myReportModal = modalUtil.init(myPassReportModalData);
                    myReportModal.show();
                },

                'click .passone' : function (e, value, row, index) {
                    var myPassReportModalData = {
                        modalBodyID: "myPassReportoneModal",
                        modalTitle: "分管局长审核通过意见",
                        modalClass: "modal-lg",
                        modalConfirmFun: function () {
                            var isSuccess = false;
                            var d=new Date();
                            var PassReport = {
                                reasonone : $("#reasonone").val(),
                                updaterone:"政务资源分管局长",
                                updateone:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                                //updateone : $("#updateone").val(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var submitStatus = {
                                "reportDataStatus":getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null, "updaterequestreport", PassReport, function (data) {
                                if (data && ajaxUtil.success(data)) {
                                    if (data.code == ajaxUtil.successCode) {
                                        ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, submitStatus, function (data) {
                                            if (ajaxUtil.success(data)) {
                                                if (data.code == 88888) {
                                                    alertUtil.success("提交成功");
                                                    isSuccess = true;
                                                    refreshTable();
                                                } else {
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        }, false);
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false, true);
                            return isSuccess;
                        }
                    };
                    var myReportModal = modalUtil.init(myPassReportModalData);
                    myReportModal.show();
                },

                'click .passtwo' : function (e, value, row, index) {
                    var myPassReportModalData = {
                        modalBodyID: "myPassReporttwoModal",
                        modalTitle: "局长审核通过意见",
                        modalClass: "modal-lg",
                        modalConfirmFun: function () {
                            var isSuccess = false;
                            var d=new Date();
                            var PassReport = {
                                reasontwo : $("#reasontwo").val(),
                                updatertwo:"政务资源局长",

                                updatetwo:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var submitStatus = {
                                "reportDataStatus":getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null, "updaterequestreport", PassReport, function (data) {
                                if (data && ajaxUtil.success(data)) {
                                    if (data.code == ajaxUtil.successCode) {
                                        ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, submitStatus, function (data) {
                                            if (ajaxUtil.success(data)) {
                                                if (data.code == 88888) {
                                                    alertUtil.success("提交成功");
                                                    isSuccess = true;
                                                    refreshTable();
                                                } else {
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        }, false);
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false, true);
                            return isSuccess;
                        }
                    };
                    var myReportModal = modalUtil.init(myPassReportModalData);
                    myReportModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailReportModalData ={
                        modalBodyID :"myFailReportModal",
                        modalTitle : "处室审核不通过意见",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var d=new Date();
                            var PassReport = {
                                reason : $("#reason").val(),
                                updaterf:"政务资源处长",
                                updatef : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var submitStatus = {
                                "reportDataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源处长" ){
                                submitStatus.reportDataStatus = webStatus[3].id;
                            }
                            ajaxUtil.myAjax(null, "updaterequestreport", PassReport, function (data) {
                                if (data && ajaxUtil.success(data)) {
                                    if (data.code == ajaxUtil.successCode) {
                                        ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, submitStatus, function (data) {
                                            if (ajaxUtil.success(data)) {
                                                if (data.code == 88888) {
                                                    alertUtil.success("提交成功");
                                                    isSuccess = true;
                                                    refreshTable();
                                                } else {
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        }, false);
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false, true);
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myFailReportModalData);
                    myPassModal.show();
                },
                'click .failone' : function (e, value, row, index) {
                    var myFailReportModalData ={
                        modalBodyID :"myFailReportoneModal",
                        modalTitle : "分管局长审核不通过意见",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var d=new Date();
                            var PassReport = {
                                reasonone : $("#reasonone").val(),
                                updaterone:"政务资源分管局长",
                                updateone : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var submitStatus = {
                                "reportDataStatus": ""
                            };
                           if(sessionStorage.getItem("rolename") == "政务资源分管局长"){
                                submitStatus.reportDataStatus = webStatus[5].id;
                            }
                            ajaxUtil.myAjax(null, "updaterequestreport", PassReport, function (data) {
                                if (data && ajaxUtil.success(data)) {
                                    if (data.code == ajaxUtil.successCode) {
                                        ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, submitStatus, function (data) {
                                            if (ajaxUtil.success(data)) {
                                                if (data.code == 88888) {
                                                    alertUtil.success("提交成功");
                                                    isSuccess = true;
                                                    refreshTable();
                                                } else {
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        }, false);
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false, true);
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myFailReportModalData);
                    myPassModal.show();
                },
                'click .failtwo' : function (e, value, row, index) {
                    var myFailReportModalData ={
                        modalBodyID :"myFailReporttwoModal",
                        modalTitle : "局长审核不通过意见",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var d=new Date();
                            var PassReport = {
                                reasontwo : $("#reasontwo").val(),
                                updatertwo:"政务资源局长",
                                updatetwo : d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var submitStatus = {
                                "reportDataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源局长" ){
                                submitStatus.reportDataStatus = webStatus[6].id;
                            }
                            ajaxUtil.myAjax(null, "updaterequestreport", PassReport, function (data) {
                                if (data && ajaxUtil.success(data)) {
                                    if (data.code == ajaxUtil.successCode) {
                                        ajaxUtil.myAjax(null, "changestatustorequestreport/" + row.itemid + "/" + row.itemcode, submitStatus, function (data) {
                                            if (ajaxUtil.success(data)) {
                                                if (data.code == 88888) {
                                                    alertUtil.success("提交成功");
                                                    isSuccess = true;
                                                    refreshTable();
                                                } else {
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        }, false);
                                    } else {
                                        alertUtil.error(data.msg);
                                    }
                                }
                            }, false, true);
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myFailReportModalData);
                    myPassModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfReportModalData ={
                        modalBodyID :"myUnderShelfReportModal",
                        modalTitle : "撤销请示报告",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "reportDataStatus": webStatus[7].id
                            };
                            ajaxUtil.myAjax(null,"changestatustorequestreport/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("撤销成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(myUnderShelfReportModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/viewreport";
                    orange.redirect(viewUrl);
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitReportModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "reportDataStatus": getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustorequestreport/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已提交");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitReportModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitReportModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "reportDataStatus":webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"changestatustorequestreport/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已提交");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(myNoSubmitReportModalData);
                    mySubmitModal.show();
                },
            };

            $("#btn_addTask").unbind().on('click',function () {
                var url = "/document/report_add";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var aCol = [
                {field: 'reportTitle', title: '报告标题'},
                {field: 'filePath', title: '附件名称', formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<a href="'+value+'">'+row.fileName+'</a>'
                        }
                    }},
                {field:'itemcreateat',title:'日期'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);

        })
    function getRoleTable(role,preUrl,status,webStatus) {
       if(role === "政务资源科员"){
            $('#btn_addTask').attr('style',"display:block");
            return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
        }else if(role === "政务资源处长"){
            return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[4].id;
        }else if(role === "政务资源分管局长") {
            return preUrl + "?"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[10].id;
        } else if(role === "政务资源局长") {
           return preUrl + "?"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
       }
    }

    function getRoleOperate(value, row, index, role, status,webStatus) {
        if(role === "政务资源科员"){
            if(status == webStatus[0].id){
                return [
                    '<a class="edit" style="margin:0 0.8em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >修改</a>',
                    '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                    '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                ].join('');
            }else if(status == webStatus[2].id || status ==webStatus[3].id|| status ==webStatus[9].id){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[4].id || status == webStatus[5].id || status == webStatus[6].id|| status == webStatus[7].id){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                ].join('');
            }else if(status == webStatus[1].id || status == webStatus[8].id|| status == webStatus[10].id){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                ].join('');
            }

        }else if(role === "政务资源处长"){
            if(status == webStatus[1].id){
                return [
                    '<a  class="pass"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                    '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                    '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if( status == webStatus[4].id){
                return [
                    '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }

        }else if(role === "政务资源分管局长"){
            if(status == webStatus[10].id||status == webStatus[2].id ){
                return [
                    '<a  class="passone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                    '<a  class="failone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                    '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[5].id){
                return [
                    '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[9].id){
                return [
                    '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
                ].join('');
            }

        }
        else if(role === "政务资源局长"){
            if(status == webStatus[3].id || status == webStatus[8].id){
                return [
                    '<a  class="passtwo"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                    '<a  class="failtwo"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                    '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[6].id||status == webStatus[7].id){
                return [
                    '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[9].id){
                return [
                    '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
                ].join('');
            }

        }
    }

    function getStatus(role,webStatus) {
      if(role === "政务资源科员"){
            return webStatus[1].id
        }else if(role === "政务资源处长"){
            return webStatus[10].id
        }else if(role === "政务资源分管局长"){
            return webStatus[8].id
        }
      else if(role === "政务资源局长"){
          return webStatus[9].id
      }
    }


    return {
        getRoleTable:getRoleTable,
        getRoleOperate:getRoleOperate,
        getStatus: getStatus,
    }
})();