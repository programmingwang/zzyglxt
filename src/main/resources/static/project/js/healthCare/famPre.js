(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "selectallfampredo";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            //角色加载工具
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"status",webStatus);

            var aParam = {

            };
            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.status,webStatus)
            }
            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/healthCare/insertfamPre");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModalfamPre",
                        modalTitle : "删除历史名方",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            /*var projectEntity = {
                                projectID: row.projectID
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };*/
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deletefamprerdo/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除历史名方成功");
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
                    var myPassFamPreModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustofampre/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myPassModal = modalUtil.init(myPassFamPreModalData);
                    myPassModal.show();
                },
                'click .fail' : function (e, value, row, index) {
                    var myFailFamPreModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": ""
                            };
                            if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.status = webStatus[3].id;
                            }else{
                                submitStatus.status = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustofampre/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myFailModal = modalUtil.init(myFailFamPreModalData);
                    myFailModal.show();
                },
                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfFamPreModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": webStatus[6].id
                            };
                            ajaxUtil.myAjax(null,"changestatustofampre/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfFamPreModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewFamPreModalData ={
                        modalBodyID : "myViewFamPreModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myFamPreModal = modalUtil.init(myViewFamPreModalData);
                    $("#name").val(row.name);
                    $("#source").val(row.source);
                    $("#prescription").val(row.prescription);
                    $("#status").val(webStatus[row.status].text);
                    $("#type").val(row.type);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#content").html(row.content);
                    myFamPreModal.show();
                },
                'click .submit' : function (e, value, row, index) {
                    var mySubmitFamPreModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustofampre/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(mySubmitFamPreModalData);
                    mySubmitModal.show();
                },
                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitFamPreModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"changestatustofampre/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(myNoSubmitFamPreModalData);
                    mySubmitModal.show();
                },
            };

            $("#btn_addTask").unbind().on('click',function () {
                var url = "/healthCare/insertfamPre";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'name', title: '方名'},
                {field: 'source', title: '出处'},
                {field: 'prescription', title: '处方'},
                {field: 'content',title:'制法及用法'},
                {field: 'type', title: '剂型',width: '70px'},
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