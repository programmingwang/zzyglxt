(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker','datetimepicker','dictUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker,datetimepicker,dictUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/document/report";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var ReportEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertrequestreport";
                    operateMessage = "保存请示报告成功";
                    ReportEntity = {
                        itemcode: stringUtil.getUUID(),
                        reportTitle : $("#reportTitle").val(),
                        reportContent : $("#reportContent").val(),
                        reportDataStatus : '0',
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updaterequestreport";
                    ReportEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        reportTitle : $("#reportTitle").val(),
                        reportContent : $("#reportContent").val(),
                    }
                    operateMessage = "更新请示报告成功";
                }
                fileUtil.handleFile(isUpdate(), ReportEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,ReportEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/document/report";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var ReportEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertrequestreport";
                    operateMessage = "新增请示报告信息成功";
                    ReportEntity = {
                        itemcode: stringUtil.getUUID(),
                        reportTitle : $("#reportTitle").val(),
                        reportContent : $("#reportContent").val(),
                        reportDataStatus : '1',
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updaterequestreport";
                    ReportEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        reportTitle : $("#reportTitle").val(),
                        reportContent : $("#reportContent").val(),
                    }
                    operateMessage = "更新请示报告信息成功";
                }
                fileUtil.handleFile(isUpdate(), ReportEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,ReportEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/document/report";
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
                    $("#reportTitle").val(tempdata.reportTitle);
                    $("#reportContent").val(tempdata.reportContent);
                    $("#addFile").text(tempdata.fileName);
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

            /*
           上传文件
           */
            document.getElementById('upload_file').onchange=function(){
                var len=this.files.length;
                $("#addFile").empty("p");
                for (var i = 0; i < len; i++) {
                    var name = this.files[i].name;
                    var j=i+1;
                    $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                };
                if(len>0){
                    $("#clsfile").css("display","block")
                }
            }
            document.getElementById('clsfile').onclick = function() {
                var obj = document.getElementById('upload_file');
                obj.outerHTML=obj.outerHTML;
                $("#clsfile").css("display","none");
                $("#addFile").empty("p");
            }
        })
})();