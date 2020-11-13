(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','dictUtil'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,dictUtil) {
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
            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            $("#chineseMedicineType").selectUtil(pl);

            $("#cancel").unbind().on('click',function () {
                $("#main_body").html("");
                var url = "/healthCare/healthcarechineseMedicine";
                orange.redirect(url);
            });

            $("#btn_insert").unbind().on('click',function () {
                var chinesemedicineEntity;
                var addUpdateUrl;
                var operateMessage;
                if(!isUpdate()){
                    addUpdateUrl = "inserthealthcarechinesemedicinedo";
                    operateMessage = "新增中医药成功";
                    chinesemedicineEntity = {
                        itemcode: stringUtil.getUUID(),
                        chineseMedicineName : $("#chineseMedicineName").val(),//中药材名称
                        chineseMedicineAlias : $("#chineseMedicineAlias").val(),//别名
                        chineseMedicineType : $("#chineseMedicineType").val(),//功效分类
                        chineseMedicineHarvesting : $("#chineseMedicineHarvesting").val(),//采制
                        chineseMedicineTaste : $("#chineseMedicineTaste").val(),//性味
                        chineseMedicineMerTro : $("#chineseMedicineMerTro").val(),//归经
                        chineseMedicineEffect : $("#chineseMedicineEffect").val(),//功能主治
                        chineseMedicineUsage :$("#chineseMedicineUsage").val(),//用法用量
                        /*chineseMedicineUsage : editor.txt.html()*/
                    };
                }else{
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    addUpdateUrl = "updatehealthcarechinesemedicinedo";
                    chinesemedicineEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        chineseMedicineName : $("#chineseMedicineName").val(),//中药材名称
                        chineseMedicineAlias : $("#chineseMedicineAlias").val(),//别名
                        chineseMedicineType : $("#chineseMedicineType").val(),//功效分类
                        chineseMedicineHarvesting : $("#chineseMedicineHarvesting").val(),//采制
                        chineseMedicineTaste : $("#chineseMedicineTaste").val(),//性味
                        chineseMedicineMerTro : $("#chineseMedicineMerTro").val(),//归经
                        chineseMedicineEffect : $("#chineseMedicineEffect").val(),//功能主治
                        chineseMedicineUsage :$("#chineseMedicineUsage").val(),//用法用量
                       /* chineseMedicineUsage : editor.txt.html()*/
                    }
                    operateMessage = "更新中医药成功";
                }
                fileUtil.handleFile(isUpdate(), chinesemedicineEntity.itemcode, uploadImg.getFiles()[0]);
                ajaxUtil.myAjax(null,addUpdateUrl,chinesemedicineEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        var url = "/healthCare/healthcarechineseMedicine";
                        orange.redirect(url);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);

            });
            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseMedicineName").val(tempdata.chineseMedicineName);
                    $("#chineseMedicineAlias").val(tempdata.chineseMedicineAlias);
                    $("#chineseMedicineType").val(tempdata.chineseMedicineType);
                    $("#chineseMedicineHarvesting").val(tempdata.chineseMedicineHarvesting);
                    $("#chineseMedicineTaste").val(tempdata.chineseMedicineTaste);
                    $("#chineseMedicineMerTro").val(tempdata.chineseMedicineMerTro);
                    $("#chineseMedicineEffect").val(tempdata.chineseMedicineEffect);
                    $("#chineseMedicineUsage").val(tempdata.chineseMedicineUsage);
                   /* editor.txt.html(tempdata.chineseMedicineUsage);*/
                    var img = tempdata.filePath;
                    $("#upimg").attr("src",img);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
        })
})();