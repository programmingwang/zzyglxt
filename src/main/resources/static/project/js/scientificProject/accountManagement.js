(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/user/alluser";
            // var addUrl = "/medicalService/add/addChineseMedicine"
            var aParam = {
            };

            // /ar webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            /*对url加工*/
            // url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"chineseMedicineStatus",webStatus);

            //操作
            function operation(value, row, index){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >重置密码</a>',
                    '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                ].join('');
            }

            //修改事件
            window.orgEvents = {
                // 'click .edit' : function(e, value, row, index) {
                //     localStorage.setItem("rowData", JSON.stringify(row));
                //     orange.redirect(addUrl);
                // },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteAccount",
                        modalTitle : "删除账号",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var chineseMedicineKey = {
                                itemid : row.itemid,
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,"/user/deletebykey",chineseMedicineKey,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除账号信息成功");
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

                'click .view' : function (e, value, row, index) {
                    var myViewTravelModalData ={
                        modalBodyID : "myViewAccountMessageModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myTravelModal = modalUtil.init(myViewTravelModalData);
                    $("#portrait").attr("src",row.filePath);
                    $("#username").val(row.username);
                    $("#name").val(row.name);
                    $("#gender").val(row.gender);
                    $("#IDCardType").val(row.idcardType);
                    $("#IDCardNo").val(row.idcardNo);
                    $("#email").val(row.email);
                    $("#contacts").val(row.contacts);
                    $("#mobilephone").val(row.mobilephone);
                    $("#cityid").val(row.cityid);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    myTravelModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitTravelModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "status": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"/medicalService/chineseMedicine/updateStatus",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已提交");
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
                    var mySubmitModal = modalUtil.init(mySubmitTravelModalData);
                    mySubmitModal.show();
                }
            };

            /*新增名老中医*/
            // $("#btn_addTask").unbind().on('click',function () {
            //     localStorage.removeItem("rowData");
            //     orange.redirect(addUrl)
            // });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'username', title: '用户账号'},
                {field: 'name', title: '账号名称'},
                {field: 'cityid', title: '主管市区'},
                {field: 'contacts', title: '联系人'},
                {field: 'mobilephone', title: '联系电话'},
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
