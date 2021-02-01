(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "selectallhealthcarechinesemedicinedo";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url,"chineseMedicineStatus",webStatus);
            var aParam = {

            };
            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.chineseMedicineStatus,webStatus)
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/healthCare/insertchineseMedicine");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModalMedicine",
                        modalTitle : "删除中医药名称",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deletehealthcarechinesemedicinedo/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除中医药名称成功");
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
                    var myPassChineseMedicineModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "chineseMedicineStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustomedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
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
                    var myPassModal = modalUtil.init(myPassChineseMedicineModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailChineseMedicineModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "chineseMedicineStatus": ""
                            };
                            if(sessionStorage.getItem("rolename") == "文化宣传处长" || sessionStorage.getItem("rolename") == "政务资源处长"){
                                submitStatus.chineseCulturalStatus = webStatus[3].id;
                            }else{
                                submitStatus.chineseCulturalStatus = webStatus[4].id;
                            }
                            ajaxUtil.myAjax(null,"changestatustomedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myFailModal = modalUtil.init(myFailChineseMedicineModalData);
                    myFailModal.show();
                },
                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfChineseMedicineModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "chineseMedicineStatus": webStatus[6].id
                            };
                            ajaxUtil.myAjax(null,"changestatustomedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfChineseMedicineModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewChineseMedicineModalData ={
                        modalBodyID : "myviewChineseMedicineModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myChineseMedicineModal = modalUtil.init(myViewChineseMedicineModalData);
                    $("#chineseMedicineName").val(row.chineseMedicineName);
                    $("#chineseMedicineAlias").val(row.chineseMedicineAlias);
                    $("#chineseMedicineType").val(p2[row.chineseMedicineType].text);
                    $("#chineseMedicineHarvesting").val(row.chineseMedicineHarvesting);
                    $("#chineseMedicineTaste").val(row.chineseMedicineTaste);
                    $("#chineseMedicineMerTro").val(row.chineseMedicineMerTro);
                    $("#chineseMedicineEffect").val(row.chineseMedicineEffect);
                    $("#chineseMedicineUsage").val(row.chineseMedicineUsage);
                    $("#creater").val(row.creater);
                    $("#itemCreateAt").val(row.itemcreateat);
                    $("#chineseMedicineStatus").val(webStatus[ row.chineseMedicineStatus].text);
                    $("#mediCineImg").attr("src",row.filePath)
                    $('#mediCineImgSpan').html("药材图片");

                    myChineseMedicineModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitChineseMedicineModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "chineseMedicineStatus": selectUtil.getStatus(sessionStorage.getItem("rolename"),webStatus)
                            };
                            ajaxUtil.myAjax(null,"changestatustomedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(mySubmitChineseMedicineModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitChineseMedicineModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "chineseMedicineStatus": webStatus[0].id
                            };
                            ajaxUtil.myAjax(null,"changestatustomedicine/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(myNoSubmitChineseMedicineModalData);
                    mySubmitModal.show();
                },
            };


            $("#btn_addTask").unbind().on('click',function () {
                var url = "/healthCare/insertchineseMedicine";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            $("#chargePersonSearch").selectUtil(pl);

           var p2 = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            $("#Search").selectUtil(p2);

            $("#Search").unbind("change").on("change",function () {
                var newArry = [];
                var allTableData = JSON.parse(localStorage.getItem("2"));
                var searchGxfl=document.getElementById("Search").value;

                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        var gxfl= allTableData[i]["chineseMedicineType"]
                        //调试时可以先打印出来，进行修改
                        if(gxfl==searchGxfl){
                            isStatusSlot=true;
                        }
                        //当存在时将条件改为flase
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(isStatusSlot){
                            newArry.push(allTableData[i])
                        }
                        var newArr=new Set(newArry)
                        newArry=Array.from(newArr)
                        $("#table").bootstrapTable("load", newArry);
                    }
                }
            });

            var aCol = [
                        {field: 'chineseMedicineName', title: '中医药名称'},
                        {field: 'chineseMedicineAlias', title: '别名'},
                        {field:'chineseMedicineType',title:'功效分类',formatter:function (row) {
                        return '<p>'+p2[row].text+'</p>';
                        }},
                        {field: 'filePath', title: '药材图片', formatter:function (value, row, index) {
                                if(value == "已经损坏了"){
                                    return '<p>'+value+'</p>';
                                }else{
                                    return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
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
                        var status= allTableData[i]["chineseMedicineStatus"]
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        //调试时可以先打印出来，进行修改
                        if(addstr==status){
                            isStatusSlot=true;
                        }
                        //当存在时将条件改为flase
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

        })
})();