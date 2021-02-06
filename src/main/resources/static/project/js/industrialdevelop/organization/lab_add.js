(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','objectUtil','distpicker','urlUtil','modalUtil','alertUtil'],
        function ($,ajaxUtil,stringUtil,uploadImg, objectUtil, distpicker, urlUtil,modalUtil,alertUtil) {

            var url = "/industrialdevelop/tec-ser-org/selectbyorgcode";
            var opUrl = "/industrialdevelop/tec-ser-org";

            var pathUrl = "/industrialdevelop/organization/lab_add";

            var itemcode = stringUtil.getUUID();

            var orgType = "lab";

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam(){
                var param = {};
                param.name = $("#name").val();
                param.projectCost = $("#projectCost").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val();
                param.addressCity = $("#addressCity").val();
                param.addressCountry = $("#addressCountry").val();
                param.address = $("#address").val()
                param.intruduce = $(".w-e-text").html();
                param.orgCode = sessionStorage.getItem("orgCode");
                param.onlineAddress = $("#onlineAddress").val()
                param.itemcode = itemcode;
                param.type = orgType;
                return param;
            }

            function checkParam(param) {
                if (stringUtil.isBlank(param.name)){
                    alertUtil.error("院所名称不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.onlineAddress)){
                    alertUtil.error("连接地址不能为空")
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

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "0";
                param.type = "lab";
                if (uploadImg.isUpdate()){
                    ajaxUtil.updateFile(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                }

                ajaxUtil.myAjax(null,opUrl,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl);
                    }else {
                        alert(data.msg);
                    }
                },true,"123",type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click',function () {
                var submitModalData = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提示",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var param = generateParam();
                        param.status = "1";
                        param.type = "lab";
                        if (!checkParam(param)){
                            return
                        }
                        if (uploadImg.isUpdate()){
                            ajaxUtil.updateFile(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                        }
                        ajaxUtil.myAjax(null,opUrl,param,function (data) {
                            if(ajaxUtil.success(data)){

                            }else {
                                alert(data.msg)
                            }
                        },true,"123",type);

                        submitModal.hide()
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                submitConfirm.hide()
                                orange.redirect(pathUrl)
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
                if (isUpdate()){
                    var tempdata;
                    ajaxUtil.myAjax(null, url, null,function (data) {
                        if(data && data.code == ajaxUtil.successCode) {
                            tempdata = data.data
                        }else{
                            alertUtil.error(data.msg)
                        }
                    },false,"","get");
                    $("#name").val(tempdata.name);
                    $("#projectCost").val(tempdata.projectCost);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $("#onlineAddress").val(tempdata.onlineAddress)
                    $("#distpicker").distpicker({
                        province: tempdata.addressPro,
                        city: tempdata.addressCity,
                        district: tempdata.addressCountry
                    });
                    $("#address").val(tempdata.address);
                    editor.txt.html(tempdata.intruduce);
                    uploadImg.setImgSrc(tempdata.filePath)
                    itemcode = tempdata.itemcode;
                }else {
                    $("#distpicker").distpicker();
                }
                init = function () {

                }
            };
            init();


            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1 || urlUtil.getFullUrl().indexOf("/main?") != -1)
            }
    })
})();


