(function () {
    require(['jquery','wangEditor','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg'],
        function (jquery,wangEditor,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg) {
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

            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/medicalService/hosp"

            /*设置下拉框的值*/
            $("#hospitalLevel").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.hospitalLevel));
            /*返回按钮处理*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            /*确认按钮处理*/
            $("#btn_insert").unbind().on('click',function () {
                var entity;
                var requestUrl;
                var operateMessage;
                if (!updateStatus){
                    requestUrl = "/medicalService/hosp/add";
                    operateMessage = "新增医院成功";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                    };
                }
                else {
                    requestUrl = "/medicalService/hosp/update";
                    operateMessage = "更新医院成功";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode
                    };
                }
                entity["hospitalName"] = $("#hospitalName").val();
                entity["hospitalLevel"] = $("#hospitalLevel").val();
                entity["hospitalTelephone"] = $("#hospitalTelephone").val();
                entity["hospitalAddressCity"] = $("#hospitalAddressCity").val();
                entity["hospitalAddressCountry"] = $("#hospitalAddressCountry").val();
                entity["hospitalAddress"] = $("#hospitalAddress").val();
                entity["hospitalLink"] = $("#hospitalLink").val();
                entity["hospitalIntroduce"] = editor.txt.html()

                fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.info(operateMessage);
                        orange.redirect(jumpUrl);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
            });

            function isUpdate() {
                return (tempdata != null || tempdata != undefined)
            }


            /*初始化数据*/
            (function init() {
                uploadImg.init();
                if (updateStatus){
                    $("#hospitalName").val(tempdata.hospitalName);
                    $("#hospitalLevel  option[value="+tempdata.hospitalLevel+"] ").attr("selected",true);
                    uploadImg.setImgSrc(tempdata.filePath)
                    $("#hospitalTelephone").val(tempdata.hospitalTelephone);
                    $("#hospitalAddressCity  option[value="+tempdata.hospitalAddressCity+"] ").attr("selected",true);
                    $("#hospitalAddressCountry  option[value="+tempdata.hospitalAddressCountry+"] ").attr("selected",true);
                    $("#hospitalAddress").val(tempdata.hospitalAddress);
                    $("#hospitalLink").val(tempdata.hospitalLink);
                    $("#hospitalAddressCountry").val(tempdata.hospitalAddressCountry);
                    $(".w-e-text").html(tempdata.hospitalIntroduce);
                }
            }());


        });
})();
