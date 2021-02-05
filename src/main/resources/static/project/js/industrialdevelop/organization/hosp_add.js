(function () {
    require(['jquery', 'objectUtil', 'ajaxUtil', 'alertUtil', 'stringUtil', 'dictUtil', 'selectUtil', 'fileUtil', 'uploadImg', 'distpicker', 'urlUtil','modalUtil'],
        function (jquery, objectUtil, ajaxUtil, alertUtil, stringUtil, dictUtil, selectUtil, fileUtil, uploadImg, distpicker, urlUtil,modalUtil) {


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

            function checkParam(param) {
                if (stringUtil.isBlank(param.hospitalName)){
                    alertUtil.error("医院名称不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalLevel)){
                    alertUtil.error("医院等级不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalBriefIntroduce)){
                    alertUtil.error("医院简要介绍不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalKeySpecialty)){
                    alertUtil.error("重点专科不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalTelephone)){
                    alertUtil.error("联系方式不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalAddressPro)){
                    alertUtil.error("省份不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalAddressCity)){
                    alertUtil.error("地市不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalAddressCountry)){
                    alertUtil.error("县/区不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalAddress)){
                    alertUtil.error("详细地址不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalLink)){
                    alertUtil.error("链接地址不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.hospitalIntroduce)){
                    alertUtil.error("简介不能为空")
                    return false
                }
                return true
            }

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
                var submitModalData = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提示",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var entity = {};
                        var requestUrl;
                        var operateMessage;
                        requestUrl = "/industrialDevelop/hosp_update";
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

                        if (!checkParam(entity)){
                            return
                        }
                        fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null, requestUrl, entity, function (data) {
                            if (ajaxUtil.success(data)) {

                            } else {
                                alertUtil.alert(data.msg);
                            }
                        }, false, true);

                        submitModal.hide()
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                submitConfirm.hide()
                                orange.redirect(jumpUrl)
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal)
                        submitConfirm.show()

                    }
                }
                var submitModal = modalUtil.init(submitModalData)
                submitModal.show()


                return false;
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
                $("input").attr("required","required")
            };
            uploadImg.init();
            init();


        });
})();
