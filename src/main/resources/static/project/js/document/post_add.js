(function () {
    require(['jquery','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','distpicker','selectUtil','checkUtil','uploadImg','modalUtil'],
        function (jquery,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,distpicker,selectUtil,checkUtil,uploadImg,modalUtil) {

            uploadImg.init();

            //不公开理由
            var reason = dictUtil.getDictByCode(dictUtil.DICT_LIST.postReason);
            $("#postReason").selectUtil(reason);

            //公开方式
            $('input[type=radio][name=postPublicWay]').change(function () {
                if(this.value == "2"){
                    $('#postReason').attr('style',"display:block");
                }else {
                    $('#postReason').attr('style',"display:none");
                    $("#postReason").selectUtil(reason);
                    $("#postReason").val() == "";
                }
            })

            //是否需要公平竞争审查
            var fair = dictUtil.getDictByCode(dictUtil.DICT_LIST.postFairDepartmentReview);
            $("#postFairDepartmentReview").selectUtil(fair);
            $('#postFairDepartmentReview').change(function () {
                if($("#postFairDepartmentReview").val() == "1"){
                    $('#fairFile1').attr('style',"display:none");
                    var obj = document.getElementById('fairFile');
                    obj.outerHTML=obj.outerHTML;
                    $("#clsFairFile").css("display","none");
                    $("#addFairFile").empty("p");
                }else {
                    $('#fairFile1').attr('style',"display:block");
                }
            });

            //文号
            var num = dictUtil.getDictByCode(dictUtil.DICT_LIST.postDocumentNum);
            $("#postDocumentNum").selectUtil(num);

            //结合发文管理增加意见
            var uuid = stringUtil.getUUID();
            var adviceUrl = "/advice/createAdvice";
            var AdviceEntity = {
                itemcode : stringUtil.getUUID(),
                dataCode : uuid,
                initial : username,
                initialDate : nowTime,
            };

            //主送抄送
            // 存储账号信息
            var sendGoal = {};
            // 获取账号信息的url
            var sendUrl = "/postref/alluser";

            //获取账号信息
            function initExpert() {
                ajaxUtil.myAjax(null, sendUrl, null, function (data) {
                    if (ajaxUtil.success(data)) {
                        sendGoal = data.data
                    } else {
                        alert(data.msg);
                    }
                }, false, true, "get");
            }

            function distribution(x) {
                var addSendModal = {
                    modalBodyID: "addSendModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                    modalTitle: "发送对象",
                    modalClass: "modal-lg",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        var sendRows = $("#sendTable").bootstrapTable('getSelections');
                        if (sendRows.length == 0) {
                            alertUtil.error("错误，未勾选发送对象，请勾选后重试")
                            return true;
                        }else {
                            var sendList = [];
                            for (var i = 0; i < sendRows.length; i++) {
                                var entity = {
                                    itemcode: stringUtil.getUUID(),
                                    dateCode: uuid,
                                    receiverId: sendRows[i].username,
                                    receiverType: 0
                                };
                                if (x == 0){
                                    entity.receiverType = 0;
                                }else if (x == 1){
                                    entity.receiverType = 1;
                                }
                                sendList.push(entity)
                            }
                            var list = new Set(sendList);
                            sendList = Array.from(list);
                            var postEntity = {
                                dateCode: uuid
                            };
                            ajaxUtil.myAjax(null,"/postref/delPostRef",postEntity,function (data) {
                                if (ajaxUtil.success(data)) {
                                    ajaxUtil.myAjax(null, "/postref/createPostRef", sendList, function (data) {
                                        if (ajaxUtil.success(data)) {
                                            var zhusong = "";
                                            for (var i = 0; i < sendRows.length; i++) {
                                                zhusong = zhusong + sendRows[i].username + "；";
                                            }
                                            $("#masterSend").val(zhusong);
                                        }else {
                                            alert(data.msg);
                                        }
                                    }, false, true, "post");
                                }else {
                                    alert(data.msg);
                                }
                            },false,"","delete");
                        }
                        return true;
                    }
                };
                var addSendModal = modalUtil.init(addSendModal);
                if (Object.keys(sendGoal).length == 0) {
                    initExpert();
                }
                var sendCol = [
                    {checkbox: true},
                    {field: 'username', title: '账号'},
                    {field: 'cityid', title: '主管市区'},
                ];
                $('#sendTable').bootstrapTable('destroy');
                $('#sendTable').bootstrapTable({
                    toolbar: "#sendTable",
                    columns: sendCol,
                    striped: true,
                    clickToSelect: true,
                });
                $('#sendTable').bootstrapTable('load', Array.from(sendGoal));
                addSendModal.show();
            }

            $("#masterSend").unbind().on('click', function () {
                distribution(0);
            });
            $("#copySend").unbind().on('click', function () {
                distribution(1);
            });

            //主送目标
            /*let send = dictUtil.getDictByCode(dictUtil.DICT_LIST.areaAdmin);
            $("#masterSend").selectUtil(send);

            //console.log($("#copySendGoal").val())
            //抄送目标
            $("#copySendGoal").selectUtil(send);
            $("#add").unbind().on("click",function () {
                var str = $("#copySend").val();
                if (str.length === 0){
                    $("#copySend").val(send[0].text);
                }else {
                    $("#copySend").val($("#copySend").val()+" "+send[$("#copySendGoal").val()].text);
                }
                $("#copySendGoal option[value=" + $("#copySendGoal").val() + "]").remove();
            })
            $("#clear").unbind().on("click",function () {
                $("#copySend").val("");
                $("#copySendGoal").selectUtil(send);
            })*/

            //当前时间
            var nowTime = stringUtil.formatDateTime(new Date());
            //当前用户名
            var username = sessionStorage.getItem("username");

            $("#cancelbtn").unbind().on('click',function () {
                var url = "/document/post";
                orange.redirect(url);
            });

            //查询最大的文号
            var maxNum;
            $.ajax
            ({  cache: false, async: false, type: 'get', data: { aaa: "1" }, url: "/post/maxNum", success: function (data) {
                    maxNum = data;
                }
            });
            var newNum;
            if(maxNum.data == null || maxNum.data.postDocumentNum1 == "999"){
                newNum = "000"
            }else {
                maxNum.data.postDocumentNum1++;
                newNum = maxNum.data.postDocumentNum1;
            }
            function pad(x){
                var len = x.toString().length;
                while (len < 3){
                    x = "0" + x;
                    len++;
                }
                return x;
            }
            $("#postDocumentNum1").val(pad(newNum));


            $("#savebtn").unbind().on('click',function () {
                var PostEntity;
                var requestUrl;
                var operateMessage;
                var publicWay;
                var reason;
                if($("input[name='postPublicWay']:checked").val()=="0"){
                    publicWay="0";
                    reason = "";
                }else if($("input[name='postPublicWay']:checked").val()=="1"){
                    publicWay="1";
                    reason = "";
                }else if($("input[name='postPublicWay']:checked").val()=="2"){
                    publicWay="2";
                    reason = $("#postReason").val();
                }
                var normative;
                if($("input[name='postNormativeDocuments']:checked").val()=="y"){
                    normative="y";
                }else{
                    normative="n";
                }
                var secret;
                if($("input[name='postSecretRelated']:checked").val()=="y"){
                    secret="y";
                }else{
                    secret="n";
                }
                if (!isUpdate()){
                    requestUrl = "/post/createPost";
                    operateMessage = "保存发文信息成功";
                    PostEntity = {
                        itemcode: uuid,
                        postDocumentTitle : $("#postDocumentTitle").val(),
                        postPublicWay : publicWay,
                        postReason : reason,
                        postFairDepartmentReview : $("#postFairDepartmentReview").val(),
                        postNormativeDocuments : normative,
                        postSecretRelated : secret,
                        postPrinting : $("#postPrinting").val(),
                        postDocumentNum : $("#postDocumentNum").val(),
                        postDocumentNum1 : pad(newNum),
                        postDataStatus : "0",
                    };
                    var postFile = [];
                    postFile[0] = $("#upload_file")[0].files[0];
                    postFile[1] = $("#fairFile")[0].files[0];
                    var code1 = "1" + uuid.substring(1);
                    var code2 = "2" + uuid.substring(1);
                    ajaxUtil.postFileAjax(uuid,postFile[0], code1, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                    ajaxUtil.postFileAjax(uuid,postFile[1], code2, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));

                } else {
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    requestUrl = "/post/updatePost";
                    PostEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        postDocumentTitle : $("#postDocumentTitle").val(),
                        postPublicWay : publicWay,
                        postReason : $("#postReason").val(),
                        postFairDepartmentReview : $("#postFairDepartmentReview").val(),
                        postNormativeDocuments : normative,
                        postSecretRelated : secret,
                        postPrinting : $("#postPrinting").val(),
                        postDocumentNum : $("#postDocumentNum").val(),
                    };
                    operateMessage = "修改发文信息成功";
                    if (needData.fileName !== null){
                        ajaxUtil.myAjax(null,"/file/delete?dataCode="+needData.itemcode,null,function (data) {
                            if(!ajaxUtil.success(data)){
                                return alertUtil.warning("文件删除失败,可能是文件损坏或不存在了");
                            }
                        },false,"","get");
                        postFile = [];
                        postFile[0] = $("#upload_file")[0].files[0];
                        postFile[1] = $("#fairFile")[0].files[0];
                        code1 = "1" + needData.itemcode.substring(1);
                        code2 = "2" + needData.itemcode.substring(1);
                        ajaxUtil.postFileAjax(needData.itemcode,postFile[0], code1, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                        ajaxUtil.postFileAjax(needData.itemcode,postFile[1], code2, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                    }
                }
                ajaxUtil.myAjax(null,requestUrl,PostEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        ajaxUtil.myAjax(null,adviceUrl,AdviceEntity,function (data) {
                            if (ajaxUtil.success(data)){
                                alertUtil.info(operateMessage);
                                var url = "/document/post";
                                orange.redirect(url);
                            }else {
                                alertUtil.alert(data.msg);
                            }
                        },false,true);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });


            $("#submitbtn").unbind().on('click',function () {
                var PostEntity;
                var requestUrl;
                var operateMessage;
                var publicWay;
                var reason;
                if($("input[name='postPublicWay']:checked").val()=="0"){
                    publicWay="0";
                    reason = "";
                }else if($("input[name='postPublicWay']:checked").val()=="1"){
                    publicWay="1";
                    reason = "";
                }else if($("input[name='postPublicWay']:checked").val()=="2"){
                    publicWay="2";
                    reason = $("#postReason").val();
                }
                var normative;
                if($("input[name='postNormativeDocuments']:checked").val()=="y"){
                    normative="y";
                }else{
                    normative="n";
                }
                var secret;
                if($("input[name='postSecretRelated']:checked").val()=="y"){
                    secret="y";
                }else{
                    secret="n";
                }
                if (!isUpdate()){
                    requestUrl = "/post/createPost";
                    operateMessage = "提交发文信息成功";
                    PostEntity = {
                        itemcode: uuid,
                        postDocumentTitle : $("#postDocumentTitle").val(),
                        postPublicWay : publicWay,
                        postReason : reason,
                        postFairDepartmentReview : $("#postFairDepartmentReview").val(),
                        postNormativeDocuments : normative,
                        postSecretRelated : secret,
                        postPrinting : $("#postPrinting").val(),
                        postDocumentNum : $("#postDocumentNum").val(),
                        postDocumentNum1 : pad(newNum),
                        postDataStatus : "1",
                    };
                    var postFile = [];
                    postFile[0] = $("#upload_file")[0].files[0];
                    postFile[1] = $("#fairFile")[0].files[0];
                    var code1 = "1" + uuid.substring(1);
                    var code2 = "2" + uuid.substring(1);
                    ajaxUtil.postFileAjax(uuid,postFile[0], code1, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                    ajaxUtil.postFileAjax(uuid,postFile[1], code2, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));

                }
                else {
                    var needData = JSON.parse(localStorage.getItem("rowData"));
                    requestUrl = "/post/updatePost";
                    PostEntity = {
                        itemid: needData.itemid,
                        itemcode: needData.itemcode,
                        postDocumentTitle : $("#postDocumentTitle").val(),
                        postPublicWay : $("#postPublicWay").val(),
                        postReason : $("#postReason").val(),
                        postFairDepartmentReview : $("#postFairDepartmentReview").val(),
                        postNormativeDocuments : normative,
                        postSecretRelated : secret,
                        postPrinting : $("#postPrinting").val(),
                        postDocumentNum : $("#postDocumentNum").val(),
                    }
                    operateMessage = "修改发文信息成功";
                    if (needData.fileName !== null){
                        ajaxUtil.myAjax(null,"/file/delete?dataCode="+needData.itemcode,null,function (data) {
                            if(!ajaxUtil.success(data)){
                                return alertUtil.warning("文件删除失败,可能是文件损坏或不存在了");
                            }
                        },false,"","get");
                        postFile = [];
                        postFile[0] = $("#upload_file")[0].files[0];
                        postFile[1] = $("#fairFile")[0].files[0];
                        code1 = "1" + needData.itemcode.substring(1);
                        code2 = "2" + needData.itemcode.substring(1);
                        ajaxUtil.postFileAjax(needData.itemcode,postFile[0], code1, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                        ajaxUtil.postFileAjax(needData.itemcode,postFile[1], code2, sessionStorage.getItem("username"), sessionStorage.getItem("itemcode"));
                    }
                }
                ajaxUtil.myAjax(null,requestUrl,PostEntity,function (data) {
                    if(ajaxUtil.success(data)){
                        ajaxUtil.myAjax(null,adviceUrl,AdviceEntity,function (data) {
                            if (ajaxUtil.success(data)){
                                alertUtil.info(operateMessage);
                                var url = "/document/post";
                                orange.redirect(url);
                            }else {
                                alertUtil.alert(data.msg);
                            }
                        },false,true);
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    //console.log(tempdata);
                    if (tempdata.postFairDepartmentReview == "1"){
                        $('#fairFile1').attr('style',"display:none");
                    }
                    $("#postDocumentTitle").val(tempdata.postDocumentTitle);
                    if (tempdata.postPublicWay == "0"){
                        $("#pw1").prop("checked",true);
                    }else if (tempdata.postPublicWay == "1"){
                        $("#pw2").prop("checked",true);
                    }else if (tempdata.postPublicWay == "2"){
                        $("#pw3").prop("checked",true);
                        $('#postReason').attr('style',"display:block");
                    }
                    $("#postReason").val(tempdata.postReason);
                    $("#postFairDepartmentReview").val(tempdata.postFairDepartmentReview);
                    if (tempdata.postNormativeDocuments == "y"){
                        $("#g1").prop("checked",true);
                    }else {
                        $("#g2").prop("checked",true);
                    }
                    if (tempdata.postSecretRelated == "y"){
                        $("#s1").prop("checked",true);
                    }else {
                        $("#s2").prop("checked",true);
                    }
                    $("#postPrinting").val(tempdata.postPrinting);
                    $("#postDocumentNum").val(tempdata.postDocumentNum);
                    $("#postDocumentNum1").val(tempdata.postDocumentNum1);
                    var file = tempdata.filePath;
                    uploadImg.setImgSrc(file);
                }
            }());

            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

            /*上传附件*/
            document.getElementById('upload_file').onchange=function(){
                var len=this.files.length;
                $("#addFile").empty("p");
                for (var i = 0; i < len; i++) {
                    var name = this.files[i].name;
                    var j=i+1;
                    $("#addFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                };
                if(len>0){
                    $("#clsfile").css("display","block")
                }
            }
            document.getElementById('clsfile').onclick = function() {
                var obj = document.getElementById('upload_file');
                obj.outerHTML=obj.outerHTML;
                $("#clsfile").css("display","none");
                $("#addFile").empty("p");
            }

            /*上传公平竞争审查附件*/
            document.getElementById('fairFile').onchange=function(){
                var len=this.files.length;
                $("#addFairFile").empty("p");
                for (var i = 0; i < len; i++) {
                    var name = this.files[i].name;
                    var j=i+1;
                    $("#addFairFile").append('<p>附件'+j+'：&nbsp;'+ name +'&nbsp;</p>');
                };
                if(len>0){
                    $("#clsFairFile").css("display","block")
                }
            }
            document.getElementById('clsFairFile').onclick = function() {
                var obj = document.getElementById('fairFile');
                obj.outerHTML=obj.outerHTML;
                $("#clsFairFile").css("display","none");
                $("#addFairFile").empty("p");
            }

        })
})();
