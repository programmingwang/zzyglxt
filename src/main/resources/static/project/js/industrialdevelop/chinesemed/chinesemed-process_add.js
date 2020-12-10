(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg','urlUtil',"distpicker"],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg,urlUtil,distpicker) {

            var url = "/industrialdevelop/chi-med";
            var pathUrl = "/industrialdevelop/medMat/medMat"
            var orgType = "process";
            var type = isUpdate() ? "put" : "post";
            var status = dictUtil.getDictByCode(dictUtil.DICT_LIST.projectStatus);
            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();

            function generateParam() {
                var param = {};
                param.name = $("#name").val();
                param.areaCoverd = $("#areaCoverd").val();
                param.processingType = $("#processingType").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val();
                param.addressCity = $("#addressCity").val();
                param.addressCountry = $("#addressCountry").val();
                param.address = $("#address").val();
                param.intruduce = editor.txt.html()
                param.type = orgType;
                return param;
            }

            function updateData(btnType){
                var operateMessage;
                var param = generateParam();
                if ("save".equals(btnType)){
                    param.status = status[0].id;
                    operateMessage = "保存信息成功";
                }
                else if ("submit".equals(btnType)){
                    param.status = status[1].id;
                    operateMessage = "提交信息成功";
                }

                fileUtil.handleFile(isUpdate(), param.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        alertUtil.info(operateMessage);
                        orange.redirect(pathUrl);
                    } else {
                        alert(data.msg);
                    }
                }, true, "123", type);
            }
            $("#cancelBtn").unbind('click').on('click',function () {
                orange.redirect(pathUrl)
            })

            $("#saveBtn").unbind('click').on('click', function () {
                updateData("save");
            });

            $("#submitBtn").unbind('click').on('click', function () {
                updateData("submit")
            });

            var init = function () {
                if (isUpdate()) {
                    var needData;
                    ajaxUtil.myAjax(null,url + "/getByOrgCode",null,function (data) {
                        console.log(data);
                        if(ajaxUtil.success(data)){
                            needData = data.data;
                        }
                    },false,true,"get");
                    $("#name").val(needData.name);
                    $("#areaCoverd").val(needData.areaCoverd);
                    $("#processingType").val(needData.processingType);
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


