(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','distpicker','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,distpicker,modalUtil) {

           const editor = objectUtil.wangEditorUtil();

            $("#cancel").unbind().on('click',function () {
                var url = "/healthCare/healthcarefamPre";
                orange.redirect(url);
            });

            $("#btn_save").unbind().on('click',function () {
                var careFamEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "inserthealthcarefampredo";
                    operateMessage = "新增国医话健康成功";
                    careFamEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        source : $("#source").val(),
                        author : $("#author").val(),
                        status : '0',
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatehealthcarefampredo";
                    careFamEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        source : $("#source").val(),
                        author : $("#author").val(),
                        status : '0',
                        content : editor.txt.html()
                    }
                    operateMessage = "更新国医话健康成功";
                }
                fileUtil.handleFile(isUpdate(), careFamEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,careFamEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/healthCare/healthcarefamPre";
                                orange.redirect(url);
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();

                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
                        var careFamEntity;
                        var addUpdateUrl;
                        if(!isUpdate()){
                            addUpdateUrl = "inserthealthcarefampredo";
                            careFamEntity = {
                                itemcode: stringUtil.getUUID(),
                                name : $("#name").val(),
                                source : $("#source").val(),
                                author : $("#author").val(),
                                status : '1',
                                content : editor.txt.html()
                            };
                        }else{
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            addUpdateUrl = "updatehealthcarefampredo";
                            careFamEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                name : $("#name").val(),
                                source : $("#source").val(),
                                author : $("#author").val(),
                                status : '1',
                                content : editor.txt.html()
                            }
                        }
                        fileUtil.handleFile(isUpdate(), careFamEntity.itemcode, $("#upload_file")[0].files[0]);

                        ajaxUtil.myAjax(null,addUpdateUrl,careFamEntity,function (data) {
                            if(ajaxUtil.success(data)){
                                var submitConfirmModal = {
                                    modalBodyID :"myTopicSubmitTip",
                                    modalTitle : "提示",
                                    modalClass : "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun:function (){
                                        var url = "/healthCare/healthcarefamPre";
                                        orange.redirect(url);
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();

                            }else {
                                alertUtil.alert(data.msg);
                            }
                        },false,true);
                        return true;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            (function init() {
                if (isUpdate()){
                    $(".titleCSS").text("修改国医话健康信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#source").val(tempdata.source);
                    $("#author").val(tempdata.author);
                    editor.txt.html(tempdata.content);
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