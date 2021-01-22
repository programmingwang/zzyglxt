(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil',],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil) {

            const editor = objectUtil.wangEditorUtil();

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataAnnouncement";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var announcementEntity;
                var addUpdateUrl;
                var operateMessage;
                var release;
                if($("input[name='killOrder']:checked").val()=="y"){
                    release="y";
                }else{
                    release="n";
                }
                if(!isUpdate()){
                    addUpdateUrl = "/datado/announcement/insertAnn";
                    operateMessage = "新增通知公告成功";
                    announcementEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        releaseOrNot : release,
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataStatus : "0",
                        dataContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/announcement/updateAnn";
                    announcementEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        releaseOrNot : release,
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataContent : editor.txt.html()
                    }
                    operateMessage = "更新通知公告成功";
                }

                fileUtil.handleFile(isUpdate(), announcementEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,announcementEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataAnnouncement";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            $("#submitbtn").unbind().on('click',function () {
                var announcementEntity;
                var addUpdateUrl;
                var operateMessage;
                var release;
                if($("input[name='killOrder']:checked").val()=="y"){
                    release="y";
                }else{
                    release="n";
                }
                if(!isUpdate()){
                    addUpdateUrl = "/datado/announcement/insertAnn";
                    operateMessage = "新增通知公告成功";
                    announcementEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        releaseOrNot : release,
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataStatus : "1",
                        dataContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/announcement/updateAnn";
                    announcementEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        releaseOrNot : release,
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataContent : editor.txt.html()
                    }
                    operateMessage = "更新通知公告成功";
                }

                fileUtil.handleFile(isUpdate(), announcementEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,announcementEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataAnnouncement";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    if (tempdata.releaseOrNot == "y"){
                        $("#releaseOrNot").prop("checked",true);
                    }else {
                        $("#releaseOrNot").prop("checked",false);
                    }
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataSource").val(tempdata.dataSource);
                    $("#dataFileType").val(tempdata.dataFileType);
                    editor.txt.html(tempdata.dataContent);
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
                $("#upload_file").val("");
                $("#clsfile").css("display","none");
                $("#addFile").empty("p");
            }
        })
})();
