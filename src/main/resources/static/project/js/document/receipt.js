(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil','modalHtml'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil,modalHtml) {

            var url = "selectallreceipt";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.receiptStatus);
            var emergencyStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            url = getRoleTable(sessionStorage.getItem("rolename"),url,"receivingDataStatus",webStatus);
            var rolename = sessionStorage.getItem("rolename");
            var username = sessionStorage.getItem("username");
            var P=$("#zhongyichu").is(":checked")
            console.log("00000000000000000:"+P)
            var aParam = {
            };

            //操作
            function operation(value, row, index){
                return getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.receivingDataStatus,webStatus)
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/document/receipt_add");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeletereceiptModal",
                        modalTitle : "删除收文管理数据",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deletereceipt/"+row.itemid+"/"+row.itemcode,null,function (data) {
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
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .send-file' : function (e, value, row, index) {
                    var mySendFileReceiptModalData ={
                        modalBodyID :"mySendFileModal",
                        modalTitle : "文件将下达到各个部门",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": webStatus[18].id
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                            return isSuccess;
                        }

                    };
                    var mySendFileModal = modalUtil.init(mySendFileReceiptModalData);
                    mySendFileModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/viewreceipt";
                    orange.redirect(viewUrl);
                },

                'click .transpond' : function (e, value, row, index) {
                    var receiptModalData = {
                        modalBodyID: "myReceiptModal",
                        modalTitle: "转发文件至",
                        modalClass: "modal-sm",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": ""
                            };
                            if ($("#all_select").is(":checked") == true){
                                submitStatus.receivingDataStatus = webStatus[19].id;
                            } else if ($("#zhongyichu").is(":checked") == true){
                                submitStatus.receivingDataStatus = webStatus[4].id;
                            }else if ($("#zhongyaochu").is(":checked")== true){
                                submitStatus.receivingDataStatus = webStatus[7].id;
                            }else if ($("#zonghechu").is(":checked") == true){
                                submitStatus.receivingDataStatus = webStatus[10].id;
                            }else if ($("#faguijandu").is(":checked") == true){
                                 submitStatus.receivingDataStatus = webStatus[13].id;
                             }
                            if ($("#all_select").is(":checked") == true||$("#zhongyichu").is(":checked") == true||$("#zhongyaochu").is(":checked")== true||$("#zonghechu").is(":checked") == true||$("#faguijandu").is(":checked") == true)
                            {
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                                alertUtil.error("选项不能为空");
                            }
                            return isSuccess;
                        }

                    };
                    var myTranspondModal = modalUtil.init(receiptModalData);
                    myTranspondModal.show();
                },

                'click .opinion' : function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/viewreceipt";
                    orange.redirect(viewUrl);
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitReceiptModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": webStatus[1].id
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitReceiptModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitReceiptModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus":webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(myNoSubmitReceiptModalData);
                    mySubmitModal.show();
                },
            };

            $("#btn_addTask").unbind().on('click',function () {
                var url = "/document/receipt_add";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'receivingTitle', title: '文件标题'},
                {field: 'receivingUnitOfCommun', title: '来文单位'},
                {field: 'receivingDegreeOfUrgency', title: '紧急程度',formatter:function (row) {
                        return '<p>'+pl[row].text+'</p>';
                    }},
                {field: 'filePath', title: '附件', formatter:function (value, row, index) {
                        if(value == null){
                            return '<p style="padding-top: 15px">无附件</p>';
                        }else{
                            return '<a href="'+value+'">'+row.fileName+'</a>'
                        }
                    }},
                {field:'receivingDateOfReceipt',title:'来文日期'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol, "receivingDegreeOfUrgency");

            function getRoleTable(role,preUrl,status,webStatus) {
                if(role === "政务资源科员"){
                    $('#btn_addTask').attr('style',"display:block");
                    return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id+"&"+status+"="+webStatus[12].id+"&"+status+"="+webStatus[15].id+"&"+status+"="+webStatus[17].id+"&"+status+"="+webStatus[18].id+"&"+status+"="+webStatus[10].id+"&"+status+"="+webStatus[11].id+"&"+status+"="+webStatus[13].id+"&"+status+"="+webStatus[14].id+"&"+status+"="+webStatus[16].id;
                }/*else if(role === "政务资源处长"){
                    return preUrl + "?"+status+"="+webStatus[18].id+"&"+status+"="+webStatus[16].id;
                }*/else if(role === "政务资源综合处处长"){
                    return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[18].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[10].id+"&"+status+"="+webStatus[13].id;
                }else if(role === "中医处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[19].id+"&"+status+"="+webStatus[18].id;
                } else if(role === "中药处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id+"&"+status+"="+webStatus[19].id+"&"+status+"="+webStatus[18].id;
                }else if(role === "综合处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[10].id+"&"+status+"="+webStatus[11].id+"&"+status+"="+webStatus[12].id+"&"+status+"="+webStatus[19].id+"&"+status+"="+webStatus[18].id;
                }else if(role === "法规监督处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[13].id+"&"+status+"="+webStatus[14].id+"&"+status+"="+webStatus[15].id+"&"+status+"="+webStatus[19].id+"&"+status+"="+webStatus[18].id;
                }else if(role === "政务资源局长") {
                    return preUrl + "?"+status+"="+webStatus[16].id+"&"+status+"="+webStatus[17].id+"&"+status+"="+webStatus[18].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[11].id+"&"+status+"="+webStatus[14].id;
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
                    }else if(status == webStatus[2].id || status ==webStatus[4].id|| status ==webStatus[7].id|| status ==webStatus[10].id|| status ==webStatus[13].id|| status ==webStatus[5].id|| status ==webStatus[8].id|| status ==webStatus[11].id|| status ==webStatus[14].id|| status ==webStatus[16].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[3].id || status == webStatus[6].id || status == webStatus[9].id|| status == webStatus[12].id|| status == webStatus[15].id|| status ==webStatus[17].id|| status ==webStatus[18].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[1].id ){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                        ].join('');
                    }

                }/*else if(role === "政务资源处长"){
                    if(status == webStatus[16].id||status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }*/else if(role === "政务资源综合处处长"){
                    if(status == webStatus[1].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if( status == webStatus[2].id||status == webStatus[3].id){
                        return [
                            '<a  class="transpond"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >转发</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if( status == webStatus[4].id||status == webStatus[7].id||status == webStatus[10].id||status == webStatus[13].id||status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }else if(role === "中医处分管局长"){
                    if(status == webStatus[4].id||status == webStatus[19].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id||status == webStatus[5].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "中药处分管局长"){
                    if(status == webStatus[7].id||status == webStatus[19].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id||status == webStatus[8].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "综合处分管局长"){
                    if(status == webStatus[10].id||status == webStatus[19].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id||status == webStatus[11].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "法规监督处分管局长"){
                    if(status == webStatus[13].id||status == webStatus[19].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id||status == webStatus[14].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "政务资源局长"){
                    if(status == webStatus[5].id || status == webStatus[8].id|| status == webStatus[11].id|| status == webStatus[14].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[16].id){
                        return [
                            '<a  class="send-file"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >下达文件</a>',
                            ,
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[16].id||status == webStatus[17].id|| status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
            }

            function getStatus(role,webStatus) {
                if(role === "政务资源科员"){
                    return webStatus[1].id
                }
                else if(role === "政务资源综合处处长"){
                    return webStatus[2].id
                }
                else if(role === "中医处分管局长"){
                    return webStatus[5].id
                }
                else if(role === "中药处分管局长"){
                    return webStatus[8].id
                }
                else if(role === "综合处分管局长"){
                    return webStatus[11].id
                }
                else if(role === "法规监督处分管局长"){
                    return webStatus[14].id
                }
                else if(role === "政务资源局长"){
                    return webStatus[18].id
                }
            }


            return {
                getRoleTable:getRoleTable,
                getRoleOperate:getRoleOperate,
                getStatus: getStatus,
            }

        })
})();