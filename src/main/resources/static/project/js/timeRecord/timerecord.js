(function () {
    require(['jquery', 'ajaxUtil', 'bootstrapTableUtil', 'objectUtil', 'alertUtil', 'modalUtil', 'selectUtil', 'stringUtil', 'dictUtil'],
        function (jquery, ajaxUtil, bootstrapTableUtil, objectUtil, alertUtil, modalUtil, selectUtil, stringUtil, dictUtil) {


            var getUrl = "/industrialdevelop";

            var opUrl = "/industrialdevelop/Off";

            var pathUrl = "/timeRecord/timerecord";

            var addUrl = pathUrl + "_add";

            var aParam = {};

            $("#search").unbind().on("click", function () {
                var param = {};
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            });

            $("#btn_addTask").unbind().on('click', function () {
                localStorage.removeItem("rowData");
                orange.redirect(addUrl);
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

            bootstrapTableUtil.globalSearch("table", getUrl, aParam, aCol);
        })
})();
