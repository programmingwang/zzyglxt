(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/exmain/topicAndExpertStatus";
            var exmaineStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);
            var checkids = [];
            var experts = {};
            var expertUrl = "/industrialdevelop/expert/selectAll";
            //角色加载工具
            var aParam = {

            };
            function initExpert() {
                ajaxUtil.myAjax(null, expertUrl, null, function (data) {
                    if (ajaxUtil.success(data)) {
                        experts = data.data
                    } else {
                        alert(data.msg);
                    }
                }, false, true, "get");
            }

            //判断该项目是否有专家
            function isDistribution(expertCode) {
                if (expertCode == undefined || expertCode == null || expertCode.toLowerCase() == "null" || expertCode == ""){
                    return false
                }
                else {
                    return true
                }
            }

            //操作
            function operation(value, row, index){
                if (isDistribution(row.expertCode)){
                    return [
                        '<a class="cancel" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >取消分配专家</a>',
                    ].join('');
                }
                else {
                    return [
                        '<a class="distribution" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >分配专家</a>',
                    ].join('');
                }

            }

            function getChecks(){
                return $("#table").bootstrapTable('getSelections');
            }

            function distribution(rows){
                var addExperModal ={
                    modalBodyID : "addExperModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle : "分配专家",
                    modalClass : "modal-lg",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        for (var i = 0; i < rows.length; i++){
                            var expertsRows = $("#expertsTable").bootstrapTable('getSelections');
                            if (expertsRows.length==0) {
                                alertUtil.error("错误，未勾选专家，请勾选专家后重试")
                                return true;
                            }
                            else {
                                for (var j = 0; j < expertsRows.length; j++) {
                                    var entity = {
                                        itemcode : stringUtil.getUUID(),
                                        expertCode : expertsRows[j].itemcode,
                                        topicCode : rows[i].itemcode,
                                        exmaineStatus : exmaineStatus[1].id
                                    }
                                    ajaxUtil.myAjax(null, "/exmain/exmain", entity, function (data) {
                                        if (ajaxUtil.success(data)) {
                                        } else {
                                            alert(data.msg);
                                        }
                                    }, false, true, "post");
                                }
                                refreshTable();
                                alertUtil.info("分配专家成功");
                                return true;
                            }
                        }
                    }
                }
                var addExperModal = modalUtil.init(addExperModal);
                if (Object.keys(experts).length == 0) {
                    initExpert();
                }
                var expertsCol = [
                    {checkbox:true},
                    {field: 'name', title: '专家姓名'},
                    {field: 'filed', title: '擅长领域'},
                    {field: 'gender', title: '性别'},
                    {field: 'mobilephone', title: '联系电话'},
                ];
                $('#expertsTable').bootstrapTable('destroy');
                $('#expertsTable').bootstrapTable({
                    toolbar:"#expertsTable",
                    columns: expertsCol,
                    striped: true,
                    clickToSelect:true,
                });
                $('#expertsTable').bootstrapTable('load', Array.from(experts));
                addExperModal.show();
            }

            function cancel(rows){
                var myDeleteModalData ={
                    modalBodyID : "myCencelDistribution",
                    modalTitle : "取消分配专家",
                    modalClass : "modal-md",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        var deleteUrl = "/exmain/exmain";
                        var isSuccess = false;
                        for (var i = 0; i < rows.length; i++){
                            ajaxUtil.myAjax(null, deleteUrl + "?topicCode=" + rows[i].itemcode, null, function (data) {
                                if (ajaxUtil.success(data)) {
                                    isSuccess = true;
                                } else {
                                    isSuccess = false
                                    alert(data.msg);
                                }
                            }, false, true, "delete");
                        }
                        refreshTable();
                        alertUtil.info("取消分配专家成功");
                        return isSuccess;
                    }
                };
                var myDeleteModal = modalUtil.init(myDeleteModalData);
                myDeleteModal.show();
            }

            $("#addExper").unbind().on('click',function () {
                if (getChecks().length==0){
                    alertUtil.error("错误，未勾选项目，请勾选项目后重试")
                }
                else {
                    distribution(getChecks());
                }
            });

            $("#deleteExper").unbind().on('click',function () {
                if (getChecks().length==0){
                    alertUtil.error("错误，未勾选项目，请勾选项目后重试")
                }
                else {
                    cancel(getChecks());
                }
            });

            //修改事件
            window.orgEvents = {
                'click .distribution' : function (e, value, row, index) {
                    checkids[0] = row;
                    distribution(checkids);
                },
                'click .cancel' : function (e, value, row, index) {
                    checkids[0] = row;
                    cancel(checkids)
                },
            };

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.distributionExpert);
            $("#chargePersonSearch").selectUtil(pl);
            var $default = $("<option value=\"000\" selected>全部状态</option>");
            $("#chargePersonSearch").prepend($default);

            var aCol = [
                {checkbox:true},
                {field: 'projectNo', title: '项目编号'},
                {field: 'projectName', title: '项目名称'},
                {field: 'company', title: '申报单位'},
                {field: 'expertCode', title: '状态',formatter:function (value, row, index) {
                        if (isDistribution(value)){
                            return "已分配专家";
                        }
                        else {
                            return "未分配专家";
                        }
                    }},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            // $("#chargePersonSearch").unbind().on('change',function() {
            //     var newArry = [];
            //     var addstr=document.getElementById("chargePersonSearch").value;
            //     var allTableData = JSON.parse(localStorage.getItem("2"));
            //     for (var i in allTableData) {
            //         var status= isDistribution(allTableData[i]["expertCode"]);
            //         if(addstr==Number(status) || addstr=="000") {
            //             newArry.push(allTableData[i])
            //         }
            //     }
            //     var newArr=new Set(newArry)
            //     newArry=Array.from(newArr)
            //     $("#table").bootstrapTable("load", newArry);
            //     if(newArry.length == 0){
            //         alertUtil.warning("此状态下没有数据");
            //     }
            // })

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
                        var status= isDistribution(allTableData[i]["expertCode"]);
                        if(addstr==Number(status) || addstr=="000"){
                            isStatusSlot=true;
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(textP.search(str) != -1 && isStatusSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry);
                newArry=Array.from(newArr);
                if(newArry.length == 0){
                    alertUtil.warning("此搜索条件下没有数据");
                }
                else if (str=="" && addstr!="000") {
                    alertUtil.success("已搜索该状态下全部数据")
                }
                $("#table").bootstrapTable("load", newArry);
            })


            var allTableData = $("#table").bootstrapTable("getData");
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));

        })
})();