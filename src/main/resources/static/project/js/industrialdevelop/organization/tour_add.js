//旅游康养机构录入界面
(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','objectUtil','distpicker','alertUtil','urlUtil'],
        function ($,ajaxUtil,stringUtil,uploadImg, objectUtil, distpicker, alertUtil,urlUtil) {

            var url = "/industrialdevelop/tec-ser-org/selectbyorgcode";

            var pathUrl = "/industrialdevelop/style";

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = objectUtil.wangEditorUtil();

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

            function generateParam(){
                var param = {};
                param.name = $("#name").val();
                param.areaCoverd = $("#areaCoverd").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.addressPro = $("#addressPro").val()
                param.addressCity = $("#addressCity").val()
                param.addressCountry = $("#addressCountry").val()
                param.address = $("#address").val()
                param.intruduce = editor.txt.html();
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
                param.type = "tour"
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
                    var tempdata;
                    ajaxUtil.myAjax(null, url, null,function (data) {
                        if(data && data.code == ajaxUtil.successCode) {
                            tempdata = data.data
                        }else{
                            alertUtil.error(data.msg)
                        }
                    },false,"","get");
                    $("#name").val(tempdata.name);
                    $("#areaCoverd").val(tempdata.areaCoverd);
                    $("#specialService").val(tempdata.specialService);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $("#distpicker").distpicker({
                        province: tempdata.addressPro,
                        city: tempdata.addressCity,
                        district: tempdata.addressCountry
                    });
                    $("#address").val(tempdata.address);
                    editor.txt.html(tempdata.intruduce);
                    itemcode = tempdata.itemcode;
                    var img = tempdata.filePath;
                    // var imgName=tempdata.fileName;
                    uploadImg.setImgSrc(img);
                }else {
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


