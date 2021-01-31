(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url;

            if(sessionStorage.getItem("rolename") == "专家"){
                url = "/exmain/getByExpertCode?expertUserCode="+sessionStorage.getItem("itemcode");
            }else if(sessionStorage.getItem("rolename") == "科研项目-省级"){
                url = "/exmain/exmain";
            }

            //角色加载工具

            var aParam = {

            };

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);
            $("#chargePersonSearch").selectUtil(pl);

            //操作
            function operation(value, row, index){
                if(sessionStorage.getItem("rolename") == "专家") {
                    if (row.exmaineStatus == pl[1].id) {
                        return [
                            '<a class="exmaine" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >评审</a>',
                        ].join('');
                    } else if (row.exmaineStatus == pl[2].id) {
                        return [
                            '<a class="exmaine" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >评审</a>',
                            '<a class="submit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >提交</a>',
                        ].join('');
                    } else if (row.exmaineStatus == pl[0].id) {
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }
                } else if (sessionStorage.getItem("rolename") == "科研项目-省级"){
                    return[
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }
            }



            //修改事件
            window.orgEvents = {
                'click .view' : function (e, value, row, index) {
                    localStorage.setItem("isView","true");
                    localStorage.setItem("viewDetail",JSON.stringify(row));
                    orange.redirect("/evaluationTable/evaluationTable")
                },
                'click .exmaine' : function (e, value, row, index) {
                    localStorage.removeItem("isView");
                    localStorage.setItem("keepExmaine",JSON.stringify(row));
                    localStorage.setItem("examinTopicCode",JSON.stringify(row.topicCode));
                    orange.redirect("/evaluationTable/evaluationTable")
                },
                'click .submit' : function (e, value, row, index) {
                    var mySubmitExmainModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                exmaineStatus: pl[0].id,
                                topicCode : row.topicCode,
                            };
                            var checkExpertCodeParam = {
                                expertUserCode : sessionStorage.getItem("itemcode")
                            };
                            ajaxUtil.myAjax(null,"exmain/selExpertCode",checkExpertCodeParam,function (data) {
                                submitStatus.expertCode = data.data;
                                ajaxUtil.myAjax(null,"/exmain/exmain",submitStatus,function (data) {
                                    if(ajaxUtil.success(data)){
                                        if(data.code == ajaxUtil.successCode){
                                            var submitConfirmModal = {
                                                modalBodyID :"myTopicSubmitTip",
                                                modalTitle : "提示",
                                                modalClass : "modal-lg",
                                                cancelButtonStyle: "display:none",
                                                modalConfirmFun:function (){
                                                    return true;
                                                }
                                            }
                                            var submitConfirm = modalUtil.init(submitConfirmModal);
                                            submitConfirm.show();
                                            isSuccess = true;
                                            refreshTable();
                                        }else{
                                            alertUtil.error(data.msg);
                                        }

                                    }else {
                                        alertUtil.error(data.msg)
                                    }
                                },false,true,"put");
                            },false);
                        return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitExmainModalData);
                    mySubmitModal.show();
                }
            };

            //点击文件名查看详情事件
            function viewOperation(value, row, index){
                return [
                    '<a class="topicview" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#775637;" data-target="" >'+row.projectName+'</a>',
                ].join('');
            }
            window.viewEvents = {
                'click .topicview': function (e, value, row, index){
                    localStorage.setItem("viewRowData", JSON.stringify(row));
                    localStorage.setItem("centralizedView","true");
                    var viewUrl = "/scientificProject/viewTopicManagement";
                    orange.redirect(viewUrl);
                },
            };



            var aCol = [
                {field: 'projectNo', title: '项目编号'},
                {field: 'projectName', title: '项目名称', formatter: viewOperation, events: viewEvents},
                {field: 'company', title: '申报单位'},
                {field: 'exmaineStatus', title: '状态', formatter:function (value) {
                        if(value.search("1") == -1){
                            return '<p>'+pl[0].text+'</p>';
                        }else if(value.search("0") == -1){
                            return '<p>'+pl[1].text+'</p>';
                        }else {
                            return '<p>'+pl[2].text+'</p>';
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
                        var status= allTableData[i]["exmaineStatus"]
                        if(status.search("1") == -1){
                            status = '0';
                        }else if(status.search("0") == -1){
                            status = '1';
                        }else {
                            status = '2';
                        }
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        //调试时可以先打印出来，进行修改
                        if(addstr==status||addstr=='99'){
                            isStatusSlot=true;
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(isStatusSlot){
                            if(textP.search(str) != -1){
                                newArry.push(allTableData[i])
                            }

                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);

            })



        })
})();

