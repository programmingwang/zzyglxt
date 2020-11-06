(function() {
    define('objectUtil', ['jquery'], function(jquery) {



        //所要判段的字符串为空
        function strIsBlank(str) {
            if(str != "" && str != null && str != "undefined") {
                return false;
            } else {
                return true;
            }
        }

        //判断对象为空对象
        function isEmptyObject(obj){
            for(var key in obj){
                return false;
            };
            return true
        };

        return {
            strIsBlank:strIsBlank,
            isEmptyObject:isEmptyObject,
        }
    })
})();