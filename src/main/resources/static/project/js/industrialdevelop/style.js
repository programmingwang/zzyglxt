(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/industrialdevelop/base-style";

            var pathUrl = "/industrialdevelop/style";
            var addUrl = pathUrl+"_add";
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                return [
                    '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >编辑</button>',
                    '<button type="button" class="delete btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                ].join('');
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteCooperation",
                        modalTitle : "删除服务项目",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var projectEntity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,url,projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.deleteFile(row.itemcode)
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


            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);


            var aCol = [
                {field: 'filePath', title: '基地照片', formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                        }
                    }},
                {field: 'itemcreateat', title: '上传时间'},
                {field: 'status', title: '照片状态'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);
            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));
            //console.log(obj2);
        })
})();
