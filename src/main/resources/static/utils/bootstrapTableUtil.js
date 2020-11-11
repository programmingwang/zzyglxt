(function() {
    define('bootstrapTableUtil', ['jquery','objectUtil','ajaxUtil','stringUtil','myBootstrapTable'], function(jquery,objectUtil,ajaxUtil,stringUtil) {

        $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

        function myBootStrapTableInit(aTableID, aReqUrl, aParam, aColumns,aLoadSuccessCall,aLoadErrorCall,aClickRowCall) {
            var fColumns = new  Array();
            $.extend(fColumns,aColumns);
            fColumns.splice(0,0,
                {
                    width:'60px', title: '序号', align: 'center', formatter: function (value, row, index) {
                        var pageSize = $("#"+aTableID).bootstrapTable('getOptions').pageSize;
                        var pageNumber = $("#"+aTableID).bootstrapTable('getOptions').pageNumber;
                        return pageSize * (pageNumber - 1) + index + 1;
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
                pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
                paginationPreText: '上一页',
                paginationNextText: '下一页',
                // showColumns: true,               //是否显示所有的列（选择显示的列）
                // minimumCountColumns: 2,          //最少允许的列数
                // search: true,                       //显示搜索框
                // searchOnEnterKey:true,              //回车后查询
                clickToSelect: true,                //是否启用点击选中行
                // search:true,                        //显示搜索框
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

        return {
            myBootStrapTableInit:myBootStrapTableInit,
            myBootStrapTableDestory:myBootStrapTableDestory,
        }

    })
})();