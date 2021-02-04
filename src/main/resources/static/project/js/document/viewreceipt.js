(function () {
    require(['jquery','objectUtil','bootstrapTableUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil','selectUtil'],
        function (jquery,objectUtil,bootstrapTableUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil,selectUtil) {

            const editor = objectUtil.wangEditorUtil();

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.reportStatus);
            var row = JSON.parse(localStorage.getItem("viewRowData"));

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/receipt";
                orange.redirect(url);
            });
            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
                    $("#receivingNum").val(tempdata.receivingNum);
                    $("#receivingDateOfReceipt").val(tempdata.receivingDateOfReceipt);
                    $("#receivingTitle").val(tempdata.receivingTitle);
                    $("#receivingUnitOfCommun").val(tempdata.receivingUnitOfCommun);
                    $("#fileNo").val(tempdata.fileNo);
                    $("#number").val(tempdata.number);
                    $("#secretLevel").val(tempdata.secretLevel);
                    $("#timeLimit").val(tempdata.timeLimit);
                    $("#receivingDataStatus").val(webStatus[tempdata.receivingDataStatus].text);
                    $("#creater").val(tempdata.creater);
                    $("#receivingDegreeOfUrgency").val(pl[tempdata.receivingDegreeOfUrgency].text);

                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);
                }
            }());

            function isView() {
                return (localStorage.getItem("viewRowData") != null || localStorage.getItem("viewRowData") != undefined)
            }

            var files= document.getElementById('upload_file').files;
            if(files){
                if(files.length>0){
                    $("#addFile").empty("p");
                    var name = files.name;
                    $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                }
            }
        })
})();