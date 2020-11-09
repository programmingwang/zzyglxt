(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/industrialdevelop/achievement";
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                return [
                    '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >编辑</button>',
                    '<button type="button" class="delete btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                ].join('');
            }


            function addUpdate(addOrUpdate,row){
                var myUpdateModalData ={
                    modalBodyID : "myAddUpdateModalProject",
                    modalTitle : addOrUpdate === "add" ? "新增项目" :"修改项目",
                    modalConfirmFun:function () {
                        var projectEntity = {
                            projectName: $("#projectName").val(),
                            industrialDevelopName: $("#industrialDevelopName").val(),
                            industrialDevelopLeader: $("#industrialDevelopLeader").val(),
                            industrialDevelopStatus: $("#industrialDevelopStatus").val()
                        };

                        if(addOrUpdate === "add"){
                            ajaxUtil.myAjax(null,"api/project/addProject",projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("新增项目成功");
                                    refreshTable();
                                    myUpdateModal.hide();
                                }else {
                                    alertUtil.alert(data.msg)
                                }
                            },false);
                        }

                        if(addOrUpdate === "update"){
                            projectEntity.projectID = row.projectID;
                            ajaxUtil.myAjax(null,"api/project/updateProject",projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("更新项目成功");
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





                if(addOrUpdate === "update"){
                    $("#projectName").val(row.projectName);
                    $("#industrialDevelopName").val(row.industrialDevelopName);
                    $("#industrialDevelopLeader").val(row.industrialDevelopLeader);
                    $("#industrialDevelopStatus").val(row.industrialDevelopStatus)
                }
                myUpdateModal.show();
            }

            // function addModule(row){
            //     var myAddModuleModalData ={
            //         modalBodyID : "myAddModuleModal",
            //         modalTitle : "新增模块",
            //         modalConfirmFun:function () {
            //             var moduleEntity = {
            //                 moduleName: $("#moduleName").val(),
            //                 projectID: $("#projectID").val(),
            //             };
            //
            //             ajaxUtil.myAjax(null,"api/project/addModule",moduleEntity,function (data) {
            //                 if(ajaxUtil.success(data)){
            //                     alertUtil.info("新增模块成功");
            //                     refreshTable();
            //                     myaddModuleModal.hide();
            //                 }else {
            //                     alertUtil.alert(data.msg)
            //                 }
            //             },false);
            //         //    数据能正常入库，只是刚刚加入的数据无法正常同步，不知道为什么？？
            //
            //         }
            //
            //     };
            //     var myaddModuleModal = modalUtil.init(myAddModuleModalData);
            //
            //     var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.PROJECT_LIST);
            //     $("#projectID").selectUtil(pl).on('change',function () {
            //         var ml = dictUtil.getDictByCode(dictUtil.DICT_LIST.Module_LIST,$("#projectID").val(),true);
            //         $("#moduleName").selectUtil(ml);
            //     });
            //
            //     var ml = dictUtil.getDictByCode(dictUtil.DICT_LIST.Module_LIST,stringUtil.isBlank(row) ? $("#projectID").val() : row.projectID ,true);
            //     $("#moduleName").selectUtil(ml);
            //
            //     myaddModuleModal.show();
            // }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    addUpdate("update",row)
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteAchievement",
                        modalTitle : "删除科研成果",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var projectEntity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/industrialdevelop/achievement",projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除项目成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,"123","delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                }
            };


            $("#search").unbind().on("click",function () {
                var param = {

                };
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            });

            $("#btn_addProject").unbind().on('click',function () {
                addUpdate("add");
            });

            $("#btn_addTask").unbind().on('click',function () {
                $("#main_body").html("");
                var url = "/add/js/industrialDev/achievement";
                orange.loadPage({url: url, target: 'main_body', selector: '#fir_body', success: function(data){

                        if(data == null||data == ""){
                            return alertUtil.error( url+'加载失败');
                        }

                        $("#main_body").html(data);
                    }})
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);


            var aCol = [
                {field: 'projectName', title: '项目名称'},
                {field: 'industrialDevelopName', title: '研究成果'},
                {field: 'industrialDevelopLeader', title: '主研人'},
                {field: 'industrialDevelopStatus', title: '成果状态'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }
        })
})();
