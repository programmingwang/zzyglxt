(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil','datetimepicker'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil,datetimepicker) {

            var url = "selectallrequestreport";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.reportStatus);
            url = getRoleTable(sessionStorage.getItem("rolename"),url,"reportDataStatus",webStatus);
            var aParam = {
            };
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
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
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
                        modalTitle: "处长审核通过意见",
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
                        modalTitle : "处长审核不通过意见",
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
                                submitStatus.reportDataStatus = webStatus[4].id;
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

                'click .send-file' : function (e, value, row, index) {
                    var mySendFileReceiptModalData ={
                        modalBodyID :"mySendFileModal",
                        modalTitle : "文件将下达到各个部门",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "reportDataStatus": webStatus[7].id
                            };
                            ajaxUtil.myAjax(null,"changestatustorequestreport/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();

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
                    var mySendFileModal = modalUtil.init(mySendFileReceiptModalData);
                    mySendFileModal.show();
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
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
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
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                return true;
                                            }
                                        }
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
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
                        if(value == null){
                            return '<p style="padding-top: 15px">无附件</p>';
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

            $("#btnSearch").unbind().on('click',function() {
                if(document.getElementById("stratTime")){
                    var stratTime=document.getElementById("stratTime").children;
                    var endTime=document.getElementById("endTime").children;
                    stratTime=stratTime[0].value+":"+stratTime[1].value+":"+stratTime[2].value;
                    endTime=endTime[0].value+":"+endTime[1].value+":"+endTime[2].value;
                }
                var newArry = [];
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isTimeSlot=false;             // 默认时间条件为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        // console.log(allTableData[i]["govPunlic"]);
                        //调试时可以先打印出来，进行修改
                        //当存在时将条件改为flase
                        var makeTime = allTableData[i]["itemcreateat"].substring(11,19);
                        if (makeTime >= stratTime && makeTime <= endTime) {
                            isTimeSlot = true;
                        }
                        else {
                            isTimeSlot = false;
                        }
                        if (stratTime == endTime) {
                            isTimeSlot = true;
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if($("#closeAndOpen").text().search("展开")!= -1 && textP.search(str) != -1){
                            isTimeSlot = false;
                            newArry.push(allTableData[i])
                        }
                        if($("#closeAndOpen").text().search("收起")!= -1 && textP.search(str) != -1 && isTimeSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);

            })

            var aria=this.ariaExpanded;
            var element=document.getElementById("stratTime");
            $("#closeAndOpen").unbind().on('click',function(){
                this.innerText="";
                if (aria==="true"){
                    this.innerText="展开";
                    aria = "false";
                    if (typeof(element)!= "undefined" || element != null){
                        document.getElementById("btn_addTask").classList.remove("openBtnP");
                    }
                } else {
                    this.innerText="收起";
                    aria = "true";
                    if (typeof(element)!= "undefined" || element != null){
                        document.getElementById("btn_addTask").classList.add("openBtnP");
                    }

                }
            })

        })
    function getRoleTable(role,preUrl,status,webStatus) {
       if(role === "政务资源科员"){
            $('#btn_addTask').attr('style',"display:block");
            return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
        }else if(role === "政务资源处长"){
            return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[7].id;
        }else if(role === "政务资源分管局长") {
            return preUrl + "?"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[7].id;
        } else if(role === "政务资源局长") {
           return preUrl + "?"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[9].id;
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
            }else if(status == webStatus[4].id || status == webStatus[5].id || status == webStatus[6].id){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    '<a class="edit" style="margin:0 0.8em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >修改</a>',
                    '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                ].join('');
            }else if(status == webStatus[1].id){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                ].join('');
            }
            else if(status == webStatus[7].id){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                ].join('');
            }

        }else if(role === "政务资源处长"){
            if(status == webStatus[1].id){
                return [
                    '<a  class="view"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>', ,
                    '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if( status == webStatus[2].id||status == webStatus[4].id||status == webStatus[7].id){
                return [
                    '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }

        }else if(role === "政务资源分管局长"){
            if(status == webStatus[2].id){
                return [
                    '<a  class="view"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                    '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[3].id||status == webStatus[5].id||status == webStatus[7].id){
                return [
                    '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }
        }
        else if(role === "政务资源局长"){
            if(status == webStatus[3].id){
                return [
                    '<a  class="view"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>', ,
                    '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[6].id||status == webStatus[7].id){
                return [
                    '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                ].join('');
            }else if(status == webStatus[9].id){
                return [
                    '<a  class="send-file" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下达文件</a>',
                    '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                ].join('');
            }

        }
    }

    function getStatus(role,webStatus) {
      if(role === "政务资源科员"){
            return webStatus[1].id
        }else if(role === "政务资源处长"){
            return webStatus[13].id
        }else if(role === "政务资源分管局长"){
            return webStatus[8].id
        }
      else if(role === "政务资源局长"){
          return webStatus[7].id
      }
    }


    return {
        getRoleTable:getRoleTable,
        getRoleOperate:getRoleOperate,
        getStatus: getStatus,
    }
})();