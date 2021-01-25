(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "selectallhealthsciknowdo";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"scienceKnowledgeStatus",webStatus);
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.scienceKnowledgeStatus,webStatus)
            }


            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/healthCare/insertsciKnow");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModalSciknow",
                        modalTitle : "删除科普知识",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deletehealthsciknowdo/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除科普知识名称成功");
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
                    var myPassSciKnowModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "scienceKnowledgeStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustosciknow/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        /*if(selectUtil.getStatus(sessionStorage.getItem("rolename")) == "处长已审核")*/
                                        if(sessionStorage.getItem("rolename") == "文化宣传处长")
                                        {
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
                    var myPassModal = modalUtil.init(myPassSciKnowModalData);
                    myPassModal.show();
                },
                'click .fail' : function (e, value, row, index) {
                    var myFailSciKnowModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "statscienceKnowledgeStatusus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.statscienceKnowledgeStatusus = webStatus[3].id;
                            }else{
                                submitStatus.statscienceKnowledgeStatusus = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustosciknow/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myFailModal = modalUtil.init(myFailSciKnowModalData);
                    myFailModal.show();
                },
                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfSciKnowModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "statscienceKnowledgeStatusus":  webStatus[6].id
                            };
                            ajaxUtil.myAjax(null,"changestatustosciknow/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfSciKnowModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewSciKnowModalData ={
                        modalBodyID : "myViewSciKnowModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var mySciKnowModal = modalUtil.init(myViewSciKnowModalData);
                    $("#scienceKnowledgeName").val(row.scienceKnowledgeName);
                    $("#scienceKnowledgeSource").val(row.scienceKnowledgeSource);
                    $("#scienceKnowledgeAuthor").val(row.scienceKnowledgeAuthor);
                    $("#scienceKnowledgeStatus").val(webStatus[row.scienceKnowledgeStatus].text);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#content").html(row.content);
                    mySciKnowModal.show();
                },
                'click .submit' : function (e, value, row, index) {
                    var mySubmitSciKnowModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "scienceKnowledgeStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"/changestatustosciknow/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(mySubmitSciKnowModalData);
                    mySubmitModal.show();
                },
                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitSciKnowModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "statscienceKnowledgeStatusus":  webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"changestatustosciknow/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(myNoSubmitSciKnowModalData);
                    mySubmitModal.show();
                },
            };


            $("#btn_addTask").unbind().on('click',function () {
                var url = "/healthCare/insertsciKnow";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'scienceKnowledgeName', title: '科普知识标题'},
                {field: 'scienceKnowledgeSource', title: '来源'},
                {field: 'scienceKnowledgeAuthor', title: '作者'},
                {field:'itemcreateat',title:'发布时间'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            var jQuery = $("#btnSearch").unbind().on('click',function() {
                if(document.getElementById("stratTime")){
                    var stratTime=document.getElementById("stratTime").children;
                    var endTime=document.getElementById("endTime").children;
                    stratTime=stratTime[0].value+":"+stratTime[1].value+":"+stratTime[2].value;
                    endTime=endTime[0].value+":"+endTime[1].value+":"+endTime[2].value;
                }
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value;
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                console.log(allTableData)
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=true;           // 默认状态为true
                        var isTimeSlot=true;             // 默认时间条件为true
                        if(aCol[v].field=="webStatus"){    //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                            isStatusSlot=false;           //当存在时将条件改为flase
                            var webStatus= allTableData[i][aCol[v].field]
                            // console.log("addstr:"+addstr)
                            // console.log("status:"+status)
                            //调试时可以先打印出来，进行修改
                            if(addstr==webStatus){
                                isStatusSlot=true;
                            }
                        }
                        if(aCol[v].field=="time"){    //时间条件判断,与表格字段的状态一致,这里根据自己写的修改
                            isTimeSlot=false;          //当存在时将条件改为flase
                            var makeTime= allTableData[i][aCol[v].field]
                            if(makeTime>=stratTime && makeTime<=endTime){
                                isTimeSlot=true;
                            }
                            if(stratTime==endTime){
                                isTimeSlot=true;
                            }
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(textP.search(str)!=-1&&isStatusSlot&&isTimeSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);
            })

        })
})();