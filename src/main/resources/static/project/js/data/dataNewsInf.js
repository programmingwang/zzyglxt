(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


        var url = "/datado/newsInf/selectAll";
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
                var url = "/data/add/addNewsInf";
                orange.redirect(url);
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
                                alertUtil.info("删除新闻信息成功");
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

            },

            'click .fail' : function (e, value, row, index) {

            },
        };


        $("#btn_addTask").unbind().on('click',function () {
            $("#main_body").html("");
            var url = "/data/add/addNewsInf";
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
    })
})();
