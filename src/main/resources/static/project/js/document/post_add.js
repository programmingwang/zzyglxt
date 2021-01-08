(function () {
    require(['jquery','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','distpicker','selectUtil','checkUtil','uploadImg'],
        function (jquery,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,distpicker,selectUtil,checkUtil,uploadImg) {

            uploadImg.init();

            //公开方式
            var publicWay = dictUtil.getDictByCode(dictUtil.DICT_LIST.postPublicWay);
            $("#postPublicWay").selectUtil(publicWay);
            $('#postPublicWay').change(function () {
                if($("#postPublicWay").val() == "2"){
                    $('#reason').attr('style',"display:block");
                    $('#postReason').attr('style',"display:block");
                }else {
                    $('#reason').attr('style',"display:none");
                    $('#postReason').attr('style',"display:none");
                    $("#postReason").val() == "";
                }
            });

            //不公开理由
            var reason = dictUtil.getDictByCode(dictUtil.DICT_LIST.postReason);
            $("#postReason").selectUtil(reason);

            //是否需要公平竞争审查
            var fair = dictUtil.getDictByCode(dictUtil.DICT_LIST.postFairDepartmentReview);
            $("#postFairDepartmentReview").selectUtil(fair);
            $('#postFairDepartmentReview').change(function () {
                if($("#postFairDepartmentReview").val() == "1"){
                    $('#fairFile1').attr('style',"display:none");
                    var obj = document.getElementById('fairFile');
                    obj.outerHTML=obj.outerHTML;
                    $("#clsfile").css("display","none");
                    $("#addFile").empty("p");
                }else {
                    $('#fairFile1').attr('style',"display:block");
                }
            });

            //文号
            var num = dictUtil.getDictByCode(dictUtil.DICT_LIST.postDocumentNum);
            $("#postDocumentNum").selectUtil(num);

            //抄送目标
            $("#add").unbind().on("click",function () {
                var str = $("#hospitalKeySpecialty").val();
                if (str.length === 0){
                    $("#hospitalKeySpecialty").val($("#specialtyName").val());
                }else {
                    $("#hospitalKeySpecialty").val($("#hospitalKeySpecialty").val() + " " + $("#specialtyName").val());
                }
                $("#specialtyName option[value=" + $("#specialtyName").val() + "]").remove();
            })
            $("#clear").unbind().on("click",function () {
                $("#hospitalKeySpecialty").val("");
            })

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
            ({  cache: false,
                async: false,
                type: 'get',
                data: { aaa: "1" },
                url: "/post/maxNum",
                success: function (data) {
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

            //结合发文管理增加意见
            var uuid = stringUtil.getUUID();
            var adviceUrl = "/advice/createAdvice";
            var AdviceEntity = {
                itemcode : stringUtil.getUUID(),
                dataCode : uuid,
                initial : username,
                initialDate : nowTime,
            };

            $("#savebtn").unbind().on('click',function () {
                var PostEntity;
                var requestUrl;
                var operateMessage;
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
                        postPublicWay : $("#postPublicWay").val(),
                        postReason : $("#postReason").val(),
                        postFairDepartmentReview : $("#postFairDepartmentReview").val(),
                        postNormativeDocuments : normative,
                        postSecretRelated : secret,
                        postPrinting : $("#postPrinting").val(),
                        postDocumentNum : $("#postDocumentNum").val(),
                        postDocumentNum1 : pad(newNum),
                        postDataStatus : "0",
                    };
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
                }

                fileUtil.handleFile(isUpdate(), PostEntity.itemcode, $("#upload_file")[0].files[0]);

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

            });


            $("#submitbtn").unbind().on('click',function () {
                var PostEntity;
                var requestUrl;
                var operateMessage;
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
                        postPublicWay : $("#postPublicWay").val(),
                        postReason : $("#postReason").val(),
                        postFairDepartmentReview : $("#postFairDepartmentReview").val(),
                        postNormativeDocuments : normative,
                        postSecretRelated : secret,
                        postPrinting : $("#postPrinting").val(),
                        postDocumentNum : $("#postDocumentNum").val(),
                        postDocumentNum1 : pad(newNum),
                        postDataStatus : "1",
                    };
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
                }

                fileUtil.handleFile(isUpdate(), PostEntity.itemcode, $("#upload_file")[0].files[0]);

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

            });

            (function init() {
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    console.log(tempdata);
                    if (tempdata.postFairDepartmentReview == "1"){
                        $('#fairFile1').attr('style',"display:none");
                    }
                    $("#postDocumentTitle").val(tempdata.postDocumentTitle);
                    $("#postPublicWay").val(tempdata.postPublicWay);
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
                    console.log(tempdata);
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

        })
})();
