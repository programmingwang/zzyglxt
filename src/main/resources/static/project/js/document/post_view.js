(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            var rolename = sessionStorage.getItem("rolename");
            var username = sessionStorage.getItem("username");
            var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
            var tgAdvice;
            $.ajax({cache: false, async: false, type: 'get', data: {dataCode: tempdata.itemcode}, url: "/advice/getByDataCode", success: function (data) {
                    tgAdvice = data;
                }
            });

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/post";
                orange.redirect(url);
            });

            if(rolename === "政务资源科员"){
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin22').attr('style', "display:block;");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }else if(rolename === "政务资源处长"){
                if (tgAdvice.data.department === ""){
                    $('#opinin41').attr('style', "display:block; height:200px;");
                }else {
                    $('#opinin42').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin22').attr('style', "display:block;");
                $('#opinin32').attr('style', "display:block;");
            }else if(rolename === "政务资源综合处处长"){
                if (tgAdvice.data.office === ""){
                    $('#opinin31').attr('style', "display:block; height:200px;");
                }else {
                    $('#opinin32').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin22').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }else if(rolename === "政务资源分管局长"){
                if (tgAdvice.data.deputyDirector === ""){
                    $('#opinin21').attr('style', "display:block; height:100px;");
                }else {
                    $('#opinin22').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }else if(rolename === "政务资源局长"){
                if (tgAdvice.data.director === ""){
                    $('#opinin11').attr('style', "display:block; height:100px;");
                }else {
                    $('#opinin12').attr('style', "display:block;");
                }
                $('#opinin22').attr('style', "display:block;margin-bottom:40px");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }

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
                        }else if (rolename == "科研项目-市级"){
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
                        }else if (rolename == "科研项目-市级"){
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
                    var num = dictUtil.getDictByCode(dictUtil.DICT_LIST.postDocumentNum);
                    var postNum = num[tempdata.postDocumentNum].text + tempdata.postDocumentNum1;
                    $("#postDocumentNum").val(postNum);
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
                    if (tempdata.fileName[1] == null){
                        $("#upload_file").text(tempdata.fileName);
                        $("#upload_file").attr('href',tempdata.filePath);
                    }else {
                        $("#upload_file").text(tempdata.fileName[1]);
                        $("#upload_file").attr('href',tempdata.filePath[1]);
                        $("#fairFile").text(tempdata.fileName[0]);
                        $("#fairFile").attr('href',tempdata.filePath[0]);
                    }

                    $("#initialName").val(tgAdvice.data.initial);
                    $("#initialDate").val(stringUtil.formatTime(tgAdvice.data.initialDate));
                    $("#departmentOpinion").val(tgAdvice.data.department);
                    $("#departmentName").val(tgAdvice.data.departmentName);
                    $("#departmentDate").val(stringUtil.formatTime(tgAdvice.data.departDate));
                    $("#officeOpinion").val(tgAdvice.data.office);
                    $("#officeName").val(tgAdvice.data.officeName);
                    $("#officeDate").val(stringUtil.formatTime(tgAdvice.data.officeDate));
                    $("#deputyDirectorOpinion").val(tgAdvice.data.deputyDirector);
                    $("#deputyDirectorName").val(tgAdvice.data.deputyDirectorName);
                    $("#deputyDirectorDate").val(stringUtil.formatTime(tgAdvice.data.deputyDirectorDate));
                    $("#directorOpinion").val(tgAdvice.data.director);
                    $("#directorName").val(tgAdvice.data.directorName);
                    $("#directorDate").val(stringUtil.formatTime(tgAdvice.data.directorDate));
                }
            }());

            function isView() {
                return (localStorage.getItem("viewRowData") != null || localStorage.getItem("viewRowData") != undefined)
            }

        })
})();
