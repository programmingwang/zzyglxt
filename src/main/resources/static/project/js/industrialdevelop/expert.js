(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/industrialdevelop/expert/selectAll";
            var addUrl = "/industrialdevelop/expert/insert"
            var aParam = {};

            //操作
            function operation(value, row, index){
                return [
                    '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>',
                    '<a class="resetpassword" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >重置密码</a>',
                    '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                ].join('');
            }

            //修改事件
            window.orgEvents = {

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteExpert",
                        modalTitle : "删除",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var projectEntity = {
                                itemcode: row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/industrialdevelop/expert/"+row.itemcode,projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.deleteFile(row.itemcode);
                                    alertUtil.info("删除成功");
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

                'click .view' : function (e, value, row, index) {
                    var myViewTravelModalData ={
                        modalBodyID : "myViewChineseMedicineModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myTravelModal = modalUtil.init(myViewTravelModalData);
                    $("#chineseMedicineImg").attr("src",row.filePath)
                    $("#chineseMedicineName").val(row.chineseMedicineName);
                    $("#chineseMedicineType").val(row.chineseMedicineType);
                    $("#chineseMedicineTitle").val(row.chineseMedicineTitle);
                    $("#hospitalName").val(row.hospitalName);
                    $("#specialtyName").val(row.specialtyName);
                    $("#visitTime").val(row.visitTime);
                    $("#phone").val(row.phone);
                    $("#mainVisit").val(row.mainVisit);
                    $("#expertIntroduce").val(row.expertIntroduce);
                    $("#medicineRecords").val(row.medicineRecords);
                    $("#chineseMedicineStatus").val(row.chineseMedicineStatus);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    myTravelModal.show();
                },

                'click .resetpassword' : function (e, value, row, index) {
                    var myResetPasswordModalData ={
                        modalBodyID :"myResetPassword",
                        modalTitle : "重置密码",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                userCode: row.userCode
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/expert/resetPassword/"+row.userCode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已重置");
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
                    var myResetPasswordModal = modalUtil.init(myResetPasswordModalData);
                    myResetPasswordModal.show();
                },
            };

            /*新增专家账号*/
            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl)
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'username', title: '用户账号'},
                {field: 'name', title: '专家姓名'},
                {field: 'filed', title: '擅长领域'},
                {field: 'gender', title: '性别'},
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
