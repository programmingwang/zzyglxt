(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/industrialdevelop/topicAndExpert";
            var exmaineStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);
            var submitStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.expertSubmitStatus);

            //角色加载工具
            var aParam = {

            };

            //判断该项目是否有专家
            function handleStatus(expertCode) {
                if (expertCode == undefined || expertCode == null || expertCode.toLowerCase() == "null" || expertCode == ""){
                    return "未分配专家"
                }
                else {
                    return "已分配专家"
                }
            }

            //操作
            function operation(value, row, index){
                if (handleStatus(row.expertCode) == "未分配专家"){
                    return [
                        '<a class="distribution" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >分配专家</a>',
                    ].join('');
                }
                else {
                    return [
                        '<a class="cancel" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >取消分配专家</a>',
                    ].join('');
                }

            }

            //修改事件
            window.orgEvents = {
                'click .distribution' : function (e, value, row, index) {
                    var postUrl = "/industrialdevelop/expert/selectAll"
                    var experts = {}

                    var addExperModal ={
                        modalBodyID : "addExperModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "分配专家",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var entity = {
                                itemcode : stringUtil.getUUID(),
                                expertCode : $("#experName").val(),
                                topicCode : row.itemcode,
                                exmaineStatus : exmaineStatus[1].id
                            }
                            ajaxUtil.myAjax(null, "/exmain/exmain", entity, function (data) {
                                if (ajaxUtil.success(data)) {
                                    alertUtil.info("分配专家成功");
                                    refreshTable();
                                } else {
                                    alert(data.msg);
                                }
                            }, true, true, "post");
                            return true;
                        }
                    }
                    var addExperModal = modalUtil.init(addExperModal);
                    ajaxUtil.myAjax(null, postUrl, null, function (data) {
                        if (ajaxUtil.success(data)) {
                            experts = data.data
                            var html = "";
                            $.each(experts,function (i,it) {
                                html = html + '<option value="'+it.itemcode+'">'+it.username+'</option>';
                            });
                            $("#experName").html("");
                            $("#experName").append(html);
                        } else {
                            alert(data.msg);
                        }
                    }, false, true, "get");
                    addExperModal.show();
                },
                'click .cancel' : function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myCencelDistribution",
                        modalTitle : "取消分配专家",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var deleteUrl = "/exmain/exmain";
                            ajaxUtil.myAjax(null, deleteUrl + "?topicCode=" + row.itemcode, null, function (data) {
                                if (ajaxUtil.success(data)) {
                                    alertUtil.info("取消分配专家成功");
                                    refreshTable();
                                } else {
                                    alert(data.msg);
                                }
                            }, true, true, "delete");
                            return true;
                        }
                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },
            };

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.distributionExpert);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'projectNo', title: '项目编号'},
                {field: 'projectName', title: '项目名称'},
                {field: 'company', title: '申报单位'},
                {field: 'expertCode', title: '状态',formatter:function (value, row, index) {
                        return handleStatus(value);
                    }},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }


            // bootstrapTableUtil.globalSearch("table",url,aParam, aCol);

            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));

        })
})();

