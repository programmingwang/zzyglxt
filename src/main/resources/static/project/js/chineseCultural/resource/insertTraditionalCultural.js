(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/chineseCultural/resource/traditionalCultural";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var traCulEntity ;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/res/traCul/addTraCul";
                    operateMessage = "新增中医医史成功";
                    traCulEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/res/traCul/updTraCul";
                    traCulEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新中医医史记成功";
                }

                ajaxUtil.myAjax(null,addUpdateUrl,traCulEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/chineseCultural/resource/traditionalCultural";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            $("#btn_insert").unbind().on('click',function () {
                var traCulEntity ;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/res/traCul/addTraCul";
                    operateMessage = "新增中医医史成功";
                    traCulEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/res/traCul/updTraCul";
                    traCulEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新中医医史记成功";
                }

                ajaxUtil.myAjax(null,addUpdateUrl,traCulEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/chineseCultural/resource/traditionalCultural";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
