(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            const editor = objectUtil.wangEditorUtil();

            var rolename = sessionStorage.getItem("rolename");
            var projectStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.projectStatus);
            var topicStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.topicStatus);

            var row = JSON.parse(localStorage.getItem("rowData"));

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/scientificProject/topicManagement";
                if(localStorage.getItem("centralizedView") == "true"){
                    url = "/scientificProject/centralizedReview";
                    localStorage.removeItem("centralizedView");
                }
                orange.redirect(url);
            });

            $("#passbtn").unbind().on('click',function () {
                var myPassTopicModalData ={
                    modalBodyID :"myPassModal",
                    modalTitle : "审核通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var shStatus = {
                            "examineStatus": ""
                        };
                        var xmStatus = {
                            "status": topicStatus[1].id
                        };
                        if(rolename == "科研项目申报单位"){
                            shStatus.examineStatus = projectStatus[2].id;
                        }else if (rolename == "市级中医药管理部门"){
                            shStatus.examineStatus = projectStatus[4].id;
                        }else {
                            shStatus.examineStatus = projectStatus[6].id;
                            xmStatus.status = topicStatus[2].id;
                            var developTopicDO = {
                                projectNo : ++projectNo,
                                itemid : row.itemid,
                                itemcode : row.itemcode,
                            }
                        }
                        ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == 88888){
                                    ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                        if(ajaxUtil.success(data)){
                                            if(data.code == 88888){
                                                ajaxUtil.myAjax(null,"/industrialdevelop/updTopic",developTopicDO,null,false,true);
                                                alertUtil.info("审核已通过");
                                                isSuccess = true;
                                                var url = "/scientificProject/topicManagement";
                                                orange.redirect(url);
                                            }else{
                                                alertUtil.error(data.msg);
                                            }
                                        }
                                    },false)

                                }else{
                                    alertUtil.error(data.msg);
                                }
                            }
                        },false);
                        return isSuccess;
                    }
                };
                var myPassModal = modalUtil.init(myPassTopicModalData);
                myPassModal.show();
            });

            $("#failbtn").unbind().on('click',function () {
                var myFailTopiceModalData ={
                    modalBodyID :"myResonable",
                    modalTitle : "审核不通过理由",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var developTopicDO = {
                            reason : $("#reason").val(),
                            itemid : row.itemid,
                            itemcode : row.itemcode,
                        };
                        var shStatus = {
                            "examineStatus": ""
                        };
                        var xmStatus = {
                            "status": topicStatus[0].id
                        };
                        if(rolename == "科研项目申报单位"){
                            shStatus.examineStatus = projectStatus[3].id;
                        }else if (rolename == "市级中医药管理部门"){
                            shStatus.examineStatus = projectStatus[5].id;
                        }else {
                            shStatus.examineStatus = projectStatus[7].id;
                        }
                        ajaxUtil.myAjax(null,"/industrialdevelop/updTopic",developTopicDO,function (data) {
                            if(data && ajaxUtil.success(data)){
                                if(data.code == ajaxUtil.successCode){
                                    ajaxUtil.myAjax(null,"/industrialdevelop/examineStatus/"+row.itemid+"/"+row.itemcode,shStatus,function (data) {
                                        if(ajaxUtil.success(data)){
                                            if(data.code == 88888){
                                                ajaxUtil.myAjax(null,"/industrialdevelop/projectStatus/"+row.itemid+"/"+row.itemcode,xmStatus,function (data) {
                                                    if(ajaxUtil.success(data)){
                                                        if(data.code == 88888){
                                                            alertUtil.info("操作成功");
                                                            isSuccess = true;
                                                            var url = "/scientificProject/topicManagement";
                                                            orange.redirect(url);
                                                        }else{
                                                            alertUtil.error(data.msg);
                                                        }
                                                    }
                                                },false)

                                            }else{
                                                alertUtil.error(data.msg);
                                            }
                                        }
                                    },false);
                                }else{
                                    alertUtil.error(data.msg);
                                }
                            }
                            else{
                                alertUtil.error(data.msg);
                            }
                        },false,true)
                        return isSuccess;
                    }
                };
                var myFailModal = modalUtil.init(myFailTopiceModalData);
                myFailModal.show();
            });

            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
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
                    if (rolename === "科研项目申报单位"){
                        if (tempdata.examineStatus == projectStatus[1].id){
                            $('#passbtn').attr('style', "display:block;");
                            $('#failbtn').attr('style', "display:block;");
                        }
                    }else if (rolename === "市级中医药管理部门"){
                        if (tempdata.examineStatus == projectStatus[2].id){
                            $('#passbtn').attr('style', "display:block;");
                            $('#failbtn').attr('style', "display:block;");
                        }
                    }else if (rolename === "省局中医药管理部门"){
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
