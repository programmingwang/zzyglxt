(function () {
    require(['jquery','objectUtil','bootstrapTableUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil','selectUtil'],
        function (jquery,objectUtil,bootstrapTableUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil,selectUtil) {

            var row = JSON.parse(localStorage.getItem("viewRowData"));
            const editor = objectUtil.wangEditorUtil();
//角色信息
            var username = sessionStorage.getItem("username");

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.receiptStatus);


            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                localStorage.getItem("comeFromMain") === "true" ?
                    orange.redirect("/data/mainPage")
                    :
                    orange.redirect("/document/receipt");
                localStorage.removeItem("comeFromMain");
            });



            (function init() {
                if(localStorage.getItem("comeFromMain") === "true"){
                    $("#fail").remove();
                    $("#pass").remove();
                    $("input").attr("disabled","true")
                }
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
                    $("#receivingNum").val(tempdata.receivingNum);
                    var receivingDateOfReceipt=tempdata.receivingDateOfReceipt;
                    var receiptArry = receivingDateOfReceipt.split("-");
                    $("#Year").val(receiptArry[0]);
                    $("#Month").val(receiptArry[1]);
                    $("#Day").val(receiptArry[2]);
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

                    $("#reasono").val(tempdata.reasono);
                    $("#reasont").val(tempdata.reasont);
                    $("#reasonh").val(tempdata.reasonh);
                    $("#reasonf").val(tempdata.reasonf);
                    $("#reasonv").val(tempdata.reasonv);
                    $("#reasons").val(tempdata.reasons);

                    $("#nameo").val(tempdata.nameo);
                    $("#namet").val(tempdata.namet);
                    $("#nameh").val(tempdata.nameh);
                    $("#namef").val(tempdata.namef);
                    $("#namev").val(tempdata.namev);
                    $("#names").val(tempdata.names);

                    $("#dateo").val(tempdata.dateo);
                    $("#datet").val(tempdata.datet);
                    $("#dateh").val(tempdata.dateh);
                    $("#datef").val(tempdata.datef);
                    $("#datev").val(tempdata.datev);
                    $("#dates").val(tempdata.dates);
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