(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','fileUtil','dictUtil','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,fileUtil,dictUtil,modalUtil) {

            // 初始化富文本框
            const editor = objectUtil.wangEditorUtil();
            var updateStatus = isUpdate();
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var returmUrl = "/data/dataRules";

            /**
             * 校验文本是否为空
             * tips：提示信息
             * 使用方法：$("#id").validate("提示文本");
             * @itmyhome
             */
            $.fn.validate = function(tips){

                if($(this).val() == "" || $.trim($(this).val()).length == 0){
                    alert(tips + "不能为空！");
                    throw SyntaxError(); //如果验证不通过，则不执行后面
                }
            }

            // 取消按钮设置跳转
            $("#cancelbtn").unbind().on('click',function () {
                orange.redirect(returmUrl);
            });

            //保存和提交调用函数，保存和提交只是状态码不同
            function add(addStatus){
                let entity;
                let requestUrl = "/datado/rules/rules";
                let requestType;
                if(updateStatus){
                    requestType = "put";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode,
                    };
                }else{
                    requestType = "post";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                        dataType: "规章制度",
                    };
                }
                entity["dataStatus"] = addStatus;
                entity["dataTitle"] = $("#dataTitle").val();
                entity["dataSource"] = $("#dataSource").val();
                entity["dataContent"] = editor.txt.html();

                fileUtil.handleFile(updateStatus, entity.itemcode, $("#upload_file")[0].files[0]);

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID :"myTopicSubmitTip",
                            modalTitle : "提示",
                            modalClass : "modal-lg",
                            cancelButtonStyle: "display:none",
                            modalConfirmFun:function (){
                                orange.redirect(returmUrl);
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                        return false;
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true,requestType);
                return false;
            }

            // 保存按钮
            $("#btn_save").unbind().on('click',function () {
                //提示必填信息
                $("#dataTitle").validate("标题");
                $("#dataSource").validate("来源");

                add("0");
            });

            // 提交按钮
            $("#submitbtn").unbind().on('click',function () {
                //提示必填信息
                $("#dataTitle").validate("标题");
                $("#dataSource").validate("来源");

                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        add('1');
                        return true;
                    },
                };
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            //页面初始化，即编辑操作设置初始数据
            (function init() {
                if (isUpdate()){
                    $(".titleCSS").text("修改规章制度")
                    $("#dataTitle").val(tempdata.dataTitle);
                    $("#dataSource").val(tempdata.dataSource);
                    editor.txt.html(tempdata.dataContent);
                    $("#addFile").text(tempdata.fileName);
                }
            }());

            //判断编辑还是新增
            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
            /*
           上传文件
           */
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
                $("#upload_file").val("");
                $("#clsfile").css("display","none");
                $("#addFile").empty("p");
            }

        })
})();
