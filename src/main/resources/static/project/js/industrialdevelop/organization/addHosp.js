(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','selectUtil','fileUtil','uploadImg','distpicker','urlUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,selectUtil,fileUtil,uploadImg,distpicker,urlUtil) {


            /*全局变量*/
            var tempdata;

            var updateStatus = isUpdate();
            var jumpUrl = "/userLogin";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var hospitalLevel = dictUtil.getDictByCode(dictUtil.DICT_LIST.hospitalLevel)
            var specialtyName = dictUtil.getDictByCode(dictUtil.DICT_LIST.dept)
            const editor = objectUtil.wangEditorUtil();

            /*设置下拉框的值*/
            $("#hospitalLevel").selectUtil(hospitalLevel);
            /*重点专科操作*/
            $("#specialtyName").selectUtil(specialtyName);
            $("#add").unbind().on("click",function () {
                var str = $("#hospitalKeySpecialty").val();
                if (str.length === 0){
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
                ajaxUtil.myAjax(null,"/user/deletuser",userdto,function (data) {

                },false,true);
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
                entity["hospitalStatus"] = webStatus[1].id


                fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        window.location.href = jumpUrl;
                        // orange.redirect(jumpUrl);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
            });

            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1 || urlUtil.getFullUrl().indexOf("/main?") != -1)
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
                    $("#hospitalAddressCountry").val(tempdata.hospitalAddressCountry);
                    $(".w-e-text").html(tempdata.hospitalIntroduce);
                }else {
                    localStorage.removeItem("rowData");
                    $("#distpicker").distpicker();//新增页面使用
                }
                init = function () {

                }
            };
            uploadImg.init();
            init();


        });
})();
