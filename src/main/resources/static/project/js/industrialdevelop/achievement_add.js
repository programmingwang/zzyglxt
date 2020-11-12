(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'wangEditor'],
        function (jquery, ajaxUtil, stringUtil, wangEditor) {

            var type = isUpdate() ? "put" : "post";

            var itemcode = stringUtil.getUUID();

            //后台数据交互地址
            var url = "/industrialdevelop/achievement";
            //页面请求地址
            var purl = url;

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
                'redo',

            ];
            //取消粘贴后的样式
            editor.config.pasteFilterStyle = false
            //不粘贴图片
            editor.config.pasteIgnoreImg = true
            //隐藏上传网络图片
            editor.config.showLinkImg = false
            editor.config.uploadImgShowBase64 = true
            editor.create()
            editor.txt.html('<p></p>')

            $("#div1").on("input propertychange", function () {
                var textNUm = editor.txt.text();
                if (textNUm.length >= 100000) {
                    str = textNUm.substring(0, 10000) + "";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });


            $("#cancelBtn").unbind().on('click', function () {
                orange.redirect(purl);
            });

            function generateParam() {
                var param = {};
                param.itemcode = itemcode;
                param.industrialDevelopLeader = $("#industrialDevelopLeader").val();
                param.industrialDevelopName = $("#industrialDevelopName").val();
                param.projectName = $("#projectName").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.context = $(".w-e-text").html();
                param.orgCode = "未定义";
                return param;
            }

            $("#upload_file").change(function () {
                var file = $("#upload_file")[0].files[0];
                var file_span = $("#filename_span");
                file_span.text(file.name)
            });

            $("#saveBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.industrialDevelopStatus = "——";
                var file = $("#upload_file")[0].files[0];

                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        ajaxUtil.fileAjax(itemcode, file, "admin", "aaaaaaa");
                        orange.redirect(url)
                    } else {
                        alert(data.msg)
                    }
                }, true, "123", type);
            });

            $("#submitBtn").unbind('click').on('click', function () {
                var param = generateParam();
                param.industrialDevelopStatus = "——";
                ajaxUtil.myAjax(null, url, param, function (data) {
                    if (ajaxUtil.success(data)) {
                        orange.redirect(url)
                    }
                }, true, "123", type);
                return false;
            });


            var init = function () {
                if (isUpdate()) {
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#industrialDevelopLeader").val(tempdata.industrialDevelopLeader);
                    $("#industrialDevelopName").val(tempdata.industrialDevelopName);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $("#projectName").val(tempdata.projectName);
                    $(".w-e-text").html(tempdata.context);
                    itemcode = tempdata.itemcode
                }
                init = function () {}
            };
            init();


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();


