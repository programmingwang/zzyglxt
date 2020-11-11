(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/medicalService/chineseMedicine/selectAll";
            var addUrl = "/medicalService/add/addChineseMedicine"
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
                        modalBodyID : "myDeleteChineseMedicine",
                        modalTitle : "删除名老中医",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var chineseMedicineKey = {
                                itemid : row.itemid,
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,"/medicalService/chineseMedicine/delete",chineseMedicineKey,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("文件删除失败");
                                        }
                                    },false,"","get");
                                    alertUtil.info("删除名老中医信息成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,true,"delete");
                            return isSuccess;
                        }
                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                }
            };

            /*新增名老中医*/
            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl)
            });

            var aCol = [
                {field: 'chineseMedicineName', title: '专家名称'},
                {field: 'filePath', title: '专家照片',formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                        }
                    }},
                {field: 'specialtyName', title: '所在科室'},
                {field: 'hospitalName', title: '所属医院'},
                {field: 'phone', title: '联系电话'},
                {field: 'itemcreateat', title: '发布时间'},
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
