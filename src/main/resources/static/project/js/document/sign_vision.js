(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            var rolename = sessionStorage.getItem("rolename");
            var parStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.parment);
            var govStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.governerscounter);
            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/sign";
                orange.redirect(url);
            });

            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
                    $("#fileNo").val(tempdata.fileNo);
                    $("#parment").val(parStatus[tempdata.parment].text);
                    $("#number").val(tempdata.number);
                    $("#govPunlic").val(govStatus[tempdata.parment].text);
                    $("#receivingTitle").val(tempdata.receivingTitle);
                    $("#fileNumber").val(tempdata.fileNumber);
                    $("#classification").val(tempdata.classification);
                    var tgAdvice;
                    $.ajax({cache: false, async: false, type: 'get', data: {dataCode: tempdata.itemcode}, url: "/advice/getByDataCode", success: function (data) {
                            tgAdvice = data;
                        }
                    });
                    var num = dictUtil.getDictByCode(dictUtil.DICT_LIST.postDocumentNum);
                    /*var postNum = num[tempdata.postDocumentNum].text + tempdata.postDocumentNum1;
                    $("#postDocumentNum").val(postNum);*/
                    $("#postDocumentTitle").val(tempdata.postDocumentTitle);
                    if (tempdata.postPublicWay == "0"){
                        $("#p1").prop("checked",true);
                    }else if (tempdata.postPublicWay == "1"){
                        $("#p2").prop("checked",true);
                    }else {
                        $("#p3").prop("checked",true);
                        if (tempdata.postReason == "0"){
                            $("#r1").prop("checked",true);
                        }else if (tempdata.postReason == "1"){
                            $("#r2").prop("checked",true);
                        }else if (tempdata.postReason == "2"){
                            $("#r3").prop("checked",true);
                        }else {
                            $("#r4").prop("checked",true);
                        }
                    }
                    if (tempdata.postFairDepartmentReview == "0"){
                        $("#f1").prop("checked",true);
                    }else {
                        $("#f2").prop("checked",true);
                        $('#fujian').attr('style',"display:none");
                    }
                    if (tempdata.postNormativeDocuments == "y"){
                        $("#n1").prop("checked",true);
                    }else {
                        $("#n2").prop("checked",true);
                    }
                    if (tempdata.postSecretRelated =="y"){
                        $("#s1").prop("checked",true);
                    }else {
                        $("#s2").prop("checked",true);
                    }
                    $("#postPrinting").val(tempdata.postPrinting);
                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);

                    $("#initialName").val(tgAdvice.data.initial);
                    $("#initialDate").val(tgAdvice.data.initialDate);
                    $("#signOpinion").val(tgAdvice.data.signOpinion);
                    $("#signDate").val(tgAdvice.data.signDate);
                    $("#signName").val(tgAdvice.data.signName);
                    $("#departmentOpinion").val(tgAdvice.data.department);
                    $("#departmentName").val(tgAdvice.data.departmentName);
                    $("#departmentDate").val(tgAdvice.data.departDate);
                    $("#officeOpinion").val(tgAdvice.data.office);
                    $("#officeName").val(tgAdvice.data.officeName);
                    $("#officeDate").val(tgAdvice.data.officeDate);
                    $("#deputyDirectorOpinion").val(tgAdvice.data.deputyDirector);
                    $("#deputyDirectorName").val(tgAdvice.data.deputyDirectorName);
                    $("#deputyDirectorDate").val(tgAdvice.data.deputyDirectorDate);
                    $("#directorOpinion").val(tgAdvice.data.director);
                    $("#directorName").val(tgAdvice.data.directorName);
                    $("#directorDate").val(tgAdvice.data.directorDate);
                }
            }());

            function isView() {
                return (localStorage.getItem("viewRowData") != null || localStorage.getItem("viewRowData") != undefined)
            }

        })
})();
