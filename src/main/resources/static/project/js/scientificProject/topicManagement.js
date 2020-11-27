(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var addUrl = "/scientificProject/addTopicManagement";
            var aParam = {
            };

            var rolename = sessionStorage.getItem("rolename");
            var usercode = sessionStorage.getItem("usercode");

            var projectStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.projectStatus);
            var topicStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.topicStatus);

            var projectNo = new Date().getFullYear().toString()+"0009";

            /*var pass;

            var nopass;

            if (rolename === "申报单位"){
                pass = "2";
                nopass = "3";
            }else if (rolename === "市级中医药管理部门"){
                pass = "4";
                nopass = "5";
            }else if (rolename === "省局中医药管理部门") {
                pass = "6";
                nopass = "7";
            }*/

            //操作
            function operation1(value, row, index){
                if(row.examineStatus == projectStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[1].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[2].id || row.examineStatus == projectStatus[4].id || row.examineStatus == projectStatus[6].id){
                    if (row.status == topicStatus[1].id){ //放弃课题
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="giveUp" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >放弃课题</a>',
                        ].join('');
                    }else if (row.status == topicStatus[2].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }else if (row.status == topicStatus[3].id){ //放弃理由
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="viewReason" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >放弃理由</a>',
                        ].join('');
                    }
                }else if (row.examineStatus == projectStatus[3].id || row.examineStatus == projectStatus[5].id || row.examineStatus == projectStatus[7].id){
                    return [
                        '<a class="viewReason" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }
            }

            function operation2(value, row, index){
                if(row.examineStatus == projectStatus[1].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                        '<a  class="pass"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[2].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[3].id){
                    return [
                        '<a class="viewReason" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }
            }

            function operation3(value, row, index){
                if(row.examineStatus == projectStatus[2].id){
                    return [
                        '<a  class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                        '<a  class="pass"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[4].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[5].id){
                    return [
                        '<a class="viewReason" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }
            }

            function operation4(value, row, index){
                if(row.examineStatus == projectStatus[4].id){
                    return [
                        '<a  class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                        '<a  class="pass"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[6].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }else if (row.examineStatus == projectStatus[7].id){
                    return [
                        '<a class="viewReason" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }else if (row.status == topicStatus[2].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
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
                        modalBodyID : "myDeleteTopicManagement",
                        modalTitle : "删除项目信息",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var projectEntity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/industrialdevelop/delTopic",projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.deleteFile(row.itemcode);
                                    alertUtil.info("删除课题项目成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,"","delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .pass' : function (e, value, row, index) {
                    var myPassTopicModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var shStatus = {
                                "examineStatus": ""
                            };
                            var xmStatus = {
                                "status": topicStatus[1].id
                            };
                            var developTopicDO = {
                                projectNo : ++projectNo,
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            }
                            if(rolename == "科研项目申报单位"){
                                shStatus.examineStatus = projectStatus[2].id;
                            }else if (rolename == "市级中医药管理部门"){
                                shStatus.examineStatus = projectStatus[4].id;
                            }else {
                                shStatus.examineStatus = projectStatus[6].id;
                                xmStatus.status = topicStatus[2].id;

                            }
                            ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                            if(ajaxUtil.success(data)){
                                                if(data.code == 88888){
                                                    ajaxUtil.myAjax(null,"/industrialdevelop/updTopic",developTopicDO,null,false,true);
                                                    alertUtil.info("审核已通过");
                                                    isSuccess = true;
                                                    refreshTable();
                                                }else{
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        },false)

                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassTopicModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailTopiceModalData ={
                        modalBodyID :"myResonable",
                        modalTitle : "审核不通过理由",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var developTopicDO = {
                                reason : $("#reason").val(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var shStatus = {
                                "examineStatus": ""
                            };
                            var xmStatus = {
                                "status": topicStatus[0].id
                            };
                            if(rolename == "科研项目申报单位"){
                                shStatus.examineStatus = projectStatus[3].id;
                            }else if (rolename == "市级中医药管理部门"){
                                shStatus.examineStatus = projectStatus[5].id;
                            }else {
                                shStatus.examineStatus = projectStatus[7].id;
                            }
                            ajaxUtil.myAjax(null,"/industrialdevelop/updTopic",developTopicDO,function (data) {
                                if(data && ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
                                            if(ajaxUtil.success(data)){
                                                if(data.code == 88888){
                                                    ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                                        if(ajaxUtil.success(data)){
                                                            if(data.code == 88888){

                                                                alertUtil.info("操作成功");
                                                                isSuccess = true;
                                                                refreshTable();
                                                            }else{
                                                                alertUtil.error(data.msg);
                                                            }
                                                        }
                                                    },false)

                                                }else{
                                                    alertUtil.error(data.msg);
                                                }
                                            }
                                        },false);
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                                else{
                                    alertUtil.error(data.msg);
                                }
                            },false,true)

                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailTopiceModalData);
                    myFailModal.show();
                },

                'click .giveUp' : function (e, value, row, index) {
                    var myGiveUpTopicModalData ={
                        modalBodyID :"myResonable",
                        modalTitle : "放弃课题理由",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var developTopicDO = {
                                reason : $("#reason").val(),
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            };
                            var xmStatus = {
                                "status": topicStatus[3].id
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/updTopic",developTopicDO,function (data) {
                                    if(data && ajaxUtil.success(data)){
                                        if(data.code == ajaxUtil.successCode){
                                            ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("已放弃课题");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false);
                                        }else{
                                            alertUtil.error(data.msg);
                                        }
                                    }
                                    else{
                                        alertUtil.error(data.msg);
                                    }
                            },false,true)
                            return isSuccess;
                        }
                    };
                    var giveUp = modalUtil.init(myGiveUpTopicModalData);
                    giveUp.show();
                },

                'click .view' : function (e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    var viewUrl = "/scientificProject/viewTopicManagement";
                    orange.redirect(viewUrl);
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitTopicModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var shStatus = {
                                "examineStatus": projectStatus[1].id
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(mySubmitTopicModalData);
                    mySubmitModal.show();
                },

                'click .viewReason' : function (e, value, row, index) {
                    var myViewReasonModalData = {
                        modalBodyID: "myResonable",
                        modalTitle: "查看理由",
                        modalClass: "modal-lg",
                        confirmButtonStyle: "display:none",
                    }


                    var myReasonModal = modalUtil.init(myViewReasonModalData);
                    ajaxUtil.myAjax(null,"/industrialdevelop/getOneTopic?itemCode="+row.itemcode,null,function (data) {
                        if(ajaxUtil.success(data)){
                            if(data.code == 88888){
                                $("#reason").val(data.data.reason);
                            }else{
                                alertUtil.error(data.msg);
                            }
                        }},false,"","get");
                    myReasonModal.show();
                }

            };


            $("#btn_addTask").unbind().on('click',function (row) {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
            });

            // $(".fail").unbind().on('click', function (row) {
            //     var myResonable ={
            //         modalBodyID :"myResonable", //公用的在后面给span加不同的内容就行了，其他模块同理
            //         modalTitle : "理由",
            //         modalClass : "modal-lg",
            //         modalConfirmFun:function () {
            //
            //
            //         }
            //     }
            //     var myResonable = modalUtil.init(myResonable);
            //     myResonable.show();
            // });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.topicStatus);
            $("#topicStatusSearch").selectUtil(pl);


            if (rolename === "主研人") {
                var url = "/industrialdevelop/getUserCode?userCode="+usercode;
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称'},
                    {field: 'status', title: '项目状态', formatter: function (value) {
                            return '</p>'+topicStatus[value].text+'</p>'
                        }},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value) {
                            return '</p>'+projectStatus[value].text+'</p>'
                        }},
                    {field: 'action', title: '操作', formatter: operation1, events: orgEvents}
                ];
            }else if (rolename === "科研项目申报单位"){
                var url = "/industrialdevelop/getByCompany?company="+sessionStorage.getItem("username");
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称'},
                    {field: 'applicant', title: '主研人'},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value) {
                            return '</p>'+projectStatus[value].text+'</p>'
                        }},
                    {field: 'action', title: '操作', formatter: operation2, events: orgEvents}
                ];
            }else if (rolename === "市级中医药管理部门"){
                var url = "/industrialdevelop/getTopic";
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称'},
                    {field: 'company', title: '申报单位'},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value) {
                            return '</p>'+projectStatus[value].text+'</p>'
                        }},
                    {field: 'action', title: '操作', formatter: operation3, events: orgEvents}
                ];
            }else if (rolename === "省局中医药管理部门"){
                var url = "/industrialdevelop/getTopic";
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称'},
                    {field: 'company', title: '申报单位'},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value) {
                            return '</p>'+projectStatus[value].text+'</p>'
                        }},
                    {field: 'action', title: '操作', formatter: operation4, events: orgEvents}
                ];

            }

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);
            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData));
            obj2=JSON.parse(localStorage.getItem("2"));
            //console.log(obj2);

        })
})();
