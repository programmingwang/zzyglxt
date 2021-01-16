(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','datetimepicker'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,datetimepicker) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataNewsInf";
                orange.redirect(url);
            });

            var date= new Date();
            $("#dataDelayedRelease").datetimepicker({
                format: 'yyyy-mm-dd hh:00:00',//显示格式
                startDate: date ,
                startView:2,
                minView:1,
                maxView :3,
                language: 'cn',
                autoclose: 1,//选择后自动关闭
                clearBtn:true,//清除按钮
                showMeridian:true,
            });

            $("#btn_save").unbind().on('click',function () {
                var newsInfEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/newsInf/insertNewsInf";
                    operateMessage = "新增新闻信息成功";
                    newsInfEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataDelayedRelease : $("#dataDelayedRelease").val(),
                        releaseOrNot : "y",
                        dataStatus : "0",
                        dataContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/newsInf/updateNewsInf";
                    newsInfEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataDelayedRelease : $("#dataDelayedRelease").val(),
                        dataContent : editor.txt.html()
                    };
                    operateMessage = "更新新闻信息成功";
                }

                ajaxUtil.myAjax(null,addUpdateUrl,newsInfEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataNewsInf";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            $("#submitbtn").unbind().on('click',function () {
                var newsInfEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/newsInf/insertNewsInf";
                    operateMessage = "新增新闻信息成功";
                    newsInfEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataDelayedRelease : $("#dataDelayedRelease").val(),
                        releaseOrNot : "y",
                        dataStatus : "1",
                        dataContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/newsInf/updateNewsInf";
                    newsInfEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataDelayedRelease : $("#dataDelayedRelease").val(),
                        dataContent : editor.txt.html()
                    };
                    operateMessage = "更新新闻信息成功";
                }

                ajaxUtil.myAjax(null,addUpdateUrl,newsInfEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataNewsInf";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });


            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    console.log(tempdata);
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataAuthor").val(tempdata.dataAuthor);
                    $("#dataSource").val(tempdata.dataSource);
                    $("#dataFileType").val(tempdata.dataFileType);
                    $("#dataDelayedRelease").val(tempdata.dataDelayedRelease);
                    editor.txt.html(tempdata.dataContent);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();
