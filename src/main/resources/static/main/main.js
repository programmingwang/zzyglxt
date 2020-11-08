(function() {
    'use strict';  //严格使用
    //	获取浏览器版本
    function getBrowserVersion() {

        var userAgent = navigator.userAgent;
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera,
            isChrome = userAgent.indexOf("Chrome") > -1,
            isFF = userAgent.indexOf("Firefox") > -1,
            isOpera = userAgent.indexOf("Opera") > -1,
            isSafari = userAgent.indexOf("Safari") > -1;
        if(isChrome){
            return 'Chrome';
        }
        if(isIE){

            var IE6 = false, IE7 = false, IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE6 = fIEVersion == 6;
            IE7 = fIEVersion == 7;
            IE8 = fIEVersion == 8;
            if (IE6) {
                return "IE6";
            }
            if (IE7) {
                return "IE7";
            }
            if (IE8) {
                return "IE8";
            }
        }
        if(isFF) {
            return "FF";
        }
        if(isOpera) {
            return "Opera";
        }
        if(isSafari) {
            return "Safari";
        }
    }

    var bv = getBrowserVersion();
    if(bv == 'IE8' || bv == 'IE7' || bv == 'IE6') {

    }
//	应用组件相关配置
    require.config({
        paths: {

            //component
            jquery: '../component/jquery@3.5.1/jquery.min',
            bootstrap: '../component/bootstrap@4.5.2/js/bootstrap.min',
            bootstrapBundle: '../component/bootstrap@4.5.2/js/bootstrap.bundle.min',
            bootstrapNotify : '../component/bootstrap-notify@3.1.3/bootstrap-notify.min',
            select2: '../component/select2@4.1.0/select2.min',
            aes: '../component/cryptojsdevelop/aes',
            core: '../component/cryptojsdevelop/core',
            cipher: '../component/cryptojsdevelop/cipher-core',
            datetimepicker: '../component/bootstrap-datetimepicker@4.7.14/bootstrap-datetimepicker.min',
            datetimepickerZh: '../component/bootstrap-datetimepicker@4.7.14/bootstrap-datetimepicker.zh-CN',
            popper: '../component/popper@1.16.0/popper.min',
            html5shiv: '../component/html5shiv@3.7.3/html5shiv-printshiv',
            respond: '../component/respond@1.4.2/respond.min',
            myBootstrapTable: '../component/bootstrap-table@1.15.3/bootstrap-table.min',
            bootstrapTableLocalAll: '../component/bootstrap-table@1.15.3/bootstrap-table-locale-all.min',
            wangEditor: '../component/wangEditor/wangEditor.min',



            //utils
            objectUtil:'../utils/objectUtil',
            ajaxUtil:'../utils/ajaxUtil',
            urlUtil:'../utils/urlUtil',
            bootstrapTableUtil:'../utils/bootstrapTableUtil',
            checkUtil:'../utils/checkUtil',
            alertUtil:'../utils/alertUtil',
            stringUtil:'../utils/stringUtil',
            dictUtil:'../utils/dictUtil',
            modalUtil:'../utils/modalUtil',
            selectUtil:'../utils/selectUtil',
            modalHtml:'../utils/modalHtml',


            //project
            orange: '../project/js/orange',
            userLogin: '../project/js/user/login',
            index: '../project/js/index',

        },
        map: {
            '*': {
                'popper.js': 'popper'
            }
        }
    });


    //根据path 加载JS
    var rArr = [
        {path:"/main",jspath:"index"},
        {path:"/userLogin",jspath:"userLogin"}

    ];


    function loadJS(url,v){
        switch (url) {
            case "/main":{
                require(['orange'], function(orange) {
                    $(function() {
                        orange.start();
                    });
                });
                break;
            }
            default:{
                require([v], function() {});
                break;
            }
        }
    }


    //	加载组件orange并启动应用
    var url = window.location.pathname;

    for(var i=0;i<rArr.length;i++){
        if(url === rArr[i].path){
            loadJS(url,rArr[i].jspath);
        }
    }
})();