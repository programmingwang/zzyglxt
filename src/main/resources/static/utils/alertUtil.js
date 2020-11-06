(function() {
    define('alertUtil', ['jquery','bootstrapNotify'], function(jquery,bootstrapNotify) {

        function myalert(str) {
            alert(str)
        }

        function success(str) {
            myNotify("成功信息："+ str,'success')
        }
        function warning(str) {
            myNotify("警告信息："+ str,'warning')
        }
        function info(str) {
            myNotify("提示信息："+ str,'info')
        }
        function error(str) {
            myNotify("错误信息："+ str,'danger')
        }



        function myNotify(message,type) {
            $.notify({
                icon: 'glyphicon glyphicon-star',
                message: message
            },{
                type:type,
                placement: {
                    from: "top",
                    align: "center"
                },
                offset:50,
            });
        }



        return {
            alert:myalert,
            success:success,
            info:info,
            warning:warning,
            error:error,
        }
    })
})();



