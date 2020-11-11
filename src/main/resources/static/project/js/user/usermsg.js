(function() {
    require(['jquery','alertUtil','ajaxUtil'], function (jquery,alertUtil,ajaxUtil) {

        ajaxUtil.myAjax(null,"/user/usermsg",null,function (data) {
            console.log(data)
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
        },false,"","get")
    })
})();

