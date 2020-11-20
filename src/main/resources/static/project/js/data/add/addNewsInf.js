(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataNewsInf";
                orange.redirect(url);
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
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataAuthor").val(tempdata.dataAuthor);
                    $("#dataSource").val(tempdata.dataSource);
                    $("#dataFileType").val(tempdata.dataFileType);
                    editor.txt.html(tempdata.dataContent);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();
