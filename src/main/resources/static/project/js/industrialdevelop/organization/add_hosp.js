(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg','selectUtil','distpicker'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg,selectUtil,distpicker) {


            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/userLogin"
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var hospitalLevel = dictUtil.getDictByCode(dictUtil.DICT_LIST.hospitalLevel)
            var specialtyName = dictUtil.getDictByCode(dictUtil.DICT_LIST.dept)
            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            /*设置医院级别下拉框的值*/
            $("#hospitalLevel").selectUtil(hospitalLevel);

            /*重点专科h处理录入*/
            $("#specialtyName").selectUtil(specialtyName);
            $("#add").unbind().on("click",function () {
                var str = $("#hospitalKeySpecialty").val();
                if (str.length == 0){
                    $("#hospitalKeySpecialty").val(specialtyName[$("#specialtyName").val()].text);
                }else {
                    $("#hospitalKeySpecialty").val($("#hospitalKeySpecialty").val() + " " + specialtyName[$("#specialtyName").val()].text);
                }
                $("#specialtyName option[value=" + $("#specialtyName").val() + "]").remove();
            })
            $("#clear").unbind().on("click",function () {
                $("#hospitalKeySpecialty").val("")
                $("#specialtyName").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dept));
            })

            /*返回按钮处理*/
            $("#cancel").unbind().on('click',function () {
                var username = sessionStorage.getItem("username");
                var orgName = sessionStorage.getItem("orgName");
                var userdto = {
                    "username": username,
                    "orgName": orgName
                }
                ajaxUtil.myAjax(null, "/user/deletuser", userdto, function (data) {

                }, false, true);
                window.history.back()
            });

            /*确认按钮处理*/
            $("#btn_insert").unbind().on('click',function () {
                var entity;
                var requestUrl;
                var operateMessage;
                if (!updateStatus){
                    requestUrl = "/industrialDevelop/hosp_add";
                    operateMessage = "新增医疗机构成功";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                        hospitalStatus: '0'
                    };
                }
                entity["hospitalName"] = $("#hospitalName").val();
                entity["hospitalLevel"] = hospitalLevel[$("#specialtyName").val()].text;
                entity["hospitalBriefIntroduce"] = $("#hospitalBriefIntroduce").val();
                entity["hospitalKeySpecialty"] = $("#hospitalKeySpecialty").val();
                entity["hospitalTelephone"] = $("#hospitalTelephone").val();
                entity["hospitalAddressPro"] = $("#hospitalAddressPro").val();
                entity["hospitalAddressCity"] = $("#hospitalAddressCity").val();
                entity["hospitalAddressCountry"] = $("#hospitalAddressCountry").val();
                entity["hospitalAddress"] = $("#hospitalAddress").val();
                entity["hospitalLink"] = $("#hospitalLink").val();
                entity["hospitalIntroduce"] = editor.txt.html()
                entity["username"] = sessionStorage.getItem('username');
                entity["orgCode"] = sessionStorage.getItem('orgCode');

                if (uploadImg.isUpdate()){
                    if (isUpdate()){
                        ajaxUtil.updateFile(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("username"));
                    }else {
                        ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("username"))
                    }

                }

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.success(operateMessage);
                        window.location.href = jumpUrl;
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            function isUpdate() {
                return (tempdata != null || tempdata != undefined)
            }


            /*初始化数据*/
            var  init = function () {
                if (updateStatus){
                    uploadImg.setImgSrc(tempdata.filePath);
                    $("#hospitalName").val(tempdata.hospitalName);
                    $("#hospitalLevel").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() == tempdata.hospitalLevel) {
                            $this.attr("selected", true);
                        }
                    });
                    // $("#hospitalLevel  option[text="+tempdata.hospitalLevel+"] ").attr("selected",true);
                    $("#hospitalBriefIntroduce").val(tempdata.hospitalBriefIntroduce);
                    $("#hospitalKeySpecialty").val(tempdata.hospitalKeySpecialty);
                    $("#hospitalTelephone").val(tempdata.hospitalTelephone);
                    $("#distpicker").distpicker({
                        province: tempdata.hospitalAddressPro,
                        city: tempdata.hospitalAddressCity,
                        district: tempdata.hospitalAddressCountry
                    });
                    $("#hospitalAddress").val(tempdata.hospitalAddress);
                    $("#hospitalLink").val(tempdata.hospitalLink);
                    editor.txt.html(tempdata.hospitalIntroduce);
                }else {
                    $("#hospitalName").val(sessionStorage.getItem('orgName'));
                    $("#hospitalTelephone").val(sessionStorage.getItem('phone'));
                    $("#distpicker").distpicker();//新增页面使用
                }
                init = function () {

                }
            }

            init();


        });
})();


