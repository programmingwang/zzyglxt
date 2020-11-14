(function () {
    require(['jquery','ajaxUtil','stringUtil','wangEditor'],
        function (jquery,ajaxUtil,stringUtil, wangEditor) {

            var url = "/industrialdevelop/ser-pro";

            var pathUrl = "/industrialdevelop/tecservice"

            var type = isUpdate() ? "put":"post";

            var itemcode = stringUtil.getUUID();

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
                param.serviceProject = $("#serviceProject").val();
                param.projectCost = $("#projectCost").val();
                param.contacts = $("#contacts").val();
                param.phone = $("#phone").val();
                param.projectIntroduce = $(".w-e-text").html();
                param.orgCode = "未定义";
                param.itemcode = itemcode;
                return param;
            }

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
                    $("#serviceProject").val(tempdata.serviceProject);
                    $("#projectCost").val(tempdata.projectCost);
                    $("#contacts").val(tempdata.contacts);
                    $("#phone").val(tempdata.phone);
                    $(".w-e-text").html(tempdata.projectIntroduce);
                    itemcode = tempdata.itemcode;
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


