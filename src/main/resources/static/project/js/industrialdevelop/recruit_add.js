(function () {
    require(['jquery','ajaxUtil','stringUtil','objectUtil','modalUtil','alertUtil'],
        function (jquery,ajaxUtil,stringUtil, objectUtil,modalUtil,alertUtil) {

            var type = isUpdate() ? "put":"post";

            //请求url
            var url = "/industrialdevelop/talrec";

            //上一层url
            var purl = "/industrialdevelop/recruit";

            const editor = objectUtil.wangEditorUtil();

            const editor2 = objectUtil.wangEditorUtil('#div2');

            var itemcode = stringUtil.getUUID();


            $("#cancelBtn").click(function () {
                orange.redirect(purl)
            });

            function generateParam(){
                var param = {};
                param.recruitmentTitle = $("#recruitmentTitle").val();
                param.recruitmentPosition = $("#recruitmentPosition").val();
                param.recruitmentCount = $("#recruitmentCount").val();
                param.salary = $("#salary").val();
                param.workplace = $("#workplace").val();
                param.education = $("#education").val();
                param.emali = $("#emali").val();
                param.postDuty = $("#div1 .w-e-text").html();
                param.postDescr  = $("#div2 .w-e-text").html();
                param.orgCode = sessionStorage.getItem("orgCode");
                param.itemcode = itemcode;
                return param;
            }

            function checkParam(param) {
                if (stringUtil.isBlank(param.recruitmentTitle)){
                    alertUtil.error("招聘标题不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.recruitmentPosition)){
                    alertUtil.error("招聘地点不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.recruitmentCount)){
                    alertUtil.error("招聘数量不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.salary)){
                    alertUtil.error("薪资不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.workplace)){
                    alertUtil.error("工作地点不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.education)){
                    alertUtil.error("学历要求不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.postDuty)){
                    alertUtil.error("岗位职责不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.postDescr)){
                    alertUtil.error("岗位描述不能为空")
                    return false
                }
                if (stringUtil.isBlank(param.emali)){
                    alertUtil.error("联系邮箱不能为空")
                    return false
                }
                return true
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "0";

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(purl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            })

            $("#submitBtn").unbind('click').on('click',function () {
                var submitModalData = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提示",
                    modalClass: "modal-lg",
                    modalConfirmFun: function () {
                        var param = generateParam();
                        param.status = "1";
                        if (!checkParam(param)){
                            return
                        }
                        ajaxUtil.myAjax(null,url,param,function (data) {
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
                                orange.redirect(purl)
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
            })

            var init = function () {
                if (isUpdate()){
                    $(".titleCSS").text("修改招聘信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#recruitmentTitle").val(tempdata.recruitmentTitle);
                    $("#recruitmentPosition").val(tempdata.recruitmentPosition);
                    $("#recruitmentCount").val(tempdata.recruitmentCount);
                    $("#workplace").val(tempdata.workplace);
                    $("#education").val(tempdata.education);
                    $("#emali").val(tempdata.emali);
                    $("#salary").val(tempdata.salary)
                    editor.txt.html(tempdata.postDuty);
                    editor2.txt.html(tempdata.postDescr);
                    itemcode = tempdata.itemcode;
                }
                $("input").attr("required","required")
                init = function () {

                }
            };
            init();


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
    })
})();


