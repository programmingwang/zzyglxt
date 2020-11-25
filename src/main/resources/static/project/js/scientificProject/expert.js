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
                    var myViewExpertModalData ={
                        modalBodyID : "myViewExpertModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myViewExpertModal = modalUtil.init(myViewExpertModalData);
                    $("#username").val(row.username);
                    $("#name").val(row.name);
                    $("#gender").val(row.gender);
                    $("#idcardType").val(row.idcardType);
                    $("#idcardNo").val(row.idcardNo);
                    $("#email").val(row.email);
                    $("#mobilephone").val(row.mobilephone);
                    $("#cityid").val(row.cityid);
                    $("#portrait").val(row.portrait);
                    $("#filed").val(row.filed);
                    myViewExpertModal.show();
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
            $("#btn_addTask").unbind().on('click',function (e, value, row, index) {
                var myaddExpertModalData ={
                    modalBodyID :"myaddExpertModal",
                    modalTitle : "新增专家账号",
                    modalClass : "modal-lg",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun : function () {
                       var param = {
                           username:$("#expertAccount").val(),
                           name:$("#expertName").val(),
                           filed : $("#expertFiled").val(),
                           gender:$("#expertGender").val(),
                           mobilephone:$("#expertPhone").val()
                       }
                        ajaxUtil.myAjax(null, addUrl, param, function (data) {
                            if (ajaxUtil.success(data)) {
                                alertUtil.success("新增成功");
                                myaddExpertModal.hide();
                                refreshTable();
                            } else {
                                alertUtil.error("新增失败");
                            }
                        }, true, "123", 'post');
                    }
                };
                var myaddExpertModal = modalUtil.init(myaddExpertModalData);
                myaddExpertModal.show();
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'username', title: '用户账号'},
                {field: 'name', title: '专家姓名'},
                {field: 'filed', title: '擅长领域'},
                {field: 'gender', title: '性别',width:'120px'},
                {field: 'mobilephone', title: '联系电话',width:'120px'},
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
