(function () {
    require(['jquery', 'ajaxUtil','objectUtil','alertUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,objectUtil,alertUtil,selectUtil,stringUtil,dictUtil) {
            if(localStorage.getItem("isView") == "true"){
                $("#btn_save").attr("style","display:none");
                $("#btn_insert").attr("style","display:none");
            }
            var exmaineStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);

            var controUrl = "/exmain/exmain"
            var redirectUtl = "/scientificProject/centralizedReview";

            var sc= document.getElementsByClassName("sc");
            var allSc=document.getElementById("allSc");
            var scoreArr = [];

            var a=0;
            for (var i = 0;i<sc.length;i++){
                sc[i].onchange=function () {
                    a=a+Number(this.value)
                    allSc.value=a;
                }
            }
            
            $("#cancel").unbind().on('click', function () {
                localStorage.removeItem("isView");
                orange.redirect(redirectUtl);
            });

            $("#btn_save").unbind().on('click',function () {
                var exmaineEntity = {};
                exmaineEntity.opinion = $("#expertOpinion").val();
                exmaineEntity.score = $("#allSc").val();
                exmaineEntity.exmaineStatus = exmaineStatus[2].id;
                exmaineEntity.itemcode = JSON.parse(localStorage.getItem("examinItemCode"));
                for(var i =0;i<11;i++){
                    scoreArr[i] = $("#score"+(i+1)).val();
                }
                localStorage.setItem("detailScore",JSON.stringify(scoreArr));
                ajaxUtil.myAjax(null,controUrl,exmaineEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.success("保存评审意见成功！");
                        localStorage.removeItem("examinItemCode");
                        orange.redirect(redirectUtl);
                    }else {
                        alertUtil.error("保存失败，请重试");
                    }
                },false,true,"put");

            });

            $("#btn_insert").unbind().on('click',function () {
                var exmaineEntity = {};
                exmaineEntity.opinion = $("#expertOpinion").val();
                exmaineEntity.score = $("#allSc").val();
                exmaineEntity.exmaineStatus = exmaineStatus[0].id;
                exmaineEntity.itemcode = JSON.parse(localStorage.getItem("examinItemCode"));
                for(var i =0;i<11;i++){
                    scoreArr[i] = $("#score"+(i+1)).val();
                }
                localStorage.setItem("detailScore",JSON.stringify(scoreArr));
                ajaxUtil.myAjax(null,controUrl,exmaineEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        alertUtil.success("提交评审意见成功！")
                        orange.redirect(redirectUtl);
                    }else {
                        alertUtil.error("提交失败，请重试");
                    }
                },false,true,"put");
            });

            if(localStorage.getItem("viewDetail") != null || localStorage.getItem("viewDetail") != undefined){
                var row = JSON.parse(localStorage.getItem("viewDetail"))
                if(row.scoreArr != null){
                    for(var i =0;i<11;i++){
                        $("#score"+(i+1)).val(row.scoreArr[i]);
                        $("#score"+(i+1)).attr("readOnly","true")
                    }
                }else {
                    for(var i =0;i<11;i++){
                        $("#score"+(i+1)).attr("readOnly","true")
                    }
                }
                if(sessionStorage.getItem("rolename") == "省局中医药管理部门"){
                    $("#expertOpinion").val("专家意见："+row.opinion);
                }else{
                    $("#expertOpinion").val(row.opinion);
                }
                $("#expertOpinion").attr("readOnly","true");
                $("#allSc").val(row.score);
            }





})}());