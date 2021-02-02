(function () {
    require(['jquery','ajaxUtil','stringUtil','objectUtil'],
        function (jquery,ajaxUtil,stringUtil, objectUtil) {

            var type = isUpdate() ? "put":"post";

            //请求url
            var url = "/industrialdevelop/talrec";

            //上一层url
            var purl = "/industrialdevelop/recruit";

            const editor = objectUtil.wangEditorUtil();

            const editor2 = objectUtil.wangEditorUtil('#div2');

            var itemcode = stringUtil.getUUID();


            $("#cancelBtn").click(function () {
                orange.redirect(purl)
            });

            function generateParam(){
                var param = {};
                param.recruitmentTitle = $("#recruitmentTitle").val();
                param.recruitmentPosition = $("#recruitmentPosition").val();
                param.recruitmentCount = $("#recruitmentCount").val();
                param.salary = $("#salary").val();
                param.workplace = $("#workplace").val();
                param.education = $("#education").val();
                param.emali = $("#emali").val();
                param.postDuty = $("#div1 .w-e-text").html();
                param.postDescr  = $("#div2 .w-e-text").html();
                param.orgCode = sessionStorage.getItem("orgCode");
                param.itemcode = itemcode;
                return param;
            }

            $("#saveBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "0";

                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(purl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            })

            $("#submitBtn").unbind('click').on('click',function () {
                var param = generateParam();
                param.status = "1";
                ajaxUtil.myAjax(null,url,param,function (data) {
                    if(ajaxUtil.success(data)){
                        orange.redirect(purl)
                    }else {
                        alert(data.msg)
                    }
                },true,"123",type);
                return false;
            })

            var init = function () {
                if (isUpdate()){
                    $(".titleCSS").text("修改招聘信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#recruitmentTitle").val(tempdata.recruitmentTitle);
                    $("#recruitmentPosition").val(tempdata.recruitmentPosition);
                    $("#recruitmentCount").val(tempdata.recruitmentCount);
                    $("#workplace").val(tempdata.workplace);
                    $("#education").val(tempdata.education);
                    $("#emali").val(tempdata.emali);
                    editor.txt.html(tempdata.postDuty);
                    editor2.txt.html(tempdata.postDescr);
                    itemcode = tempdata.itemcode;
                }
                init = function () {

                }
            };
            init();


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }
    })
})();


