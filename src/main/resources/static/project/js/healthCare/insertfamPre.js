(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker) {

          const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/healthCare/famPre";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var famPreEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertfampredo";
                    operateMessage = "新增历史名方成功";
                    famPreEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        source : $("#source").val(),
                        prescription : $("#prescription").val(),
                        status :  '0',
                        type : $("#type").val(),
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatefampredo";
                    famPreEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        source : $("#source").val(),
                        prescription : $("#prescription").val(),
                        status : $("#status").val(),
                        type : $("#type").val(),
                        content : editor.txt.html()
                    }
                    operateMessage = "更新历史名方成功";
                }
                /* fileUtil.handleFile(isUpdate(), famPreEntity.itemcode, $("#upload_file")[0].files[0]);*/

                ajaxUtil.myAjax(null,addUpdateUrl,famPreEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/healthCare/famPre";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            $("#btn_insert").unbind().on('click',function () {
                var famPreEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertfampredo";
                    operateMessage = "新增历史名方成功";
                    famPreEntity = {
                        name : $("#name").val(),
                        source : $("#source").val(),
                        prescription : $("#prescription").val(),
                        status :  '1',
                        type : $("#type").val(),
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatefampredo";
                    famPreEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        source : $("#source").val(),
                        prescription : $("#prescription").val(),
                        status : '1',
                        type : $("#type").val(),
                        content : editor.txt.html()
                    }
                    operateMessage = "更新历史名方成功";
                }
               /* fileUtil.handleFile(isUpdate(), famPreEntity.itemcode, $("#upload_file")[0].files[0]);*/

                ajaxUtil.myAjax(null,addUpdateUrl,famPreEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/healthCare/famPre";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });
            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#source").val(tempdata.source);
                    $("#prescription").val(tempdata.prescription);
                    $("#status").val(tempdata.status);
                    $("#type").val(tempdata.type);
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