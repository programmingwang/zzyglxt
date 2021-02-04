(function() {
    define('bootstrapTableUtil', ['jquery','objectUtil','ajaxUtil','stringUtil','alertUtil','myBootstrapTable'], function(jquery,objectUtil,ajaxUtil,stringUtil,alertUtil) {

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
                pageSize: 10,                       //每页的记录行数（*）
                pageList: [10, 20, 30, 50],        //可供选择的每页的行数（*）
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
                    complete: function (XMLHttpRequest) {
                    }
                },
                responseHandler: function (data) {
                    if(ajaxUtil.notLoggedIn(data)){
                        window.location.href = "/userLogin";
                    }
                    if (data.code === 88888) {
                        // for(var i=0; i<data.data.length; i++){
                        //     data.data[i].itemcreateat = stringUtil.formatDateTime(data.data[i].itemcreateat);
                        // }
                        var allTableData = data.data
                        localStorage.setItem('2',JSON.stringify(allTableData))
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



        function globalSearch(tableID, url, needParam, aCol, statusWord) {
            $("#btnSearch").unbind().on('click',function() {
                if(document.getElementById("stratTime")){
                    var stratTime=document.getElementById("stratTime").children;
                    var endTime=document.getElementById("endTime").children;
                    stratTime=stratTime[0].value+":"+stratTime[1].value+":"+stratTime[2].value;
                    endTime=endTime[0].value+":"+endTime[1].value+":"+endTime[2].value;
                }
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value; //搜索里的
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        var isTimeSlot=false;             // 默认时间条件为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        var status= allTableData[i][statusWord] //表格里的
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        //调试时可以先打印出来，进行修改
                        if(addstr==status){
                            isStatusSlot=true;
                        }
                        //当存在时将条件改为flase
                        var makeTime = allTableData[i]["itemcreateat"].substring(11,19);
                        if (makeTime >= stratTime && makeTime <= endTime) {
                            isTimeSlot = true;
                        }
                        else {
                            isTimeSlot = false;
                        }
                        if (stratTime == endTime) {
                            isTimeSlot = true;
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if($("#closeAndOpen").text().search("展开")!= -1 && textP.search(str) != -1){
                            isStatusSlot = false;
                            isTimeSlot = false;
                            newArry.push(allTableData[i])
                        }
                        if($("#closeAndOpen").text().search("收起")!= -1 && textP.search(str) != -1 && isStatusSlot && isTimeSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);
                // if(newArry.length == 0){
                //     alertUtil.warning("搜索成功,但此搜索条件下没有数据");
                // }else{
                //     alertUtil.success("搜索成功");
                // }
            })

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
        }

        function globalSearch2(tableID, url, needParam, aCol, statusWord) {
            $("#btnSearch").unbind().on('click',function() {
                if(document.getElementById("stratTime")){
                    var stratTime=document.getElementById("stratTime").children;
                    var endTime=document.getElementById("endTime").children;
                    stratTime=stratTime[0].value+":"+stratTime[1].value+":"+stratTime[2].value;
                    endTime=endTime[0].value+":"+endTime[1].value+":"+endTime[2].value;
                }
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value; //搜索里的
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        var isTimeSlot=false;             // 默认时间条件为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        var status= allTableData[i][statusWord] //表格里的
                        if(status == "0") status =0;
                        else if(status == "1" || status == "2") status = 1;
                        else if(status == "3" || status == "4") status = 2;
                        else if(status == "5") status = 3;
                        else if (status == "6") status = 4;
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        //调试时可以先打印出来，进行修改
                        if(addstr==status || addstr == 99){
                            isStatusSlot=true;
                        }
                        if(typeof textP == "object") continue;
                        else if(typeof textP == "number") textP = textP.toString();
                        //当存在时将条件改为flase
                        var makeTime = allTableData[i]["itemcreateat"].substring(11,19);
                        if (makeTime >= stratTime && makeTime <= endTime) {
                            isTimeSlot = true;
                        }
                        else {
                            isTimeSlot = false;
                        }
                        if (stratTime == endTime) {
                            isTimeSlot = true;
                        }
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if($("#closeAndOpen").text().search("展开")!= -1 && textP.search(str) != -1){
                            isStatusSlot = false;
                            isTimeSlot = false;
                            newArry.push(allTableData[i])
                        }
                        if($("#closeAndOpen").text().search("收起")!= -1 && textP.search(str) != -1 && isStatusSlot && isTimeSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);
                // if(newArry.length == 0){
                //     alertUtil.warning("搜索成功,但此搜索条件下没有数据");
                // }else{
                //     alertUtil.success("搜索成功");
                // }
            })

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
        }

        return {
            myBootStrapTableInit:myBootStrapTableInit,
            myBootStrapTableDestory:myBootStrapTableDestory,
            globalSearch:globalSearch,
            globalSearch2:globalSearch2,
        }



    })
})();