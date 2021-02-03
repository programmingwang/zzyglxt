(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

        var url = "/datado/newsInf/selectAllNewsInf";

        var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);

        //角色加载工具
        url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"dataStatus",webStatus);

        var addUrl = "/data/add/addNewsInf";
        var aParam = {

        };

        //操作
        function operation(value, row, index){
            return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.dataStatus,webStatus);
        }

        //修改事件
        window.orgEvents = {
            'click .edit' : function(e, value, row, index) {
                localStorage.setItem("rowData", JSON.stringify(row));
                orange.redirect(addUrl);
            },

            'click .delete': function (e, value, row, index) {
                var myDeleteModalData ={
                    modalBodyID : "myDeleteNewsInf",
                    modalTitle : "删除新闻信息",
                    modalClass : "modal-lg",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        ajaxUtil.myAjax(null,"/datado/newsInf/deleteByPrimaryKey/"+row.itemid+"/"+row.itemcode,null,function (data) {
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
                var myPassNewsNewsInfModalData ={
                    modalBodyID :"myPassModal",
                    modalTitle : "审核通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        //判断是否在前面加0
                        function getNow(s) {
                            return s < 10 ? '0' + s: s;
                        }
                        var myDate = new Date();
                        var year=myDate.getFullYear();        //获取当前年
                        var month=myDate.getMonth()+1;   //获取当前月
                        var date=myDate.getDate();            //获取当前日
                        var h=myDate.getHours();              //获取当前小时数(0-23)
                        var m=myDate.getMinutes();          //获取当前分钟数(0-59)
                        var s=myDate.getSeconds();
                        var now=year+'-'+getNow(month)+"-"+getNow(date)+" "+getNow(h)+':'+getNow(m)+":"+getNow(s);
                        var submitStatus = {
                            "dataStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus),
                            "dataDelayedRelease": now
                        };
                        ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var myPassModal = modalUtil.init(myPassNewsNewsInfModalData);
                myPassModal.show();
            },

            'click .fail' : function (e, value, row, index) {
                var myFailNewsInfModalData ={
                    modalBodyID :"myFailModal",
                    modalTitle : "审核不通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "dataStatus": ""
                        };
                        if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                            submitStatus.dataStatus = webStatus[3].id;
                        }else{
                            submitStatus.dataStatus = webStatus[4].id;
                        }
                        ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var myFailModal = modalUtil.init(myFailNewsInfModalData);
                myFailModal.show();
            },

            'click .under-shelf' : function (e, value, row, index) {
                var myUnderShelfNewsInfModalData ={
                    modalBodyID :"myUnderShelfModal",
                    modalTitle : "下架",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "dataStatus": webStatus[6].id
                        };
                        ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var myUnderShelfModal = modalUtil.init(myUnderShelfNewsInfModalData);
                myUnderShelfModal.show();
            },

            'click .view' : function (e, value, row, index) {
                var myViewNewsInfModalData ={
                    modalBodyID : "myViewDataModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle : "查看详情",
                    modalClass : "modal-lg",
                    confirmButtonStyle: "display:none",
                };
                var myNewsInfModal = modalUtil.init(myViewNewsInfModalData);
                $("#dataTitle").val(row.dataTitle);
                $("#dataSource").val(row.dataSource);
                $("#dataAuthor").val(row.dataAuthor);
                $("#dataContent").html(row.dataContent);
                $("#creater").val(row.creater);
                $("#itemCreateAt").val(row.itemcreateat);
                $("#dataStatus").val(webStatus[row.dataStatus].text);
                $("#dataFileType").val(row.dataFileType);
                $("#imgDiv").attr("style","display:none");
                $('#dataTitleSpan').html("新闻标题");
                $('#dataFileTypeSpan').html("新闻性质");

                myNewsInfModal.show();
            },

            'click .submit' : function (e, value, row, index) {
                var mySubmitNewsInfModalData ={
                    modalBodyID :"mySubmitModal",
                    modalTitle : "提交",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "dataStatus": ""
                        };
                        if(row.dataFileType=="转载性新闻" || row.dataFileType=="转载性公告"){
                            submitStatus.dataStatus = webStatus[2].id;
                        }else{
                            submitStatus = {
                                "dataStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            }
                        }
                        ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var mySubmitModal = modalUtil.init(mySubmitNewsInfModalData);
                mySubmitModal.show();
            },

            'click .no-submit' : function (e, value, row, index) {
                var myNoSubmitNewsInfModalData ={
                    modalBodyID :"myNoSubmitModal",
                    modalTitle : "取消提交",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "dataStatus": webStatus[0].id
                        };
                        ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var mySubmitModal = modalUtil.init(myNoSubmitNewsInfModalData);
                mySubmitModal.show();
            },
        };


        $("#btn_addTask").unbind().on('click',function () {
            localStorage.removeItem("rowData");
            orange.redirect(addUrl);
        });

        var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
        $("#chargePersonSearch").selectUtil(pl);


        var aCol = [
            {field: 'dataTitle', title: '新闻标题'},
            {field: 'dataSource', title: '来源'},
            {field: 'dataAuthor', title: '作者'},
            {field: 'itemcreateat', title: '发布时间'},
            {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
        ];

        var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

        function refreshTable() {
            var param = {};
            myTable.free();
            myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
        }

        bootstrapTableUtil.globalSearch("table",url,aParam, aCol, "dataStatus");


    })
})();
