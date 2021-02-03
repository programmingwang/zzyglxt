(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg','urlUtil','distpicker','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg,urlUtil,distpicker,modalUtil) {

            var url = "/industrialdevelop/chi-med";
            var orgType = "plant"
            var pathUrl = "/industrialdevelop/chinesemed/plantation_add"
            var type = isUpdate() ? "put" : "post";
            var itemcode;
            var status = dictUtil.getDictByCode(dictUtil.DICT_LIST.projectStatus);
            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            function generateParam(){
                var param = {};
                param.name = $("#name").val();
                param.plantType = $("#plantType").val();
                param.areaCoverd = $("#areaCoverd").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val()
                param.addressCity = $("#addressCity").val()
                param.addressCountry = $("#addressCountry").val()
                param.address = $("#address").val()
                param.intruduce = editor.txt.html()
                param.itemcode = itemcode
                param.type = orgType
                return param;
            }


            function updateData(btnType){
                var submitModalData = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提示",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var operateMessage;
                        var param = generateParam();
                        if ("save" === btnType){
                            param.status = status[0].id;
                        }
                        else if ("submit" === btnType){
                            param.status = status[1].id;
                        }

                        fileUtil.handleFile(isUpdate(), param.itemcode, uploadImg.getFiles()[0]);

                        ajaxUtil.myAjax(null, url, param, function (data) {
                            if (ajaxUtil.success(data)) {

                            } else {
                                alert(data.msg);
                            }
                        }, true, "123", type);

                        submitModal.hide()
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                submitConfirm.hide()
                                orange.redirect(pathUrl);
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
            }

            $("#saveBtn").unbind('click').on('click',function () {
                updateData("save");
            });

            $("#submitBtn").unbind('click').on('click',function () {
                updateData("submit")
            });

            $("#cancelBtn").unbind().on('click',function () {
                orange.redirect(pathUrl)
            })

            var init = function () {
                if (isUpdate()){
                    var needData;
                    ajaxUtil.myAjax(null,url + "/getByOrgCode",null,function (data) {
                        if(ajaxUtil.success(data)){
                            needData = data.data;
                        }
                    },false,true,"get");
                    $("#name").val(needData.name);
                    $("#plantType").val(needData.plantType);
                    $("#areaCoverd").val(needData.areaCoverd);
                    $("#contacts").val(needData.contacts);
                    $("#distpicker").distpicker({
                        province: needData.addressPro,
                        city: needData.addressCity,
                        district: needData.addressCountry
                    });
                    $("#address").val(needData.address);
                    $("#phone").val(needData.phone);
                    editor.txt.html(needData.intruduce);
                    itemcode = needData.itemcode;
                    uploadImg.setImgSrc(needData.filePath)
                }else {
                    $("#distpicker").distpicker({
                        province: "河北省",
                    });//新增页面使用
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


