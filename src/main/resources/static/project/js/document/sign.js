(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "governresCountersign/selectAll";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var emergencyStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"receivingDataStatus",webStatus);
            var aParam = {
            };

            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.receivingDataStatus,webStatus)
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/document/sign_add");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeletereceiptModal",
                        modalTitle : "删除内部会签",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deletereceipt/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除内部会签成功");
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
                    var myPassReceiptModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus":selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        if(sessionStorage.getItem("rolename") == "文化宣传处长"){
                                            alertUtil.info("审核已通过，已发送给综合处处长做最后审核！");
                                        }else{
                                            alertUtil.info("审核已通过，已上架！");
                                        }
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
                    var myPassModal = modalUtil.init(myPassReceiptModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailReceiptModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.status = webStatus[3].id;
                            }else{
                                submitStatus.status = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("操作成功");
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
                    var myFailModal = modalUtil.init(myFailReceiptModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfReceiptModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": webStatus[6].id
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("下架成功");
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfReceiptModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewReceiptModalData ={
                        modalBodyID : "myViewReceiptModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myReceiptModal = modalUtil.init(myViewReceiptModalData);
                    $("#receivingNum").val(row.receivingNum);
                    $("#receivingDateOfReceipt").val(row.receivingDateOfReceipt);
                    $("#receivingTitle").val(row.receivingTitle);
                    $("#receivingUnitOfCommun").val(row.receivingUnitOfCommun);
                    $("#fileNo").val(row.fileNo);
                    $("#number").val(row.number);
                    $("#secretLevel").val(row.secretLevel);
                    $("#receivingDegreeOfUrgency").val(emergencyStatus[row.receivingDegreeOfUrgency].text);
                    $("#timeLimit").val(row.timeLimit);
                    $("#creater").val(row.creater);
                    $("#itemCreateat").val(row.itemcreateat);
                    $("#receivingDataStatus").val(webStatus[row.receivingDataStatus].text);
                    $("#fileDiv").attr("style","display:block");
                    $("#upFile").text(row.fileName);
                    myReceiptModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitReceiptModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(mySubmitReceiptModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitReceiptModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus":webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(myNoSubmitReceiptModalData);
                    mySubmitModal.show();
                },
            };

            $("#btn_addTask").unbind().on('click',function () {
                var url = "/document/sign_add";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });


            var aCol = [
                {field: 'receivingTitle', title: '文件标题'},
                {field: 'fileNo', title: '文号'},
                {field: 'status', title: '公开方式'},
                {field:'itemupdateat',title:'发文日期'},
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
})();