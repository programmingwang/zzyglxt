(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            var rolename = sessionStorage.getItem("rolename");

            var row = JSON.parse(localStorage.getItem("viewRowData"));


            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
                    var address = tempdata.postalAddress;
                    address=address.replace(/,/ig, "");
                    $("#projectName").val(tempdata.projectName);
                    $("#disciplineCode").val(tempdata.disciplineCode);
                    $("#disciplineName").val(tempdata.disciplineName);
                    $("#applicant").val(tempdata.applicant);
                    $("#contactCode").val(tempdata.contactCode);
                    $("#company").val(tempdata.company);
                    $("#postalAddress").val(address);
                    $("#postalCode").val(tempdata.postalCode);
                    $("#email").val(tempdata.email);
                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);
                    if (rolename === "科研项目申报单位"){
                        if (tempdata.examineStatus == projectStatus[1].id){
                            $('#passbtn').attr('style', "display:block;");
                            $('#failbtn').attr('style', "display:block;");
                        }
                    }else if (rolename === "科研项目-市级"){
                        if (tempdata.examineStatus == projectStatus[2].id){
                            $('#passbtn').attr('style', "display:block;");
                            $('#failbtn').attr('style', "display:block;");
                        }
                    }else if (rolename === "科研项目-省级"){
                        if (tempdata.examineStatus == projectStatus[4].id){
                            $('#passbtn').attr('style', "display:block;");
                            $('#failbtn').attr('style', "display:block;");
                        }
                    }
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
