(function () {
    require(['jquery','wangEditor'],
        function (jquery,wangEditor) {
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
            /*
     上传图片
     */
            function getObjectURL(file) {
                var url = null ;
                if (window.createObjectURL!=undefined) { // basic
                    url = window.createObjectURL(file) ;
                } else if (window.URL!=undefined) { // mozilla(firefox)
                    url = window.URL.createObjectURL(file) ;
                } else if (window.webkitURL!=undefined) { // webkit or chrome
                    url = window.webkitURL.createObjectURL(file) ;
                }

                return url ;
            };
            document.getElementById('aImg').onchange = function() {
                $("#upimg").css("display","none");
                var strsrc=getObjectURL(this.files[0]);
                var imgSize = this.files[0].size;  //b
                if(imgSize>1024*1024*1){//1M
                    return alert("上传图片不能超过1M");
                }
                if(this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg' && this.files[0].type != 'image/gif'){
                    return alert("图片上传格式不正确");
                }
                //console.log(strsrc);
                $("#img1").attr("src",strsrc);
                $("#img1").css("display","block");
                if(strsrc!=null){
                    $("#clsbtn").css("display","block")
                }
            }
            document.getElementById('clsbtn').onclick = function() {

                $("#upimg").css("display","block");
                var strsrc=null;
                //console.log(strsrc);
                $("#img1").attr("src",strsrc);
                $("#img1").css("display","none");
                $("#clsbtn").css("display","none")
            }
            /*
            上传文件
            */
            document.getElementById('upfile').onchange=function(){
                var len=this.files.length;
                $("#addFile").empty("p");
                for (var i = 0; i < len; i++) {
                    var name = this.files[i].name;
                    var j=i+1;
                    $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                    console.log(name);
                };
                if(len>0){
                    $("#clsfile").css("display","block")
                }
            }
            document.getElementById('clsfile').onclick = function() {
                var obj = document.getElementById('upfile');
                obj.outerHTML=obj.outerHTML;
                $("#clsfile").css("display","none");
                $("#addFile").empty("p");
            }
        })
})();
