(function() {
    require(['jquery','alertUtil','ajaxUtil'], function (jquery,alertUtil,ajaxUtil) {

        ajaxUtil.myAjax(null,"/user/usermsg",null,function (data) {
            if(data && data.code === 88888) {
                $(".accountName").text(data.data.username);
                $(".userName").text(data.data.name);
                $(".sex").text(data.data.gender);
                $(".IDcardType").text(data.data.idcardType);
                $(".IDNo").text(data.data.idcardNo);
                $(".email").text(data.data.email);
                $(".mobilePhone").text(data.data.mobilephone);
            }else{
                alertUtil.error(data.msg)
            }
        },false,"","get");

        // $(".btn").on("click",function () {
        //     ajaxUtil.myAjax(null,"/user/updateusermsg",null,function (data) {
        //         if(data && data.code === 88888){
        //             window.location.reload()
        //         }else{
        //             alertUtil.alert(data.msg);
        //         }
        //     },false)
        // })


    });

})();

