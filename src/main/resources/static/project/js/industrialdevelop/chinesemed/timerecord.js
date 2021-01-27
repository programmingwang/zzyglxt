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
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        //var year=new Date();
                        var isSuccess = false;
                        var year = new Date();
                        var startTime = $("#startTime").val();
                        var endTime = $("#endTime").val();


                        var submitStatus = {
                            "year": year.getFullYear(),
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
            var pl2 = [];
            for(var i = -2 ; i <= 2; i++){
                pl2.push({id:generateSearchYear(i),text:generateSearchYear(i)})
            }
            $("#taskNameSearch1").selectUtil(pl2);

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

            function generateSearchYear(num){
                return new Date().getFullYear()+num;
            }

                $("#btnSearch").unbind().on('click',function() {
                var newArry = [];
                var searchIsImpl=document.getElementById("taskNameSearch2").value;
                var searchYear = document.getElementById("taskNameSearch1").value;
                var allTableData = JSON.parse(localStorage.getItem("2"));
                for (var i in allTableData) {
                    var textYear = allTableData[i]["year"];
                    var textIsimpl= allTableData[i]["isimp"] ;
                    if(searchYear == textYear && searchIsImpl == textIsimpl){
                        newArry.push(allTableData[i]);
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

            $("#startTime").bind("input propertychange",function(event){
                var data = $("#startTime").val();
                data=data.substring(0,4);
                $("#year").val(data);
            });

        })
})();
