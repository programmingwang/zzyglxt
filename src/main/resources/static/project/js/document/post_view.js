(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            //获取正在登陆中角色
            var rolename = sessionStorage.getItem("rolename");
            //获取正在登陆中角色用户名
            var username = sessionStorage.getItem("username");
            var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
            var postStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.postStatus);
            //获取意见表的内容
            var tgAdvice;
            $.ajax({cache: false, async: false, type: 'get', data: {dataCode: tempdata.itemcode}, url: "/advice/getByDataCode", success: function (data) {
                    tgAdvice = data;
                }
            });

            //检验审核意见是否为空
            $.fn.validate = function(tips){
                if($(this).val() == "" || $.trim($(this).val()).length == 0){
                    alertUtil.error(tips + "不能为空！");
                    throw SyntaxError(); //如果验证不通过，则不执行后面
                }
            };

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                localStorage.getItem("comeFromMain") === "true" ?
                    orange.redirect("/data/mainPage")
                    :
                    orange.redirect("/document/post");
                localStorage.removeItem("comeFromMain");
            });

            if(rolename === "政务资源科员"){
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin22').attr('style', "display:block;");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }else if(rolename === "政务资源处长"){
                if (tgAdvice.data.department === ""){
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin41').attr('style', "display:block; height:200px;");
                }else {
                    $('#opinin42').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin22').attr('style', "display:block;");
                $('#opinin32').attr('style', "display:block;");
            }else if(rolename === "政务资源综合处处长"){
                if (tgAdvice.data.office === ""){
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin31').attr('style', "display:block; height:200px;");
                }else {
                    $('#opinin32').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin22').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }else if(rolename === "政务资源分管局长"){
                if (tgAdvice.data.deputyDirector === ""){
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                }else {
                    $('#opinin22').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }else if(rolename === "政务资源局长"){
                if (tgAdvice.data.director === ""){
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin11').attr('style', "display:block; height:100px;");
                }else {
                    $('#opinin12').attr('style', "display:block;margin-bottom:40px");
                }
                $('#opinin22').attr('style', "display:block;");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }

            $("#passbtn").unbind().on('click',function () {
                var myPassPostModalData ={
                    modalBodyID :"myPassModal",
                    modalTitle : "审核通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var nowTime = stringUtil.formatDateTime(new Date());
                        var submitStatus = {
                            "itemid": tempdata.itemid,
                            "itemcode": tempdata.itemcode,
                            "postDataStatus": "",
                            "postOpinion" : ""
                        };
                        var submitOpinion;
                        if (rolename == "政务资源处长"){
                            $("#departmentView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[2].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "department" : $("#departmentView").val(),
                                "departmentName" : username,
                                "departDate" : nowTime,
                            };
                            submitStatus.postOpinion = "1";
                        }else if (rolename == "政务资源综合处处长"){
                            $("#officeView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[2].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "office" : $("#officeView").val(),
                                "officeName" : username,
                                "officeDate" : nowTime,
                            };
                            submitStatus.postOpinion = "2";
                        }else if (rolename == "政务资源分管局长"){
                            $("#deputyDirectorView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[6].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "deputyDirector" : $("#deputyDirectorView").val(),
                                "deputyDirectorName" : username,
                                "deputyDirectorDate" : nowTime,
                            };
                            submitStatus.postOpinion = "3";
                        }else if (rolename == "政务资源局长"){
                            $("#directorView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[8].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "director" : $("#directorView").val(),
                                "directorName" : username,
                                "directorDate" : nowTime,
                            };
                            submitStatus.postOpinion = "4";
                        }
                        ajaxUtil.myAjax(null,"/post/updatePost",submitStatus,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == 88888){
                                    ajaxUtil.myAjax(null,"/advice/updAdvice", submitOpinion,function (data) {
                                        if(ajaxUtil.success(data)){
                                            if(data.code == 88888){
                                                alertUtil.success("提交成功");
                                                isSuccess = true;
                                                var url = "/document/post";
                                                orange.redirect(url);
                                            }else{
                                                alertUtil.error(data.msg);
                                            }
                                        }
                                    },false,true,"post");
                                }else{
                                    alertUtil.error(data.msg);
                                }
                            }
                        },false,true,"post");
                        return isSuccess;
                    }
                };
                var myPassModal = modalUtil.init(myPassPostModalData);
                myPassModal.show();
            });

            $("#failbtn").unbind().on('click',function () {
                var myFailPostModalData ={
                    modalBodyID :"myFailModal",
                    modalTitle : "审核不通过",
                    modalClass : "modal-lg",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        var nowTime = stringUtil.formatDateTime(new Date());
                        var submitStatus = {
                            "itemid": tempdata.itemid,
                            "itemcode": tempdata.itemcode,
                            "postDataStatus": "",
                        };
                        var submitOpinion;
                        if (rolename == "政务资源处长"){
                            $("#departmentView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[3].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "department" : $("#departmentView").val(),
                                "departmentName" : username,
                                "departDate" : nowTime,
                            };
                        }else if (rolename == "政务资源综合处处长"){
                            $("#officeView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[5].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "office" : $("#officeView").val(),
                                "officeName" : username,
                                "officeDate" : nowTime,
                            };
                        }else if (rolename == "政务资源分管局长"){
                            $("#deputyDirectorView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[7].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "deputyDirector" : $("#deputyDirectorView").val(),
                                "deputyDirectorName" : username,
                                "deputyDirectorDate" : nowTime,
                            };
                        }else if (rolename == "政务资源局长"){
                            $("#directorView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[9].id;
                            submitOpinion = {
                                "dataCode" : tempdata.itemcode,
                                "director" : $("#directorView").val(),
                                "directorName" : username,
                                "directorDate" : nowTime,
                            };
                        }
                        ajaxUtil.myAjax(null,"/post/updatePost",submitStatus,function (data) {
                            if(ajaxUtil.success(data)){
                                if(data.code == 88888){
                                    ajaxUtil.myAjax(null,"/advice/updAdvice", submitOpinion,function (data) {
                                        if(ajaxUtil.success(data)){
                                            if(data.code == 88888){
                                                alertUtil.success("提交成功");
                                                isSuccess = true;
                                                var url = "/document/post";
                                                orange.redirect(url);
                                            }else{
                                                alertUtil.error(data.msg);
                                            }
                                        }
                                    },false,true,"post");
                                }else{
                                    alertUtil.error(data.msg);
                                }
                            }
                        },false,true,"post");
                        return isSuccess;
                    }
                };
                var myFailModal = modalUtil.init(myFailPostModalData);
                myFailModal.show();
            });

            (function init() {
                if(localStorage.getItem("comeFromMain") === "true"){
                    $("#failbtn").remove();
                    $("#passbtn").remove();
                    $("input").attr("disabled","true")
                }
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
