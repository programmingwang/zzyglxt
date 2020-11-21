(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil','myDatePicker'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil, myDatePicker) {


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

                //调用日期插件
                $("#startTime").myDatePicker({
                    'startDate':'2014-01-01 18:45:20',
                    'endDate':'2099-01-01 18:45:20',
                    //指定父元素，不指定默认为body
                    parent:$("#startTime").parent(),
                    //定位方式是否用fixed
                    positionFixed:$("#position-1").is(':checked'),

                });

                let _input=$(" #startTime");
                let view=7;
                _input[0].resetDatePicker({
                    'view':7,
                });
                _input.focus();
                //调用日期插件
                $("#endTime").myDatePicker({
                    'startDate':'2014-01-01 18:45:20',
                    'endDate':'2099-01-01 18:45:20',
                    //指定父元素，不指定默认为body
                    parent:$("#endTime").parent(),
                    //定位方式是否用fixed
                    positionFixed:$("#position-1").is(':checked'),

                });

                let _inputE=$(" #endTime");
                let viewE=7;
                _inputE[0].resetDatePicker({
                    'view':7,
                });
                _input.focus();
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

            var aCol = [
                {field: 'year', title: '年份'},
                {field: 'itemcreateat', title: '开启时间'},
                {field: 'itemupdateat', title: '结束时间'},
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
