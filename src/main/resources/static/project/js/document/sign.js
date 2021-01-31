(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "governresCountersign/selectAll";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.reportStatus);
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
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"governresCountersign/delete/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除内部会签成功");
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
                                        if(sessionStorage.getItem("rolename") == "政务资源处长"){
                                            alertUtil.info("审核已通过，已发送给政务资源综合处处长审核！");
                                        }else{
                                            alertUtil.info("审核已通过，已上架！");
                                        }
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
                                        if(sessionStorage.getItem("rolename") == "政务资源综合处处长"){
                                            alertUtil.info("审核已通过，已发送给分局长审核！");
                                        }else{
                                            alertUtil.info("审核已通过，已上架！");
                                        }
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
                            },false,true,"put");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassReceiptModalData);
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
                                        alertUtil.info("操作成功");
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
                                        alertUtil.info("操作成功");
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
                                        alertUtil.info("操作成功");
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
                                        alertUtil.info("操作成功");
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
                                        alertUtil.success("下架成功");
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

                'click .view' : function (e, value, row, index) {
                    var myViewSignModalData ={
                        modalBodyID : "myViewSignModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var mySignModal = modalUtil.init(myViewSignModalData);
                    $("#receivingTitle").val(row.receivingTitle);
                    $("#govPunlic").val(emergencyStatus[row.govPunlic].text);
                    $("#fileNo").val(row.fileNo);
                    $("#fileNumber").val(row.fileNumber);
                    $("#number").val(row.number);
                    $("#classification").val(row.classification);
                    $("#reason").val(row.reason);
                    $("#creater").val(row.creater);
                    $("#itemupdateat").val(row.itemupdateat);
                    $("#status").val(webStatus[row.status].text);
                    $("#fileDiv").attr("style","display:block");
                    $("#upFile").text(row.fileName);
                    mySignModal.show();
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
                                        alertUtil.info("已提交");
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
                                        alertUtil.info("已提交");
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
                {field: 'fileNo', title: '文号'},
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
                    return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "政务资源处长"){
                    return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[4].id;
                }else if(role === "政务资源综合处处长"){
                    return preUrl + "?"+status+"="+webStatus[10].id+"&"+status+"="+webStatus[11].id+"&"+status+"="+webStatus[12].id;
                }else if(role === "政务资源分管局长") {
                    return preUrl + "?"+status+"="+webStatus[13].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[3].id;
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
                    }else if(status == webStatus[2].id || status ==webStatus[11].id|| status ==webStatus[9].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[4].id || status == webStatus[5].id || status == webStatus[6].id|| status == webStatus[7].id|| status == webStatus[12].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[1].id || status == webStatus[8].id|| status == webStatus[10].id|| status == webStatus[13].id){
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
                    }else if( status == webStatus[4].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                } else if(role === "政务资源综合处处长"){
                    if(status == webStatus[2].id||status == webStatus[10].id){
                        return [
                            '<a  class="passth"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                            '<a  class="failth"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if( status == webStatus[12].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }else if(role === "政务资源分管局长"){
                    if(status == webStatus[11].id||status == webStatus[13].id ){
                        return [
                            '<a  class="passone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                            '<a  class="failone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[5].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[9].id){
                        return [
                            '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
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
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
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
            }


            return {
                getRoleTable:getRoleTable,
                getRoleOperate:getRoleOperate,
                getStatus: getStatus,
            }


        })
})();