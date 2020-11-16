(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil) {


            var getUrl = "/industrialdevelop/ser-pro";

            var opUrl = "/industrialdevelop/ser-pro";

            var pathUrl = "/serviceItems/tecserviceorg";

            var addUrl = pathUrl + "_add";

            var aParam = {};

            //操作
            function operation(value, row, index) {
                if (row.status == "——" || row.status == "已下架") {
                    return [
                        '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >编辑</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                } else if (row.status == "售卖中") {
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >下架</button>',
                    ].join('');
                }
            }

            //修改事件
            window.orgEvents = {
                'click .edit': function (e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },
                'click .view': function (e, value, row, index) {
                    var projectEntity = {
                        itemid: row.itemid,
                        itemcode: row.itemcode,
                        status: "已下架"
                    };
                    $.ajax({
                        url:"/industrialdevelop/ser-pro",
                        type:'PUT',
                        data: projectEntity,
                        processData: false,   // jQuery不要去处理发送的数据
                        contentType: 'application/json',   // jQuery不要去设置Content-Type请求头
                        success:function(data){
                            if(data && data.code == 88888){
                                alertUtil.success(data.msg);
                            }else{
                                alertUtil.error(data.msg);
                            }
                        },
                        error: function(data){
                            alertUtil.error(data.msg)
                        }
                    });
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData = {
                        modalBodyID: "myDeleteCooperation",
                        modalTitle: "删除服务项目",
                        modalClass: "modal-lg",
                        confirmButtonClass: "btn-danger",
                        modalConfirmFun: function () {
                            var projectEntity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null, getUrl, projectEntity, function (data) {
                                if (ajaxUtil.success(data)) {
                                    ajaxUtil.deleteFile(row.itemcode)
                                    alertUtil.info("删除项目成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            }, false, "123", "delete");
                            return isSuccess;
                        }
                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                }
            };


            $("#search").unbind().on("click", function () {
                var param = {};
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            });


            $("#btn_addTask").unbind().on('click', function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);


            var aCol = [
                {field: 'serviceProject', title: '服务项目名称'},
                {field: 'projectCost', title: '项目收费'},
                {field: 'contacts', title: '联系人'},
                {field: 'status', title: '项目状态'},
                {field: 'action', title: '操作', formatter: operation, events: orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table", getUrl, aParam, aCol);
        })
})();
