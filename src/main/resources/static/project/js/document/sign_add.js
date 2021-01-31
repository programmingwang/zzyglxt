(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker','datetimepicker','dictUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker,datetimepicker,dictUtil) {

            const editor = objectUtil.wangEditorUtil();

            var type = isUpdate() ? "put": "post";

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.governerscounter);
            $("#govPunlic").selectUtil(pl);

            $("#cancel").unbind().on('click',function () {
                var url = "/document/sign";
                orange.redirect(url);
            });


            $("#btn_save").unbind().on('click',function () {
                var ReceiptEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "governresCountersign/insert";
                    operateMessage = "保存会签信息成功";
                    ReceiptEntity = {
                        itemcode: stringUtil.getUUID(),
                        govPunlic : $("#govPunlic").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        parment : $("#parment").val(),
                        fileNo : $("#fileNo").val(),
                        fileNumber : $("#fileNumber").val(),
                        number : $("#number").val(),
                        classification : $("#classification").val(),
                        reason : $("#reason").val(),
                        status : '0',
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "governresCountersign/update";
                    ReceiptEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        govPunlic : $("#govPunlic").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        parment : $("#parment").val(),
                        fileNo : $("#fileNo").val(),
                        fileNumber : $("#fileNumber").val(),
                        number : $("#number").val(),
                        classification : $("#classification").val(),
                        reason : $("#reason").val(),
                    }
                    operateMessage = "更新会签信息成功";
                }
                fileUtil.handleFile(isUpdate(), ReceiptEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,ReceiptEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/document/sign";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,type);
            });

            $("#btn_insert").unbind().on('click',function () {
                var ReceiptEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "governresCountersign/insert";
                    operateMessage = "录入会签信息成功";
                    ReceiptEntity = {
                        itemcode: stringUtil.getUUID(),
                        govPunlic : $("#govPunlic").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        parment : $("#parment").val(),
                        fileNo : $("#fileNo").val(),
                        fileNumber : $("#fileNumber").val(),
                        number : $("#number").val(),
                        classification : $("#classification").val(),
                        reason : $("#reason").val(),
                        status : '1',
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "governresCountersign/update";
                    ReceiptEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        govPunlic : $("#govPunlic").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        parment : $("#parment").val(),
                        fileNo : $("#fileNo").val(),
                        fileNumber : $("#fileNumber").val(),
                        number : $("#number").val(),
                        classification : $("#classification").val(),
                        reason : $("#reason").val(),
                    }
                    operateMessage = "更新会签信息成功";
                }
                fileUtil.handleFile(isUpdate(), ReceiptEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,ReceiptEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/document/sign";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#govPunlic").val(tempdata.govPunlic);
                    $("#receivingTitle").val(tempdata.receivingTitle);
                    $("#parment").val(tempdata.parment);
                    $("#fileNo").val(tempdata.fileNo);
                    $("#fileNumber").val(tempdata.fileNumber);
                    $("#number").val(tempdata.number);
                    $("#classification").val(tempdata.classification);
                    $("#reason").val(tempdata.reason);
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