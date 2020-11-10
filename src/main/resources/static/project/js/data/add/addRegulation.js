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
            editor.txt.html('<p></p>')

            $("#div1").on("input propertychange", function() {
                var textNUm=editor.txt.text()
                if(textNUm.length>=100000){
                    str=textNUm.substring(0,10000)+"";  //使用字符串截取，获取前30个字符，多余的字符使用“......”代替
                    editor.txt.html(str);
                    alert("字数不能超过10000");                  //将替换的值赋值给当前对象
                }
            });

            $("#cancelbtn").unbind().on('click',function () {
                $("#main_body").html("");
                var url = "/data/dataRegulation";
                orange.loadPage({url: url, target: 'main_body', selector: '#fir_body', success: function(data){
                        if(data == null||data == ""){
                            return alertUtil.error( url+'加载失败');
                        }
                        $("#main_body").html(data);
                    }})
            });

            $("#submitbtn").unbind().on('click',function () {
                var regulationEntity = {
                    itemcode: stringUtil.getUUID(),
                    dataTitle : $("#dataTitle").val(),
                    dataSource : $("#dataSource").val(),
                    dataFileType : $("#dataFileType").val(),
                    dataContent : editor.txt.html()
                };

                var formData = new FormData();
                formData.append("dataCode",regulationEntity.itemcode);
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
                            alertUtil.success("上传附件成功");
                        }else{
                            alertUtil.error(data.msg)
                        }
                    },
                    error: function(data){
                        alertUtil.error(data.msg)
                    }
                });


                ajaxUtil.myAjax(null,"/datado/regulation/insertRegulation",regulationEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info("新增政策法规成功");
                        var url = "/data/dataRegulation";
                        orange.loadPage({url: url, target: 'main_body', selector: '#fir_body', success: function(data){
                                if(data == null||data == ""){
                                    return alertUtil.error( url+'加载失败');
                                }
                                $("#main_body").html(data);
                            }})
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });

        })
})();
