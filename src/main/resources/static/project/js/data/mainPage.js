(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,selectUtil,stringUtil,dictUtil) {

        $(function (){
            function getMainData(url,targetId){
                ajaxUtil.myAjax(null,url,null,function (data){
                    if(ajaxUtil.success(data)){
                        if (data.data.length == 0){
                            $("#"+targetId+"").append('<li class="mainLi">当前模块下没有数据！</li>')
                        }else{
                            for(var i = 0; i<data.data.length; i++){
                                data.data[i].length >= 30
                                    ?
                                    $("#"+targetId+"").append('<li class="mainLi" >'+data.data[i].replace(data.data[i].substring(28,(data.data[i].length)),"......")+'</li>')
                                    :
                                    $("#"+targetId+"").append('<li class="mainLi" >'+data.data[i]+'</li>');
                            }
                        }
                    }else {
                        alertUtil.error("数据加载失败，请重试！")
                    }
                },"true",true,"get");
                return false;
            }

            getMainData("/datado/announcement/selectAnnMain","tzgg");
            getMainData("/datado/regulation/selectRegMain","zcfg");

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
            orange.redirect("/document/receipt");
            return false;
        });


    })
})();

