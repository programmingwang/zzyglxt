(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg) {


            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/medicalService/specialty"
            var hosps = {}
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var specialtyName = dictUtil.getDictByCode(dictUtil.DICT_LIST.dept)
            const editor = objectUtil.wangEditorUtil();

            /*设置科室下拉框的值*/
            $("#specialtyName").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dept));

            /*点击返回按钮*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            $("#addHosp").unbind().on('click', function () {
                orange.redirect("/medicalService/add/addHosp");
            })

            /*点击提交按钮*/
            $("#btn_insert").unbind().on('click',function () {
                var hosp;
                var entity;
                var requestUrl;
                var operateMessage;
                /*拿到下拉框所选医院的信息*/
                hosp = hosps.find(function (obj) {return obj.itemcode === $("#hospitalName").val()});
                if (!updateStatus){
                    requestUrl = "/medicalService/specialty/add";
                    operateMessage = "新增科室成功";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                    };
                }
                else {
                    requestUrl = "/medicalService/specialty/update";
                    operateMessage = "更新科室成功";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode
                    };
                }
                entity["specialtyName"] = specialtyName[$("#specialtyName").val()].text;
                entity["specialtyPhone"] = $("#specialtyPhone").val();
                entity["specialtyBriefIntroduce"] = $("#specialtyBriefIntroduce").val();
                entity["specialtyAddressPro"] = hosp.hospitalAddressPro;
                entity["specialtyAddressCity"] = hosp.hospitalAddressCity;
                entity["specialtyAddressCounty"] = hosp.hospitalAddressCountry;
                entity["specialtyAddress"] = hosp.hospitalAddress;
                entity["specialtyLink"] = hosp.hospitalLink;
                entity["specialtyIntroduce"] = editor.txt.html();
                entity["hospitalCode"] = hosp.itemcode;
                entity["hospitalName"] = hosp.hospitalName;
                entity["specialtyStatus"] = webStatus[0].id

                fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        orange.redirect(jumpUrl);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            function isUpdate() {
                return (tempdata != null || tempdata != undefined)
            }

            /*初始化数据*/
            var init = function () {
                ajaxUtil.myAjax(null,"/medicalService/hosp/selectAllHosp",null,function (data) {
                    if(ajaxUtil.success(data)){
                        hosps = data.data
                        var html = "";
                        $.each(hosps,function (i,it) {
                            html = html + '<option value="'+it.itemcode+'">'+it.hospitalName+'</option>';
                        });
                        $("#hospitalName").html("");
                        $("#hospitalName").append(html);
                    }
                },false,true,"get");
                if (hosps.length == 0) {
                    alertUtil.info("医院信息为空，请先添加医院")
                }
                if (updateStatus){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    uploadImg.setImgSrc(tempdata.filePath)
                    $("#specialtyName").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() == tempdata.specialtyName) {
                            $this.attr("selected", true);
                        }
                    });
                    $("#specialtyIntroduce").val(tempdata.specialtyIntroduce);
                    $("#hospitalName  option[value="+tempdata.hospitalCode+"] ").attr("selected",true)

                    $("#specialtyPhone").val(tempdata.specialtyPhone);
                    $(".w-e-text").html(tempdata.specialtyDescribe);
                }
            };
            uploadImg.init();
            init();


        });
})();
