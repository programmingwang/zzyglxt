(function() {
    define('objectUtil', ['jquery','wangEditor'], function(jquery,wangEditor) {



        //所要判段的字符串为空
        function strIsBlank(str) {
            if(str != "" && str != null && str != "undefined") {
                return false;
            } else {
                return true;
            }
        }

        //判断对象为空对象
        function isEmptyObject(obj){
            for(var key in obj){
                return false;
            };
            return true
        };
        
        function wangEditorUtil() {
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
            //设置上传的参数名
            editor.config.uploadFileName = 'file';
            // 上传图片到服务器
            editor.config.uploadImgServer = 'http://localhost:8989/uploadFile '
            // 将图片大小限制为 10M
            editor.config.uploadImgMaxSize = 10 * 1024 * 1024;
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

            return editor;
        }

        return {
            strIsBlank:strIsBlank,
            isEmptyObject:isEmptyObject,
            wangEditorUtil : wangEditorUtil,
        }
    })
})();