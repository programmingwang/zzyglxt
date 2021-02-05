(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','urlUtil','objectUtil',"distpicker",'alertUtil'],
        function ($,ajaxUtil,stringUtil,uploadImg,urlUtil, objectUtil,distpicker,alertUtil) {

            var url = "/industrialdevelop/chi-med";

            var pathUrl = "/userLogin";

            var orgType = 'sale'

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                var username = sessionStorage.getItem("username");
                var orgName = sessionStorage.getItem("orgName");
                var orgCode = sessionStorage.getItem("orgCode");
                var userdto = {
                    "username": username,
                    "orgName": orgName,
                    "orgCode": orgCode
                }
                ajaxUtil.myAjax(null,"/user/deletuser",userdto,function (data) {

                },false,true);
                window.history.back()
            });

            function generateParam(){
                var param = {};
                param.name = $("#name").val();
                param.salesCategory = $("#salesCategory").val();
                param.sellingDrugs = $("#sellingDrugs").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val();
                param.addressCity = $("#addressCity").val();
                param.addressCountry = $("#addressCountry").val();
                param.address = $("#address").val();
                param.intruduce = $(".w-e-text").html();
                param.type = orgType;
                param.itemcode = itemcode;
                param.orgCode = sessionStorage.getItem("orgCode");
                return param;
            }

            $("#submitBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "1";

                if (!stringUtil.isBlank(param.name) && !stringUtil.isBlank(param.salesCategory) && !stringUtil.isBlank(param.sellingDrugs) &&
                    !stringUtil.isBlank(param.contacts) && !stringUtil.isBlank(param.phone) && !stringUtil.isBlank(param.addressPro) &&
                    !stringUtil.isBlank(param.addressCity) && !stringUtil.isBlank(param.addressCountry) && !stringUtil.isBlank(param.address)
                    && !stringUtil.isBlank($.trim($(".w-e-text").text()))) {

                    ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],sessionStorage.getItem("username"), sessionStorage.getItem("username"))

                    ajaxUtil.myAjax(null,url,param,function (data) {
                        if(ajaxUtil.success(data)){
                            window.location.href = pathUrl;
                            // orange.redirect(pathUrl)
                        }else {
                            alert(data.msg)
                        }
                    },true,"123",type);
                } else {
                    alertUtil.error('输入不能为空')
                }

                return false;
            });

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#salesCategory").val(tempdata.salesCategory);
                    $("#sellingDrugs").val(tempdata.sellingDrugs);
                    $("#contacts").val(tempdata.contacts);
                    $("#distpicker").distpicker({
                        province: tempdata.addressPro,
                        city: tempdata.addressCity,
                        district: tempdata.addressCountry
                    });
                    $("#address").val(tempdata.address);
                    $("#phone").val(tempdata.phone);
                    editor.txt.html(tempdata.intruduce);
                    itemcode = tempdata.itemcode
                    uploadImg.setImgSrc(tempdata.filePath)
                }else {
                    $("#name").val(sessionStorage.getItem('orgName'));
                    $("#phone").val(sessionStorage.getItem('phone'));
                    $("#distpicker").distpicker();
                }
                init = function () {

                }
            };
            init();


            function isUpdate() {
                return (urlUtil.getFullUrl().indexOf("/main#") != -1)
            }

        })
})();


