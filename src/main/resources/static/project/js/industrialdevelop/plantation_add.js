(function () {
    require(['jquery','ajaxUtil','stringUtil','uploadImg','wangEditor'],
        function ($,ajaxUtil,stringUtil,uploadImg, wangEditor) {

            var url = "/industrialdevelop/chi-med";

            var pathUrl = "/industrialdevelop/plantation";

            var itemcode = stringUtil.getUUID();

            var type = isUpdate() ? "put":"post";

            uploadImg.init();

            const editor = new wangEditor('#div1');
            // 或者 const editor = new E( document.getElementById('div1') )
            //菜单配置
            editor.config.menus = [
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'foreColor',
                'backColor',
                'link',
                'list',
                'justify',
                'image',
                'table',
                'splitLine',
                'undo',
                'redo'
            ];
            //取消粘贴后的样式
            editor.config.pasteFilterStyle = false;
            //不粘贴图片
            editor.config.pasteIgnoreImg = true;
            //隐藏上传网络图片
            editor.config.showLinkImg = false;
            editor.config.uploadImgShowBase64 = true;
            editor.create();
            editor.txt.html('<p></p>');

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text();
                var str;
                if(textNUm.length>=100000){
                    str = textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                 //将替换的值赋值给当前对象
                }
            });

            $("#cancelBtn").click(function () {
                orange.redirect(pathUrl)
            });

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
                param.intruduce = $(".w-e-text").html();
                return param;
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "——";
                param.itemcode = itemcode;
                if (uploadImg.isUpdate()){
                    ajaxUtil.fileAjax(itemcode,uploadImg.getFiles()[0],"undefined","undefined")
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
                param.status = "——";
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(pathUrl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#plantType").val(tempdata.plantType);
                    $("#areaCoverd").val(tempdata.areaCoverd);
                    $("#contacts").val(tempdata.contacts);
                    $("#addressPro").val(tempdata.addressPro);
                    $("#addressCity").val(tempdata.addressCity);
                    $("#addressCountry").val(tempdata.addressCity);
                    $("#address").val(tempdata.address);
                    $("#phone").val(tempdata.phone);
                    $(".w-e-text").html(tempdata.intruduce);
                    itemcode = tempdata.itemcode
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
    })
})();


