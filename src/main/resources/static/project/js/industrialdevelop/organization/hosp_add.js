(function () {
    require(['jquery', 'objectUtil', 'ajaxUtil', 'alertUtil', 'stringUtil', 'dictUtil', 'selectUtil', 'fileUtil', 'uploadImg', 'distpicker', 'urlUtil'],
        function (jquery, objectUtil, ajaxUtil, alertUtil, stringUtil, dictUtil, selectUtil, fileUtil, uploadImg, distpicker, urlUtil) {


            /*全局变量*/
            var tempdata;

            var updateStatus = isUpdate();
            var jumpUrl = "/industrialdevelop/organization/hosp_add";
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var hospitalLevel = dictUtil.getDictByCode(dictUtil.DICT_LIST.hospitalLevel)
            var specialtyName = dictUtil.getDictByCode(dictUtil.DICT_LIST.dept)
            var itemcode;
            var itemid;
            const editor = objectUtil.wangEditorUtil();

            /*设置下拉框的值*/
            $("#hospitalLevel").selectUtil(hospitalLevel);
            /*重点专科操作*/
            $("#specialtyName").selectUtil(specialtyName);
            $("#add").unbind().on("click", function () {
                var str = $("#hospitalKeySpecialty").val();
                if (str.length === 0) {
                    $("#hospitalKeySpecialty").val(specialtyName[$("#specialtyName").val()].text);
                } else {
                    $("#hospitalKeySpecialty").val($("#hospitalKeySpecialty").val() + " " + specialtyName[$("#specialtyName").val()].text);
                }
                $("#specialtyName option[value=" + $("#specialtyName").val() + "]").remove();
            })
            $("#clear").unbind().on("click", function () {
                $("#hospitalKeySpecialty").val("")
                $("#specialtyName").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dept));
            })
            /*返回按钮处理*/
            $("#cancel").unbind().on('click', function () {
                orange.redirect(jumpUrl)
            });

            /*确认按钮处理*/
            $("#btn_insert").unbind().on('click', function () {
                var entity = {};
                var requestUrl;
                var operateMessage;
                requestUrl = "/medicalService/hosp/update";
                operateMessage = "更新医疗机构成功";
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
                entity["orgCode"] = sessionStorage.getItem("orgCode");
                entity["hospitalIntroduce"] = editor.txt.html()
                entity["hospitalStatus"] = webStatus[1].id
                entity["itemcode"] = itemcode;
                entity["itemid"] = itemid;


                fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null, requestUrl, entity, function (data) {
                    if (ajaxUtil.success(data)) {
                        alertUtil.info(operateMessage);
                        orange.redirect(jumpUrl)
                    } else {
                        alertUtil.alert(data.msg);
                    }
                }, false, true);
            });

            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1 || urlUtil.getFullUrl().indexOf("/main?") != -1)
            }


            /*初始化数据*/
            var init = function () {
                if (updateStatus) {
                    ajaxUtil.myAjax(null, "/medicalService/hosp/selectByOrgCode", null, function (data) {
                        if (data && data.code == ajaxUtil.successCode) {
                            tempdata = data.data
                        } else {
                            alertUtil.error(data.msg)
                        }
                    }, false, "", "get")
                    uploadImg.setImgSrc(tempdata.filePath);
                    itemcode = tempdata.itemcode
                    $("#hospitalName").val(tempdata.hospitalName);
                    $("#hospitalLevel").find("option").each(function (data) {
                        var $this = $(this);
                        if ($this.text() == tempdata.hospitalLevel) {
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
                } else {
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
