(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            var rolename = sessionStorage.getItem("rolename");
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.signstatus);
            var parStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.parment);
            var govStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.governerscounter);
            var row = JSON.parse(localStorage.getItem("viewRowData"));
            const editor = objectUtil.wangEditorUtil();
            var username = sessionStorage.getItem("username");

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/sign";
                orange.redirect(url);
            });

            $("#passbtn").unbind().on('click',function () {
                var SignEntity;
                SignEntity = {
                    "itemid": row.itemid,
                    "itemcode":row.itemcode,
                    "status": ""
                };

                if (sessionStorage.getItem("rolename") == "政务资源处长"){
                    SignEntity.status = webStatus[2].id;
                }else if (sessionStorage.getItem("rolename") =="政务资源综合处处长"){
                    SignEntity.status = webStatus[11].id;
                }else if (sessionStorage.getItem("rolename") =="政务资源分管局长"){
                    SignEntity.status = webStatus[3].id;
                }else if (sessionStorage.getItem("rolename") == "政务资源局长"){
                    SignEntity.status = webStatus[9].id;
                }else if (sessionStorage.getItem("rolename") == "中医处分管局长"){
                    SignEntity.status = webStatus[14].id;
                }else if (sessionStorage.getItem("rolename") == "中药处分管局长"){
                    SignEntity.status = webStatus[16].id;
                }else if (sessionStorage.getItem("rolename") == "综合处分管局长"){
                    SignEntity.status = webStatus[18].id;
                }else if (sessionStorage.getItem("rolename") == "法规监督处处分管局长"){
                    SignEntity.status = webStatus[20].id;
                }

                if(sessionStorage.getItem("rolename") == "政务资源处长"||sessionStorage.getItem("rolename") == "政务资源综合处处长"||sessionStorage.getItem("rolename") == "政务资源分管局长"||sessionStorage.getItem("rolename") == "政务资源局长"||sessionStorage.getItem("rolename") == "中医处分管局长"||sessionStorage.getItem("rolename") == "中药处分管局长"||sessionStorage.getItem("rolename") == "综合处分管局长"||sessionStorage.getItem("rolename") == "法规监督处分管局长") {
                    ajaxUtil.myAjax(null, "governresCountersign/update/" , SignEntity, function (data) {
                        if (ajaxUtil.success(data)) {
                            if (data.code == 88888) {
                                alertUtil.success("审核通过");
                                var url = "/document/sign";
                                orange.redirect(url);
                                isSuccess = true;
                                refreshTable();
                            } else {
                                alertUtil.error(data.msg);
                            }
                        }
                    }, false,true,"put");
                } else {
                    alertUtil.error("您没有操作权限");
                }
                return false;
            });

            $("#failbtn").unbind().on('click',function () {
                var SignEntity;
                SignEntity = {
                    "itemid": row.itemid,
                    "itemcode":row.itemcode,
                    "status": ""
                };

                if (sessionStorage.getItem("rolename") == "政务资源处长"){
                    SignEntity.status = webStatus[4].id;
                }else if (sessionStorage.getItem("rolename") =="政务资源综合处处长"){
                    SignEntity.status = webStatus[12].id;
                }else if (sessionStorage.getItem("rolename") =="政务资源分管局长"){
                    SignEntity.status = webStatus[5].id;
                }else if (sessionStorage.getItem("rolename") == "政务资源局长"){
                    SignEntity.status = webStatus[6].id;
                }else if (sessionStorage.getItem("rolename") == "中医处分管局长"){
                    SignEntity.status = webStatus[15].id;
                }else if (sessionStorage.getItem("rolename") == "中药处分管局长"){
                    SignEntity.status = webStatus[17].id;
                }else if (sessionStorage.getItem("rolename") == "综合处分管局长"){
                    SignEntity.status = webStatus[19].id;
                }else if (sessionStorage.getItem("rolename") == "法规监督处处分管局长"){
                    SignEntity.status = webStatus[21].id;
                }

                if(sessionStorage.getItem("rolename") == "政务资源处长"||sessionStorage.getItem("rolename") == "政务资源综合处处长"||sessionStorage.getItem("rolename") == "政务资源分管局长"||sessionStorage.getItem("rolename") == "政务资源局长"||sessionStorage.getItem("rolename") == "中医处分管局长"||sessionStorage.getItem("rolename") == "中药处分管局长"||sessionStorage.getItem("rolename") == "综合处分管局长"||sessionStorage.getItem("rolename") == "法规监督处分管局长") {
                    ajaxUtil.myAjax(null, "governresCountersign/update/" , SignEntity, function (data) {
                        if (ajaxUtil.success(data)) {
                            if (data.code == 88888) {
                                alertUtil.success("驳回成功");
                                var url = "/document/sign";
                                orange.redirect(url);
                                isSuccess = true;
                                refreshTable();
                            } else {
                                alertUtil.error(data.msg);
                            }
                        }
                    }, false,true,"put");
                } else {
                    alertUtil.error("您没有操作权限");
                }
                return false;
            });



            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
                    $("#fileNo").val(tempdata.fileNo);
                    $("#parment").val(parStatus[tempdata.parment].text);
                    $("#number").val(tempdata.number);
                    $("#govPunlic").val(govStatus[tempdata.govPunlic].text);
                    $("#receivingTitle").val(tempdata.receivingTitle);
                    $("#fileNumber").val(tempdata.fileNumber);
                    $("#classification").val(tempdata.classification);
                    var tgAdvice;
                    $.ajax({cache: false, async: false, type: 'get', data: {dataCode: tempdata.itemcode}, url: "/advice/getByDataCode", success: function (data) {
                            tgAdvice = data;
                        }
                    });
                    var num = dictUtil.getDictByCode(dictUtil.DICT_LIST.postDocumentNum);
                    /*var postNum = num[tempdata.postDocumentNum].text + tempdata.postDocumentNum1;
                    $("#postDocumentNum").val(postNum);*/
                    $("#postDocumentTitle").val(tempdata.postDocumentTitle);
                    if (tempdata.postPublicWay == "0"){
                        $("#p1").prop("checked",true);
                    }else if (tempdata.postPublicWay == "1"){
                        $("#p2").prop("checked",true);
                    }else {
                        $("#p3").prop("checked",true);
                        if (tempdata.postReason == "0"){
                            $("#r1").prop("checked",true);
                        }else if (tempdata.postReason == "1"){
                            $("#r2").prop("checked",true);
                        }else if (tempdata.postReason == "2"){
                            $("#r3").prop("checked",true);
                        }else {
                            $("#r4").prop("checked",true);
                        }
                    }
                    if (tempdata.postFairDepartmentReview == "0"){
                        $("#f1").prop("checked",true);
                    }else {
                        $("#f2").prop("checked",true);
                        $('#fujian').attr('style',"display:none");
                    }
                    if (tempdata.postNormativeDocuments == "y"){
                        $("#n1").prop("checked",true);
                    }else {
                        $("#n2").prop("checked",true);
                    }
                    if (tempdata.postSecretRelated =="y"){
                        $("#s1").prop("checked",true);
                    }else {
                        $("#s2").prop("checked",true);
                    }
                    $("#postPrinting").val(tempdata.postPrinting);
                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);

                    $("#initialName").val(tgAdvice.data.initial);
                    $("#initialDate").val(tgAdvice.data.initialDate);
                    $("#signOpinion").val(tgAdvice.data.signOpinion);
                    $("#signDate").val(tgAdvice.data.signDate);
                    $("#signName").val(tgAdvice.data.signName);
                    $("#departmentOpinion").val(tgAdvice.data.department);
                    $("#departmentName").val(tgAdvice.data.departmentName);
                    $("#departmentDate").val(tgAdvice.data.departDate);
                    $("#officeOpinion").val(tgAdvice.data.office);
                    $("#officeName").val(tgAdvice.data.officeName);
                    $("#officeDate").val(tgAdvice.data.officeDate);
                    $("#deputyDirectorOpinion").val(tgAdvice.data.deputyDirector);
                    $("#deputyDirectorName").val(tgAdvice.data.deputyDirectorName);
                    $("#deputyDirectorDate").val(tgAdvice.data.deputyDirectorDate);
                    $("#directorOpinion").val(tgAdvice.data.director);
                    $("#directorName").val(tgAdvice.data.directorName);
                    $("#directorDate").val(tgAdvice.data.directorDate);
                }
            }());

            function isView() {
                return (localStorage.getItem("viewRowData") != null || localStorage.getItem("viewRowData") != undefined)
            }

            function getRoleTable(role,preUrl,status,webStatus) {
                if(role === "政务资源科员"){
                    $('#btn_addTask').attr('style',"display:block");
                    return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "政务资源处长"){
                    return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[4].id;
                }else if(role === "政务资源综合处处长"){
                    return preUrl + "?"+status+"="+webStatus[10].id+"&"+status+"="+webStatus[11].id+"&"+status+"="+webStatus[12].id;
                }else if(role === "政务资源分管局长") {
                    return preUrl + "?"+status+"="+webStatus[13].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[3].id;
                } else if(role === "政务资源局长") {
                    return preUrl + "?"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "中医处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[9].id+"&"+status+"="+webStatus[14].id+"&"+status+"="+webStatus[15].id;
                }else if(role === "中药处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[9].id+"&"+status+"="+webStatus[16].id+"&"+status+"="+webStatus[17].id;
                }else if(role === "综合处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[9].id+"&"+status+"="+webStatus[18].id+"&"+status+"="+webStatus[19].id;
                }else if(role === "法规监督处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[9].id+"&"+status+"="+webStatus[20].id+"&"+status+"="+webStatus[21].id;
                }
            }

            function getRoleOperate(value, row, index, role, status,webStatus) {
                if(role === "政务资源科员"){
                    if(status == webStatus[0].id){
                        return [
                            '<a class="edit" style="margin:0 0.8em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >修改</a>',
                            '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[2].id || status ==webStatus[11].id|| status ==webStatus[9].id){
                        return [
                            '<a class="vision" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[4].id || status == webStatus[5].id || status == webStatus[6].id|| status == webStatus[7].id|| status == webStatus[12].id){
                        return [
                            '<a class="vision" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[1].id || status == webStatus[8].id|| status == webStatus[10].id|| status == webStatus[13].id){
                        return [
                            '<a class="vision" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                        ].join('');
                    }

                }else if(role === "政务资源处长"){
                    if(status == webStatus[1].id){
                        if (row.fileNo == "1"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="pass"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else if( status == webStatus[4].id){
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                } else if(role === "政务资源综合处处长"){
                    if(status == webStatus[2].id||status == webStatus[10].id){
                        if (row.fileNo == "2"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passth"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failth"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else if( status == webStatus[12].id){
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }else if(role === "政务资源分管局长"){
                    if(status == webStatus[11].id||status == webStatus[13].id ){
                        if (row.fileNo == "3"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passone"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failone"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else if(status == webStatus[5].id){
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[9].id){
                        return [
                            '<a  class="vision"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
                        ].join('');
                    }

                }
                else if(role === "政务资源局长"){
                    if(status == webStatus[3].id || status == webStatus[8].id){
                        if (row.fileNo == "4"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="passtwo"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="failtwo"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else if(status == webStatus[6].id||status == webStatus[7].id){
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[9].id){
                        return [
                            '<a  class="vision"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >撤销</a>',
                        ].join('');
                    }

                }
                else if(role === "中医处分管局长"){
                    if(status == webStatus[9].id){
                        if (row.fileNo == "5"){
                            return [
                                '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >审核意见</a>',
                                '<a class="pass"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                                '<a  class="fail"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                            ].join('');
                        }else{
                            return [
                                '<a class="opinion" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >填写审核意见</a>',
                            ].join('');
                        }
                    }else if( status == webStatus[4].id){
                        return [
                            '<a class="vision" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }
            }

            function getStatus(role,webStatus) {
                if(role === "政务资源科员"){
                    return webStatus[1].id
                }else if(role === "政务资源处长"){
                    return webStatus[10].id
                }
                else if(role === "政务资源综合处处长"){
                    return webStatus[13].id
                }
                else if(role === "政务资源分管局长"){
                    return webStatus[8].id
                }
                else if(role === "政务资源局长"){
                    return webStatus[9].id
                }
                else if(role === "中医处分管局长"){
                    return webStatus[14].id
                }
                else if(role === "中药处分管局长"){
                    return webStatus[16].id
                }
                else if(role === "综合处分管局长"){
                    return webStatus[18].id
                }
                else if(role === "法规监督处处分管局长"){
                    return webStatus[20].id
                }
            }

            return {
                getRoleTable:getRoleTable,
                getRoleOperate:getRoleOperate,
                getStatus: getStatus,
            }

        })
})();
