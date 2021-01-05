(function () {
    require(['jquery','objectUtil','bootstrapTableUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil','selectUtil'],
        function (jquery,objectUtil,bootstrapTableUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil,selectUtil) {

            const editor = objectUtil.wangEditorUtil();


            var row = JSON.parse(localStorage.getItem("viewRowData"));

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/report";
                orange.redirect(url);
            });
            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
                    $("#reportTitle").val(tempdata.reportTitle);
                    $("#reportContent").val(tempdata.reportContent);
                    $("#reason").val(tempdata.reason);
                    $("#reasonone").val(tempdata.reasonone);
                    $("#reasontwo").val(tempdata.reasontwo);

                    $("#updaterf").val(tempdata.updaterf);
                    $("#updaterone").val(tempdata.updaterone);
                    $("#updatertwo").val(tempdata.updatertwo);

                    $("#updateone").val(tempdata.updateone);
                    $("#updatetwo").val(tempdata.updatetwo);
                    $("#updatef").val(tempdata.updatef);

                    $("#creater").val(tempdata.creater);
                    $("#itemcreateat").val(tempdata.itemcreateat);
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