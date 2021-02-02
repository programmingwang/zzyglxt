(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/industrialdevelop/medmat/selectMedMat";
            var addUrl = "/industrialdevelop/medMat/medMat_add"
            var medStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.medStatus);
            var aParam = {
            };

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.medStatus);
            $("#chargePersonSearch").selectUtil(pl);

            //操作
            function operation(value, row, index){
                if (row.status == medStatus[1].id) {
                    return ['<a  class="under-shelf" style=" 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>'].join('');
                }
                else {
                    return [
                        '<a class="edit" style="1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteMedMat",
                        modalTitle : "删除药材",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var hospKey = {
                                itemid : row.itemid,
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/medmat/delete",hospKey,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("文件删除失败");
                                        }
                                    },false,"","get");
                                    var submitConfirmModal = {
                                        modalBodyID: "myTopicSubmitTip",
                                        modalTitle: "提示",
                                        modalClass: "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        confirmButtonClass: "btn-danger",
                                        modalConfirmFun: function () {
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
                    return false;
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfTravelModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "status": medStatus[2].id
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/medmat/updateStatus",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID: "myTopicSubmitTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfTravelModalData);
                    myUnderShelfModal.show();
                },
            };

            /*新增药材*/
            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl)
            });



            var aCol = [
                {field: 'name', title: '药草名称'},
                {field: 'specifications', title: '规格'},
                {field: 'price', title: '价格'},
                {field: 'status', title: '状态', formatter:function (value, row, index) {
                        return medStatus[row.status].text
                }},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];


            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol, "status");
        })
})();
