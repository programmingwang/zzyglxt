(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','uploadImg','dictUtil','selectUtil','distpicker'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,uploadImg,dictUtil,selectUtil,distpicker) {

            const editor = objectUtil.wangEditorUtil();

            uploadImg.init();
            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.effectType);
            $("#chineseMedicineType").selectUtil(pl);




            $("#cancel").unbind().on('click',function () {
                $("#main_body").html("");
                var url = "/healthCare/healthcarechineseMedicine";
                orange.redirect(url);
            });
            $("#btn_save").unbind().on('click',function () {
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
                        ChineseMedicineStatus : '0'
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
                        ChineseMedicineStatus : '1'
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
                        status : '1',
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
                    $("#chineseMedicineEffect").val(tempdata.chineseMedicineEffect);
                    $("#chineseMedicineUsage").val(tempdata.chineseMedicineUsage);
                    $("#chineseMedicineMerTro").val(tempdata.chineseMedicineMerTro);
                    var img = tempdata.filePath;
                    uploadImg.setImgSrc(img);
                }else{
                    $( "<option value=\"请选择\" selected='selected'>请选择</option>").prependTo($( "#chineseMedicineType"));
                    $("#distpicker").distpicker();
                }
                init = function () {

                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

        })
})();