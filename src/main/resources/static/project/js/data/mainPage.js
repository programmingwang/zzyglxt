(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,selectUtil,stringUtil,dictUtil) {

        $(function (){
            var rolename = sessionStorage.getItem("rolename");
            async function getMainData(url,targetId){
                ajaxUtil.myAjax(null,url,null,function (data){
                    if(ajaxUtil.success(data)){
                        if (data.data.length == 0){
                            $("#"+targetId+"").append('<li class="mainLi">当前模块下没有数据！</li>')
                        }else{
                            for(var i = 0; i<data.data.length; i++){
                                if(typeof data.data[i] !== "object"){
                                    data.data[i].length >= 35
                                        ?
                                        $("#"+targetId+"").append('<li class="mainLi" >'+data.data[i].replace(data.data[i].substring(35,(data.data[i].length)),"......")+'</li>')
                                        :
                                        $("#"+targetId+"").append('<li class="mainLi" >'+data.data[i]+'</li>');
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

            getMainData("/datado/announcement/selectAnnMain", "tzgg").then(r => {
                getMainData("/datado/regulation/selectRegMain", "zcfg").then(r1 => {
                    getMainData("/datado/rules/selectRulesMain","gzzd").then(r2 => {
                        getMainData("/datado/leader/selectLeaderMain", "ldjh").then(r3 => {
                            if(rolename === "政务资源处长" || rolename === "政务资源科员" || rolename === "政务资源综合处处长" ||
                                rolename === "政务资源局长" || rolename === "政务资源分管局长" || rolename === "中医处分管局长" ||
                                rolename === "中药处分管局长" || rolename === "综合处分管局长" || rolename === "法规监督处分管局长") {
                                getMainData("/post/getPostFileForMain", "gxwj").then(r4 => {
                                    if (rolename === "政务资源科员"){
                                        getMainData("/post/getPostForMainPage?status=1", "wdbg");
                                    }else if (rolename === "政务资源处长"){
                                        getMainData("/post/getPostForMainPage?status=2", "wdbg");
                                    }else if (rolename === "政务资源综合处处长"){
                                        getMainData("/post/getPostForMainPage?status=3", "wdbg");
                                    }else if (rolename === "政务资源分管局长" || rolename === "中医处分管局长" ||
                                        rolename === "中药处分管局长" || rolename === "综合处分管局长" || rolename === "法规监督处分管局长"){
                                        getMainData("/post/getPostForMainPage?status=4", "wdbg");
                                    }else if (rolename === "政务资源局长"){
                                        getMainData("/post/getPostForMainPage?status=5", "wdbg");
                                    }
                                } );
                            }else {
                                //其余的查询收文信息
                            }
                        });
                    });
                });
            });






        });

        $("#tzgggd").unbind().on('click',function () {
                orange.redirect("/data/dataAnnouncement");
                return false;
        });

        $("#zcfggd").unbind().on('click',function () {
            orange.redirect("/data/dataRegulation");
            return false;
        });

        $("#gzzdgd").unbind().on('click',function () {
            orange.redirect("/data/dataRules");
            return false;
        });

        $("#ldjhgd").unbind().on('click',function () {
            orange.redirect("/data/dataLeader");
            return false;
        });

        $("#wdbggd").unbind().on('click',function (){
            var rolename = sessionStorage.getItem("rolename");
            if(rolename == "政务资源处长" || rolename == "政务资源科员" || rolename == "政务资源综合处处长" ||
                rolename == "政务资源局长" || rolename == "政务资源分管局长" || rolename == "中医处分管局长" ||
                rolename == "中药处分管局长" || rolename == "综合处分管局长" || rolename == "法规监督处分管局长"){
                orange.redirect("/document/post");
            }else{
                orange.redirect("/document/receipt");
            }
            return false;
        });


    })
})();

