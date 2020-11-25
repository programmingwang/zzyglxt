(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','distpicker','selectUtil','checkUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,distpicker,selectUtil,checkUtil) {

            const editor = objectUtil.wangEditorUtil();


            $("#cancelbtn").unbind().on('click',function () {
                var url = "/scientificProject/topicManagement";
                orange.redirect(url);
            });

            $("#pass").unbind().on('click',function () {

            });

            $("#fail").unbind().on('click',function () {

            });

            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    console.log(tempdata);
                    $("#projectName").val(tempdata.projectName);
                    $("#disciplineCode").val(tempdata.disciplineCode);
                    $("#disciplineName").val(tempdata.disciplineName);
                    $("#applicant").val(tempdata.applicant);
                    $("#contactCode").val(tempdata.contactCode);
                    $("#company").val(tempdata.company);
                    $("#postalAddress").val(tempdata.postalAddress);
                    $("#postalCode").val(tempdata.postalCode);
                    $("#email").val(tempdata.email);
                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);
                }
            }());

            function isView() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

            var files= document.getElementById('upload_file').files
            if(files.length>0){
                $("#addFile").empty("p");
                var name = files.name;
                $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
            }
            /*
            上传文件
            */
            // document.getElementById('upload_file').onchange=function(){
            //     var len=this.files.length;
            //     $("#addFile").empty("p");
            //     for (var i = 0; i < len; i++) {
            //         var name = this.files[i].name;
            //         var j=i+1;
            //         $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
            //     };
            //     if(len>0){
            //         $("#clsfile").css("display","block")
            //     }
            // }
            // document.getElementById('clsfile').onclick = function() {
            //     var obj = document.getElementById('upload_file');
            //     obj.outerHTML=obj.outerHTML;
            //     $("#clsfile").css("display","none");
            //     $("#addFile").empty("p");
            // }

        })
})();
