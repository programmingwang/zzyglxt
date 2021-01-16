(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            var url = "/cul/res/traSch/getAll";

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
                    orange.redirect("/chineseCultural/resource/insertTraditionalSchool");
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModalTraditionalSch",
                        modalTitle : "删除中医流派",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/cul/res/traSch/delTraSch/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("文件删除失败");
                                        }
                                    },false,"","get");
                                    alertUtil.info("删除中医流派信息成功");
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
                            ajaxUtil.myAjax(null,"/cul/res/traSch/cgTraSchSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                            ajaxUtil.myAjax(null,"/cul/res/traSch/cgTraSchSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                            ajaxUtil.myAjax(null,"/cul/res/traSch/cgTraSchSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    $("#imgDiv").attr("style","display:none");
                    $('#culturalNameSpan').html("流派名称");
                    $('#culturalContentSpan').html("流派介绍");
                    $("#fileDiv").attr("style","display:block");
                    $("#upFile").html(row.fileName);

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
                            ajaxUtil.myAjax(null,"/cul/res/traSch/cgTraSchSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                            ajaxUtil.myAjax(null,"/cul/res/traSch/cgTraSchSta/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            $("#chargePersonSearch").selectUtil(pl);

            $("#btn_addTask").unbind().on('click',function () {
                var url = "/chineseCultural/resource/insertTraditionalSchool";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });


            var aCol = [
                {field: 'chineseCulturalName', title: '流派名称'},
                {field: 'filePath', title: '附件', formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<a href="'+value+'">'+row.fileName+'</a>'
                        }
                    }},
                {field: 'chineseCulturalAuthor', title: '作者'},
                {field: 'itemcreateat', title: '发布时间'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            var aria=this.ariaExpanded;
            var element=document.getElementById("stratTime");
            $("#closeAndOpen").unbind().on('click',function(){
                this.innerText="";
                if (aria==="true"){
                    this.innerText="展开";
                    aria = "false";
                    if (typeof(element)!= "undefined" || element != null){
                        document.getElementById("btn_addTask").classList.remove("openBtnP");
                    }
                } else {
                    this.innerText="收起";
                    aria = "true";
                    if (typeof(element)!= "undefined" || element != null){
                        document.getElementById("btn_addTask").classList.add("openBtnP");
                    }

                }
            })

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }
            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);

            var jQuery = $("#btnSearch").unbind().on('click',function() {
                if(document.getElementById("stratTime")){
                    var stratTime=document.getElementById("stratTime").children;
                    var endTime=document.getElementById("endTime").children;
                    stratTime=stratTime[0].value+":"+stratTime[1].value+":"+stratTime[2].value;
                    endTime=endTime[0].value+":"+endTime[1].value+":"+endTime[2].value;
                }
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value;
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                console.log(allTableData)
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        var isTimeSlot=true;             // 默认时间条件为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        if($("#closeAndOpen").text() == "收起"){
                            var status= allTableData[i]["chineseCulturalStatus"]
                            console.log("addstr:"+addstr)
                            console.log("status:"+status)
                            //调试时可以先打印出来，进行修改
                            if(addstr==status){
                                isStatusSlot=true;
                            }

                        }


                        if(aCol[v].field=="itemcreateat"){    //时间条件判断,与表格字段的状态一致,这里根据自己写的修改
                            isTimeSlot=false;          //当存在时将条件改为flase
                            var makeTime= allTableData[i][aCol[v].field]
                            makeTime=makeTime.substring(11,19);
                            if(makeTime>=stratTime && makeTime<=endTime){
                                isTimeSlot=true;
                            }
                            if(stratTime==endTime){
                                isTimeSlot=true;
                            }
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(textP.search(str)!=-1 && isStatusSlot && isTimeSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);

            })

        })
})();
