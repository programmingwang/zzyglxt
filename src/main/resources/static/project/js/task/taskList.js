(function () {
    require(['ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'dictUtil','modalUtil','stringUtil', 'bootstrap','selectUtil'],
        function (ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, dictUtil, modalUtil,stringUtil) {


            var url = "/api/task/getTaskList";
            var aParam = {};


            //操作
            function operation(value, row, index) {
                return [
                    '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >修改</button>',
                    '<button type="button" class="update btn btn-primary btn-sm" style="margin-right: 5px"  data-toggle="modal" data-target="#staticBackdrop" >更新状态</button>',
                    '<button type="button" class="delete btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',

                ].join('');
            }



            function addUpdate(addOrUpdate,row){
                var myUpdateModalData ={
                    modalBodyID : "myAddUpdateModal",
                    modalTitle : addOrUpdate === "add" ? "新增任务" :"修改信息",
                    modalConfirmFun:function () {
                        var taskEntity = {
                            taskName: $("#taskName").val(),
                            moduleID: $("#moduleName").val(),
                            projectID: $("#projectName").val(),
                            chargePerson: $("#chargePerson").val(),
                            applicant: $("#applicantStatus").val()
                        };

                        if(addOrUpdate === "add"){
                            ajaxUtil.myAjax(null,"api/task/addTask",taskEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("新增任务成功");
                                    refreshTable();
                                    myUpdateModal.hide();
                                }else {
                                    alertUtil.alert(data.msg)
                                }
                            },false);
                        }

                        if(addOrUpdate === "update"){
                            taskEntity.taskID = row.taskID;
                            ajaxUtil.myAjax(null,"api/task/updateTask",taskEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("更新任务成功");
                                    refreshTable();
                                    myUpdateModal.hide();
                                }else {
                                    alertUtil.alert(data.msg)
                                }
                            },false);
                        }


                    }

                };
                var myUpdateModal = modalUtil.init(myUpdateModalData);


                var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.PROJECT_LIST);
                $("#projectName").selectUtil(pl).on('change',function () {
                    var ml = dictUtil.getDictByCode(dictUtil.DICT_LIST.Module_LIST,$("#projectName").val(),true);
                    $("#moduleName").selectUtil(ml);
                });

                var ml = dictUtil.getDictByCode(dictUtil.DICT_LIST.Module_LIST,stringUtil.isBlank(row) ? $("#projectName").val() : row.projectID ,true);
                $("#moduleName").selectUtil(ml);

                var it = dictUtil.getDictByCode(dictUtil.DICT_LIST.pm_ImportanceType);
                $("#applicant").selectUtil(it);

                if(addOrUpdate === "update"){
                    $("#taskName").val(row.taskName);
                    $("#moduleName").val(row.moduleID);
                    $("#projectName").val(row.projectID);
                    $("#chargePerson").val(row.chargePerson);
                    $("#applicant").val(row.applicant);
                    $("#createBy").val(row.createBy);
                    $("#createAt").val(stringUtil.formatDateTime(row.createAt));
                }
                myUpdateModal.show();
            }



            window.orgEvents = {
                //修改事件
                'click .edit': function (e, value, row, index) {
                    addUpdate("update",row);
                },


                'click .update': function (e, value, row, index) {
                    var myUpdateStatusModalData ={
                        modalBodyID : "myUpdateStatusModal",
                        modalTitle : "更新状态",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var taskEntity = {
                                taskID: row.taskID
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/api/task/updateTaskStatus",taskEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("更新状态成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var myUpdateStatusModal = modalUtil.init(myUpdateStatusModalData);
                    myUpdateStatusModal.show();
                },


                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModal",
                        modalTitle : "删除任务",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var taskEntity = {
                                taskID: row.taskID
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/api/task/deleteTask",taskEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除任务成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false);
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                }
            };


            $("#btn_sel").unbind().on("click", function () {
                refreshTable();
            });


            $("#btn_addTask").unbind().on('click',function () {
                addUpdate("add");
            });


            


            var aCol = [
                {field: 'taskName', title: '任务名称'},
                {field: 'moduleName', title: '所属模块'},
                {field: 'projectName', title: '所属项目'},
                {width: '80px', field: 'chargePerson', align: 'center', title: '负责人'},
                {
                    width: '90px', field: 'applicant', align: 'center', title: '重要程度', formatter: function (value, row, index) {
                        return dictUtil.getImportanceType(value);
                    }
                },
                {width: '241px', field: 'action', align: 'center', title: '操作', formatter: operation, events: orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }
        })
})();
