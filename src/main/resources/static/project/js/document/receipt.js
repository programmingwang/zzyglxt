(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "selectallreceipt";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.receiptStatus);
            var emergencyStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            url = getRoleTable(sessionStorage.getItem("rolename"),url,"receivingDataStatus",webStatus);
            var rolename = sessionStorage.getItem("rolename");
            var username = sessionStorage.getItem("username");

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
                                    alertUtil.info("删除收文管理数据成功");
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
                        modalTitle : "文件下达各个部门",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": webStatus[18].id
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("文件下达成功");
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
                             if (rolename == "中医处分管局长"){
                                submitStatus.receivingDataStatus = webStatus[4].id;
                            }else if (rolename == "中药处分管局长"){
                                submitStatus.receivingDataStatus = webStatus[7].id;
                            }else if (rolename == "综合处分管局长"){
                                submitStatus.receivingDataStatus = webStatus[10].id;
                            }else if (rolename == "法规监督处分管局长"){
                                submitStatus.receivingDataStatus = webStatus[13].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("已转发至对应分局局长");
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
                    var receiptModal = modalUtil.init(receiptModalData)
                    receiptModal.show()
                },

                'click .opinion' : function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/viewreceipt";
                    orange.redirect(viewUrl);
                   /* var myOpinionModalData ={
                        modalBodyID :"myResonable",
                        modalTitle : "填写审核意见",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var nowTime = stringUtil.formatDateTime(new Date());
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postOpinion" : ""
                            };
                            var submitOpinion;
                            if (rolename == "政务资源处长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "department" : $("#reason").val(),
                                    "departmentName" : username,
                                    "departDate" : nowTime,
                                };
                                submitStatus.postOpinion = "1";
                            }else if (rolename == "政务资源综合处处长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "office" : $("#reason").val(),
                                    "officeName" : username,
                                    "officeDate" : nowTime,
                                };
                                submitStatus.postOpinion = "2";
                            }else if (rolename == "政务资源分管局长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "deputyDirector" : $("#reason").val(),
                                    "deputyDirectorName" : username,
                                    "deputyDirectorDate" : nowTime,
                                };
                                submitStatus.postOpinion = "3";
                            }else if (rolename == "政务资源局长"){
                                submitOpinion = {
                                    "dataCode" : row.itemcode,
                                    "director" : $("#reason").val(),
                                    "directorName" : username,
                                    "directorDate" : nowTime,
                                };
                                submitStatus.postOpinion = "4";
                            }
                            ajaxUtil.myAjax(null,"/post/updatePost",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        ajaxUtil.myAjax(null,"/advice/updAdvice", submitOpinion,function (data) {
                                            if(ajaxUtil.success(data)){
                                                if(data.code == 88888){
                                                    alertUtil.success("填写成功");
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
                            },false,true,"post");
                            return isSuccess;
                        }
                    };
                    var myGiveUpModal = modalUtil.init(myOpinionModalData);
                    myGiveUpModal.show();*/
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
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
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
                    return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "政务资源综合处处长"){
                    return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id;
                }else if(role === "中医处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id;
                } else if(role === "中药处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "综合处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[10].id+"&"+status+"="+webStatus[11].id+"&"+status+"="+webStatus[12].id;
                }else if(role === "法规监督处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[13].id+"&"+status+"="+webStatus[14].id+"&"+status+"="+webStatus[15].id;
                }else if(role === "政务资源局长") {
                    return preUrl + "?"+status+"="+webStatus[16].id+"&"+status+"="+webStatus[17].id+"&"+status+"="+webStatus[18].id;
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
                    }else if(status == webStatus[2].id || status ==webStatus[5].id|| status ==webStatus[8].id|| status ==webStatus[11].id|| status ==webStatus[14].id|| status ==webStatus[16].id){
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

                }else if(role === "政务资源综合处处长"){
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
                    }else if( status == webStatus[4].id||status == webStatus[7].id||status == webStatus[10].id||status == webStatus[13].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }else if(role === "中医处分管局长"){
                    if(status == webStatus[4].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "中药处分管局长"){
                    if(status == webStatus[7].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "综合处分管局长"){
                    if(status == webStatus[10].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "法规监督处分管局长"){
                    if(status == webStatus[13].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
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