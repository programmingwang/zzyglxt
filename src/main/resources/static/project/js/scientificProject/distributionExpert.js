(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil) {

            var url = "/exmain/topicAndExpertStatus";
            var exmaineStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);
            // 获取勾选的行
            var checkids = [];
            // 存储专家信息
            var experts = {};
            // 获取专家信息的url
            var expertUrl = "/industrialdevelop/expert/selectAll";
            //角色加载工具
            var aParam = {};

            //获取专家信息
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
            function isDistribution(expertList) {
                if (expertList.length == 0) {
                    return false
                }
                else {
                    return true
                }
            }

            //操作
            function operation(value, row, index) {
                if (isDistribution(row.expertList)) {
                    return [
                        '<a class="revise" style="1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >修改专家</a>',
                    ].join('');
                }
                else {
                    return [
                        '<a class="distribution" style="1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >分配专家</a>',
                    ].join('');
                }

            }

            //获取勾选的行
            function getChecks() {
                checkids = $("#table").bootstrapTable('getSelections');
                if (checkids.length === 0) {
                    alertUtil.error("错误，未勾选项目，请勾选项目后重试");
                }
            }

            //分配函数，操作按钮和批量都是调用此函数
            function distribution(rows) {
                var addExperModal = {
                    modalBodyID: "addExperModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle: "分配专家",
                    modalClass: "modal-lg",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        for (var i = 0; i < rows.length; i++) {
                            var expertsRows = $("#expertsTable").bootstrapTable('getSelections');
                            if (expertsRows.length == 0) {
                                alertUtil.error("错误，未勾选专家，请勾选专家后重试")
                                return true;
                            }
                            else {
                                var expertList = [];
                                for (var j = 0; j < expertsRows.length; j++) {
                                    var entity = {
                                        itemcode: stringUtil.getUUID(),
                                        expertCode: expertsRows[j].itemcode,
                                        topicCode: rows[i].itemcode,
                                        exmaineStatus: exmaineStatus[1].id
                                    }
                                    expertList.push(entity)
                                }
                                var list = new Set(expertList);
                                expertList = Array.from(list);
                                ajaxUtil.myAjax(null, "/exmain/exmain", expertList, function (data) {
                                    if (ajaxUtil.success(data)) {
                                    } else {
                                        alert(data.msg);
                                    }
                                }, false, true, "post");
                            }
                        }
                        refreshTable();
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                        return true;
                    }
                }
                var addExperModal = modalUtil.init(addExperModal);
                if (Object.keys(experts).length == 0) {
                    initExpert();
                }
                var expertsCol = [
                    {checkbox: true},
                    {field: 'name', title: '专家姓名'},
                    {field: 'filed', title: '擅长领域'},
                    {field: 'gender', title: '性别'},
                    {field: 'mobilephone', title: '联系电话'},
                ];
                $('#expertsTable').bootstrapTable('destroy');
                $('#expertsTable').bootstrapTable({
                    toolbar: "#expertsTable",
                    columns: expertsCol,
                    striped: true,
                    clickToSelect: true,
                });
                $('#expertsTable').bootstrapTable('load', Array.from(experts));
                addExperModal.show();
            }

            //取消分配函数，操作按钮和批量都是调用此函数
            function cancel(rows) {
                let deleteConfirm = false;
                let expertArray = [];
                let deleteModal = "myCencelDistribution";
                //循环检测是否有专家已经评审
                for (var i = 0; i < rows.length; i++) {
                    var rowExpertList = rows[i].expertList;
                    for (var j = 0; j < rowExpertList.length; j++) {
                        var score = rowExpertList[j].score;
                        if (score != null && score !== "" && score.toLowerCase() !== "null") {
                            deleteConfirm = true;
                        }
                    }
                    let entity = {
                        topicCode: rows[i].itemcode,
                    }
                    expertArray.push(entity);
                }
                if (deleteConfirm) {
                    deleteModal = "myCencelDistributionConfirm";
                }
                var myDeleteModalData = {
                    modalBodyID: deleteModal,
                    modalTitle: "取消分配专家",
                    modalClass: "modal-md",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        var deleteUrl = "/exmain/exmain";
                        var isSuccess = false;
                        let list = new Set(expertArray);
                        expertArray = Array.from(list);
                        console.log(expertArray);
                        ajaxUtil.myAjax(null, "/exmain/exmain", expertArray, function (data) {
                            if (ajaxUtil.success(data)) {
                                isSuccess = true;
                            } else {
                                isSuccess = false
                                alert(data.msg);
                            }
                        }, false, true, "delete");
                        refreshTable();
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                        return isSuccess;
                    }
                };
                var myDeleteModal = modalUtil.init(myDeleteModalData);
                myDeleteModal.show();
            }

            //点击上方批量分配专家
            $("#addExper").unbind().on('click', function () {
                getChecks();
                if (checkids.length !== 0) {
                    distribution(checkids);
                }
            });

            //点击上方批量取消分配专家
            $("#deleteExper").unbind().on('click', function () {
                getChecks();
                if (checkids.length !== 0) {
                    cancel(checkids);
                }
            });

            //点击操作按钮
            window.orgEvents = {
                'click .distribution': function (e, value, row, index) {
                    var r = [];
                    r.push(row);
                    distribution(r);
                },
                'click .revise': function (e, value, row, index) {
                    var rowExpertList = row.expertList;
                    var expertTable1 = [];
                    var expertTable2 = [];
                    var reviseExperModalData = {
                        modalBodyID: "reviseExperModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle: "修改专家",
                        modalClass: "modal-lg",
                        confirmButtonClass: "btn-danger",
                        modalConfirmFun: function () {
                            let deleteModal = "myConfirmReviseExpert";
                            let confirmStatus1 = false;
                            let confirmStatus2 = false;
                            //获取已分配专家表中未勾选的数据然后删掉专家关系表中的数据
                            let expertList1 = [];
                            let entity = {};
                            let expertSelections1 = $("#expertsTable1").bootstrapTable('getSelections');
                            if (expertSelections1.length !== expertTable1.length) {//判断是否有取消勾选
                                confirmStatus1 = true;
                                for (let i = 0; i < rowExpertList.length; i++) {
                                    let select = false;
                                    for (let j = 0; j < expertSelections1.length; j++) {
                                        if (rowExpertList[i].itemcode === expertSelections1[j].itemcode) {
                                            select = true;
                                            break;
                                        }
                                    }
                                    if (select === false) {
                                        let score = rowExpertList[i].score;
                                        if (score !== null && score !== "" && score.toLowerCase() !== "null") {
                                            deleteModal = "myConfirmReviseExpertConfirm";
                                        }
                                        entity = {
                                            expertCode: rowExpertList[i].itemcode,
                                            topicCode: row.itemcode,
                                        }
                                        expertList1.push(entity)
                                    }
                                }
                            }
                            //获取到未分配专家表中勾选的数据然后新增专家
                            let expertList2 = [];
                            let expertSelections2 = $("#expertsTable2").bootstrapTable('getSelections');
                            if (expertSelections2.length !== 0) {
                                confirmStatus2 = true;
                                for (let j = 0; j < expertSelections2.length; j++) {
                                    entity = {
                                        itemcode: stringUtil.getUUID(),
                                        expertCode: expertSelections2[j].itemcode,
                                        topicCode: row.itemcode,
                                        exmaineStatus: exmaineStatus[1].id,
                                    }
                                    expertList2.push(entity)
                                }
                            }
                            if (confirmStatus1 || confirmStatus2) {
                                var myConfirmReviseData = {
                                    modalBodyID: deleteModal, //公用的在后面给span加不同的内容就行了，其他模块同理
                                    modalTitle: "修改专家",
                                    modalClass: "modal-lg",
                                    confirmButtonClass: "btn-danger",
                                    modalConfirmFun: function () {
                                        if (confirmStatus1) {
                                            ajaxUtil.myAjax(null, "/exmain/delExpertTopic", expertList1, function (data) {
                                                if (ajaxUtil.success(data)) {
                                                } else {
                                                    alert(data.msg);
                                                }
                                            }, false, true, "delete");
                                        }
                                        if (confirmStatus2) {
                                            ajaxUtil.myAjax(null, "/exmain/exmain", expertList2, function (data) {
                                                if (ajaxUtil.success(data)) {
                                                } else {
                                                    alert(data.msg);
                                                }
                                            }, false, true, "post");
                                        }
                                        refreshTable();
                                        var submitConfirmModal = {
                                            modalBodyID: "myTopicSubmitTip",
                                            modalTitle: "提示",
                                            modalClass: "modal-lg",
                                            cancelButtonStyle: "display:none",
                                            confirmButtonClass: "btn-danger",
                                            modalConfirmFun: function () {
                                                return true;
                                            }
                                        }
                                        return true;
                                    }
                                }
                                var confirmRevise = modalUtil.init(myConfirmReviseData);
                                confirmRevise.show();
                            }
                            return true;
                        }
                    }
                    var reviseExperModal = modalUtil.init(reviseExperModalData);
                    if (Object.keys(experts).length === 0) {
                        initExpert();
                    }
                    var expertsCol = [
                        {checkbox: true},
                        {field: 'name', title: '专家姓名'},
                        {field: 'filed', title: '擅长领域'},
                        {field: 'gender', title: '性别'},
                        {field: 'mobilephone', title: '联系电话'},
                    ];
                    var expertsCol1 = [
                        {
                            checkbox: true, formatter: function () {
                                return {
                                    checked: true
                                }
                            }
                        },
                        {field: 'name', title: '专家姓名'},
                        {field: 'filed', title: '擅长领域'},
                        {field: 'gender', title: '性别'},
                        {field: 'mobilephone', title: '联系电话'},
                    ];
                    $('#expertsTable1').bootstrapTable('destroy');
                    $('#expertsTable1').bootstrapTable({
                        toolbar: "#expertsTable1",
                        columns: expertsCol1,
                        striped: true,
                        clickToSelect: true,
                        checked: true,
                    });
                    $('#expertsTable2').bootstrapTable('destroy');
                    $('#expertsTable2').bootstrapTable({
                        toolbar: "#expertsTable2",
                        columns: expertsCol,
                        striped: true,
                        clickToSelect: true,
                    });
                    for (var i = 0; i < experts.length; i++) {
                        let sameExpert = false;
                        for (var j = 0; j < rowExpertList.length; j++) {
                            if (experts[i].itemcode === rowExpertList[j].itemcode) {
                                sameExpert = true;
                                expertTable1.push(experts[i]);
                                break;
                            }
                        }
                        if (sameExpert === false) {
                            expertTable2.push(experts[i])
                        }
                    }
                    $('#expertsTable1').bootstrapTable('load', Array.from(expertTable1));
                    $('#expertsTable2').bootstrapTable('load', Array.from(expertTable2));
                    reviseExperModal.show();
                },
            };

            //响应点击项目名字展示信息
            function viewOperation(value, row, index) {
                return [
                    '<a class="topicview" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >' + row.projectName + '</a>',
                ].join('');
            }

            window.viewEvents = {
                'click .topicview': function (e, value, row, index) {
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    localStorage.setItem("distributionExpert", "true");
                    var viewUrl = "/scientificProject/viewTopicManagement";
                    orange.redirect(viewUrl);
                },
            };

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.distributionExpert);
            $("#chargePersonSearch").selectUtil(pl);
            var $default = $("<option value=\"000\" selected>全部</option>");
            $("#chargePersonSearch").prepend($default);

            var aCol = [
                {checkbox: true},
                {
                    width: '64px', title: '序号', align: 'center', formatter: function (value, row, index) {
                        //获取每页显示的数量
                        var pageSize = $("#table").bootstrapTable('getOptions').pageSize;
                        //获取当前是第几页
                        var pageNumber = $("#table").bootstrapTable('getOptions').pageNumber;
                        // return pageSize * (pageNumber - 1) + index + 1;  // 分页后出现断层
                        return index + 1;
                    }
                },
                {field: 'projectNo', title: '项目编号',width:'200px',},
                {field: 'projectName', title: '项目名称', formatter: viewOperation, events: viewEvents},
                {field: 'company', title: '申报单位'},
                {
                    field: 'expertList', title: '状态', formatter: function (value, row, index) {
                        if (isDistribution(value)) {
                            return "已分配专家";
                        }
                        else {
                            return "未分配专家";
                        }
                    }
                },
                {field: 'action', title: '操作',width:'200px', formatter: operation, events: orgEvents}
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

            $("#btnSearch").unbind().on('click', function () {
                var newArry = [];
                var addstr = document.getElementById("chargePersonSearch").value;
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if (str.indexOf("请输入") != -1) {
                    str = ""
                }
                for (var i in allTableData) {
                    for (var v in aCol) {
                        //判断这个列是否是专家列，因为后台一对多传过来了一个数组
                        if (aCol[v].field != "expertList") {
                            var textP = allTableData[i][aCol[v].field];
                            var isStatusSlot = false;           // 默认状态为true
                            //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                            var status = isDistribution(allTableData[i]["expertList"]);
                            if (addstr == Number(status) || addstr == "000") {
                                isStatusSlot = true;
                            }
                            if (textP == null || textP == undefined || textP == '') {
                                textP = "1";
                            }
                            if (textP.search(str) != -1 && isStatusSlot) {
                                newArry.push(allTableData[i])
                            }
                        }
                    }
                }
                var newArr = new Set(newArry);
                newArry = Array.from(newArr);
                $("#table").bootstrapTable("load", newArry);
            })


            var allTableData = $("#table").bootstrapTable("getData");
            localStorage.setItem('2', JSON.stringify(allTableData))
            obj2 = JSON.parse(localStorage.getItem("2"));

        })
})();