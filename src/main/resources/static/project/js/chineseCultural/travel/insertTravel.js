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
                var travelEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "/cul/trav/trav/addTrav";
                    operateMessage = "新增旅游景点成功";
                    travelEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "/cul/trav/trav/updTrav";
                    travelEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseCulturalName : $("#chineseCulturalName").val(),
                        chineseCulturalSource : $("#chineseCulturalSource").val(),
                        chineseCulturalAuthor : $("#chineseCulturalAuthor").val(),
                        chineseCulturalContent : editor.txt.html()
                    }
                    operateMessage = "更新旅游景点成功";
                }
                // 如果当前是新增或者图片没有修改那么就不修改文件了
                // 如果当前是修改并且不是原来的那张图片，那么就修改,并且要删除原来的那一张图片
                if(!isUpdate()){
                    ajaxUtil.fileAjax(travelEntity.itemcode,$("#upload_file")[0].files[0],
                        "admin","qeqweasd");
                }else if(isUpdate() && $("#upload_file")[0].files[0] != null){
                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+travelEntity.itemcode,null,function (data) {
                        if(!ajaxUtil.success(data)){
                            return alertUtil.error("文件删除失败");
                        }
                    },false,"","get");
                    ajaxUtil.fileAjax(travelEntity.itemcode,$("#upload_file")[0].files[0],
                        stringUtil.getUUID(),"admin","qeqweasd");
                }
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
                    $("#chineseCulturalSource").val(tempdata.chineseCulturalSource);
                    $("#chineseCulturalAuthor").val(tempdata.chineseCulturalAuthor);
                    editor.txt.html(tempdata.chineseCulturalContent);
                    var img = tempdata.filePath;
                    // console.log(tempdata);
                    // var imgName=tempdata.fileName;
                    $("#upimg").attr("src",img);
                    // $("#upload_file").attr("value",imgName);

                }
            }());

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

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            };

            document.getElementById('upload_file').onchange = function() {
                var tempdata = JSON.parse(localStorage.getItem("rowData"));
                var firstUrl= tempdata.filePath;
                var strsrc=getObjectURL(this.files[0]);
                var imgSize = this.files[0].size;  //b
                if(imgSize>1024*1024*1){//1M
                    return alert("上传图片不能超过1M");
                }
                if(this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg' && this.files[0].type != 'image/gif'){
                    return alert("图片上传格式不正确");
                }
                //console.log(strsrc);
                $("#upimg").attr("src",strsrc);

                if(strsrc==null){
                    $("#upimg").attr("src",firstUrl);
                }
            }
        })
})();
