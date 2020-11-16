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
            var jumpUrl = "/medicalService/specialty"
            var hosps = {}
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var specialtyName = dictUtil.getDictByCode(dictUtil.DICT_LIST.dept)

            /*设置科室下拉框的值*/
            $("#specialtyName").selectUtil(dictUtil.getDictByCode(dictUtil.DICT_LIST.dept));

            /*点击返回按钮*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            /*点击提交按钮*/
            $("#btn_insert").unbind().on('click',function () {
                var hosp;
                var entity;
                var requestUrl;
                var operateMessage;
                /*拿到下拉框所选医院的信息*/
                hosp = hosps.find(function (obj) {return obj.itemcode === $("#hospitalName").val()});
                if (!updateStatus){
                    requestUrl = "/medicalService/specialty/add";
                    operateMessage = "新增科室成功";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                    };
                }
                else {
                    requestUrl = "/medicalService/specialty/update";
                    operateMessage = "更新科室成功";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode
                    };
                }
                entity["specialtyName"] = specialtyName[$("#specialtyName").val()].text;
                entity["specialtyPhone"] = $("#specialtyPhone").val();
                entity["specialtyAddressPro"] = hosp.hospitalAddressPro;
                entity["specialtyAddressCity"] = hosp.hospitalAddressCity;
                entity["specialtyAddressCounty"] = hosp.hospitalAddressCountry;
                entity["specialtyAddress"] = hosp.hospitalAddress;
                entity["specialtyLink"] = hosp.hospitalLink;
                entity["specialtyDescribe"] = editor.txt.html();
                entity["hospitalCode"] = hosp.itemcode;
                entity["hospitalName"] = hosp.hospitalName;
                entity["specialtyStatus"] = webStatus[0].id

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
            var init = function () {
                ajaxUtil.myAjax(null,"/medicalService/hosp/selectAll?hospitalStatus=" + webStatus[5].id,null,function (data) {
                    if(ajaxUtil.success(data)){
                        hosps = data.data
                        var html = "";
                        $.each(hosps,function (i,it) {
                            html = html + '<option value="'+it.itemcode+'">'+it.hospitalName+'</option>';
                        });
                        $("#hospitalName").html("");
                        $("#hospitalName").append(html);
                    }
                },false,true,"get");
                if (hosps.length == 0) {
                    alertUtil.info("医院信息为空，请先添加医院")
                }
                if (updateStatus){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#specialtyName").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() == tempdata.specialtyName) {
                            $this.attr("selected", true);
                        }
                    });
                    uploadImg.setImgSrc(tempdata.filePath)
                    $("#hospitalName  option[value="+tempdata.hospitalCode+"] ").attr("selected",true)
                    $("#specialtyPhone").val(tempdata.specialtyPhone);
                    $(".w-e-text").html(tempdata.specialtyDescribe);
                }
            };
            uploadImg.init();
            init();


        });
})();
