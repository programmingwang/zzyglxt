(function() {
    define('bootstrapTableUtil', ['jquery','objectUtil','ajaxUtil','stringUtil','myBootstrapTable'], function(jquery,objectUtil,ajaxUtil,stringUtil) {

        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

        function myBootStrapTableInit(aTableID, aReqUrl, aParam, aColumns,aLoadSuccessCall,aLoadErrorCall,aClickRowCall) {
            var fColumns = new  Array();
            $.extend(fColumns,aColumns);
            fColumns.splice(0,0,
                {
                    width:'64px', title: '序号', align: 'center', formatter: function (value, row, index) {
                        //获取每页显示的数量
                        var pageSize = $("#"+aTableID).bootstrapTable('getOptions').pageSize;
                        //获取当前是第几页
                        var pageNumber = $("#"+aTableID).bootstrapTable('getOptions').pageNumber;
                        // return pageSize * (pageNumber - 1) + index + 1;  // 分页后出现断层
                        return index +1;
                    }
                }
            );

            $("#"+aTableID).bootstrapTable({
                theadClasses: 'self-thead',
                // ajax : function (request) {},
                url: aReqUrl,                       //请求后台的URL（*）
                method: 'GET',                     //请求方式（*）
                contentType: "application/json; charset=UTF-8",
                striped: true,                      //是否显示行间隔色
                cache: true,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   //是否显示分页（*）
                sortOrder: "asc",                   //排序方式
                sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
                page: 1,                      //初始化加载第一页，默认第一页,并记录
                pageSize: 5,                       //每页的记录行数（*）
                pageList: [5, 10, 20, 50],        //可供选择的每页的行数（*）
                paginationPreText: '上一页',
                paginationNextText: '下一页',
                // showColumns: true,               //是否显示所有的列（选择显示的列）
                // minimumCountColumns: 2,          //最少允许的列数
                search: false,                       //显示搜索框
                // searchOnEnterKey:true,              //回车后查询
                clickToSelect: true,                //是否启用点击选中行
                //search:true,                        //显示搜索框
                //height: 500,                      //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
                queryParams: function (params) {
                    aParam.pageSize = params.limit;
                    aParam.page = (params.offset / params.limit) + 1;
                    aParam.sort = params.sort;       //排序列名
                    aParam.sortOrder = params.order; //排位命令（desc，asc）
                    return aParam;
                },
                showExport: false,      //是否显示导出按钮
                buttonsAlign: "right",   //按钮位置
                exportTypes: ['excel'],  //导出文件类型
                Icons: 'glyphicon-export',
                width: '100%',
                columns: fColumns,
                ajaxOptions: {
                    async: false,
                    complete: function (XMLHttpRequest) {

                    }
                },
                responseHandler: function (data) {
                    if(ajaxUtil.notLoggedIn(data)){
                        window.location.href = "/userLogin";
                    }
                    if (data.code === 88888) {
                        for(var i=0; i<data.data.length; i++){
                            data.data[i].itemcreateat = stringUtil.formatDateTime(data.data[i].itemcreateat);
                        }
                        return {
                            total: data.data.length,
                            rows: data.data
                        }
                    } else {
                        return data = {total: 0, rows: []};
                    }
                },
                onLoadSuccess: function (res) {
                    if (!objectUtil.strIsBlank(aLoadSuccessCall)){
                        aLoadSuccessCall(res);
                    }
                },
                onLoadError: function () {
                    if(!objectUtil.strIsBlank(aLoadErrorCall)){
                        aLoadErrorCall()
                    }
                },
                onClickRow: function (row) {
                    if(!objectUtil.strIsBlank(aClickRowCall)){
                        aClickRowCall(row);
                    }
                },
            });

            var obj = new Object();
            obj.aTableID = aTableID;

            obj.free = function () {
                $("#"+obj.aTableID).bootstrapTable("destroy");
            };
            return obj;
        }


        function myBootStrapTableDestory(aTableID) {
            $("#"+aTableID).bootstrapTable("destroy");
        }

        // $(window).on('load',function(){
        //     console.log("aaaaaaaaaa");
        //     var allTableData = $("#table").bootstrapTable("getData");
        //     console.log(allTableData);
        //     localStorage.setItem('2',JSON.stringify(allTableData))
        //     obj2=JSON.parse(localStorage.getItem("2"));
        //     console.log(obj2);
        // })

        //$(".float-right").attr("display",block);

        function globalSearch(tableID,url,needParam,aCol) {


            // var oTab=document.getElementById("table");
            // var btnSearch=document.getElementById("btnSearch");

            // console.log(needParam);
            $("#btnSearch").unbind().on('click',function() {
                var myTable = myBootStrapTableInit(tableID, url, needParam, aCol);
                // 先刷新列表------------
                // myTable.free();
                // myTable = myBootStrapTableInit(tableID,url,param,aCol);
                //-----------------------
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


                // console.log(allTableData);
                // console.log(str);
                // console.log("状态"+addstr);
                if (str=='请输入'||str==''){
                    $("#table").bootstrapTable("load", allTableData);
                }

                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isTimeSlot=false;
                        var makeTime=allTableData[i][aCol[4].field];
                        console.log(makeTime)
                        // if(makeTime.length>18){
                        //     makeTime=makeTime.substring(11,19);
                        // }

                        // console.log(makeTime);
                        // console.log("开始时间："+stratTime);
                        // console.log("结束时间"+endTime);
                        // console.log(makeTime>=stratTime);
                        // console.log(makeTime<=endTime);
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if(makeTime>=stratTime && makeTime<=endTime){
                            console.log('true')
                            isTimeSlot=true;
                        }
                        if(stratTime==endTime){
                            isTimeSlot=true;
                        }

                        if (textP.search(str)!= -1&&isTimeSlot){
                            newArry.push(allTableData[i]);
                        }
                        if (addstr=="展示中"||addstr=="已下架"){
                            str=str+" "+addstr;
                            var arr=str.split(' ');
                            for(var j=0;j<arr.length;j++)
                                {
                                    if(textP.search(arr[j])!=-1){
                                        newArry.push(allTableData[i]);
                                    }
                                }
                        }
                    }

                    // var chineseCulturalName = allTableData[i].chineseCulturalName;
                    // console.log(chineseCulturalName);
                    // if (chineseCulturalName.search(str) != -1) {
                    //     newArry.push(allTableData[i]);
                    // }
                }
                $("#table").bootstrapTable("load", newArry);
            })


            //

            // var oTab=document.getElementById("table");
            // var btnSearch=document.getElementById("btnSearch");
            //var param = {};
            // btnSearch.onclick=function(){
            //     var newArry=[];
            //     var str=document.getElementById("taskNameSearch").value.toLowerCase();
            //     var allTableData = $("#table").bootstrapTable("getData");
            //     console.log(allTableData);
            //     for(var i in allTableData){
            //         var chineseCulturalName = allTableData[i][chineseCulturalName];
            //
            //         if (chineseCulturalName.search(chineseCulturalName)!=-1){
            //             newArry.push(allTableData[i]);
            //         }
            //     }
            //     $("#table").bootstrapTable("load",newArry);



            // var stratTime=document.getElementById("stratTime").children;
            // var endTime=document.getElementById("endTime").children;
            // stratTime=stratTime[0].value+":"+stratTime[1].value+":"+stratTime[2].value;
            // endTime=endTime[0].value+":"+endTime[1].value+":"+endTime[2].value;
            //
            // console.log(oTab.tHead.rows[0].childNodes[5].innerText);
            // for(var i=0;i<oTab.tBodies[0].rows.length;i++)
            // {
            //     var str1=oTab.tBodies[0].rows[i].innerText.toLowerCase();
            //     var str2=oBt.value.toLowerCase();
            //     console.log(oTab.tBodies[0].rows);
            //     var time=oTab.tBodies[0].rows[i].childNodes[5].innerText;
            //     time=time.substring(11,19)
            //     console.log(time>stratTime);
            //     console.log(time<endTime);
            //     console.log(time)
            //     if (str2==="请输入"){
            //         myTable.free();
            //         myTable = myBootStrapTableInit(tableID,url,param,aCol)
            //     }
            /***********************************JS实现表格的模糊搜索*************************************/
            //表格的模糊搜索的就是通过JS中的一个search()方法，使用格式，string1.search(string2);如果
            //用户输入的字符串是其一个子串，就会返回该子串在主串的位置，不匹配则会返回-1，故操作如下
            // if(str1.search(str2)!=-1){
            //     oTab.tBodies[0].rows[i].hidden= false;
            // if (startTime=endTime||stratTime>time||endTime<time){
            //     oTab.tBodies[0].rows[i].hidden= true;
            // }
            // }
            // else{
            //     oTab.tBodies[0].rows[i].hidden= true;
            // if (stratTime<time&&time<endTime){
            //     oTab.tBodies[0].rows[i].hidden= false;
            // }
            // }
            /***********************************JS实现表格的多关键字搜索********************************/
                //表格的多关键字搜索，加入用户所输入的多个关键字之间用空格隔开，就用split方法把一个长字符串以空格为标准，分成一个字符串数组，
                //然后以一个循环将切成的数组的子字符串与信息表中的字符串比较
                // var arr=str2.split(' ');
                // for(var j=0;j<arr.length;j++)
                // {
                //     if(str1.search(arr[j])!=-1){oTab.tBodies[0].rows[i].hidden= false;}
                // }


                // if (oTab.tBodies[0].rows[i].hidden== false||oTab.tBodies[0].rows[i].hidden==""){
                //     if(stratTime<time&&endTime>time){
                //         oTab.tBodies[0].rows[i].hidden= false;
                //     } else {
                //         oTab.tBodies[0].rows[i].hidden= true;
                //     }
                //
                // }

                //}

                //}

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
        }

        return {
            myBootStrapTableInit:myBootStrapTableInit,
            myBootStrapTableDestory:myBootStrapTableDestory,
            globalSearch:globalSearch,
        }



    })
})();