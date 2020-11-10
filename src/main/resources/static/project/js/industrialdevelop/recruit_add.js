(function () {
    require(['jquery','ajaxUtil','wangEditor'],
        function (jquery,ajaxUtil, wangEditor) {

            var type = isUpdate() ? "put":"post";

            //请求url
            var url = "/industrialdevelop/talrec";

            //上一层url
            var purl = "/industrialdevelop/recruit";

            const editor = new wangEditor('#div1');

            const editor2 = new wangEditor('#div2');
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
                'redo',

            ];
            //取消粘贴后的样式
            editor.config.pasteFilterStyle = false
            //不粘贴图片
            editor.config.pasteIgnoreImg = true
            //隐藏上传网络图片
            editor.config.showLinkImg = false
            editor.config.uploadImgShowBase64 = true
            editor.create();
            editor.txt.html('<p></p>');

            editor2.config = editor.config
            editor2.create();
            editor2.txt.html('<p></p>')

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text();
                var str;
                if(textNUm.length>=100000){
                    str=textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });

            $("#div2").on("input propertychange", function() {
                var textNUm=editor.txt.text();
                var str;
                if (textNUm.length >= 100000) {
                    str = textNUm.substring(0, 10000) + "";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });

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
                param.orgCode = "未定义";
                return param;
            }

            $("#saveBtn").unbind().on('click',function () {
                var param = generateParam();
                param.status = "——";

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(purl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            })

            $("#submitBtn").unbind().on('click',function () {
                var param = generateParam();
                param.status = "——";
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(purl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            })

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#recruitmentTitle").val(tempdata.recruitmentTitle);
                    $("#recruitmentPosition").val(tempdata.recruitmentPosition);
                    $("#recruitmentCount").val(tempdata.recruitmentCount);
                    $("#workplace").val(tempdata.workplace);
                    $("#education").val(tempdata.education);
                    $("#emali").val(tempdata.emali);
                    $("#div1 .w-e-text").html(tempdata.postDuty);
                    $("#div2 .w-e-text").html(tempdata.postDescr)
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
    })
})();


