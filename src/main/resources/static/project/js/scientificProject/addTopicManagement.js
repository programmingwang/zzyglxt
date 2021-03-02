(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','distpicker','selectUtil','checkUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,distpicker,selectUtil,checkUtil,uploadImg,modalUtil) {

            uploadImg.init();

            /*下拉框值*/
            var sm = dictUtil.getDictByCode(dictUtil.DICT_LIST.subjectMajor);
            $("#disciplineName").selectUtil(sm);
            $('#disciplineName').change(function () {
                $('#disciplineCode').val($('#disciplineName').val())
            });

            var span = document.querySelector("span");
            /*验证联系电话*/
            $("#contactCode").blur(function () {
                var phone = $("#contactCode").val();
                if (!checkUtil.regxTest(phone)){
                    $('#contactCode_tip').attr('style', "display:block;color: #D60000;");
                    document.getElementById("contactCode_tip").innerHTML="输入电话错误，请重新输入！";
                    $("#contactCode").val("");
                    //alertUtil.error("请输入正确的电话号码");
                }else {
                    $('#contactCode_tip').attr('style', "display:none;");
                }
            });
            /*验证邮箱*/
            $("#email").blur(function () {
                var ema = $("#email").val();
                if (!checkUtil.isEmail(ema)){
                    $('#email_tip').attr('style', "display:block;color: #D60000;");
                    document.getElementById("email_tip").innerHTML="输入邮箱错误，请重新输入！";
                    $("#email").val("");
                    //alertUtil.error("请输入正确的电子邮箱");
                }else {
                    $('#email_tip').attr('style', "display:none;");
                }
            })

            var workUnit = sessionStorage.getItem("orgName");
            $("#company").val(workUnit);

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/scientificProject/topicManagement";
                orange.redirect(url);
            });

            $("#savebtn").unbind().on('click',function () {
                var TopicEntity;
                var requestUrl;
                var operateMessage;
                var postalAddress = $("#addressPro").val()+","+$("#addressCity").val()+","+$("#addressCountry").val()+","+$("#address").val();
                if (!isUpdate()){
                    for (var i=0;i<sm.length;i++){
                        if (sm[i].id == $("#disciplineName").val()){
                            var disciplineNameText = sm[i].text;
                        }
                    }
                    requestUrl = "/industrialdevelop/addTopic";
                    operateMessage = "保存课题项目成功";
                    TopicEntity = {
                        itemcode: stringUtil.getUUID(),
                        projectName : $("#projectName").val(),
                        disciplineCode : $("#disciplineCode").val(),
                        disciplineName : disciplineNameText,
                        applicant : $("#applicant").val(),
                        contactCode : $("#contactCode").val(),
                        company : $("#company").val(),
                        postalAddress : postalAddress,
                        postalCode : $("#postalCode").val(),
                        email : $("#email").val(),
                        userCode : sessionStorage.getItem("itemcode"),
                        status : "0",
                        examineStatus : "0",
                    };
                }
                else {
                    for (var i=0;i<sm.length;i++){
                        if (sm[i].id == $("#disciplineName").val()){
                            var disciplineNameText = sm[i].text;
                        }
                    }
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    requestUrl = "/industrialdevelop/updTopic";
                    TopicEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        projectName : $("#projectName").val(),
                        disciplineCode : $("#disciplineCode").val(),
                        disciplineName : disciplineNameText,
                        applicant : $("#applicant").val(),
                        contactCode : $("#contactCode").val(),
                        company : $("#company").val(),
                        postalAddress : postalAddress,
                        postalCode : $("#postalCode").val(),
                        email : $("#email").val(),
                    }
                    operateMessage = "修改课题项目成功";
                }
                fileUtil.handleFile(isUpdate(), TopicEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,requestUrl,TopicEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                var url = "/scientificProject/topicManagement";
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


            $("#submitbtn").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var TopicEntity;
                        var requestUrl;
                        var operateMessage;
                        var postalAddress = $("#addressPro").val() + "," + $("#addressCity").val() + "," + $("#addressCountry").val() + "," + $("#address").val();
                        if (!isUpdate()) {
                            for (var i = 0; i < sm.length; i++) {
                                if (sm[i].id == $("#disciplineName").val()) {
                                    var disciplineNameText = sm[i].text;
                                }
                            }
                            requestUrl = "/industrialdevelop/addTopic";
                            operateMessage = "新增课题项目成功";
                            TopicEntity = {
                                itemcode: stringUtil.getUUID(),
                                projectName: $("#projectName").val(),
                                disciplineCode: $("#disciplineCode").val(),
                                disciplineName: disciplineNameText,
                                applicant: $("#applicant").val(),
                                contactCode: $("#contactCode").val(),
                                company: $("#company").val(),
                                postalAddress: postalAddress,
                                postalCode: $("#postalCode").val(),
                                email: $("#email").val(),
                                userCode: sessionStorage.getItem("itemcode"),
                                status: "0",
                                examineStatus: "1",
                            };
                        } else {
                            for (var i = 0; i < sm.length; i++) {
                                if (sm[i].id == $("#disciplineName").val()) {
                                    var disciplineNameText = sm[i].text;
                                }
                            }
                            var needData = JSON.parse(localStorage.getItem("rowData"));
                            requestUrl = "/industrialdevelop/updTopic";
                            TopicEntity = {
                                itemid: needData.itemid,
                                itemcode: needData.itemcode,
                                projectName: $("#projectName").val(),
                                disciplineCode: $("#disciplineCode").val(),
                                disciplineName: disciplineNameText,
                                applicant: $("#applicant").val(),
                                contactCode: $("#contactCode").val(),
                                company: $("#company").val(),
                                postalAddress: postalAddress,
                                postalCode: $("#postalCode").val(),
                                email: $("#email").val(),
                                status: "0",
                                examineStatus: "1",
                            }
                            operateMessage = "已修改并提交课题项目成功";
                        }

                        fileUtil.handleFile(isUpdate(), TopicEntity.itemcode, $("#upload_file")[0].files[0]);

                        ajaxUtil.myAjax(null, requestUrl, TopicEntity, function (data) {
                            if (ajaxUtil.success(data)) {
                                var submitConfirmModal = {
                                    modalBodyID: "myTopicSubmitTip",
                                    modalTitle: "提示",
                                    modalClass: "modal-lg",
                                    cancelButtonStyle: "display:none",
                                    modalConfirmFun: function () {
                                        var url = "/scientificProject/topicManagement";
                                        orange.redirect(url);
                                        return true;
                                    }
                                }
                                var submitConfirm = modalUtil.init(submitConfirmModal);
                                submitConfirm.show();
                            } else {
                                alertUtil.alert(data.msg);
                            }
                        }, false, true);
                        return true;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    var postalAddress = tempdata.postalAddress;
                    var postalAddressArry = postalAddress.split(",");
                    $("#distpicker").distpicker({
                        province: postalAddressArry[0],
                        city: postalAddressArry[1],
                        district: postalAddressArry[2]
                    });
                    $("#address").val(postalAddressArry[3]);
                    $("#projectName").val(tempdata.projectName);
                    $("#disciplineCode").val(tempdata.disciplineCode);
                    $("#disciplineName").val(tempdata.disciplineCode);
                    $("#applicant").val(tempdata.applicant);
                    $("#contactCode").val(tempdata.contactCode);
                    $("#company").val(workUnit);
                    $("#postalCode").val(tempdata.postalCode);
                    $("#email").val(tempdata.email);
                    $("#addFile").text(tempdata.fileName);
                }else{
                    $('#savebtn').attr('style', "display:block;");
                    $("#distpicker").distpicker();
                    var date = {
                        isDuringDate: function (beginDateStr, endDateStr) {
                            var curDate = new Date(),
                                beginDate = new Date(beginDateStr),
                                endDate = new Date(endDateStr);
                            if (curDate >= beginDate && curDate <= endDate) {
                                var userCode = sessionStorage.getItem("itemcode");
                                ajaxUtil.myAjax(null,"/industrialdevelop/getStatus?userCode="+userCode,null,function (data) {
                                    var sum=0;
                                    for(var i=0;i<data.data.length;i++){
                                        if (data.data[i].status == "0" || data.data[i].status == "1"){
                                            sum +=1;
                                        }
                                    }
                                    if (sum>=2){
                                        operateMessage = "当前有两个项目未结题，无法申报新项目";
                                        alertUtil.info(operateMessage);
                                        var url = "/scientificProject/topicManagement";
                                        orange.redirect(url);
                                    }
                                },false,"","get");

                            }else {
                                operateMessage = "系统已关闭项目申报";
                                alertUtil.info(operateMessage);
                                var url = "/scientificProject/topicManagement";
                                orange.redirect(url);
                            }
                        }
                    };
                    ajaxUtil.myAjax(null,"/industrialdevelop",null,function (data) {
                        for (var i=0;i<data.data.length;i++){
                            if (data.data[i].isimp == "1"){
                                stime = data.data[i].startTime;
                                etime = data.data[i].endTime;
                            }
                        }
                        date.isDuringDate(stime, etime);
                    },false,"","get");
                }
                /*var workUnit= "";
                $.ajax
                ({  cache: false, async: false, type: 'get', url: "/industrialdevelop/getPlatRole", success: function (data) {
                        workUnit = data;
                    }
                });
                var unit = workUnit.data;*/

                init = function () {

                }
            };
            init();

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
