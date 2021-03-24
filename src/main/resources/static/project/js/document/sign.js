(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "governresCountersign/selectAll";
            var username = sessionStorage.getItem("username");
            var rolename = sessionStorage.getItem("rolename");
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.signstatus);
            var emergencyStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.governerscounter);
            url = getRoleTable(sessionStorage.getItem("rolename"),url,"status",webStatus);
            var aParam = {
            };

            //操作
            function operation(value, row, index){
                return getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.status,webStatus)
            }



            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/document/sign_add");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeletesignModal",
                        modalTitle : "删除内部会签",
                        modalClass : "modal-lg",
                        cancelButtonStyle: "display:none",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            ajaxUtil.myAjax(null,"governresCountersign/delete/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
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
                            },false,true,"delete");
                            return true;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .opinion' : function (e, value, row, index) {
                    var myOpinionModalData ={
                        modalBodyID :"myResonable",
                        modalTitle : "填写审核意见",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var nowTime = stringUtil.formatDateTime(new Date());
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "fileNo":""
                            };
                            var submitOpinion;
                            if (rolename == "政务资源处长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "department" : $("#reason").val(),
                                    "departmentName" : username,
                                    "departDate" : nowTime,
                                };
                                submitStatus.fileNo = "1";
                            }else if (rolename == "政务资源综合处处长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "office" : $("#reason").val(),
                                    "officeName" : username,
                                    "officeDate" : nowTime,
                                };
                                submitStatus.fileNo = "2";
                            }else if (rolename == "政务资源分管局长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "deputyDirector" : $("#reason").val(),
                                    "deputyDirectorName" : username,
                                    "deputyDirectorDate" : nowTime,
                                };
                                submitStatus.fileNo = "3";
                            }else if (rolename == "政务资源局长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "director" : $("#reason").val(),
                                    "directorName" : username,
                                    "directorDate" : nowTime,
                                };
                                submitStatus.fileNo = "4";
                            }else if (rolename == "中医处分管局长" && row.parment == "1"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "signOpinion" : $("#reason").val(),
                                    "signName" : username,
                                    "signDate" : nowTime,
                                };
                                submitStatus.fileNo = "5";
                            }else if (rolename == "中药处分管局长" && row.parment == "2"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "signOpinion" : $("#reason").val(),
                                    "signName" : username,
                                    "signDate" : nowTime,
                                };
                                submitStatus.fileNo = "5";
                            }else if (rolename == "综合处分管局长" && row.parment == "0"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "signOpinion" : $("#reason").val(),
                                    "signName" : username,
                                    "signDate" : nowTime,
                                };
                                submitStatus.fileNo = "5";
                            }else if (rolename == "法规监督处处分管局长" && row.parment == "3"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "signOpinion" : $("#reason").val(),
                                    "signName" : username,
                                    "signDate" : nowTime,
                                };
                                submitStatus.fileNo = "5";
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        ajaxUtil.myAjax(null,"/advice/updAdvice", submitOpinion,function (data) {
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
                                        },false,true,"post");
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myGiveUpModal = modalUtil.init(myOpinionModalData);
                    myGiveUpModal.show();
                },

                'click .pass' : function (e, value, row, index) {
                    var myPassSignModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "处室审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassSignModalData);
                    myPassModal.show();
                },
                'click .passth' : function (e, value, row, index) {
                    var myPassSignModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "政务资源综合处处长通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassSignModalData);
                    myPassModal.show();
                },
                'click .passone' : function (e, value, row, index) {
                    var myPassSignModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "分局审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassSignModalData);
                    myPassModal.show();
                },
                'click .passtwo' : function (e, value, row, index) {
                    var myPassReceiptModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "局长审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassReceiptModalData);
                    myPassModal.show();
                },
                'click .passfo' : function (e, value, row, index) {
                    var myPassSignModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "中医处分管局长通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassSignModalData);
                    myPassModal.show();
                },
                'click .passfi' : function (e, value, row, index) {
                    var myPassSignModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "中药处分管局长通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassSignModalData);
                    myPassModal.show();
                },
                'click .passsix' : function (e, value, row, index) {
                    var myPassSignModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "综合处分管局长通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassSignModalData);
                    myPassModal.show();
                },
                'click .passsev' : function (e, value, row, index) {
                    var myPassSignModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "法规监督处分管局长通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassSignModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "处室审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.status = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },
                'click .failth' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "政务资源综合处处长审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源综合处处长"){
                                submitStatus.status = webStatus[12].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },
                'click .failone' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "分局审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源分管局长"){
                                submitStatus.status = webStatus[5].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },
                'click .failtwo' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "局长审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源局长"){
                                submitStatus.status = webStatus[6].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },
                'click .failfo' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "中医处分管局长审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "中医处分管局长"){
                                submitStatus.status = webStatus[15].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },
                'click .failfi' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "中药处分管局长审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "中药处分管局长"){
                                submitStatus.status = webStatus[17].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },
                'click .failsix' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "综合处分管局长审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "综合处分管局长"){
                                submitStatus.status = webStatus[19].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },
                'click .failsev' : function (e, value, row, index) {
                    var myFailSignModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "法规监督处分管局长审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "",
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            if(sessionStorage.getItem("rolename") == "法规监督处分管局长"){
                                submitStatus.status = webStatus[21].id;
                            }
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailSignModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfSignModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": webStatus[7].id,
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(myUnderShelfSignModalData);
                    myUnderShelfModal.show();
                },

                'click .vision' : function (e, value, row, index){
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    localStorage.setItem("centralizedView","true");
                    var viewUrl = "/document/sign_vision";
                    orange.redirect(viewUrl);
                },

                'click .view' : function (e, value, row, index){
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    localStorage.setItem("centralizedView","true");
                    var viewUrl = "/document/sign_view";
                    orange.redirect(viewUrl);
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitSignModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": getStatus(sessionStorage.getItem("rolename"),webStatus),
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitSignModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitSignModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status":webStatus[0].id,
                                "itemid": row.itemid,
                                "itemcode":row.itemcode
                            };
                            ajaxUtil.myAjax(null,"governresCountersign/update",submitStatus,function (data) {
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
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(myNoSubmitSignModalData);
                    mySubmitModal.show();
                },
            };

            $("#btn_addTask").unbind().on('click',function () {
                var url = "/document/sign_add";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.governerscounter);
            $("#chargePersonSearch").selectUtil(pl);

            //点击标题查看会签
            function viewOperation(value, row, index){
                return [
                    '<a class="topicview" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >'+row.receivingTitle+'</a>',
                ].join('');
            }
            window.viewEvents = {
                'click .topicview': function (e, value, row, index){
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    localStorage.setItem("centralizedView","true");
                    var viewUrl = "/document/sign_view";
                    orange.redirect(viewUrl);
                },
            };

            var aCol = [
                {field: 'receivingTitle', title: '文件标题',formatter: viewOperation, events: viewEvents},
                {field: 'fileNumber', title: '文件编号'},
                {field: 'govPunlic', title: '公开方式',formatter:function (row) {
                        return '<p>'+pl[row].text+'</p>';
                    }},
                {field:'itemupdateat',title:'发文日期'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol, "govPunlic");



            function getRoleTable(role,preUrl,status,webStatus) {
                if(role === "政务资源科员"){
                    $('#btn_addTask').attr('style',"display:block");
                    return preUrl + "?status=0"
                }else if(role === "政务资源处长"){
                    return preUrl + "?status=1";
                }else if(role === "政务资源综合处处长"){
                    return preUrl + "?status=2";
                }else if(role === "政务资源分管局长") {
                    return preUrl + "?status=11"
                } else if(role === "政务资源局长") {
                    return preUrl + "?status=8"
                }else if(role === "中医处分管局长") {
                    return preUrl + "?status=9"
                }else if(role === "中药处分管局长") {
                    return preUrl + "?status=9"
                }else if(role === "综合处分管局长") {
                    return preUrl + "?status=9"
                }else if(role === "法规监督处分管局长") {
                    return preUrl + "?status=9"
                }
            }


            function getRoleOperate(value, row, index, role, status,webStatus) {
                if(role === "政务资源科员"){
                    if(status == webStatus[0].id){
                        return [
                            '<a class="edit" style="margin:0 0.8em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >修改</a>',
                            '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[2].id || status ==webStatus[11].id|| status ==webStatus[9].id|| status ==webStatus[14].id|| status ==webStatus[16].id|| status ==webStatus[18].id|| status ==webStatus[20].id|| status ==webStatus[3].id){
                        return [
                            '<a class="vision" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[4].id || status == webStatus[5].id || status == webStatus[6].id|| status == webStatus[7].id|| status == webStatus[12].id|| status ==webStatus[15].id|| status ==webStatus[17].id|| status ==webStatus[19].id|| status ==webStatus[21].id){
                        return [
                            '<a class="vision" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[1].id || status == webStatus[8].id|| status == webStatus[10].id|| status == webStatus[13].id){
                        return [
                            '<a class="vision" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                        ].join('');
                    }

                }else if(role === "政务资源处长"){
                    if(status == webStatus[1].id){
                        if (row.fileNo == "1"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="pass"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                } else if(role === "政务资源综合处处长"){
                    if(status == webStatus[2].id||status == webStatus[10].id){
                        if (row.fileNo == "2"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passth"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failth"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }else if(role === "政务资源分管局长"){
                    if(status == webStatus[11].id||status == webStatus[13].id ){
                        if (row.fileNo == "3"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passone"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else if(status == webStatus[9].id){
                        return [
                            '<a  class="vision"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
                        ].join('');
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }
                else if(role === "政务资源局长"){
                    if(status == webStatus[3].id || status == webStatus[8].id){
                        if (row.fileNo == "4"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passtwo"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failtwo"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else if(status == webStatus[9].id){
                        return [
                            '<a  class="vision"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
                        ].join('');
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "中医处分管局长"){
                    if(status == webStatus[9].id && row.parment == "1"){
                        if (row.fileNo == "5"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passfo"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failfo"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "中药处分管局长"){
                    if(status == webStatus[9].id && row.parment == "2"){
                        if (row.fileNo == "5"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passfi"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failfi"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "综合处分管局长"){
                    if(status == webStatus[9].id && row.parment == "0"){
                        if (row.fileNo == "5"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passsix"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failsix"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "法规监督处分管局长"){
                    if(status == webStatus[9].id && row.parment == "3"){
                        if (row.fileNo == "5"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passsev"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failsev"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else {
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
            }


            function getStatus(role,webStatus) {
                if(role === "政务资源科员"){
                    return webStatus[1].id
                }else if(role === "政务资源处长"){
                    return webStatus[10].id
                }
                else if(role === "政务资源综合处处长"){
                    return webStatus[13].id
                }
                else if(role === "政务资源分管局长"){
                    return webStatus[8].id
                }
                else if(role === "政务资源局长"){
                    return webStatus[9].id
                }
                else if(role === "中医处分管局长"){
                    return webStatus[14].id
                }
                else if(role === "中药处分管局长"){
                    return webStatus[16].id
                }
                else if(role === "综合处分管局长"){
                    return webStatus[18].id
                }
                else if(role === "法规监督处处分管局长"){
                    return webStatus[20].id
                }
            }


            return {
                getRoleTable:getRoleTable,
                getRoleOperate:getRoleOperate,
                getStatus: getStatus,
            }


        })
})();