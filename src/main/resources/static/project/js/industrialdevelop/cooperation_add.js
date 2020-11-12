(function () {
    require(['jquery','ajaxUtil','wangEditor'],
        function (jquery,ajaxUtil, wangEditor) {

            var url = "/industrialdevelop/coorecord";

            var pathUrl = "/industrialdevelop/cooperation"

            var type = isUpdate() ? "put":"post";

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
                param.cooperationExchangeName = $("#cooperationExchangeName").val();
                param.cooperativeOrg = $("#cooperativeOrg").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.projectIntroduce = $(".w-e-text").html();
                param.orgCode = "未定义";
                return param;
            }

            $("#upload_file").change(function () {
                var file = $("#upload_file")[0].files[0];
                var file_span = $("#filename_span");
                file_span.text(file.name)
            });

            $("#saveBtn").unbind('click').on('click',function () {
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
            })

            var init = function () {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#cooperationExchangeName").val(tempdata.cooperationExchangeName);
                    $("#cooperativeOrg").val(tempdata.cooperativeOrg);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $(".w-e-text").html(tempdata.projectIntroduce);
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


