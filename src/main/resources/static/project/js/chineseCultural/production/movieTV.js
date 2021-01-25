(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/cul/pro/movTv/getAll";

            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);

            //角色加载工具
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"chineseCulturalStatus",webStatus);

            var aParam = {

            };

            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.chineseCulturalStatus,webStatus)
            }

        //修改事件
        window.orgEvents = {
            'click .edit' : function(e, value, row, index) {
                localStorage.setItem("rowData", JSON.stringify(row));
                orange.redirect("/chineseCultural/production/insertMovieTV");
            },

            'click .delete': function (e, value, row, index) {
                var myDeleteModalData ={
                    modalBodyID : "myDeleteModalMovTV",
                    modalTitle : "删除电视电影信息",
                    modalClass : "modal-lg",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        ajaxUtil.myAjax(null,"/cul/pro/movTv/delMovTv/"+row.itemid+"/"+row.itemcode,null,function (data) {
                            if(ajaxUtil.success(data)){
                                ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                    if(!ajaxUtil.success(data)){
                                        return alertUtil.error("文件删除失败");
                                    }
                                },false,"","get");
                                alertUtil.info("删除电视电影信息成功");
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
                var myPassTravelModalData ={
                    modalBodyID :"myPassModal",
                    modalTitle : "审核通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "chineseCulturalStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                        };
                        ajaxUtil.myAjax(null,"/cul/pro/movTv/cgMovTvSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == 88888){
                                    if(sessionStorage.getItem("rolename") == "文化宣传处长"){
                                        alertUtil.info("审核已通过，已发送给综合处处长做最后审核！");
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
                var myPassModal = modalUtil.init(myPassTravelModalData);
                myPassModal.show();
            },

            'click .fail' : function (e, value, row, index) {
                var myFailTravelModalData ={
                    modalBodyID :"myFailModal",
                    modalTitle : "审核不通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "chineseCulturalStatus": ""
                        };
                        if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                            submitStatus.chineseCulturalStatus = webStatus[3].id;
                        }else{
                            submitStatus.chineseCulturalStatus = webStatus[4].id;
                        }
                        ajaxUtil.myAjax(null,"/cul/pro/movTv/cgMovTvSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var myFailModal = modalUtil.init(myFailTravelModalData);
                myFailModal.show();
            },

            'click .under-shelf' : function (e, value, row, index) {
                var myUnderShelfTravelModalData ={
                    modalBodyID :"myUnderShelfModal",
                    modalTitle : "下架",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "chineseCulturalStatus": webStatus[6].id
                        };
                        ajaxUtil.myAjax(null,"/cul/pro/movTv/cgMovTvSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var myUnderShelfModal = modalUtil.init(myUnderShelfTravelModalData);
                myUnderShelfModal.show();
            },

            'click .view' : function (e, value, row, index) {
                var myViewTravelModalData ={
                    modalBodyID : "myViewCulturalModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle : "查看详情",
                    modalClass : "modal-lg",
                    confirmButtonStyle: "display:none",
                };
                var myTravelModal = modalUtil.init(myViewTravelModalData);
                $("#chineseCulturalName").val(row.chineseCulturalName);
                $("#chineseCulturalSource").val(row.chineseCulturalSource);
                $("#chineseCulturalAuthor").val(row.chineseCulturalAuthor);
                $("#chineseCulturalContent").html(row.chineseCulturalContent);
                $("#creater").val(row.creater);
                $("#itemCreateAt").val(row.itemcreateat);
                $("#chineseCulturalStatus").val(webStatus[row.chineseCulturalStatus].text);
                $("#culturalImg").attr("src",row.filePath)
                $('#culturalImgSpan').html("电影电视图片");
                $('#culturalNameSpan').html("电影电视名称");
                $('#culturalContentSpan').html("电影电视介绍");

                myTravelModal.show();
            },

            'click .submit' : function (e, value, row, index) {
                var mySubmitTravelModalData ={
                    modalBodyID :"mySubmitModal",
                    modalTitle : "提交",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "chineseCulturalStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                        };
                        ajaxUtil.myAjax(null,"/cul/pro/movTv/cgMovTvSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var mySubmitModal = modalUtil.init(mySubmitTravelModalData);
                mySubmitModal.show();
            },

            'click .no-submit' : function (e, value, row, index) {
                var myNoSubmitTravelModalData ={
                    modalBodyID :"myNoSubmitModal",
                    modalTitle : "取消提交",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var submitStatus = {
                            "chineseCulturalStatus": webStatus[0].id
                        };
                        ajaxUtil.myAjax(null,"/cul/pro/movTv/cgMovTvSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                var mySubmitModal = modalUtil.init(myNoSubmitTravelModalData);
                mySubmitModal.show();
            },
        };


            $("#btn_addTask").unbind().on('click',function () {
                var url = "/chineseCultural/production/insertMovieTV";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            $("#chargePersonSearch").selectUtil(pl);

        var aCol = [
            {field: 'chineseCulturalName', title: '电视电影名称'},
            {field: 'filePath', title: '图片', formatter:function (value, row, index) {
                    if(value == "已经损坏了"){
                        return '<p>'+value+'</p>';
                    }else{
                        return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                    }
                }},
            {field: 'chineseCulturalSource', title: '来源'},
            {field: 'chineseCulturalAuthor', title: '作者'},
            {field: 'itemcreateat', title: '创建时间'},
            {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
        ];

        var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

        function refreshTable() {
            var param = {};
            myTable.free();
            myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
        }

        bootstrapTableUtil.globalSearch("table", url, aParam, aCol, "chineseCulturalStatus")


    })
})();
