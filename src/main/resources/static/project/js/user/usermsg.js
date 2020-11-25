(function () {
    require(['jquery', 'ajaxUtil', 'stringUtil', 'uploadImg', 'modalUtil', 'objectUtil'],
        function (jquery, ajaxUtil, stringUtil, uploadImg, modalUtil, objectUtil) {

            ajaxUtil.myAjax(null, "/user/usermsg", null, function (data) {
                if (data && data.code === 88888) {
                    localStorage.setItem('user', JSON.stringify(data.data));
                    uploadImg.init();
                    uploadImg.setImgSrc(data.data.portrait);
                    $("#username").val(data.data.username);
                    $("#name").val(data.data.name);
                    $("#gender").val(data.data.gender);
                    $("#email").val(data.data.email);
                    $("#idcardType").val(data.data.idcardType);
                    $("#idcardNo").val(data.data.idcardNo);
                    $("#contacts").val(data.data.contacts);
                    $("#mobilePhone").val(data.data.mobilephone);
                } else {
                    alertUtil.error(data.msg)
                }
            }, false, "", "get");

            $("#cancelBtn").click(function () {
                window.history.back()
            });

            $("#modifymsgBtn").unbind().on('click', function () {
                $("input").removeAttr("disabled");
            });

            $("#modifypwdBtn").unbind().on('click', function () {
                $("input").removeAttr("disabled");
            });

        });
})();


