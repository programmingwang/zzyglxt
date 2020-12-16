(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg) {
            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();


            $("#cancel").unbind().on('click',function () {
                var url = "/chineseCultural/resource/traditionalDoctor";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var traDocEntity ;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/res/traDoc/addTraDoc";
                    operateMessage = "新增历代名家成功";
                    traDocEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/res/traDoc/updTraDoc";
                    traDocEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新历代名家成功";
                }
                fileUtil.handleFile(isUpdate(), traDocEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,traDocEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            var url = "/chineseCultural/resource/traditionalDoctor";
                            orange.redirect(url);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);


            });

            $("#btn_insert").unbind().on('click',function () {
                var traDocEntity ;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/res/traDoc/addTraDoc";
                    operateMessage = "新增历代名家成功";
                    traDocEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/res/traDoc/updTraDoc";
                    traDocEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新历代名家成功";
                }
                fileUtil.handleFile(isUpdate(), traDocEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,traDocEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            var url = "/chineseCultural/resource/traditionalDoctor";
                            orange.redirect(url);
                        }else{
                            alertUtil.error(data.msg);
                        }
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
