(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            //获取正在登陆中角色
            var rolename = sessionStorage.getItem("rolename");
            //获取正在登陆中角色用户名
            var username = sessionStorage.getItem("name");
            var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
            var postStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.postStatus);

            //获取主送目标
            var zhusong;
            $.ajax({
                cache: false,
                async: false,
                type: 'get',
                data: {dateCode: tempdata.itemcode},
                url: "/postref/getMasterSend",
                success: function (data) {
                    zhusong = data;
                }
            });
            var zhusongGoal = "";
            for (var i = 0; i < zhusong.data.length; i++) {
                zhusongGoal = zhusongGoal + zhusong.data[i].receiverId + "；";
            }

            //获取抄送目标
            var chaosong;
            $.ajax({
                cache: false,
                async: false,
                type: 'get',
                data: {dateCode: tempdata.itemcode},
                url: "/postref/getCopySend",
                success: function (data) {
                    chaosong = data;
                }
            });
            var chaosongGoal = "";
            for (var j = 0; j < chaosong.data.length; j++) {
                chaosongGoal = chaosongGoal + chaosong.data[j].receiverId + "；";
            }

            //获取意见表的内容
            var tgAdvice;
            $.ajax({
                cache: false,
                async: false,
                type: 'get',
                data: {dataCode: tempdata.itemcode},
                url: "/advice/getByDataCode",
                success: function (data) {
                    tgAdvice = data;
                }
            });

            //检验审核意见是否为空
            $.fn.validate = function (tips) {
                if ($(this).val() == "" || $.trim($(this).val()).length == 0) {
                    alertUtil.error(tips + "不能为空！");
                    throw SyntaxError(); //如果验证不通过，则不执行后面
                }
            };

            $("#cancelbtn").unbind().on('click', function () {
                localStorage.removeItem("viewRowData");
                localStorage.getItem("comeFromMain") === "true" ?
                    orange.redirect("/data/mainPage")
                    :
                    orange.redirect("/document/post");
                localStorage.removeItem("comeFromMain");
            });

            //审核意见
            if (rolename === "政务资源科员") {
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                if (tgAdvice.data.deputyDirector !== "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector1 !== "") {
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector2 !== "") {
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector3 !== "") {
                    $('#opinin223').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector === "" && tgAdvice.data.deputyDirector1 === "" && tgAdvice.data.deputyDirector2 === "" && tgAdvice.data.deputyDirector3 === "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            } else if (rolename === "政务资源处长") {
                if (tgAdvice.data.department === "") {
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin41').attr('style', "display:block; height:200px;");
                } else {
                    $('#opinin42').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                if (tgAdvice.data.deputyDirector !== "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector1 !== "") {
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector2 !== "") {
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector3 !== "") {
                    $('#opinin223').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector === "" && tgAdvice.data.deputyDirector1 === "" && tgAdvice.data.deputyDirector2 === "" && tgAdvice.data.deputyDirector3 === "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                $('#opinin32').attr('style', "display:block;");
            } else if (rolename === "政务资源综合处处长") {
                if (tgAdvice.data.office === "") {
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin31').attr('style', "display:block; height:200px;");
                } else {
                    $('#opinin32').attr('style', "display:block;");
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                if (tgAdvice.data.deputyDirector !== "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector1 !== "") {
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector2 !== "") {
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector3 !== "") {
                    $('#opinin223').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector === "" && tgAdvice.data.deputyDirector1 === "" && tgAdvice.data.deputyDirector2 === "" && tgAdvice.data.deputyDirector3 === "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                $('#opinin42').attr('style', "display:block;");
            } else if (rolename === "中医处分管局长") {
                if (tgAdvice.data.deputyDirector === "") {
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                } else {
                    if (tgAdvice.data.deputyDirector !== "") {
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector1 !== "") {
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector2 !== "") {
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector3 !== "") {
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            } else if (rolename === "中药处分管局长") {
                if (tgAdvice.data.deputyDirector1 === "") {
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                } else {
                    if (tgAdvice.data.deputyDirector !== "") {
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector1 !== "") {
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector2 !== "") {
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector3 !== "") {
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            } else if (rolename === "综合处分管局长") {
                if (tgAdvice.data.deputyDirector2 === "") {
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                } else {
                    if (tgAdvice.data.deputyDirector !== "") {
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector1 !== "") {
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector2 !== "") {
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector3 !== "") {
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            } else if (rolename === "法规监督处分管局长") {
                if (tgAdvice.data.deputyDirector3 === "") {
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin21').attr('style', "display:block; height:100px;");
                } else {
                    if (tgAdvice.data.deputyDirector !== "") {
                        $('#opinin220').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector1 !== "") {
                        $('#opinin221').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector2 !== "") {
                        $('#opinin222').attr('style', "display:block;");
                    }
                    if (tgAdvice.data.deputyDirector3 !== "") {
                        $('#opinin223').attr('style', "display:block;");
                    }
                }
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            } else if (rolename === "政务资源局长") {
                if (tgAdvice.data.director === "") {
                    $('#failbtn').attr('style', "display:block;");
                    $('#passbtn').attr('style', "display:block;");
                    $('#opinin11').attr('style', "display:block; height:100px;");
                } else {
                    $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                }
                if (tgAdvice.data.deputyDirector !== "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector1 !== "") {
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector2 !== "") {
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector3 !== "") {
                    $('#opinin223').attr('style', "display:block;");
                }
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            } else {
                $('#opinin12').attr('style', "display:block;margin-bottom:10px");
                if (tgAdvice.data.deputyDirector !== "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector1 !== "") {
                    $('#opinin221').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector2 !== "") {
                    $('#opinin222').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector3 !== "") {
                    $('#opinin223').attr('style', "display:block;");
                }
                if (tgAdvice.data.deputyDirector === "" && tgAdvice.data.deputyDirector1 === "" && tgAdvice.data.deputyDirector2 === "" && tgAdvice.data.deputyDirector3 === "") {
                    $('#opinin220').attr('style', "display:block;");
                }
                $('#opinin32').attr('style', "display:block;");
                $('#opinin42').attr('style', "display:block;");
            }

            $("#passbtn").unbind().on('click', function () {
                var myPassPostModalData = {
                    modalBodyID: "myPassModal",
                    modalTitle: "审核通过",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var isSuccess = false;
                        var nowTime = stringUtil.formatDateTime(new Date());
                        var submitStatus = {
                            "itemid": tempdata.itemid,
                            "itemcode": tempdata.itemcode,
                            "postDataStatus": "",
                            "postOpinion": ""
                        };
                        var submitOpinion;
                        if (rolename === "政务资源处长") {
                            $("#departmentView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[2].id;
                            submitOpinion = {
                                "dataCode": tempdata.itemcode,
                                "department": $("#departmentView").val(),
                                "departmentName": username,
                                "departDate": nowTime,
                            };
                            submitStatus.postOpinion = "1";
                        } else if (rolename === "政务资源综合处处长") {
                            $("#officeView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[2].id;
                            submitOpinion = {
                                "dataCode": tempdata.itemcode,
                                "office": $("#officeView").val(),
                                "officeName": username,
                                "officeDate": nowTime,
                            };
                            submitStatus.postOpinion = "2";
                        } else if (rolename === "中医处分管局长" || rolename === "中药处分管局长" || rolename === "综合处分管局长" || rolename === "法规监督处分管局长") {
                            $("#deputyDirectorView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[6].id;
                            if (rolename === "中医处分管局长") {
                                submitOpinion = {
                                    "dataCode": tempdata.itemcode,
                                    "deputyDirector": $("#deputyDirectorView").val(),
                                    "deputyDirectorName": username,
                                    "deputyDirectorDate": nowTime,
                                };
                            } else if (rolename === "中药处分管局长") {
                                submitOpinion = {
                                    "dataCode": tempdata.itemcode,
                                    "deputyDirector1": $("#deputyDirectorView").val(),
                                    "deputyDirectorName1": username,
                                    "deputyDirectorDate1": nowTime,
                                };
                            } else if (rolename === "综合处分管局长") {
                                submitOpinion = {
                                    "dataCode": tempdata.itemcode,
                                    "deputyDirector2": $("#deputyDirectorView").val(),
                                    "deputyDirectorName2": username,
                                    "deputyDirectorDate2": nowTime,
                                };
                            } else if (rolename === "法规监督处分管局长") {
                                submitOpinion = {
                                    "dataCode": tempdata.itemcode,
                                    "deputyDirector3": $("#deputyDirectorView").val(),
                                    "deputyDirectorName3": username,
                                    "deputyDirectorDate3": nowTime,
                                };
                            }
                            submitStatus.postOpinion = "3";
                        } else if (rolename === "政务资源局长") {
                            $("#directorView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[8].id;
                            submitOpinion = {
                                "dataCode": tempdata.itemcode,
                                "director": $("#directorView").val(),
                                "directorName": username,
                                "directorDate": nowTime,
                            };
                            submitStatus.postOpinion = "4";
                        }
                        ajaxUtil.myAjax(null, "/post/updatePost", submitStatus, function (data) {
                            if (ajaxUtil.success(data)) {
                                if (data.code == 88888) {
                                    ajaxUtil.myAjax(null, "/advice/updAdvice", submitOpinion, function (data) {
                                        if (ajaxUtil.success(data)) {
                                            if (data.code == 88888) {
                                                isSuccess = true;
                                                if (rolename === "政务资源局长") {
                                                    var mySubmitToCZ = {
                                                        modalBodyID: "mySendModal",
                                                        modalTitle: "发送",
                                                        modalClass: "modal-lg",
                                                        modalConfirmFun: function () {
                                                            var postRefEntity = {
                                                                sendStatus: 1,
                                                                dateCode: tempdata.itemcode
                                                            };
                                                            ajaxUtil.myAjax(null, "/postref/updPostRef", postRefEntity, function (data) {
                                                                if (ajaxUtil.success(data)) {
                                                                    var submitConfirmModal = {
                                                                        modalBodyID: "myTopicSubmitTip",
                                                                        modalTitle: "提示",
                                                                        modalClass: "modal-lg",
                                                                        cancelButtonStyle: "display:none",
                                                                        modalConfirmFun: function () {
                                                                            var url = "/document/post";
                                                                            orange.redirect(url);
                                                                            return true;
                                                                        }
                                                                    }
                                                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                                                    submitConfirm.show();
                                                                } else {
                                                                    alert(data.msg);
                                                                }
                                                            }, false, true, "post");
                                                            return true;
                                                        }
                                                    }
                                                    var x = modalUtil.init(mySubmitToCZ);
                                                    x.show();
                                                    return false;
                                                } else {
                                                    var submitConfirmModal = {
                                                        modalBodyID: "myTopicSubmitTip",
                                                        modalTitle: "提示",
                                                        modalClass: "modal-lg",
                                                        cancelButtonStyle: "display:none",
                                                        modalConfirmFun: function () {
                                                            var url = "/document/post";
                                                            orange.redirect(url);
                                                            return true;
                                                        }
                                                    }
                                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                                    submitConfirm.show();
                                                }
                                            } else {
                                                alertUtil.error(data.msg);
                                            }
                                        }
                                    }, false, true, "post");
                                } else {
                                    alertUtil.error(data.msg);
                                }
                            }
                        }, false, true, "post");
                        return isSuccess;
                    }
                };
                var myPassModal = modalUtil.init(myPassPostModalData);
                myPassModal.show();
                return false;
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
                        }else if (rolename === "中医处分管局长" || rolename === "中药处分管局长" || rolename === "综合处分管局长" || rolename === "法规监督处分管局长"){
                            $("#deputyDirectorView").validate("审核意见");
                            submitStatus.postDataStatus = postStatus[6].id;
                            if (rolename === "中医处分管局长"){
                                submitOpinion = {
                                    "dataCode" : tempdata.itemcode,
                                    "deputyDirector" : $("#deputyDirectorView").val(),
                                    "deputyDirectorName" : username,
                                    "deputyDirectorDate" : nowTime,
                                };
                            }else if (rolename === "中药处分管局长"){
                                submitOpinion = {
                                    "dataCode" : tempdata.itemcode,
                                    "deputyDirector1" : $("#deputyDirectorView").val(),
                                    "deputyDirectorName1" : username,
                                    "deputyDirectorDate1" : nowTime,
                                };
                            }else if (rolename === "综合处分管局长"){
                                submitOpinion = {
                                    "dataCode" : tempdata.itemcode,
                                    "deputyDirector2" : $("#deputyDirectorView").val(),
                                    "deputyDirectorName2" : username,
                                    "deputyDirectorDate2" : nowTime,
                                };
                            }else if (rolename === "法规监督处分管局长"){
                                submitOpinion = {
                                    "dataCode" : tempdata.itemcode,
                                    "deputyDirector3" : $("#deputyDirectorView").val(),
                                    "deputyDirectorName3" : username,
                                    "deputyDirectorDate3" : nowTime,
                                };
                            }
                            submitStatus.postOpinion = "3";
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
                                                isSuccess = true;
                                                var submitConfirmModal = {
                                                    modalBodyID: "myTopicSubmitTip",
                                                    modalTitle: "提示",
                                                    modalClass: "modal-lg",
                                                    cancelButtonStyle: "display:none",
                                                    modalConfirmFun: function () {
                                                        var url = "/document/post";
                                                        orange.redirect(url);
                                                        return true;
                                                    }
                                                }
                                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                                submitConfirm.show();

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
                        $("#upload_file").text(tempdata.fileName[0]);
                        $("#upload_file").attr('href',tempdata.filePath[0]);
                        $("#fairFile").text(tempdata.fileName[1]);
                        $("#fairFile").attr('href',tempdata.filePath[1]);
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
                    $("#deputyDirectorOpinion1").val(tgAdvice.data.deputyDirector1);
                    $("#deputyDirectorName1").val(tgAdvice.data.deputyDirectorName1);
                    $("#deputyDirectorDate1").val(stringUtil.formatTime(tgAdvice.data.deputyDirectorDate1));
                    $("#deputyDirectorOpinion2").val(tgAdvice.data.deputyDirector2);
                    $("#deputyDirectorName2").val(tgAdvice.data.deputyDirectorName2);
                    $("#deputyDirectorDate2").val(stringUtil.formatTime(tgAdvice.data.deputyDirectorDate2));
                    $("#deputyDirectorOpinion3").val(tgAdvice.data.deputyDirector3);
                    $("#deputyDirectorName3").val(tgAdvice.data.deputyDirectorName3);
                    $("#deputyDirectorDate3").val(stringUtil.formatTime(tgAdvice.data.deputyDirectorDate3));
                    $("#directorOpinion").val(tgAdvice.data.director);
                    $("#directorName").val(tgAdvice.data.directorName);
                    $("#directorDate").val(stringUtil.formatTime(tgAdvice.data.directorDate));

                    $("#zhusong").val(zhusongGoal);
                    $("#chaosong").val(chaosongGoal);
                }
            }());

            function isView() {
                return (localStorage.getItem("viewRowData") != null || localStorage.getItem("viewRowData") != undefined)
            }

        })
})();
