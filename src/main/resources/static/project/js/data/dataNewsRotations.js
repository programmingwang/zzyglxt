(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


        var url = "/datado/newsInf/selectAllNewsRot";

        var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);

        var webLocation = dictUtil.getDictByCode(dictUtil.DICT_LIST.dataLocation);

        //角色加载工具
        url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"dataStatus",webStatus);

        var addUrl = "/data/add/addNewsRotations";
        var aParam = {

        };

        //操作
        function operation(value, row, index){
            return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.dataStatus,webStatus);
        }


            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteNewsRotations",
                        modalTitle : "删除新闻轮播图",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/datado/newsInf/deleteByPrimaryKey/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("图片删除失败");
                                        }
                                    },false,"","get");
                                    alertUtil.info("删除新闻轮播图成功");
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
                    var myPassNewsRotationsModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        if(sessionStorage.getItem("rolename") == "政务资源处长"){
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
                    var myPassModal = modalUtil.init(myPassNewsRotationsModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailNewsRotationsModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.dataStatus = webStatus[3].id;
                            }else{
                                submitStatus.dataStatus = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myFailModal = modalUtil.init(myFailNewsRotationsModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfNewsRotationsModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": webStatus[6].id
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfNewsRotationsModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewNewsRotationsModalData ={
                        modalBodyID : "myViewDataModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myNewsRotationsModal = modalUtil.init(myViewNewsRotationsModalData);
                    $("#dataTitle").val(row.dataTitle);
                    $("#dataSource").val(row.dataSource);
                    $("#dataAuthor").val(row.dataAuthor);
                    $("#dataContent").html(row.dataContent);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#dataStatus").val(webStatus[row.dataStatus].text);
                    $("#dataFileType").val(webLocation[row.dataLocation].text);
                    $("#newsImg").attr("src",row.filePath);
                    $('#newsImgSpan').html("新闻图片");
                    $('#dataTitleSpan').html("新闻标题");
                    $('#dataFileTypeSpan').html("所属位置");

                    myNewsRotationsModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitNewsRotationsModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(mySubmitNewsRotationsModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitNewsRotationsModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "dataStatus": webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"/datado/newsInf/changeNewsStatus/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(myNoSubmitNewsRotationsModalData);
                    mySubmitModal.show();
                },

            };


        $("#btn_addTask").unbind().on('click',function () {
            localStorage.removeItem("rowData");
            orange.redirect(addUrl);
        });

        var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
        $("#chargePersonSearch").selectUtil(pl);

        var aCol = [
            {field: 'dataTitle', title: '新闻标题'},
            {field: 'filePath', title: '新闻图片', formatter:function (value, row, index) {
                if(value == "已经损坏了"){
                    return '<p>'+value+'</p>';
                }else{
                    return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                }
            }},
            {field: 'dataLocation', title: '所属位置', formatter: function (value) {
                    return '</p>'+webLocation[value].text+'</p>'
                }},
            {field: 'itemcreateat', title: '创建时间'},
            {field: 'dataStatus', title: '展示状态', formatter: function (value) {
                    return '</p>'+webStatus[value].text+'</p>'
                }},
            {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
        ];

        var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

        function refreshTable() {
            var param = {};
            myTable.free();
            myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
        }
            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));
            //console.log(obj2);

        var allPosition = document.getElementById("allPosition").children;
        for(var i=1;i<allPosition.length;i++){
            console.log(allPosition[i].innerHTML)
            allPosition[i].onclick=function () {
                for(var j=1;j<allPosition.length;j++){
                    allPosition[j].classList.remove("addC");
                }
                this.classList.add("addC");
                var newArry = [];
                var allTableData = JSON.parse(localStorage.getItem("2"));
                var str=this.innerHTML;
                console.log(str)

                if (str=='全部'){
                    refreshTable()
                }
                for (var i in allTableData) {
                    var thisPosition=allTableData[i][aCol[2].field];
                    if (thisPosition==str){
                        newArry.push(allTableData[i]);
                    }
                }
                $("#table").bootstrapTable("load", newArry);
            }
        }

    })
})();
