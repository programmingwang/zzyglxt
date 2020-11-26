(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','distpicker','selectUtil','checkUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,distpicker,selectUtil,checkUtil,uploadImg) {

            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            /*下拉框值*/
            var sm = dictUtil.getDictByCode(dictUtil.DICT_LIST.subjectMajor);
            $("#disciplineName").selectUtil(sm);
            $('#disciplineName').change(() => {
                $('#disciplineCode').val($('#disciplineName').val())
            });

            /*验证联系电话*/
            $("#contactCode").blur(function () {
                var phone = $("#contactCode").val();
                if (!checkUtil.isPhoneNo(phone)){
                    alertUtil.error("请输入正确的电话号码");
                }
            });

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/scientificProject/topicManagement";
                orange.redirect(url);
            });

            $("#savebtn").unbind().on('click',function () {
                var TopicEntity;
                var requestUrl;
                var operateMessage;
                var postalAddress = $("#addressPro").val()+" "+$("#addressCity").val()+" "+$("#addressCountry").val()+" "+$("#address").val();
                if (!isUpdate()){
                    requestUrl = "/industrialdevelop/addTopic";
                    operateMessage = "保存课题项目成功";
                    TopicEntity = {
                        itemcode: stringUtil.getUUID(),
                        projectName : $("#projectName").val(),
                        disciplineCode : $("#disciplineCode").val(),
                        disciplineName : $("#disciplineName").val(),
                        applicant : $("#applicant").val(),
                        contactCode : $("#contactCode").val(),
                        company : $("#company").val(),
                        postalAddress : postalAddress,
                        postalCode : $("#postalCode").val(),
                        email : $("#email").val(),
                        userCode : sessionStorage.getItem("usercode"),
                        status : "0",
                        examineStatus : "0",
                    };
                }
                else {
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    requestUrl = "/industrialdevelop/updTopic";
                    TopicEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        projectName : $("#projectName").val(),
                        disciplineCode : $("#disciplineCode").val(),
                        disciplineName : $("#disciplineName").val(),
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
                        alertUtil.info(operateMessage);
                        var url = "/scientificProject/topicManagement";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });


            $("#submitbtn").unbind().on('click',function () {
                var TopicEntity;
                var requestUrl;
                var operateMessage;
                var postalAddress = $("#addressPro").val()+" "+$("#addressCity").val()+" "+$("#addressCountry").val()+" "+$("#address").val();
                if (!isUpdate()){
                    requestUrl = "/industrialdevelop/addTopic";
                    operateMessage = "新增课题项目成功";
                    TopicEntity = {
                        itemcode: stringUtil.getUUID(),
                        projectName : $("#projectName").val(),
                        disciplineCode : $("#disciplineCode").val(),
                        disciplineName : $("#disciplineName").val(),
                        applicant : $("#applicant").val(),
                        contactCode : $("#contactCode").val(),
                        company : $("#company").val(),
                        postalAddress : postalAddress,
                        postalCode : $("#postalCode").val(),
                        email : $("#email").val(),
                        userCode : sessionStorage.getItem("usercode"),
                        status : "0",
                        examineStatus : "0",
                    };
                }
                else {
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    requestUrl = "/industrialdevelop/updTopic";
                    TopicEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        projectName : $("#projectName").val(),
                        disciplineCode : $("#disciplineCode").val(),
                        disciplineName : $("#disciplineName").val(),
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
                        alertUtil.info(operateMessage);
                        var url = "/scientificProject/topicManagement";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    var postalAddress = tempdata.postalAddress;
                    var postalAddressArry = postalAddress.split(" ");
                    $("#distpicker").distpicker({
                        province: postalAddressArry[0],
                        city: postalAddressArry[1],
                        district: postalAddressArry[2]
                    });
                    $("#address").val(postalAddressArry[3]);
                    $("#projectName").val(tempdata.projectName);
                    $("#disciplineCode").val(tempdata.disciplineCode);
                    $("#disciplineName").val(tempdata.disciplineName);
                    $("#applicant").val(tempdata.applicant);
                    $("#contactCode").val(tempdata.contactCode);
                    $("#company").val(tempdata.company);
                    $("#postalCode").val(tempdata.postalCode);
                    $("#email").val(tempdata.email);
                    var file = tempdata.filePath;
                    uploadImg.setImgSrc(file);
                }else{
                    $("#distpicker").distpicker();
                    var userCode = sessionStorage.getItem("usercode");
                    ajaxUtil.myAjax(null,"/industrialdevelop/getStatus?userCode="+userCode,null,function (data) {
                        //console.log(data.data.length);
                        var sum=0;
                        for(var i=0;i<data.data.length;i++){
                            if (data.data[i].status == "——" || data.data[i].status == "进行中"){
                                sum +=1;
                            }
                        }
                        if (sum>2){
                            operateMessage = "当前有两个项目未结题，无法申报新项目";
                            alertUtil.info(operateMessage);
                            var url = "/scientificProject/topicManagement";
                            orange.redirect(url);
                        }
                    },false,"","get");

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
