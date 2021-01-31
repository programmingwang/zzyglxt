(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "selectallreceipt";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.reportStatus);
            var emergencyStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            url = getRoleTable(sessionStorage.getItem("rolename"),url,"receivingDataStatus",webStatus);
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

                'click .pass' : function (e, value, row, index) {
                    var myPassReceiptModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "处室审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus":getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        if(sessionStorage.getItem("rolename") == "政务资源处长"){
                                            alertUtil.info("审核已通过，已发送给分局审核！");
                                        }else{
                                            alertUtil.info("审核已通过，已上架！");
                                        }
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
                    var myPassModal = modalUtil.init(myPassReceiptModalData);
                    myPassModal.show();
                },

                'click .passone' : function (e, value, row, index) {
                    var myPassReceiptModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "分局审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus":getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        if(sessionStorage.getItem("rolename") == "政务资源分管局长"){
                                            alertUtil.info("审核已通过，已发送给局长审核！");
                                        }else{
                                            alertUtil.info("审核已通过，已上架！");
                                        }
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
                    var myPassModal = modalUtil.init(myPassReceiptModalData);
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
                                "receivingDataStatus":getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        if(sessionStorage.getItem("rolename") == "政务资源局长长"){
                                            alertUtil.info("审核已通过，已发布到门户首页网站！");
                                        }else{
                                            alertUtil.info("审核已通过，已上架！");
                                        }
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
                    var myPassModal = modalUtil.init(myPassReceiptModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailReceiptModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "处室审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.receivingDataStatus = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("操作成功");
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
                    var myFailModal = modalUtil.init(myFailReceiptModalData);
                    myFailModal.show();
                },
                'click .failone' : function (e, value, row, index) {
                    var myFailReceiptModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "分局审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源分管局长"){
                                submitStatus.receivingDataStatus = webStatus[5].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("操作成功");
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
                    var myFailModal = modalUtil.init(myFailReceiptModalData);
                    myFailModal.show();
                },
                'click .failtwo' : function (e, value, row, index) {
                    var myFailReceiptModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "局长审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "政务资源局长"){
                                submitStatus.receivingDataStatus = webStatus[6].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("操作成功");
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
                    var myFailModal = modalUtil.init(myFailReceiptModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfReceiptModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": webStatus[7].id
                            };
                            ajaxUtil.myAjax(null,"changestatustoreceipt/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("下架成功");
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfReceiptModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewReceiptModalData ={
                        modalBodyID : "myViewReceiptModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myReceiptModal = modalUtil.init(myViewReceiptModalData);
                    $("#receivingNum").val(row.receivingNum);
                    $("#receivingDateOfReceipt").val(row.receivingDateOfReceipt);
                    $("#receivingTitle").val(row.receivingTitle);
                    $("#receivingUnitOfCommun").val(row.receivingUnitOfCommun);
                    $("#fileNo").val(row.fileNo);
                    $("#number").val(row.number);
                    $("#secretLevel").val(row.secretLevel);
                    $("#receivingDegreeOfUrgency").val(emergencyStatus[row.receivingDegreeOfUrgency].text);
                    $("#timeLimit").val(row.timeLimit);
                    $("#creater").val(row.creater);
                    $("#itemcreateat").val(row.itemcreateat);
                    $("#receivingDataStatus").val(webStatus[row.receivingDataStatus].text);
                    $("#fileDiv").attr("style","display:block");
                    $("#upFile").text(row.fileName);
                    myReceiptModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitReceiptModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "receivingDataStatus": getStatus(sessionStorage.getItem("rolename"),webStatus)
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

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);

            function getRoleTable(role,preUrl,status,webStatus) {
                if(role === "政务资源科员"){
                    $('#btn_addTask').attr('style',"display:block");
                    return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "政务资源处长"){
                    return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[4].id;
                }else if(role === "政务资源分管局长") {
                    return preUrl + "?"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[10].id;
                } else if(role === "政务资源局长") {
                    return preUrl + "?"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
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
                    }else if(status == webStatus[2].id || status ==webStatus[3].id|| status ==webStatus[9].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[4].id || status == webStatus[5].id || status == webStatus[6].id|| status == webStatus[7].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[1].id || status == webStatus[8].id|| status == webStatus[10].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                        ].join('');
                    }

                }else if(role === "政务资源处长"){
                    if(status == webStatus[1].id){
                        return [
                            '<a  class="pass"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                            '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if( status == webStatus[4].id||status == webStatus[9].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }else if(role === "政务资源分管局长"){
                    if(status == webStatus[10].id||status == webStatus[2].id ){
                        return [
                            '<a  class="passone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                            '<a  class="failone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[5].id||status == webStatus[9].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[9].id){
                        return [
                            '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                        ].join('');
                    }

                }
                else if(role === "政务资源局长"){
                    if(status == webStatus[3].id || status == webStatus[8].id){
                        return [
                            '<a  class="passtwo"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                            '<a  class="failtwo"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[6].id||status == webStatus[7].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[9].id){
                        return [
                            '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                        ].join('');
                    }

                }
            }

            function getStatus(role,webStatus) {
                if(role === "政务资源科员"){
                    return webStatus[1].id
                }else if(role === "政务资源处长"){
                    return webStatus[10].id
                }else if(role === "政务资源分管局长"){
                    return webStatus[8].id
                }
                else if(role === "政务资源局长"){
                    return webStatus[9].id
                }
            }


            return {
                getRoleTable:getRoleTable,
                getRoleOperate:getRoleOperate,
                getStatus: getStatus,
            }


        })
})();