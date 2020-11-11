(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg) {
            const editor = new wangEditor('#div1')
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

            ]
            //取消粘贴后的样式
            editor.config.pasteFilterStyle = false
            //不粘贴图片
            editor.config.pasteIgnoreImg = true
            //隐藏上传网络图片
            editor.config.showLinkImg = false
            editor.config.uploadImgShowBase64 = true
            editor.create()
            editor.txt.html('')

            uploadImg.init();

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text()
                if(textNUm.length>=100000){
                    str=textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });

            $("#cancel").unbind().on('click',function () {
                $("#main_body").html("");
                var url = "/chineseCultural/production/cartoonAllusions";
                orange.redirect(url);
            });

            $("#btn_insert").unbind().on('click',function () {
                var carAllEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/pro/carAll/addCarAll";
                    operateMessage = "新增漫画典故成功";
                    carAllEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/pro/carAll/updCarAll";
                    carAllEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新漫画典故成功";
                }

                fileUtil.handleFile(isUpdate(), carAllEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,carAllEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == ajaxUtil.successCode) {
                            alertUtil.info(operateMessage);
                            var url = "/chineseCultural/production/cartoonAllusions";
                            orange.redirect(url);
                        }else{
                            alertUtil.error(data.msg);
                        }
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });
            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);

                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
