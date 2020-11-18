(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataProcess";
                orange.redirect(url);
            });

            $("#submitbtn").unbind().on('click',function () {
                var processEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/process/insertProcess";
                    operateMessage = "新增办事流程成功";
                    processEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/process/updateProcess";
                    processEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataContent : editor.txt.html()
                    }
                    operateMessage = "更新办事流程成功";
                }

                fileUtil.handleFile(isUpdate(), processEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,processEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataProcess";
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
                    $("#dataSource").val(tempdata.dataSource);
                    editor.txt.html(tempdata.dataContent);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();
