(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            //请求后台url
            var url = "/industrialdevelop/achievement";


            var getUrl = url + "/" + sessionStorage.getItem("orgCode");
            //请求页面url
            var pathUrl = url;
            //请求新增页面url
            var addUrl = pathUrl+"_add";

            var showStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus)
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                if(row.industrialDevelopStatus == showStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >上架</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(row.industrialDevelopStatus == showStatus[1].id){
                    return [
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }else if(row.industrialDevelopStatus == showStatus[2].id){
                    return [
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
                                    ajaxUtil.deleteFile(row.itemcode);
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
                },
                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfAchiModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "industrialDevelopStatus": showStatus[2].id,
                                "itemid" : row.itemid,
                                "itemcode" : row.itemcode
                            };
                            ajaxUtil.myAjax(null,url,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        alertUtil.success("下架成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(myUnderShelfAchiModalData);
                    myUnderShelfModal.show();
                },
                'click .submit' : function (e, value, row, index) {
                    var mySubmitAchiModalData ={
                        modalBodyID :"myShowModal",
                        modalTitle : "上架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "industrialDevelopStatus": showStatus[1].id,
                                "itemid" : row.itemid,
                                "itemcode" : row.itemcode
                            };
                            ajaxUtil.myAjax(null,url,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        alertUtil.success("展示成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(mySubmitAchiModalData);
                    myUnderShelfModal.show();
                },
            };


            $("#search").unbind().on("click",function () {
                var param = {

                };
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            });


            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl)
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);


            var aCol = [
                {field: 'projectName', title: '项目名称'},
                {field: 'industrialDevelopName', title: '研究成果'},
                {field: 'industrialDevelopLeader', title: '主研人'},
                {field: 'industrialDevelopStatus', title: '成果状态', formatter: function (value) {
                    return '<p>'+showStatus[value].text+'</p>'
                }},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",getUrl,aParam, aCol);



        })
})();
