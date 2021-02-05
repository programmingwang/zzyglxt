(function () {
    require(['jquery','objectUtil','bootstrapTableUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil','selectUtil'],
        function (jquery,objectUtil,bootstrapTableUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil,selectUtil) {

            const editor = objectUtil.wangEditorUtil();
//角色信息
            var rolename = sessionStorage.getItem("rolename");
            var username = sessionStorage.getItem("username");

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.emergencyStatus);
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.receiptStatus);
            var row = JSON.parse(localStorage.getItem("viewRowData"));

            $("#cancelbtn").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/receipt";
                orange.redirect(url);
            });

            $("#pass").unbind().on('click',function () {
                var ReceiptEntity;
                var addUpdateUrl;
                var operateMessage;
                var submitOpinion;
                var nowTime = stringUtil.formatDateTime(new Date());
                    addUpdateUrl = "changestatustoreceipt/"+row.itemid+"/"+row.itemcode;
                    operateMessage = "审核通过";
                    ReceiptEntity = {
                        "receivingDataStatus":""
                    };
                if (rolename == "政务资源综合处处长"){
                    ReceiptEntity.receivingDataStatus = webStatus[2].id;
                }else if (rolename == "中医处分管局长"){
                    ReceiptEntity.receivingDataStatus = webStatus[5].id;
                }else if (rolename == "中药处分管局长"){
                    ReceiptEntity.receivingDataStatus = webStatus[8].id;
                }else if (rolename == "综合处分管局长"){
                    ReceiptEntity.receivingDataStatus = webStatus[11].id;
                }else if (rolename == "法规监督处分管局长"){
                    ReceiptEntity.receivingDataStatus = webStatus[14].id;
                }else if (rolename == "政务资源局长"){
                    ReceiptEntity.receivingDataStatus = webStatus[16].id;
                }

                if (rolename == "政务资源处长"){
                    submitOpinion = {
                        "dataCode" : row.itemcode,
                        "department" : $("#reason").val(),
                        "departmentName" : username,
                        "departDate" : nowTime,
                    };
                }else if (rolename == "政务资源综合处处长"){
                    submitOpinion = {
                        "dataCode" : row.itemcode,
                        "office" : $("#reason").val(),
                        "officeName" : username,
                        "officeDate" : nowTime,
                    };
                }else if (rolename == "政务资源分管局长"){
                    submitOpinion = {
                        "dataCode" : row.itemcode,
                        "deputyDirector" : $("#reason").val(),
                        "deputyDirectorName" : username,
                        "deputyDirectorDate" : nowTime,
                    };
                }else if (rolename == "政务资源局长"){
                    submitOpinion = {
                        "dataCode" : row.itemcode,
                        "director" : $("#reason").val(),
                        "directorName" : username,
                        "directorDate" : nowTime,
                    };
                }
                ajaxUtil.myAjax(null,addUpdateUrl,ReceiptEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        if(data.code == 88888){
                            ajaxUtil.myAjax(null,"/advice/updAdvice", submitOpinion,function (data) {
                                if(ajaxUtil.success(data)){
                                    if(data.code == 88888){
                                        alertUtil.info(operateMessage);
                                         isSuccess = true;
                                         refreshTable();
                                     }else{
                                         alertUtil.error(data.msg);
                                     }
                                 }
                             },false,true,"post");
                         }else{
                             alertUtil.error(data.msg);
                         }
                         /*var url = "/document/receipt";
                         orange.redirect(url);*/
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });
            $("#fail").unbind().on('click',function () {
                localStorage.removeItem("viewRowData");
                var url = "/document/receipt";
                orange.redirect(url);
            });

            (function init() {
                if (isView()){
                    var tempdata = JSON.parse(localStorage.getItem("viewRowData"));
                    $("#receivingNum").val(tempdata.receivingNum);
                    $("#receivingDateOfReceipt").val(tempdata.receivingDateOfReceipt);
                    $("#receivingTitle").val(tempdata.receivingTitle);
                    $("#receivingUnitOfCommun").val(tempdata.receivingUnitOfCommun);
                    $("#fileNo").val(tempdata.fileNo);
                    $("#number").val(tempdata.number);
                    $("#secretLevel").val(tempdata.secretLevel);
                    $("#timeLimit").val(tempdata.timeLimit);
                    $("#receivingDataStatus").val(webStatus[tempdata.receivingDataStatus].text);
                    $("#creater").val(tempdata.creater);
                    $("#receivingDegreeOfUrgency").val(pl[tempdata.receivingDegreeOfUrgency].text);

                    $("#upload_file").text(tempdata.fileName);
                    $("#upload_file").attr('href',tempdata.filePath);
                }
            }());

            function isView() {
                return (localStorage.getItem("viewRowData") != null || localStorage.getItem("viewRowData") != undefined)
            }

            var files= document.getElementById('upload_file').files;
            if(files){
                if(files.length>0){
                    $("#addFile").empty("p");
                    var name = files.name;
                    $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                }
            }

            function getRoleTable(role,preUrl,status,webStatus) {
                if(role === "政务资源科员"){
                    $('#btn_addTask').attr('style',"display:block");
                    return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "政务资源综合处处长"){
                    return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id;
                }else if(role === "中医处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id;
                } else if(role === "中药处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[7].id+"&"+status+"="+webStatus[8].id+"&"+status+"="+webStatus[9].id;
                }else if(role === "综合处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[10].id+"&"+status+"="+webStatus[11].id+"&"+status+"="+webStatus[12].id;
                }else if(role === "法规监督处分管局长") {
                    return preUrl + "?"+status+"="+webStatus[13].id+"&"+status+"="+webStatus[14].id+"&"+status+"="+webStatus[15].id;
                }else if(role === "政务资源局长") {
                    return preUrl + "?"+status+"="+webStatus[16].id+"&"+status+"="+webStatus[17].id+"&"+status+"="+webStatus[18].id;
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
                    }else if(status == webStatus[2].id || status ==webStatus[5].id|| status ==webStatus[8].id|| status ==webStatus[11].id|| status ==webStatus[14].id|| status ==webStatus[16].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[3].id || status == webStatus[6].id || status == webStatus[9].id|| status == webStatus[12].id|| status == webStatus[15].id|| status ==webStatus[17].id|| status ==webStatus[18].id){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        ].join('');
                    }else if(status == webStatus[1].id ){
                        return [
                            '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                            '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                        ].join('');
                    }

                }else if(role === "政务资源综合处处长"){
                    if(status == webStatus[1].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if( status == webStatus[2].id||status == webStatus[3].id){
                        return [
                            '<a  class="transpond"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >转发</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if( status == webStatus[4].id||status == webStatus[7].id||status == webStatus[10].id||status == webStatus[13].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }

                }else if(role === "中医处分管局长"){
                    if(status == webStatus[4].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "中药处分管局长"){
                    if(status == webStatus[7].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "综合处分管局长"){
                    if(status == webStatus[10].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "法规监督处分管局长"){
                    if(status == webStatus[13].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
                else if(role === "政务资源局长"){
                    if(status == webStatus[5].id || status == webStatus[8].id|| status == webStatus[11].id|| status == webStatus[14].id){
                        return [
                            '<a  class="opinion"  data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >填写审核意见</a>',
                            '<a class="view" data-toggle="modal" style="margin:0 0.6em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }else if(status == webStatus[16].id||status == webStatus[17].id|| status == webStatus[18].id){
                        return [
                            '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                        ].join('');
                    }
                }
            }

            function getStatus(role,webStatus) {
                if(role === "政务资源科员"){
                    return webStatus[1].id
                }
                else if(role === "政务资源综合处处长"){
                    return webStatus[2].id
                }
                else if(role === "中医处分管局长"){
                    return webStatus[5].id
                }
                else if(role === "中药处分管局长"){
                    return webStatus[8].id
                }
                else if(role === "综合处分管局长"){
                    return webStatus[11].id
                }
                else if(role === "法规监督处分管局长"){
                    return webStatus[14].id
                }
                else if(role === "政务资源局长"){
                    return webStatus[18].id
                }
            }


            return {
                getRoleTable:getRoleTable,
                getRoleOperate:getRoleOperate,
                getStatus: getStatus,
            }
        })
})();