(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "selectallhealthcarefampredo?status=已下架&status=展示中&status=待审核&status=--";
            url = selectUtil.getRoleTable(sessionStorage.getItem("rolename"),url);
            var aParam = {
            };

            //操作
            function operation(value, row, index){
                return selectUtil.getRoleOperate(value,row,index,sessionStorage.getItem("rolename"),row.status)
            }

            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect("/healthCare/insertcareFam");
                },
                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteModalcareFam",
                        modalTitle : "删除国医话健康",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"deletehealthcarefampredo/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    alertUtil.info("删除国医话健康成功");
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
                    var myPassCareFamModalData ={
                        modalBodyID :"myPassModal",
                        modalTitle : "审核通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": selectUtil.getStatus(sessionStorage.getItem("rolename"))
                            };
                            ajaxUtil.myAjax(null,"changestatustocarefam/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        if(selectUtil.getStatus(sessionStorage.getItem("rolename")) == "处长已审核"){
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
                    var myPassModal = modalUtil.init(myPassCareFamModalData);
                    myPassModal.show();
                },

                'click .fail' : function (e, value, row, index) {
                    var myFailCareFamModalData ={
                        modalBodyID :"myFailModal",
                        modalTitle : "审核不通过",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "已下架"
                            };
                            ajaxUtil.myAjax(null,"changestatustocarefam/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myFailModal = modalUtil.init(myFailCareFamModalData);
                    myFailModal.show();
                },

                'click .under-shelf' : function (e, value, row, index) {
                    var myUnderShelfCareFamModalData ={
                        modalBodyID :"myUnderShelfModal",
                        modalTitle : "下架",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "已下架"
                            };
                            ajaxUtil.myAjax(null,"changestatustocarefam/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var myUnderShelfModal = modalUtil.init(myUnderShelfCareFamModalData);
                    myUnderShelfModal.show();
                },

                'click .view' : function (e, value, row, index) {
                    var myViewCareFamModalData ={
                        modalBodyID : "myViewCareFamModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myCareFamModal = modalUtil.init(myViewCareFamModalData);
                    $("#name").val(row.name);
                    $("#source").val(row.source);
                    $("#author").val(row.author);
                    $("#content").val(row.content);
                    $("#status").val(row.status);
                   /* $("#culturalImg").attr("src",row.filePath)*/
                    myCareFamModal.show();
                },

                'click .submit' : function (e, value, row, index) {
                    var mySubmitCareFamModalData ={
                        modalBodyID :"mySubmitModal",
                        modalTitle : "提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": selectUtil.getStatus(sessionStorage.getItem("rolename"))
                            };
                            ajaxUtil.myAjax(null,"changestatustocarefam/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(mySubmitCareFamModalData);
                    mySubmitModal.show();
                },

                'click .no-submit' : function (e, value, row, index) {
                    var myNoSubmitCareFamModalData ={
                        modalBodyID :"myNoSubmitModal",
                        modalTitle : "取消提交",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            var submitStatus = {
                                "status": "--"
                            };
                            ajaxUtil.myAjax(null,"changestatustocarefam/"+row.itemid+"/"+row.itemcode,submitStatus,function (data) {
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
                    var mySubmitModal = modalUtil.init(myNoSubmitCareFamModalData);
                    mySubmitModal.show();
                },
            };

            $("#btn_addTask").unbind().on('click',function () {
                var url = "/healthCare/insertcareFam";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'name', title: '国医话健康标题'},
                {field: 'source', title: '来源'},
                {field: 'author', title: '作者'},
                {field: 'filePath', title: '附件', formatter:function (value, row, index) {
                        if(value == "已经损坏了"){
                            return '<p>'+value+'</p>';
                        }else{
                            return '<a href="'+value+'">'+row.fileName+'</a>'
                        }
                    }},
                {field:'itemcreateat',title:'发布时间'},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }
            /************************************************************************************************************************/
            var oTab=document.getElementById("table");
            var oBt=document.getElementById("taskNameSearch");
            var btnSearch=document.getElementById("btnSearch")
            btnSearch.onclick=function(){
                console.log(oTab.tHead.rows[0].childNodes[5].innerText);
                for(var i=0;i<oTab.tBodies[0].rows.length;i++)
                {
                    var str1=oTab.tBodies[0].rows[i].innerText.toLowerCase();
                    var str2=oBt.value.toLowerCase();
                    console.log(str2);
                    if (str2==""||str2=="请输入"){
                        refreshTable();
                    }
                    /***********************************JS实现表格的模糊搜索*************************************/
                    //表格的模糊搜索的就是通过JS中的一个search()方法，使用格式，string1.search(string2);如果
                    //用户输入的字符串是其一个子串，就会返回该子串在主串的位置，不匹配则会返回-1，故操作如下
                    if(str1.search(str2)!=-1){oTab.tBodies[0].rows[i].hidden= false;}
                    else{oTab.tBodies[0].rows[i].hidden= true;}
                    /***********************************JS实现表格的多关键字搜索********************************/
                        //表格的多关键字搜索，加入用户所输入的多个关键字之间用空格隔开，就用split方法把一个长字符串以空格为标准，分成一个字符串数组，
                        //然后以一个循环将切成的数组的子字符串与信息表中的字符串比较
                    var arr=str2.split(' ');
                    for(var j=0;j<arr.length;j++)
                    {
                        if(str1.search(arr[j])!=-1){oTab.tBodies[0].rows[i].hidden= false;}
                    }

                }

            }

            document.getElementById('closeAndOpen').onclick = function(){
                var aria=this.ariaExpanded;
                this.innerText="";
                if (aria=="true"){
                    this.innerText="展开";
                } else {
                    this.innerText="收起";
                }
            }
            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);
        })
})();