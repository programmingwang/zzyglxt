(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','uploadImg'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,uploadImg) {
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
            editor.txt.html('<p></p>')

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text()
                if(textNUm.length>=100000){
                    str=textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });

            /*下拉框值*/
            $("#dataLocation").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dataLocation));

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/data/dataNewsRotations";
                orange.redirect(url);
            });

            $("#submitbtn").unbind().on('click',function () {
                var newsRotationsEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/datado/newsInf/insertNewsInf";
                    newsRotationsEntity = {
                        itemcode: stringUtil.getUUID(),
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataContent : editor.txt.html(),
                        dataLocation : $("#dataLocation").val(),
                    };
                    operateMessage = "新增新闻轮播图成功";
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/datado/newsInf/updateNewsInf";
                    newsRotationsEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        dataTitle : $("#dataTitle").val(),
                        dataSource : $("#dataSource").val(),
                        dataAuthor : $("#dataAuthor").val(),
                        dataContent : editor.txt.html(),
                        dataLocation : $("#dataLocation").val(),
                    };
                    operateMessage = "更新新闻轮播图成功";
                }

                fileUtil.handleFile(isUpdate(), newsRotationsEntity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,newsRotationsEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/data/dataNewsRotations";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataSource").val(tempdata.dataSource);
                    $("#dataAuthor").val(tempdata.dataAuthor);
                    editor.txt.html(tempdata.dataContent);
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);
                    $("#dataLocation option[value="+tempdata.dataLocation+"] ").attr("selected",true);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

            uploadImg.init();

        })
})();



