(function () {
    require(['jquery', 'ajaxUtil','objectUtil','alertUtil','selectUtil','stringUtil','dictUtil','modalUtil'],
        function (jquery,ajaxUtil,objectUtil,alertUtil,selectUtil,stringUtil,dictUtil,modalUtil) {
            if(localStorage.getItem("isView") == "true"){
                $("#btn_save").remove();
                $("#btn_insert").remove();
            }
            var exmaineStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.exmaineStatus);

            var controUrl = "/exmain/exmain"
            var redirectUtl = "/scientificProject/centralizedReview";

            var sc= document.getElementsByClassName("sc");

            for (var i = 0;i<sc.length;i++){
                sc[i].onchange=function () {
                    var a = 0;
                    for (var j = 0;j<11;j++){
                        if($("#score"+(j+1)).val() == "" || $("#score"+(j+1)).val() == null){
                            a += 0;
                        }else{
                            a += parseInt($("#score"+(j+1)).val());
                        }
                    }
                    $("#allSc").val(a);
                }
            }
            
            $("#cancel").unbind().on('click', function () {
                localStorage.removeItem("isView");
                localStorage.removeItem("viewDetail");
                localStorage.removeItem("keepExmaine");
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
                            var submitConfirmModal = {
                                modalBodyID :"myExmainSaveTips",
                                modalTitle : "提示",
                                modalClass : "modal-lg",
                                cancelButtonStyle: "display:none",
                                modalConfirmFun:function (){
                                    localStorage.removeItem("viewDetail");
                                    localStorage.removeItem("keepExmaine");
                                    orange.redirect(redirectUtl);
                                    return true;
                                }
                            }
                            var submitConfirm = modalUtil.init(submitConfirmModal);
                            submitConfirm.show();
                        }else {
                            alertUtil.error("保存失败，请重试");
                        }
                    },false,true,"put");
                },false);
                return false;
            });

            $("#btn_insert").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "myExmainScoreTips",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    modalConfirmFun:function (){
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
                                    var submitConfirmModal = {
                                        modalBodyID :"myExmainSuccessTips",
                                        modalTitle : "提示",
                                        modalClass : "modal-lg",
                                        cancelButtonStyle: "display:none",
                                        modalConfirmFun:function (){
                                            localStorage.removeItem("viewDetail");
                                            localStorage.removeItem("keepExmaine");
                                            orange.redirect(redirectUtl);
                                            return true;
                                        }
                                    }
                                    var submitConfirm = modalUtil.init(submitConfirmModal);
                                    submitConfirm.show();
                                }else {
                                    alertUtil.error("提交失败，请重试");
                                }
                            },false,true,"put");
                            return false;
                        },false);
                        return true;
                    }
                }
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            if(localStorage.getItem("viewDetail") != null || localStorage.getItem("viewDetail") != undefined){
                var tempdata = JSON.parse(localStorage.getItem("viewDetail"));
                if(sessionStorage.getItem("rolename") == "专家"){
                    var attr = (tempdata.score).split("+");
                    for(var i = 0; i<attr.length; i++){
                        $("#score"+(i+1)).val(attr[i]);
                        $("#score"+(i+1)).attr("readOnly","true")
                    }
                    var lastScore = attr[10].split("=");
                    $("#score11").val(lastScore[0]);
                    $("#allSc").val(lastScore[1]);
                    $("#expertOpinion").val(tempdata.opinion);
                    $("#expertOpinion").attr("readOnly","true");
                }else if (sessionStorage.getItem("rolename") == "科研项目-省级"){
                    $("#expertOpinion").attr("placeholder","");
                    for(var i = 0; i<11; i++){
                        $("#score"+(i+1)).attr("readOnly","true")
                    }
                    $("#expertOpinion").attr("readOnly","true");
                    $("#zftitle").text("平均分：");
                    var scores = (tempdata.score).split("|");
                    var opinions = (tempdata.opinion).split("|");
                    var finalOpinion = "";
                    var sumScore = 0;
                    var sjfx = [];
                    for(var i = 0; i<scores.length; i++){
                        if(scores[i] == "null" || scores[i] == ""){
                            $("#displaydf").html("（请注意：当前还未评审完）");
                            continue;
                        }
                        var attr = (scores[i]).split("+");
                        sjfx = attr;
                        var lastScore = attr[10].split("=");
                        $("#score11").val(lastScore[0]);
                        sumScore += parseInt(lastScore[1]);
                    }
                    for(var i = 0; i<sjfx.length; i++){
                        $("#score"+(i+1)).val(sjfx[i]);
                    }
                    var lastScore = sjfx[10].split("=");
                    $("#score11").val(lastScore[0]);
                    $("#allSc").val(sumScore/scores.length);
                    for(var i = 0; i<opinions.length; i++){
                        finalOpinion += "专家"+(i+1)+"意见："+opinions[i]+"\n";
                    }
                    $("#expertOpinion").val(finalOpinion);
                }
            }
            else if(localStorage.getItem("keepExmaine") != null || localStorage.getItem("keepExmaine") != undefined){
                var tempdata = JSON.parse(localStorage.getItem("keepExmaine"));
                var attr = (tempdata.score).split("+");
                for(var i = 0; i<attr.length; i++){
                    $("#score"+(i+1)).val(attr[i]);
                }
                if(attr[10]!= undefined || attr[10]!= null) {
                    var lastScore = attr[10].split("=");
                    $("#score11").val(lastScore[0]);
                    $("#allSc").val(lastScore[1]);
                }
                $("#expertOpinion").val(tempdata.opinion);
            }

})}());