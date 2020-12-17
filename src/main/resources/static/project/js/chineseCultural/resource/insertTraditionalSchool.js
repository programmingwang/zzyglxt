(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil) {
            const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/chineseCultural/resource/traditionalSchool";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var traSchEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/res/traSch/addTraSch";
                    operateMessage = "新增中医流派成功";
                    traSchEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '0',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/res/traSch/updTraSch";
                    traSchEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新中医流派成功";
                }

                fileUtil.handleFile(isUpdate(), traSchEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,traSchEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/chineseCultural/resource/traditionalSchool";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            $("#btn_insert").unbind().on('click',function () {
                var traSchEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/res/traSch/addTraSch";
                    operateMessage = "新增中医流派成功";
                    traSchEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/res/traSch/updTraSch";
                    traSchEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalStatus : '1',
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新中医流派成功";
                }

                fileUtil.handleFile(isUpdate(), traSchEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,traSchEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/chineseCultural/resource/traditionalSchool";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    $("#addFile").text(tempdata.fileName);
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
