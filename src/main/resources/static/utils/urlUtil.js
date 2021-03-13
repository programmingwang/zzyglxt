(function() {
    define('urlUtil', ['jquery'], function(jquery) {

        function getQueryVariable(variable)
        {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
            }
            return(false);
        }


        /* http://127.0.0.1:8020/Test/index.html#test?name=test */
        /* 获取完整URL */
        function getFullUrl(){
            return window.location.href;
        }


        function getUrlHash() {
            return window.location.hash;
        }

        //存放富文本编辑器上传的图片的服务器的ip以及应用的port
        function getEditorUrl(){
            return "http://42.193.46.47:8999"
        }



        var url;
        url = window.location.pathname; /* 获取文件路径（文件地址） */
        /* /Test/index.html */

        url = window.location.protocol; /* 获取协议 */
         /* http */

        url = window.location.host; /* 获取主机地址和端口号 */
         /* http://127.0.0.1:8020/ */

        url = window.location.hostname; /* 获取主机地址 */
         /* http://127.0.0.1/ */

        url = window.location.port; /* 获取端口号 */
         /* 8020 */

        url = window.location.hash; /* 获取锚点（“#”后面的分段） */
         /* #test?name=test */

        url = window.location.search; /* 获取属性（“?”后面的分段） */


        /* 如果需要URL中的某一部分，可以自己进行处理 */
        url = window.location.pathname;
        url = url.substring(url.lastIndexOf('/') + 1, url.length);
         /* /index.html */

        /*
         * 如果页面使用了框架（frameset）
         * 要获取到指定页面的URL
         * 只要把window换成指定的页面即可
         */
        /* 'frame'为指定页面的class名 */
        // var url = window.parent.frames['frame'].location.href;
        // /* 获取当前地址栏中显示的URL */
        // var url = window.parent.location.href;
        // /* window parent 可互换 */
        // var url = parent.window.location.href;

        return {
            getQueryVariable:getQueryVariable,
            getFullUrl:getFullUrl,
            getUrlHash:getUrlHash,
            getEditorUrl:getEditorUrl,
        }
    })
})();












