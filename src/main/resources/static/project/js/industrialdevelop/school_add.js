(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','objectUtil',"distpicker"],
        function ($,ajaxUtil,stringUtil,uploadImg, objectUtil,distpicker) {

            var url = "/industrialdevelop/school";

            var pathUrl = "/industrialdevelop/school";

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam(){
                var param = {};
                param.schoolName = $("#schoolName").val();
                param.schoolIntroduce = $("#schoolIntroduce").val();
                param.secondaryCollege = $("#secondaryCollege").val();
                param.enrollmentMajor = $("#enrollmentMajor").val();
                param.graduateEnrollmentMajor = $("#graduateEnrollmentMajor").val();
                param.phone = $("#phone").val();
                param.onlineAddress = $("#onlineAddress").val();
                param.addressPro = $("#addressPro").val()
                param.addressCity = $("#addressCity").val()
                param.addressCountry = $("#addressCountry").val()
                param.address = $("#address").val()
                param.schoolText = $(".w-e-text").html();
                return param;
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "0";
                param.itemcode = itemcode;
                if (uploadImg.isUpdate()){
                    ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"))
                }

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl);
                    }else {
                        alert(data.msg);
                    }
                },true,"123",type);
                return false;
            });

            $("#submitBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "1";
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#schoolName").val(tempdata.schoolName);
                    $("#schoolIntroduce").val(tempdata.schoolIntroduce);
                    $("#secondaryCollege").val(tempdata.secondaryCollege);
                    $("#enrollmentMajor").val(tempdata.enrollmentMajor);
                    $("#distpicker").distpicker({
                        province: tempdata.addressPro,
                        city: tempdata.addressCity,
                        district: tempdata.addressCountry
                    });
                    $("#address").val(tempdata.address);
                    $("#graduateEnrollmentMajor").val(tempdata.graduateEnrollmentMajor);
                    $("#phone").val(tempdata.phone);
                    $("#onlineAddress").val(tempdata.onlineAddress);
                    $("#intruduce").val(tempdata.intruduce)
                    $(".w-e-text").html(tempdata.schoolText);
                    itemcode = tempdata.itemcode
                }else {
                    $("#distpicker").distpicker();
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


