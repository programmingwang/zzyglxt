(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/healthCare/healthsciKnow";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var sciKnowEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "inserthealthsciknowdo";
                    operateMessage = "新增科普知识成功";
                    sciKnowEntity = {
                        itemcode: stringUtil.getUUID(),
                        scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                        scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                        scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                        scienceKnowledgeStatus : '0',
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatehealthsciknowdo";
                    sciKnowEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                        scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                        scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                        scienceKnowledgeStatus : '0',
                        content : editor.txt.html()
                    }
                    operateMessage = "更新科普知识成功";
                }
                /*fileUtil.handleFile(isUpdate(), sciKnowEntity.itemcode, upload_file.getFiles()[0]);*/

                ajaxUtil.myAjax(null,addUpdateUrl,sciKnowEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/healthCare/healthsciKnow";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var sciKnowEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "inserthealthsciknowdo";
                    operateMessage = "新增科普知识成功";
                    sciKnowEntity = {
                        itemcode: stringUtil.getUUID(),
                        scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                        scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                        scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                        scienceKnowledgeStatus : '1',
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatehealthsciknowdo";
                    sciKnowEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        scienceKnowledgeName : $("#scienceKnowledgeName").val(),
                        scienceKnowledgeSource : $("#scienceKnowledgeSource").val(),
                        scienceKnowledgeAuthor : $("#scienceKnowledgeAuthor").val(),
                        status : '1',
                        content : editor.txt.html()
                    }
                    operateMessage = "更新科普知识成功";
                }
               /*fileUtil.handleFile(isUpdate(), sciKnowEntity.itemcode, upload_file.getFiles()[0]);*/

                ajaxUtil.myAjax(null,addUpdateUrl,sciKnowEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/healthCare/healthsciKnow";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });
            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#scienceKnowledgeName").val(tempdata.scienceKnowledgeName);
                    $("#scienceKnowledgeSource").val(tempdata.scienceKnowledgeSource);
                    $("#scienceKnowledgeAuthor").val(tempdata.scienceKnowledgeAuthor);
                    editor.txt.html(tempdata.content);
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);
                }
                else {
                    $("#distpicker").distpicker();
                }
                init = function () {

                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();