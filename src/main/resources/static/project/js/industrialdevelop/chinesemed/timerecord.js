(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil','datetimepicker'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil,datetimepicker) {


            var getUrl = "/industrialdevelop";

            var opUrl = "/industrialdevelop/Off";

            var pathUrl = "/industrialdevelop/timerecord";

            var addUrl = pathUrl + "_add";

            var aParam = {};

            $("#search").unbind().on("click", function () {
                var param = {};
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            });

            $("#btn_addTask").unbind().on('click', function () {

                var myViewTimeModalData ={
                    modalBodyID : "myTimeModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle : "设置填报时间",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var year = $("#year").val();
                        var startTime = $("#startTime").val();
                        var endTime = $("#endTime").val();


                        var submitStatus = {
                            "year": year,
                            "startTime": startTime,
                            "endTime": endTime,
                        };

                        var isSuccess = false;
                        ajaxUtil.myAjax(null,opUrl,submitStatus,function (data) {
                            if(ajaxUtil.success(data)){
                                alertUtil.info("设置时间成功");
                                isSuccess = true;
                                refreshTable();
                            }
                        },false,true,"POST");
                        return isSuccess;
                   }
                }
                var myTravelModal = modalUtil.init(myViewTimeModalData);
                myTravelModal.show();


                var date= new Date();
                $("#startTime").datetimepicker({
                    format: 'yyyy-mm-dd hh:ii',//显示格式
                    startDate: date ,
                    startView:3,
                    minView:0,
                    maxView :4,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                    clearBtn:true,//清除按钮
                    showMeridian:true,
                });
                $("#endTime").datetimepicker({
                    format: 'yyyy-mm-dd',//显示格式
                    startView:2,
                    minView:2,
                    maxView :2,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                });
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'year', title: '年份'},
                {field: 'startTime', title: '开启时间'},
                {field: 'endTime', title: '结束时间'},
                {field: 'creater', title: '操作人'},
                {field: 'itemcreateat', title: '操作时间'}
            ];


            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            var allTableData = $("#table").bootstrapTable("getData");
            console.log(allTableData);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            bootstrapTableUtil.globalSearch("table", getUrl, aParam, aCol);

        })
})();
