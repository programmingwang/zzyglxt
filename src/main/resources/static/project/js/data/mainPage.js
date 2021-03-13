(function () {
    require(['jquery', 'ajaxUtil','objectUtil','alertUtil','modalUtil'],
        function (jquery,ajaxUtil,objectUtil,alertUtil,modalUtil) {


        $(function (){
            var rolename = sessionStorage.getItem("rolename");
            getMainData("/datado/announcement/selectAnnMain", "tzgg","/datado/announcement/selectOne/").then(r => {
                getMainData("/datado/regulation/selectRegMain", "zcfg","/datado/regulation/selectOne/").then(r1 => {
                    getMainData("/datado/rules/selectRulesMain","gzzd","/datado/rules/selectOne/").then(r2 => {
                        getMainData("/datado/leader/selectLeaderMain", "ldjh","/datado/leader/selectOne/").then(r3 => {
                            if(rolename === "政务资源处长" || rolename === "政务资源科员" ||rolename === "政务资源综合处处长" ||
                            // if(rolename === "政务资源处长" ||rolename === "政务资源综合处处长" ||
                                rolename === "政务资源局长" || rolename === "政务资源分管局长" || rolename === "中医处分管局长" ||
                                rolename === "中药处分管局长" || rolename === "综合处分管局长" || rolename === "法规监督处分管局长") {
                                getMainData("/post/getPostFileForMain", "gxwj").then(r4 => {
                                    if (rolename === "政务资源科员"){
                                        getMainData("/post/getPostForMainPage?status=1", "wdbg","/post/selectOne/");
                                    }else if (rolename === "政务资源处长"){
                                        getMainData("/post/getPostForMainPage?status=2", "wdbg","/post/selectOne/");
                                    }else if (rolename === "政务资源综合处处长"){
                                        getMainData("/post/getPostForMainPage?status=3", "wdbg","/post/selectOne/");
                                    }else if (rolename === "政务资源分管局长" || rolename === "中医处分管局长" ||
                                        rolename === "中药处分管局长" || rolename === "综合处分管局长" || rolename === "法规监督处分管局长"){
                                        getMainData("/post/getPostForMainPage?status=4", "wdbg","/post/selectOne/");
                                    }else if (rolename === "政务资源局长"){
                                        getMainData("/post/getPostForMainPage?status=5", "wdbg","/post/selectOne/");
                                    }
                                } );
                            }else {
                                //其余的查询收文信息
                                getMainData("/receipt/getReceiptFileForMain", "gxwj").then(r4 => {
                                    getMainData("/receipt/selectForMain","wdbg","/receipt/selectOne/")
                                });
                            }
                        });
                    });
                });
            });

            var isClick = true;
            window.getOneData = function(id, code, url){
                if(isClick) {
                    isClick = false;
                    //事件
                    url += id+"/"+code;
                    ajaxUtil.myAjax(null,url,null,function (data){
                        if(ajaxUtil.success(data)){
                            if(url.indexOf("/post/") !== -1){
                                localStorage.setItem("viewRowData", JSON.stringify(data.data));
                                localStorage.setItem("comeFromMain","true");
                                orange.redirect("/document/post_view");
                            }else if(url.indexOf("/receipt/") !== -1){
                                localStorage.setItem("viewRowData", JSON.stringify(data.data));
                                localStorage.setItem("comeFromMain","true");
                                orange.redirect("/document/viewreceipt");
                            } else {
                                var myViewModalData ={
                                    modalBodyID : "myViewDataModal", //公用的在后面给span加不同的内容就行了，其他模块同理
                                    modalTitle : "查看详情",
                                    modalClass : "modal-lg",
                                    confirmButtonStyle: "display:none",
                                };
                                var myModal = modalUtil.init(myViewModalData);
                                $("#dataTitle").val(data.data.dataTitle);
                                $("#dataSource").val(data.data.dataSource);
                                $("#dataContent").html(data.data.dataContent);
                                $("#creater").val(data.data.creater);
                                $("#itemCreateAt").val(data.data.itemcreateat);
                                $("#imgDiv").remove();
                                $("#author").remove();
                                $("#fileType").remove();
                                $("#zszt").remove();
                                $('#dataTitleSpan').html("标题：");
                                $("#fileDiv").remove();

                                myModal.show();
                            }

                        }else {
                            alertUtil.error("数据加载失败，请重试！")
                        }
                    },true,true,"get");
                    //定时器
                    setTimeout(function() {
                        isClick = true;
                    }, 3000);//三秒内不能重复点击
                }else{
                    alertUtil.warning("请勿重复点击！！")
                }
                return false;
            }

            async function getMainData(url,targetId,backUrl){
                ajaxUtil.myAjax(null,url,null,function (data){
                    if(ajaxUtil.success(data)){
                        if (data.data.length == 0){
                            $("#"+targetId+"").append('<li class="mainLi">当前模块下没有数据！</li>')
                        }else{
                            for(var i = 0; i<data.data.length; i++){
                                if(data.data[i].filePath == null || data.data[i].filePath == undefined){
                                    data.data[i].dataTitle.length >= 35
                                        ?
                                        $("#"+targetId+"").append(`<li class="mainLi"><a href="javascript:void(0);" onclick="getOneData('${data.data[i].itemid}','${data.data[i].itemcode}','${backUrl}')">${data.data[i].dataTitle.replace(data.data[i].dataTitle.substring(35, (data.data[i].dataTitle.length)), "......")}</a></li>`)
                                        :
                                        $("#"+targetId+"").append(`<li class="mainLi"><a href="javascript:void(0);" onclick="getOneData('${data.data[i].itemid}','${data.data[i].itemcode}','${backUrl}')">${data.data[i].dataTitle}</a></li>`);
                                }else {
                                    data.data[i].fileName.length >= 30
                                        ?
                                        $("#"+targetId+"").append('<li class="mainLi"><a href='+data.data[i].filePath+'>'+data.data[i].fileName.replace(data.data[i].fileName.substring(28,(data.data[i].fileName.length)),"......")+'</a></li>')
                                        :
                                        $("#"+targetId+"").append('<li class="mainLi"><a href='+data.data[i].filePath+'>'+data.data[i].fileName+'</a></li>');
                                }

                            }
                        }
                    }else {
                        alertUtil.error("数据加载失败，请重试！")
                    }
                },true,true,"get");
                return false;
            }

        });

        function jumpToMore(url, jump){
            var roleName = sessionStorage.getItem("rolename");
            if(roleName === '政务资源市部门'||roleName === '政务资源县部门'){
                alertUtil.warning("您无法跳转到这个菜单！")
                return false;
            }else {
                orange.redirect(url, jump);
            }
        }

        $("#tzgggd").unbind().on('click',function () {
            jumpToMore("/data/dataAnnouncement",true)
            return false;
        });

        $("#zcfggd").unbind().on('click',function () {
            jumpToMore("/data/dataRegulation",true);
            return false;
        });

        $("#gzzdgd").unbind().on('click',function () {
            jumpToMore("/data/dataRules",true);
            return false;
        });

        $("#ldjhgd").unbind().on('click',function () {
            jumpToMore("/data/dataLeader",true);
            return false;
        });

        $("#wdbggd").unbind().on('click',function (){
            var rolename = sessionStorage.getItem("rolename");
            if(rolename == "政务资源处长" || rolename == "政务资源科员" || rolename == "政务资源综合处处长" ||
                rolename == "政务资源局长" || rolename == "政务资源分管局长" || rolename == "中医处分管局长" ||
                rolename == "中药处分管局长" || rolename == "综合处分管局长" || rolename == "法规监督处分管局长"){
                orange.redirect("/document/post",true);
            }else{
                orange.redirect("/document/receipt",true);
            }
            return false;
        });

        $("#gxwjgd").unbind().on('click',function (){
            var rolename = sessionStorage.getItem("rolename");
            if(rolename == "政务资源处长" || rolename == "政务资源科员" || rolename == "政务资源综合处处长" ||
                rolename == "政务资源局长" || rolename == "政务资源分管局长" || rolename == "中医处分管局长" ||
                rolename == "中药处分管局长" || rolename == "综合处分管局长" || rolename == "法规监督处分管局长"){
                orange.redirect("/document/post",true);
            }else{
                orange.redirect("/document/receipt",true);
            }
                return false;
        });



    })
})();

