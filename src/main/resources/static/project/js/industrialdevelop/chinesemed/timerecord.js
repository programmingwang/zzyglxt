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
                    format: 'yyyy-mm-dd hh:ii:00',//显示格式
                    startDate: date ,
                    startView:2,
                    minView:1,
                    maxView :3,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                    clearBtn:true,//清除按钮
                    showMeridian:true,
                });
                $("#endTime").datetimepicker({
                    format: 'yyyy-mm-dd hh:ii:00',//显示格式
                    startDate: date ,
                    startView:2,
                    minView:1,
                    maxView :3,
                    language: 'cn',
                    autoclose: 1,//选择后自动关闭
                    clearBtn:true,//清除按钮
                    showMeridian:true,
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


            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }


                $("#btnSearch").unbind().on('click',function() {

                var newArry = [];
                var addstr=document.getElementById("taskNameSearch2").value;
                var str = document.getElementById("taskNameSearch1").value;
                var allTableData = JSON.parse(localStorage.getItem("2"));
                var nowDate= new Date();
                // console.log(nowDate)
                // console.log(allTableData);
                // console.log(str);
                // console.log(aCol)
                console.log(addstr);

                for (var i in allTableData) {
                        var textP = allTableData[i][aCol[0].field];
                        var makeTime=new Date(allTableData[i][aCol[2].field]) ;
                        //console.log(makeTime)

                        // console.log("开始时间："+stratTime);
                        // console.log("结束时间"+endTime);
                        //  console.log(makeTime>=nowDate);
                        //  console.log(makeTime<nowDate);

                        if (textP==str){
                            if (addstr==="生效"&&makeTime>nowDate){
                                newArry.push(allTableData[i]);
                            }
                            if (addstr==="失效"&&makeTime<=nowDate){
                                newArry.push(allTableData[i]);
                            }
                        }

                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);
            })



        })
})();
