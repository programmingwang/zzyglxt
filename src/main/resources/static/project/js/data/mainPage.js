(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,selectUtil,stringUtil,dictUtil) {

        $(function (){

            var type = "get";
            ajaxUtil.myAjax(null,"/datado/announcement/selectAll?status="+status,null,function (data){
                console.log(data);
                // $("#tzgg").append('<li class="mainLi" >'+data.data+'</li>');
            },"true",true,type);

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

