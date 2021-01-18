(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/industrialdevelop/topicAndExpert";
            var exmaineStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);
            var checkids = [];

            //角色加载工具
            var aParam = {

            };

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
                var postUrl = "/industrialdevelop/expert/selectAll"
                var experts = {}
                var addExperModal ={
                    modalBodyID : "addExperModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle : "分配专家",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        for (var i = 0; i < rows.length; i++){
                            var isCheckBox = false
                            $('input[name="checkExperName"]').each(function () {
                                if ($(this).prop('checked')) {
                                    isCheckBox = true
                                    var entity = {
                                        itemcode : stringUtil.getUUID(),
                                        expertCode : $(this).val(),
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
                            })
                        }

                        if (isCheckBox) {
                            refreshTable();
                            alertUtil.info("分配专家成功");
                            return true;
                        }
                        else {
                            alertUtil.error("错误，没有勾选专家，请勾选专家后重试")
                            return true;
                        }
                    }
                }
                var addExperModal = modalUtil.init(addExperModal);
                ajaxUtil.myAjax(null, postUrl, null, function (data) {
                    if (ajaxUtil.success(data)) {
                        experts = data.data
                        var html = "";
                        $.each(experts,function (i,it) {
                            html = html + '<input type="checkbox" name="checkExperName" value="'+it.itemcode+'"><span>'+it.name+'&emsp;</span>';
                        });
                        $("#experName").html("");
                        $("#experName").append(html);
                    } else {
                        alert(data.msg);
                    }
                }, false, true, "get");
                addExperModal.show();
            }

            function cancel(rows){
                var myDeleteModalData ={
                    modalBodyID : "myCencelDistribution",
                    modalTitle : "取消分配专家",
                    modalClass : "modal-lg",
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
                    distribution(getChecks())
                }
            });

            $("#deleteExper").unbind().on('click',function () {
                if (getChecks().length==0){
                    alertUtil.error("错误，未勾选项目，请勾选项目后重试")
                }
                else {
                    cancel(getChecks())
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
                        if(addstr==Number(status)){
                            isStatusSlot=true;
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if($("#closeAndOpen").text().search("展开")!= -1 && textP.search(str) != -1){
                            isStatusSlot = false;
                            newArry.push(allTableData[i])
                        }
                        if($("#closeAndOpen").text().search("收起")!= -1 && textP.search(str) != -1 && isStatusSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);
                if(newArry.length == 0){
                    alertUtil.warning("搜索成功,但此搜索条件下没有数据");
                }else{
                    alertUtil.success("搜索成功");
                }
            })
            var aria=this.ariaExpanded;
            $("#closeAndOpen").unbind().on('click',function(){
                this.innerText="";
                if (aria==="true"){
                    this.innerText="展开";
                    aria = "false";
                } else {
                    this.innerText="收起";
                    aria = "true";
                }
            })


            var allTableData = $("#table").bootstrapTable("getData");
            localStorage.setItem('2',JSON.stringify(allTableData))
            obj2=JSON.parse(localStorage.getItem("2"));

        })
})();