(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'objectUtil', 'distpicker', 'urlUtil','modalUtil','alertUtil'],
        function ($, ajaxUtil, stringUtil, uploadImg, objectUtil, distpicker, urlUtil,modalUtil,alertUtil) {

            var url = "/industrialdevelop/tec-ser-org/selectbyorgcode";

            var opurl = "/industrialdevelop/tec-ser-org";

            var pathUrl = "/serviceItems/tecserviceorg_msg";

            var itemcode = stringUtil.getUUID();

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam() {
                var param = {};
                param.name = $("#name").val();
                param.projectName = $("#projectName").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val();
                param.addressCity = $("#addressCity").val();
                param.addressCountry = $("#addressCountry").val();
                param.address = $("#address").val();
                param.intruduce = editor.txt.html();
                param.itemcode = itemcode;
                return param;
            }

            function checkParam(param) {
                if (stringUtil.isBlank(param.name)){
                    alertUtil.error("企业名称不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.projectName)){
                    alertUtil.error("服务项目不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.contacts)){
                    alertUtil.error("联系人不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.phone)){
                    alertUtil.error("联系方式不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.addressPro)){
                    alertUtil.error("省份不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.addressCity)){
                    alertUtil.error("地市不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.addressCountry)){
                    alertUtil.error("县/区不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.address)){
                    alertUtil.error("详细地址不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.intruduce)){
                    alertUtil.error("简介不能为空")
                    return false
                }
                return true
            }

            $("#saveBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.status = 1;
                if (uploadImg.isUpdate()){
                    if (isUpdate()){
                        ajaxUtil.updateFile(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                    }else {
                        ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                    }
                }
                ajaxUtil.myAjax(null, opurl, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(pathUrl);
                    } else {
                        alert(data.msg);
                    }
                }, true, "123", "put");
                return false;
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var submitModalData = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提示",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var param = generateParam();
                        param.status = 1;
                        if (!checkParam(param)){
                            return
                        }
                        if (uploadImg.isUpdate()){
                            if (isUpdate()){
                                ajaxUtil.updateFile(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                            }else {
                                ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                            }
                        }
                        ajaxUtil.myAjax(null, opurl, param, function (data) {
                            if (ajaxUtil.success(data)) {
                                orange.redirect(pathUrl)
                            } else {
                                alert(data.msg)
                            }
                        }, true, "123", "put");

                        submitModal.hide()
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                submitConfirm.hide()
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

            var init = function () {
                ajaxUtil.myAjax(null,url,null,function (data) {
                    if(ajaxUtil.success(data)) {
                        var tempdata = data.data;
                        $("#name").val(tempdata.name);
                        $("#projectName").val(tempdata.projectName);
                        $("#contacts").val(tempdata.contacts);
                        $("#phone").val(tempdata.phone);
                        $("#distpicker").distpicker({
                            province: tempdata.addressPro,
                            city: tempdata.addressCity,
                            district: tempdata.addressCountry
                        });
                        $("#address").val(tempdata.address);
                        $(".w-e-text").html(tempdata.intruduce);
                        itemcode = tempdata.itemcode;
                        uploadImg.setImgSrc(tempdata.filePath)
                    }else{
                        alertUtil.error(data.msg)
                    }
                },null,"123","get")
                $("input").attr("required","required")
            };
            init();

            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1 || urlUtil.getFullUrl().indexOf("/main?") != -1)
            }
        })
})();
