(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil) {
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
                var url = "/chineseCultural/travel/travel";
                orange.redirect(url);
            });


            $("#btn_insert").unbind().on('click',function () {
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/trav/trav/addTrav";
                    operateMessage = "新增旅游景点成功";
                }else{
                    addUpdateUrl = "/cul/trav/trav/updTrav";
                    operateMessage = "更新旅游景点成功";
                }
                var travelEntity = {
                    itemcode: stringUtil.getUUID(),
                    chineseCulturalName : $("#chineseCulturalName").val(),
                    chineseCulturalSource : $("#chineseCulturalSource").val(),
                    chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                    chineseCulturalContent : editor.txt.html()
                };

                var formData = new FormData();
                formData.append("dataCode",travelEntity.itemcode);
                formData.append("file",$("#upload_file")[0].files[0]);
                formData.append("itemcode",stringUtil.getUUID());
                formData.append("uploader","admin");
                formData.append("uploaderCode","qweqwqwewasdasd");
                $.ajax({
                    url:"/file/upload",
                    type:'POST',
                    data: formData,
                    processData: false,   // jQuery不要去处理发送的数据
                    contentType: false,   // jQuery不要去设置Content-Type请求头
                    success:function(data){
                        if(data.code === 88888){
                            alertUtil.success("上传图片成功");
                        }else{
                            alertUtil.error(data.msg)
                        }
                    },
                    error: function(data){
                        alertUtil.error(data.msg)
                    }
                });


                ajaxUtil.myAjax(null,addUpdateUrl,travelEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/chineseCultural/travel/travel";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });


            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalName").val(tempdata.chineseCulturalName);
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    var filePath = tempdata.filePath;
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();
