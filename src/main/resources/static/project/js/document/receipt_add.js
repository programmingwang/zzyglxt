(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker','datetimepicker','dictUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker,datetimepicker,dictUtil) {

            const editor = objectUtil.wangEditorUtil();

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            $("#receivingDegreeOfUrgency").selectUtil(pl);

            $("#cancel").unbind().on('click',function () {
                var url = "/document/receipt";
                orange.redirect(url);
            });

            var date= new Date();
            $("#receivingDateOfReceipt").datetimepicker({
                format: 'yyyy-mm-dd',//显示格式
                startDate: date,
                startView:2,
                minView:1,
                maxView :3,
                language: 'cn',
                autoclose: 1,//选择后自动关闭
                clearBtn:true,//清除按钮
                showMeridian:true,
            });
            $("#timeLimit").datetimepicker({
                format: 'yyyy-mm-dd',//显示格式
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
                var ReceiptEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertreceipt";
                    operateMessage = "保存收文信息成功";
                    ReceiptEntity = {
                        itemcode: stringUtil.getUUID(),
                        receivingNum : $("#receivingNum").val(),
                        receivingDateOfReceipt : $("#receivingDateOfReceipt").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        receivingUnitOfCommun : $("#receivingUnitOfCommun").val(),
                        fileNo : $("#fileNo").val(),
                        number : $("#number").val(),
                        secretLevel : $("#secretLevel").val(),
                        receivingDegreeOfUrgency : $("#receivingDegreeOfUrgency").val(),
                        receivingDataStatus : '0',
                        timeLimit : $("#timeLimit").val(),

                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatereceipt";
                    ReceiptEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        receivingNum : $("#receivingNum").val(),
                        receivingDateOfReceipt : $("#receivingDateOfReceipt").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        receivingUnitOfCommun : $("#receivingUnitOfCommun").val(),
                        fileNo : $("#fileNo").val(),
                        number : $("#number").val(),
                        secretLevel : $("#secretLevel").val(),
                        receivingDegreeOfUrgency : $("#receivingDegreeOfUrgency").val(),
                        timeLimit : $("#timeLimit").val(),
                    }
                    operateMessage = "更新收文信息成功";
                }
                fileUtil.handleFile(isUpdate(), ReceiptEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,ReceiptEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/document/receipt";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var ReceiptEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "insertreceipt";
                    operateMessage = "收文信息发送成功";
                    ReceiptEntity = {
                        itemcode: stringUtil.getUUID(),
                        receivingNum : $("#receivingNum").val(),
                        receivingDateOfReceipt : $("#receivingDateOfReceipt").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        receivingUnitOfCommun : $("#receivingUnitOfCommun").val(),
                        fileNo : $("#fileNo").val(),
                        number : $("#number").val(),
                        secretLevel : $("#secretLevel").val(),
                        receivingDegreeOfUrgency : $("#receivingDegreeOfUrgency").val(),
                        receivingDataStatus : '1',
                        timeLimit : $("#timeLimit").val(),
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatereceipt";
                    ReceiptEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        receivingNum : $("#receivingNum").val(),
                        receivingDateOfReceipt : $("#receivingDateOfReceipt").val(),
                        receivingTitle : $("#receivingTitle").val(),
                        receivingUnitOfCommun : $("#receivingUnitOfCommun").val(),
                        fileNo : $("#fileNo").val(),
                        number : $("#number").val(),
                        secretLevel : $("#secretLevel").val(),
                        receivingDegreeOfUrgency : $("#receivingDegreeOfUrgency").val(),
                        timeLimit : $("#timeLimit").val(),
                    }
                    operateMessage = "更新收文信息成功";
                }
                fileUtil.handleFile(isUpdate(), ReceiptEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,ReceiptEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/document/receipt";
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
                    $("#receivingNum").val(tempdata.receivingNum);
                    $("#receivingDateOfReceipt").val(tempdata.receivingDateOfReceipt);
                    $("#receivingTitle").val(tempdata.receivingTitle);
                    $("#receivingUnitOfCommun").val(tempdata.receivingUnitOfCommun);
                    $("#fileNo").val(tempdata.fileNo);
                    $("#number").val(tempdata.number);
                    $("#secretLevel").val(tempdata.secretLevel);
                    $("#receivingDegreeOfUrgency").val(tempdata.receivingDegreeOfUrgency);
                    $("#timeLimit").val(tempdata.timeLimit);
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