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


            var a=0;
            for (var i = 0;i<sc.length;i++){
                sc[i].onchange=function () {
                    a=a+Number(this.value)
                    allSc.value=a;
                }
            }
            
            $("#cancel").unbind().on('click', function () {
                localStorage.removeItem("isView");
                localStorage.removeItem("viewDetail");
                orange.redirect(redirectUtl);
            });

            $("#btn_save").unbind().on('click',function () {
                var exmaineEntity = {};
                exmaineEntity.opinion = $("#expertOpinion").val();
                exmaineEntity.exmaineStatus = exmaineStatus[2].id;
                exmaineEntity.topicCode = JSON.parse(localStorage.getItem("examinTopicCode"));
                exmaineEntity.score= '';
                var checkExpertCodeParam = {
                    expertUserCode : sessionStorage.getItem("itemcode")
                };
                ajaxUtil.myAjax(null,"exmain/selExpertCode",checkExpertCodeParam,function (data) {
                    exmaineEntity.expertCode = data.data;
                    for(var i =0;i<11;i++){
                        exmaineEntity.score += $("#score"+(i+1)).val() + "+";
                    }
                    //对分数入库格式进行修改（入库的是小分项相加 = 总分的形式 类似 1+1+1+1 = 4）
                    var aStr = (exmaineEntity.score).split('');
                    aStr.splice(exmaineEntity.score.length-1,1,'');
                    exmaineEntity.score = aStr.join('');
                    exmaineEntity.score += "="+ $("#allSc").val();
                    ajaxUtil.myAjax(null,controUrl,exmaineEntity,function (data) {
                        if(ajaxUtil.success(data)){
                            alertUtil.success("保存评审意见成功！");
                            localStorage.removeItem("examinTopicCode");
                            orange.redirect(redirectUtl);
                        }else {
                            alertUtil.error("保存失败，请重试");
                        }
                    },false,true,"put");
                },false);
            });

            $("#btn_insert").unbind().on('click',function () {
                var exmaineEntity = {};
                exmaineEntity.opinion = $("#expertOpinion").val();
                exmaineEntity.score = $("#allSc").val();
                exmaineEntity.exmaineStatus = exmaineStatus[0].id;
                exmaineEntity.topicCode = JSON.parse(localStorage.getItem("examinTopicCode"));
                exmaineEntity.score= '';
                var checkExpertCodeParam = {
                    expertUserCode : sessionStorage.getItem("itemcode")
                };
                ajaxUtil.myAjax(null,"exmain/selExpertCode",checkExpertCodeParam,function (data) {
                    exmaineEntity.expertCode = data.data;
                    for(var i =0;i<11;i++){
                        exmaineEntity.score += $("#score"+(i+1)).val() + "+";
                    }
                    //对分数入库格式进行修改（入库的是小分项相加 = 总分的形式 类似 1+1+1+1 = 4）
                    var aStr = (exmaineEntity.score).split('');
                    aStr.splice(exmaineEntity.score.length-1,1,'');
                    exmaineEntity.score = aStr.join('');
                    exmaineEntity.score += "="+ $("#allSc").val();
                    ajaxUtil.myAjax(null,controUrl,exmaineEntity,function (data) {
                        if(ajaxUtil.success(data)){
                            alertUtil.success("提交评审意见成功！")
                            orange.redirect(redirectUtl);
                        }else {
                            alertUtil.error("提交失败，请重试");
                        }
                    },false,true,"put");
                },false);

            });

            if(localStorage.getItem("viewDetail") != null || localStorage.getItem("viewDetail") != undefined){
                var tempdata = JSON.parse(localStorage.getItem("viewDetail"));
                var attr = (tempdata.score).split("+");
                console.log(attr);
                for(var i = 0; i<attr.length; i++){
                    $("#score"+(i+1)).val(attr[i]);
                    $("#score"+(i+1)).attr("readOnly","true")
                }

                var lastScore = attr[10].split("=");
                $("#score11").val(lastScore[0]);
                $("#allSc").val(lastScore[1]);


                if(sessionStorage.getItem("rolename") == "科研项目-省级"){
                    $("#expertOpinion").val("专家意见："+tempdata.opinion);
                }else{
                    $("#expertOpinion").val(tempdata.opinion);
                }
                $("#expertOpinion").attr("readOnly","true");

            }





})}());