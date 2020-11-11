(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','fileUtil'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,fileUtil) {
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

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text()
                if(textNUm.length>=100000){
                    str=textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });

            $("#cancel").unbind().on('click',function () {
                var url = "/healthCare/healthcarefamPre";
                orange.redirect(url);
            });

            $("#btn_insert").unbind().on('click',function () {
                var careFamEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "inserthealthcarefampredo";
                    operateMessage = "新增国医话健康成功";
                    careFamEntity = {
                        itemcode: stringUtil.getUUID(),
                        name : $("#name").val(),
                        source : $("#source").val(),
                        author : $("#author").val(),
                        content : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatehealthcarefampredo";
                    careFamEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        name : $("#name").val(),
                        source : $("#source").val(),
                        author : $("#author").val(),
                        content : editor.txt.html()
                    }
                    operateMessage = "更新国医话健康成功";
                }
                fileUtil.handleFile(isUpdate(), careFamEntity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,addUpdateUrl,careFamEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/healthCare/healthcarefamPre";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });
            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#name").val(tempdata.name);
                    $("#source").val(tempdata.source);
                    $("#author").val(tempdata.author);
                    editor.txt.html(tempdata.content);
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();