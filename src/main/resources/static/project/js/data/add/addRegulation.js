(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil) {

            const editor = objectUtil.wangEditorUtil();

            /*下拉框值*/
            $("#dataFileType").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dataFileType));

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataRegulation";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var RegulationEntity;
                var addUpdateUrl;
                var operateMessage;
                var release;
                if($("input[name='killOrder']:checked").val()=="y"){
                    release="y";
                }else{
                    release="n";
                }
                if(!isUpdate()){
                    addUpdateUrl = "/datado/regulation/insertRegulation";
                    operateMessage = "新增政策法规成功";
                    RegulationEntity = {
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
                    addUpdateUrl = "/datado/regulation/updateRegulation";
                    RegulationEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        releaseOrNot : release,
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataContent : editor.txt.html()
                    };
                    operateMessage = "更新政策法规成功";
                }

                fileUtil.handleFile(isUpdate(), RegulationEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,RegulationEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataRegulation";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            $("#submitbtn").unbind().on('click',function () {
                var RegulationEntity;
                var addUpdateUrl;
                var operateMessage;
                var release;
                if($("input[name='killOrder']:checked").val()=="y"){
                    release="y";
                }else{
                    release="n";
                }
                if(!isUpdate()){
                    addUpdateUrl = "/datado/regulation/insertRegulation";
                    operateMessage = "新增政策法规成功";
                    RegulationEntity = {
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
                    addUpdateUrl = "/datado/regulation/updateRegulation";
                    RegulationEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        releaseOrNot : release,
                        dataSource : $("#dataSource").val(),
                        dataFileType : $("#dataFileType").val(),
                        dataContent : editor.txt.html()
                    };
                    operateMessage = "更新政策法规成功";
                }

                fileUtil.handleFile(isUpdate(), RegulationEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,RegulationEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataRegulation";
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
