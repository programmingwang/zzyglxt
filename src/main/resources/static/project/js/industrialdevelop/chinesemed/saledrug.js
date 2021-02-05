(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/industrialdevelop/sale-drug";
            var medStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.medStatus);
            url = selectUtil.getRoleTabletwo(sessionStorage.getItem("rolename"),url,"status",medStatus);
            var aParam = {

            };
            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperatetwo(value,row,index,sessionStorage.getItem("rolename"),row.status,medStatus)
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/industrialdevelop/chinesemed/saledrug_add");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModalSaleDrug",
                        modalTitle : "删除药品名称",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var pmst={
                                itemid:row.itemid,
                                itemcode:row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/industrialdevelop/sale-drug",pmst,function (data) {
                                if(ajaxUtil.success(data)){
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        confirmButtonClass: "btn-danger",
                                        modalConfirmFun:function (){
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
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfSaleDrugModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": medStatus[2].id
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/changestatustosaledrug/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun:function (){
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfSaleDrugModalData);
                    myUnderShelfModal.show();
                },
                'click .shelf' : function (e, value, row, index){
                    var ShelfSaleDrugData ={
                        modalBodyID :"myShelfSaleDrugModal",
                        modalTitle : "上架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": medStatus[1].id
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/changestatustosaledrug/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun:function (){
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
                    var mySubmitModal = modalUtil.init(ShelfSaleDrugData);
                    mySubmitModal.show();
                },

               'click .view' : function (e, value, row, index) {
                    var myViewSaleDrugModalData ={
                        modalBodyID : "myviewSaleDrugModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var mySaleDrugModal = modalUtil.init(myViewSaleDrugModalData);
                    $("#drugName").val(row.drugName);
                    $("#functionIndications").val(row.functionIndications);
                    $("#usage").val(row.usage);
                    $("#adverseReactions").val(row.adverseReactions);
                    $("#taboo").val(row.taboo);
                    $("#specifications").val(row.specifications);
                    $("#careful").val(row.careful);
                    $("#packing").val(row.packing);
                   $("#mediCineImg").attr("src",row.filePath)
                   $('#mediCineImgSpan').html("药品图片");
                    $("#status").val(medStatus[row.status].text);
                    $("#orgCode").val(row.orgCode);
                    $("#creater").vai(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);

                   mySaleDrugModal.show();
                },
            };



            $("#cancel").unbind().on('click',function () {
                var url = "/industrialdevelop/chinesemed/saledrug";
                orange.redirect(url);
            });


            $("#btn_addTask").unbind().on('click',function () {
                var url = "/industrialdevelop/chinesemed/saledrug_add";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.medStatus);
            $("#chargePersonSearch").selectUtil(pl);


            var aCol = [
                {field: 'drugName', title: '药品名称'},
                {field: 'filePath', title: '药品图片', formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                                return '<img  src=' + value + ' width="100" height="100" class="img-rounded" >';

                        }
                    }},
                {field: 'specifications', title: '规格'},
                {field: 'status', title: '药品状态',formatter:function (row) {
                        return '<p>'+medStatus[row].text+'</p>';
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