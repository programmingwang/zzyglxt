(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var addUrl = "/scientificProject/addTopicManagement";
            var aParam = {
            };

            //角色信息
            var rolename = sessionStorage.getItem("rolename");
            var usercode = sessionStorage.getItem("itemcode");

            //获取字典数据
            var projectStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.projectStatus);
            var topicStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.topicStatus);
            var auditStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.auditStatus);

            //生成项目编号
            var topicData;
            $.ajax
            ({  cache: false,
                async: false,
                type: 'get',
                data: { aaa: "1" },
                url: "/industrialdevelop/maxProjectNO",
                success: function (data) {
                    topicData = data;
                }
            });
            var num;
            var year;
            var nowyear = new Date().getFullYear().toString();
            if (topicData.data == null){
                num = "000";
                year = nowyear;
            }else {
                if (topicData.data.projectNo.substring(4) == "999" || topicData.data.projectNo.substring(0,4) !== nowyear){
                    num = "000";
                    year = nowyear;
                }else {
                    num = topicData.data.projectNo.substring(4);
                    year = nowyear;
                }
            }
            var topicNum = year+num;

            //审核操作
            function operation1(value, row, index){
                if(row.examineStatus == projectStatus[0].id){
                    if (row.status == topicStatus[3].id){
                        return [
                            '<a class="viewReason" style="margin:0 0.7em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >理由</a>',
                            '<a class="edit" style="margin:0 0.7em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                            '<a class="submit"  style="margin:0 0.7em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                            '<a class="delete" style="margin:0 0.7em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else {
                        return [
                            '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                            '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }
                }
                else if (row.examineStatus == projectStatus[1].id){
                    if (row.status == topicStatus[1].id || row.status == topicStatus[0].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="giveUp" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >放弃课题</a>',
                        ].join('');
                    }
                }
                else if (row.examineStatus == projectStatus[2].id || row.examineStatus == projectStatus[4].id || row.examineStatus == projectStatus[6].id){
                    if (row.status == topicStatus[1].id){
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
                            '<a class="viewReason" style="margin:0 0.7em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >理由</a>',
                            '<a class="edit" style="margin:0 0.7em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                            '<a class="submit"  style="margin:0 0.7em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                            '<a class="delete" style="margin:0 0.7em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }
                }
                else if (row.examineStatus == projectStatus[3].id || row.examineStatus == projectStatus[5].id || row.examineStatus == projectStatus[7].id){
                    return [
                        '<a class="viewReason" style="margin:0 0.7em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="edit" style="margin:0 0.7em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改</a>',
                        '<a class="submit"  style="margin:0 0.7em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 0.7em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
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
                }else if (row.examineStatus == projectStatus[2].id || row.examineStatus == projectStatus[4].id || row.examineStatus == projectStatus[5].id || row.examineStatus == projectStatus[6].id || row.examineStatus == projectStatus[7].id){
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
                }else if (row.examineStatus == projectStatus[4].id || row.examineStatus == projectStatus[6].id || row.examineStatus == projectStatus[7].id){
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
                }
            }

            //点击文件名查看详情事件
            function viewOperation(value, row, index){
                return [
                    '<a class="topicview" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >'+row.projectName+'</a>',
                ].join('');
            }
            window.viewEvents = {
                'click .topicview': function (e, value, row, index){
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/scientificProject/viewTopicManagement";
                    orange.redirect(viewUrl);
                },
            };


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
                                    var submitConfirmModal = {
                                        modalBodyID :"myTopicSubmitTip",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
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
                            if(rolename == "科研项目申报单位"){
                                shStatus.examineStatus = projectStatus[2].id;
                            }else if (rolename == "科研项目-市级"){
                                shStatus.examineStatus = projectStatus[4].id;
                            }else {
                                shStatus.examineStatus = projectStatus[6].id;
                                xmStatus.status = topicStatus[2].id;
                                var developTopicDO = {
                                    projectNo : ++topicNum,
                                    itemid : row.itemid,
                                    itemcode : row.itemcode,
                                }
                            }
                            ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                            if(ajaxUtil.success(data)){
                                                if(data.code == 88888){
                                                    ajaxUtil.myAjax(null,"/industrialdevelop/updTopic",developTopicDO,null,false,true);
                                                    var submitConfirmModal = {
                                                        modalBodyID :"myTopicSubmitTip",
                                                        modalTitle : "提示",
                                                        modalClass : "modal-lg",
                                                        cancelButtonStyle: "display:none",
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
                            }else if (rolename == "科研项目-市级"){
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
                                                                var submitConfirmModal = {
                                                                    modalBodyID :"myTopicSubmitTip",
                                                                    modalTitle : "提示",
                                                                    modalClass : "modal-lg",
                                                                    cancelButtonStyle: "display:none",
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
                            var shStatus = {
                                "examineStatus": projectStatus[0].id
                            };
                            var xmStatus = {
                                "status": topicStatus[3].id
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
                                    if(ajaxUtil.success(data)){
                                        if(data.code == 88888){
                                            ajaxUtil.myAjax(null,"/industrialdevelop/updTopic",developTopicDO,function (data) {
                                                if(data && ajaxUtil.success(data)){
                                                    if(data.code == ajaxUtil.successCode){
                                                        ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                                            if(ajaxUtil.success(data)){
                                                                if(data.code == 88888){
                                                                    var submitConfirmModal = {
                                                                        modalBodyID :"myTopicSubmitTip",
                                                                        modalTitle : "提示",
                                                                        modalClass : "modal-lg",
                                                                        cancelButtonStyle: "display:none",
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
                                                    }else{
                                                        alertUtil.error(data.msg);
                                                    }
                                                }
                                            },false,true);
                                        }else{
                                            alertUtil.error(data.msg);
                                        }
                                    }
                                else{
                                    alertUtil.error(data.msg);
                                }
                            },false);
                            return isSuccess;
                        }
                    };
                    var myGiveUpModal = modalUtil.init(myGiveUpTopicModalData);
                    myGiveUpModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
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
                            var xmStatus = {
                                "status": topicStatus[1].id
                            };
                            ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                            if(ajaxUtil.success(data)){
                                                if(data.code == 88888){
                                                    var submitConfirmModal = {
                                                        modalBodyID :"myTopicSubmitTip",
                                                        modalTitle : "提示",
                                                        modalClass : "modal-lg",
                                                        cancelButtonStyle: "display:none",
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
                                        },false)
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

            //申报项目点击事件
            $("#btn-color").unbind().on('click',function (row) {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
            });

            //根据角色显示不同菜单和不同操作
            if (rolename === "主研人") {
                $("#chargePersonSearch").selectUtil(topicStatus);
                var url = "/industrialdevelop/getUserCode?userCode="+usercode;
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称', formatter: viewOperation, events: viewEvents},
                    {field: 'status', title: '项目状态', formatter: function (value) {
                            return '</p>'+topicStatus[value].text+'</p>'
                        }},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value) {
                            return '</p>'+projectStatus[value].text+'</p>'
                        }},
                    {field: 'action', title: '操作', formatter: operation1, events: orgEvents}
                ];
                var starttime="";
                var endtime="";
                var date = {
                    isDuringDate: function (beginDateStr, endDateStr) {
                        var curDate = new Date(),
                            beginDate = new Date(beginDateStr),
                            endDate = new Date(endDateStr);
                        if (curDate >= beginDate && curDate <= endDate) {
                            $('#btn-color').attr('style', "display:block; border-color: #e66736; background-color: #e66736;");
                        }else {
                            $('#btn-color').attr('style', "display:block; border-color: darkgrey; background-color: darkgrey;");
                        }
                    }
                };
                ajaxUtil.myAjax(null,"/industrialdevelop",null,function (data) {
                    for (var i=0;i<data.data.length;i++){
                        if (data.data[i].isimp == "1"){
                            starttime = data.data[i].startTime;
                            endtime = data.data[i].endTime;
                        }
                    }
                },false,"","get");
                date.isDuringDate(starttime, endtime);

            }else if (rolename === "科研项目申报单位"){
                $("#chargePersonSearch").selectUtil(auditStatus);
                var url = "/industrialdevelop/getByCompany?company="+sessionStorage.getItem("username");
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称', formatter: viewOperation, events: viewEvents},
                    {field: 'applicant', title: '主研人'},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value,row) {
                            if (row.examineStatus == projectStatus[1].id){
                                return '</p>'+auditStatus[0].text+'</p>'
                            }else if (row.examineStatus == projectStatus[2].id || row.examineStatus == projectStatus[4].id || row.examineStatus == projectStatus[5].id || row.examineStatus == projectStatus[6].id || row.examineStatus == projectStatus[7].id){
                                return '</p>'+auditStatus[1].text+'</p>'
                            }else if (row.examineStatus == projectStatus[3].id){
                                return '</p>'+auditStatus[2].text+'</p>'
                            }
                        }},
                    {field: 'action', title: '操作', formatter: operation2, events: orgEvents}
                ];

            }else if (rolename === "科研项目-市级"){
                $("#chargePersonSearch").selectUtil(auditStatus);
                var url = "/industrialdevelop/getTopic?examineStatus=1";
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称', formatter: viewOperation, events: viewEvents},
                    {field: 'company', title: '申报单位'},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value,row) {
                            if (row.examineStatus == projectStatus[2].id){
                                return '</p>'+auditStatus[0].text+'</p>'
                            }else if (row.examineStatus == projectStatus[4].id || row.examineStatus == projectStatus[6].id || row.examineStatus == projectStatus[7].id){
                                return '</p>'+auditStatus[1].text+'</p>'
                            }else if (row.examineStatus == projectStatus[5].id){
                                return '</p>'+auditStatus[2].text+'</p>'
                            }
                        }},
                    {field: 'action', title: '操作', formatter: operation3, events: orgEvents}
                ];

            }else if (rolename === "科研项目-省级"){
                $("#chargePersonSearch").selectUtil(auditStatus);
                var url = "/industrialdevelop/getTopic?examineStatus=2";
                var aCol = [
                    {field: 'projectNo', title: '项目编号'},
                    {field: 'projectName', title: '项目名称', formatter: viewOperation, events: viewEvents},
                    {field: 'company', title: '申报单位'},
                    {field: 'examineStatus', title: '审核状态', formatter: function (value,row) {
                            if (row.examineStatus == projectStatus[4].id){
                                return '</p>'+auditStatus[0].text+'</p>'
                            }else if (row.examineStatus == projectStatus[6].id){
                                return '</p>'+auditStatus[1].text+'</p>'
                            }else if (row.examineStatus == projectStatus[7].id){
                                return '</p>'+auditStatus[2].text+'</p>'
                            }
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

            $("#btnSearch").unbind().on('click',function() {
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value;
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        var status = "";
                        if(rolename == "主研人"){
                            status= allTableData[i]["status"]

                        }else{
                            status= allTableData[i]["examineStatus"]
                        }
                        if(rolename == "科研项目申报单位"){
                            if (status == projectStatus[1].id){
                                status = 0;
                            }else if (status == projectStatus[2].id || status == projectStatus[4].id || status == projectStatus[5].id || status == projectStatus[6].id || status == projectStatus[7].id){
                                status = 1;
                            }else if (status == projectStatus[3].id){
                                status = 2;
                            }
                        }else if(rolename == "科研项目-市级"){
                            if (status == projectStatus[2].id){
                                status = 0;
                            }else if (status == projectStatus[4].id || status == projectStatus[6].id || status == projectStatus[7].id){
                                status = 1;
                            }else if (status == projectStatus[5].id){
                                status = 2;
                            }
                        }else if (rolename == "科研项目-省级"){
                            if (status == projectStatus[4].id){
                                status = 0;
                            }else if (status == projectStatus[6].id){
                                status = 1;
                            }else if (status == projectStatus[7].id){
                                status = 2;
                            }
                        }
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        //调试时可以先打印出来，进行修改
                        if(addstr==status||addstr=='99'){
                            isStatusSlot=true;
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(addstr == 99){
                            isStatusSlot = true;
                        }
                        if(textP.search(str) != -1 && isStatusSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);

            })




        })
})();
