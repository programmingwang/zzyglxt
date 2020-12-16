(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg) {
            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            $("#cancel").unbind().on('click',function () {
                var url = "/chineseCultural/facility/intangibleCulturalHeritage";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var inCuHeEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/fac/inCuHe/addInCuHe";
                    operateMessage = "新增非物质文化遗产成功";
                    inCuHeEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/fac/inCuHe/updInCuHe";
                    inCuHeEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新非物质文化遗产成功";
                }

                fileUtil.handleFile(isUpdate(), inCuHeEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,inCuHeEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/chineseCultural/facility/intangibleCulturalHeritage";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            $("#btn_insert").unbind().on('click',function () {
                var inCuHeEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/fac/inCuHe/addInCuHe";
                    operateMessage = "新增非物质文化遗产成功";
                    inCuHeEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/fac/inCuHe/updInCuHe";
                    inCuHeEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新非物质文化遗产成功";
                }

                fileUtil.handleFile(isUpdate(), inCuHeEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,inCuHeEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/chineseCultural/facility/intangibleCulturalHeritage";
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
                    uploadImg.setImgSrc(img);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
