(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil) {


            var getUrl = "/industrialdevelop/ser-pro";

            var opUrl = "/industrialdevelop/ser-pro";

            var pathUrl = "/serviceItems/tecserviceorg";

            var addUrl = pathUrl + "_add";

            var aParam = {};

            var medStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.medStatus);

            //操作
            function operation(value, row, index) {
                if (row.status === "1"){
                    return [
                        '<a class="unshelve" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >下架</a>'
                    ].join('')
                } else {
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }
            }

            //修改事件
            window.orgEvents = {
                'click .edit': function (e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },
                'click .unshelve': function (e, value, row) {
                    var projectEntity = {
                        itemid: row.itemid,
                        itemcode: row.itemcode,
                        status: 2
                    };
                    ajaxUtil.myAjax(null, "/industrialdevelop/ser-pro", projectEntity, function (data) {
                        if (data && data.code == 88888) {
                            alertUtil.success(data.msg);
                            orange.redirect("/serviceItems/tecserviceorg")
                        } else {
                            alertUtil.error(data.msg);
                        }
                    }, false, "123", "put");
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
                {field: 'status', title: '项目状态',formatter:function (row) {
                        return '<p>'+medStatus[row].text+'</p>';
                    }},
                {field: 'action', title: '操作', formatter: operation, events: orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table", getUrl, aParam, aCol);
            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));
            //console.log(obj2);
        })
})();
