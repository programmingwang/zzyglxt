(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            //角色信息
            var rolename = sessionStorage.getItem("rolename");


            //获取字典数据
            var postStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.postStatus);
            var documentNum = dictUtil.getDictByCode(dictUtil.DICT_LIST.postDocumentNum);
            var publicWay = dictUtil.getDictByCode(dictUtil.DICT_LIST.postPublicWay);
            $("#postPublicWay").selectUtil(publicWay);


            var addUrl = "/document/post_add";
            var aParam = {

            };

            //点击文件名查看详情事件
            function viewOperation(value, row, index){
                return [
                    '<a class="postview" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >'+row.postDocumentTitle+'</a>',
                ].join('');
            }
            window.viewEvents = {
                'click .postview': function (e, value, row, index){
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/post_view";
                    orange.redirect(viewUrl);
                },
            };

            //操作
            function operation1(value, row, index){
                if(row.postDataStatus == postStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 0.8em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >修改</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[1].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消发送</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[2].id || row.postDataStatus == postStatus[4].id || row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[8].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[3].id || row.postDataStatus == postStatus[5].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[9].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }
            }

            function operation2(value, row, index){
                if(row.postDataStatus == postStatus[1].id){
                    return [
                        '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[2].id || row.postDataStatus == postStatus[3].id || row.postDataStatus == postStatus[4].id || row.postDataStatus == postStatus[5].id || row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[9].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else {
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                    ].join('');
                }
            }

            function operation3(value, row, index){
                if(row.postDataStatus == postStatus[2].id){
                    return [
                        '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[4].id || row.postDataStatus == postStatus[5].id || row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[9].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else {
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >转发</a>',
                    ].join('');
                }
            }

            function operation4(value, row, index){
                if(row.postDataStatus == postStatus[4].id){
                    return [
                        '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[6].id || row.postDataStatus == postStatus[7].id || row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[9].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else {
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                    ].join('');
                }
            }

            function operation5(value, row, index){
                if(row.postDataStatus == postStatus[6].id){
                    return [
                        '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(row.postDataStatus == postStatus[8].id || row.postDataStatus == postStatus[9].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else {
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
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
                        modalBodyID : "myDeletePost",
                        modalTitle : "删除发文信息",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var projectEntity = {
                                itemid: row.itemid,
                                itemcode: row.itemcode
                            };
                            var adviceEntity = {
                                dataCode: row.itemcode
                            };
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/post/delPost",projectEntity,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/advice/delAdvice",adviceEntity,function (data) {
                                        ajaxUtil.deleteFile(row.itemcode);
                                        alertUtil.info("删除发文信息成功");
                                        isSuccess = true;
                                        refreshTable();
                                    },false,"","delete");
                                }
                            },false,"","delete");
                            return isSuccess;
                        }

                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .pass' : function (e, value, row, index) {
                    var myPassModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": ""
                            };
                            if (rolename == "政务资源处长"){
                                submitStatus.postDataStatus = postStatus[2].id;
                            }else if (rolename == "政务资源综合处处长"){
                                submitStatus.postDataStatus = postStatus[4].id;
                            }else if (rolename == "政务资源分管局长"){
                                submitStatus.postDataStatus = postStatus[6].id;
                            }else if (rolename == "政务资源局长"){
                                submitStatus.postDataStatus = postStatus[8].id;
                            }
                            ajaxUtil.myAjax(null,"/post/updatePost", submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        if(sessionStorage.getItem("rolename") == "政务资源综合处处长"){
                                            alertUtil.info("转发成功！");
                                        }else{
                                            alertUtil.info("提交成功！");
                                        }
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"post");
                            return isSuccess;
                        }
                    };
                    var myPassModal = modalUtil.init(myPassModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailPostModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": ""
                            };
                            if(rolename == "政务资源处长"){
                                submitStatus.postDataStatus = postStatus[3].id;
                            }else if (rolename == "政务资源综合处处长"){
                                submitStatus.postDataStatus = postStatus[5].id;
                            }else if (rolename == "政务资源分管局长"){
                                submitStatus.postDataStatus = postStatus[7].id;
                            }else if (rolename == "政务资源局长"){
                                submitStatus.postDataStatus = postStatus[9].id;
                            }
                            ajaxUtil.myAjax(null,"/post/updatePost",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("操作成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"post");
                            return isSuccess;
                        }

                    };
                    var myFailModal = modalUtil.init(myFailPostModalData);
                    myFailModal.show();
                },

                /*'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfPostModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "postDataStatus": postStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"/post/updatePost",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.success("下架成功");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }
                                }
                            },false,true,"post");
                            return isSuccess;
                        }

                    };
                    var myUnderShelfModal = modalUtil.init(myUnderShelfPostModalData);
                    myUnderShelfModal.show();
                },*/

                'click .view' : function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    var viewUrl = "/document/post_view";
                    orange.redirect(viewUrl);
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
                                "postDataStatus": ""
                            };
                            var submitOpinion = {
                                "dataCode" : row.itemcode,
                                "department" : "",
                                "departDate" : "",
                                "office" : "",
                                "officeDate" : "",
                                "deputyDirector" : "",
                                "deputyDirectorDate" : "",
                                "director" : "",
                                "directorDate" : "",
                            };
                            if (rolename == "政务资源处长"){
                                submitStatus.postDataStatus = postStatus[2].id;
                                submitOpinion.department = $("#reason").val();
                                submitOpinion.departDate = nowTime;
                            }else if (rolename == "政务资源综合处处长"){
                                submitStatus.postDataStatus = postStatus[4].id;
                                submitOpinion.office = $("#reason").val();
                                submitOpinion.officeDate = nowTime;
                            }else if (rolename == "政务资源分管局长"){
                                submitStatus.postDataStatus = postStatus[6].id;
                                submitOpinion.deputyDirector = $("#reason").val();
                                submitOpinion.deputyDirectorDate = nowTime;
                            }else if (rolename == "政务资源局长"){
                                submitStatus.postDataStatus = postStatus[8].id;
                                submitOpinion.director = $("#reason").val();
                                submitOpinion.directorDate = nowTime;
                            }
                            ajaxUtil.myAjax(null,"/post/updatePost", submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        ajaxUtil.myAjax(null,"/advice/updAdvice", submitOpinion,function (data) {
                                            if(ajaxUtil.success(data)){
                                                if(data.code == 88888){
                                                    alertUtil.success("填写成功！");
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
                    myGiveUpModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitPostModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": postStatus[1].id,
                            };
                            ajaxUtil.myAjax(null,"/post/updatePost", submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已提交");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false,true,"post");
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitPostModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitPostModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "itemid": row.itemid,
                                "itemcode": row.itemcode,
                                "postDataStatus": postStatus[0].id,
                            };
                            ajaxUtil.myAjax(null,"/post/updatePost", submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info("已提交");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }
                            },false,true,"post");
                            return isSuccess;
                        }
                    };
                    var mySubmitModal = modalUtil.init(myNoSubmitPostModalData);
                    mySubmitModal.show();
                },
            };


            $("#btn_addTask").unbind().on('click',function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
            });


            var url;
            var aCol;
            if (rolename === "政务资源科员"){
                $('#btn_addTask').attr('style', "display:block;");
                url = "/post/getPost?postDataStatus=" +postStatus[0].id +"&postDataStatus="+postStatus[1].id +"&postDataStatus="+postStatus[2].id +"&postDataStatus="+postStatus[3].id +"&postDataStatus="+postStatus[4].id +"&postDataStatus="+postStatus[5].id +"&postDataStatus="+postStatus[6].id +"&postDataStatus="+postStatus[7].id +"&postDataStatus="+postStatus[8].id +"&postDataStatus="+postStatus[9].id;
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation1, events:orgEvents}
                ];

            }else if (rolename === "政务资源处长"){
                url = "/post/getPost?postDataStatus=" +postStatus[1].id +"&postDataStatus="+postStatus[2].id +"&postDataStatus="+postStatus[3].id +"&postDataStatus="+postStatus[4].id +"&postDataStatus="+postStatus[5].id +"&postDataStatus="+postStatus[6].id +"&postDataStatus="+postStatus[7].id +"&postDataStatus="+postStatus[8].id +"&postDataStatus="+postStatus[9].id;
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation2,events:orgEvents}
                ];

            }else if (rolename === "政务资源综合处处长"){
                url = "/post/getPost?postDataStatus=" +postStatus[2].id +"&postDataStatus="+postStatus[4].id +"&postDataStatus="+postStatus[5].id +"&postDataStatus="+postStatus[6].id +"&postDataStatus="+postStatus[7].id +"&postDataStatus="+postStatus[8].id +"&postDataStatus="+postStatus[9].id;
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation3,events:orgEvents}
                ];

            }else if (rolename === "政务资源分管局长"){
                url = "/post/getPost?postDataStatus=" +postStatus[4].id +"&postDataStatus="+postStatus[6].id +"&postDataStatus="+postStatus[7].id +"&postDataStatus="+postStatus[8].id +"&postDataStatus="+postStatus[9].id;
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation4,events:orgEvents}
                ];

            }else if (rolename === "政务资源局长"){
                url = "/post/getPost?postDataStatus=" +postStatus[6].id +"&postDataStatus="+postStatus[8].id +"&postDataStatus="+postStatus[9].id;
                aCol = [
                    {field: 'postDocumentTitle', title: '文件标题', formatter: viewOperation, events: viewEvents},
                    {field: 'postDocumentNum', title: '文号', formatter:function (value, row, index){
                            var postNum = documentNum[value].text + row.postDocumentNum1;
                            return '</p>'+ postNum +'</p>'
                        }},
                    {field: 'postPublicWay', title: '公开方式', formatter:function (value,row,index) {
                            return '</p>'+ publicWay[value].text +'</p>'
                        }},
                    {field: 'itemcreateat', title: '发文日期'},
                    {field: 'action',  title: '操作',formatter: operation5,events:orgEvents}
                ];

            }

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);


        })
})();
