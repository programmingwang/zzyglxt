(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil','uploadImg'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil,uploadImg) {


            var url = "/user/alluser";
            var aParam = {
            };

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

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteAccount",
                        modalTitle : "删除账号",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var chineseMedicineKey = {
                                'username':row.username,
                                'orgName':sessionStorage.getItem('orgName')
                            };
                            ajaxUtil.myAjax(null,"/user/deletuser",chineseMedicineKey,function (data) {
                                if(ajaxUtil.success(data)){
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            refreshTable();
                                            return true;
                                        }
                                    };
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                    isSuccess = true;
                                }
                            },false,'123',"post");
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
                    $("#username").val(row.username);
                    $("#name").val(row.name);
                    $("#roleName").val(row.roleName);
                    $("#contacts").val(row.contacts);
                    $("#mobilephone").val(row.mobilephone);
                    $("#cityid").val(row.cityid);
                    myTravelModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitTravelModalData ={
                        modalBodyID :"myResetPassword",
                        modalTitle : "重置密码",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                            };
                            ajaxUtil.myAjax(null,"/user/reset",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    var submitConfirmModal = {
                                        modalBodyID :"myResetPasswordTips",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            return true;
                                        }
                                    };
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                    isSuccess = true;
                                }else{
                                    alertUtil.error(data.msg);
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitTravelModalData);
                    mySubmitModal.show();
                }
            };

            /*新增用户账号*/
            $("#btn_addTask").unbind().on('click',function (e, value, row, index) {
                var myViewAccountModalData ={
                    modalBodyID : "myAddAccountModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle : "新增用户账户",
                    modalClass : "modal-lg",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        var isSuccess = false;

                        var username = $("#username").val();
                        var name = $("#name").val();
                        var roleName = dictUtil.getName(dictUtil.DICT_LIST.userRole,$("#roleName").val());
                        var cityid = dictUtil.getName(dictUtil.DICT_LIST.areaAdmin,$("#cityid").val());
                        if ($("#roleName").val() == "主研人"){
                            roleName = $("#roleName").val();
                            cityid = $("#cityid").val();
                        }
                        var contacts = $("#contacts").val();
                        var mobilephone = $("#mobilephone").val();
                        var orgName = sessionStorage.getItem("orgName");
                        var orgCode = sessionStorage.getItem("orgItemCode");

                        if (stringUtil.isBlank(username) || stringUtil.isBlank(name) || stringUtil.isBlank(contacts) || stringUtil.isBlank(mobilephone)){
                            alertUtil.info('输入不能为空！')
                        } else {
                            var submitStatus = {
                                "username": username,
                                "name": name,
                                "roleName": roleName,
                                "contacts": contacts,
                                "mobilephone": mobilephone,
                                "cityid": cityid,
                                "orgName": orgName,
                                "orgCode": orgCode
                            };
                            var reg = /^[a-zA-Z]([\s\S]{4,11})$/;//以字母开头，5-12位，([\s\S]*)匹配任意字符
                            if (reg.test(username)) {
                                ajaxUtil.myAjax(null,"/user/adduser",submitStatus,function (data) {
                                    if(ajaxUtil.success(data)){
                                        var submitConfirmModal = {
                                            modalBodyID :"myTopicSubmitTip",
                                            modalTitle : "提示",
                                            modalClass : "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            modalConfirmFun:function (){
                                                refreshTable();
                                                return true;
                                            }
                                        };
                                        var submitConfirm = modalUtil.init(submitConfirmModal);
                                        submitConfirm.show();
                                        isSuccess = true;
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                },false,true);
                            } else {
                                alertUtil.error("用户账号须以字母开头，长度为5-12位")
                            }
                        }

                        return isSuccess;
                    }
                };
                var myViewModal = modalUtil.init(myViewAccountModalData);
                let sel = dictUtil.getDictByCode(dictUtil.DICT_LIST.areaAdmin);
                let select = dictUtil.getDictByCode(dictUtil.DICT_LIST.userRole);

                if (sessionStorage.getItem('rolename') == '科研项目申报单位'){
                    var option=document.createElement("option");
                    $(option).val("主研人");
                    $(option).text("主研人");
                    $("#roleName").append(option);
                    option=document.createElement("option");
                    $(option).val(sessionStorage.getItem('cityId'));
                    $(option).text(sessionStorage.getItem('cityId'));
                    $("#cityid").append(option);
                } else{
                    $("#cityid").selectUtil(sel);
                    $("#roleName").selectUtil(select);
                }
                myViewModal.show();

            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'username', title: '用户账号'},
                {field: 'name', title: '账号名称'},
                {field: 'cityid', title: '主管市区'},
                {field: 'roleName', title: '用户角色'},
                {field: 'contacts', title: '联系人'},
                {field: 'action',  title: '操作',width: "254px",formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            $("#btnSearch").unbind().on('click',function() {
                var newArry = [];
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                //var allTableData = JSON.parse(localStorage.getItem("2"));
                var req = window.indexedDB.open("myDB", 1);
                req.onsuccess = function (e) {
                    var db = e.target.result;
                    //创建事物
                    var t = db.transaction(["search"], "readwrite");
                    var userStore = t.objectStore("search");
                    var request = userStore.get(1);
                    request.onsuccess = function (event) {
                        if (request.result) {
                            var allTableData = request.result.dataSearch;
                            if(str.indexOf("请输入")!=-1){
                                str=""
                            }
                            for (var i in allTableData) {
                                for (var v in aCol){
                                    var textP = allTableData[i][aCol[v].field];
                                    if (textP == null || textP == undefined || textP == '') {
                                        textP = "1";
                                    }
                                    if(textP.search(str) != -1){
                                        newArry.push(allTableData[i])
                                    }
                                }
                            }
                            var newArr=new Set(newArry);
                            newArry=Array.from(newArr);
                            $("#table").bootstrapTable("load", newArry);
                        } else {
                            console.log('未获得数据记录');
                        }
                    }
                };


            })

        })
})();
