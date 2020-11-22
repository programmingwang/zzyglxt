(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg) {

            var url = "/industrialdevelop/chi-med";
            var orgType = "plant"
            var type = isUpdate() ? "put" : "post";
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
                param.type = orgType
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

                fileUtil.handleFile(updateStatus, param.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        alertUtil.info(operateMessage);
                        orange.redirect(pathUrl);
                    } else {
                        alert(data.msg);
                    }
                }, true, "123", type);
            }

            $("#saveBtn").unbind('click').on('click',function () {
                updateData("save");
            });

            $("#submitBtn").unbind('click').on('click',function () {
                updateData("submit")
            });

            var init = function () {
                if (isUpdate()){
                    var data;
                    ajaxUtil.myAjax(null,url + "/getByOrgCode",null,function (data) {
                        if(ajaxUtil.success(data)){
                            data = data.data;
                        }
                    },false,true,"get");
                    $("#name").val(data.name);
                    $("#plantType").val(data.plantType);
                    $("#areaCoverd").val(data.areaCoverd);
                    $("#contacts").val(data.contacts);
                    $("#distpicker").distpicker({
                        province: data.addressPro,
                        city: data.addressCity,
                        district: data.addressCountry
                    });
                    $("#address").val(data.address);
                    $("#phone").val(data.phone);
                    $(".w-e-text").html(data.intruduce);
                    itemcode = data.itemcode;
                    uploadImg.setImgSrc(data.filePath)
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
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
    })
})();


