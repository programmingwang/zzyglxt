(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {

            var url = "/exmain/exmain";

            //角色加载工具

            var aParam = {

            };

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);
            $("#chargePersonSearch").selectUtil(pl);

            //操作
            function operation(value, row, index){
                // if(sessionStorage.getItem("rolename") == "省局中医管理部门"){}
                if(row.exmaineStatus == pl[1].id){
                    return [
                        '<a class="exmaine" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >评审</a>',
                    ].join('');
                }else if(row.exmaineStatus == pl[2].id){
                    return [
                        '<a class="exmaine" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >评审</a>',
                        '<a class="submit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >提交</a>',
                    ].join('');
                }else if(row.exmaineStatus == pl[0].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }
            //    else if (sessionStorage.getItem("rolename") == "专家"){
                // '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                // }
            }

            $(function(){
                $("span a").unbind().on('click',function () {
                    //获得当前a的标签
                    console.log($(this).attr("id"));
                });
            });


            //修改事件
            window.orgEvents = {
                'click .view' : function (e, value, row, index) {
                    var scoreArr = JSON.parse(localStorage.getItem("detailScore"));
                    row.scoreArr = scoreArr;
                    localStorage.setItem("viewDetail",JSON.stringify(row));
                    orange.redirect("/evaluationTable/evaluationTable")
                },
                'click .exmaine' : function (e, value, row, index) {
                    localStorage.removeItem("viewDetail");
                    localStorage.setItem("examinItemCode",JSON.stringify(row.itemcode));
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
                                itemcode : row.itemcode
                            };
                            ajaxUtil.myAjax(null,"/exmain/exmain",submitStatus,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == ajaxUtil.successCode){
                                        alertUtil.info("评改提交");
                                        isSuccess = true;
                                        refreshTable();
                                    }else{
                                        alertUtil.error(data.msg);
                                    }

                                }else {
                                    alertUtil.error(data.msg)
                                }
                            },false,true,"put");
                            return isSuccess;
                        }

                    };
                    var mySubmitModal = modalUtil.init(mySubmitExmainModalData);
                    mySubmitModal.show();
                }
            };




            var aCol = [
                {field: 'projectNo', title: '项目编号'},
                {field: 'projectName', title: '项目名称', formatter: function (value,row) {
                        return '<span><a id="'+row.topicCode+'">'+value+'</a></span>'
                    }},
                {field: 'company', title: '申报单位'},
                {field: 'exmaineStatus', title: '状态', formatter:function (value) {
                        return '<p>'+pl[value].text+'</p>'
                    }},
                {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
            ];

            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);


            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table",url,aParam, aCol);

            var allTableData = $("#table").bootstrapTable("getData");
            //console.log(allTableData);
            localStorage.setItem('2',JSON.stringify(allTableData));
            obj2=JSON.parse(localStorage.getItem("2"));


        })
})();

