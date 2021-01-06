(function() {
    define('stringUtil', ['jquery'], function(jquery) {

        //所要判段的字符串为空
        function isBlank(str) {
            if(str != "" && str != null && str != "undefined") {
                return false;
            } else {
                return true;
            }
        }


        function cutString(str, len) {
            //length属性读出来的汉字长度为1
            if(str.length*2 <= len) {
                return str;
            }
            var strlen = 0;
            var s = "";
            for(var i = 0;i < str.length; i++) {
                s = s + str.charAt(i);
                if (str.charCodeAt(i) > 128) {
                    strlen = strlen + 2;
                    if(strlen >= len){
                        return s.substring(0,s.length-1) + "...";
                    }
                } else {
                    strlen = strlen + 1;
                    if(strlen >= len){
                        return s.substring(0,s.length-2) + "...";
                    }
                }
            }
            return s;
        }


        function getUUID() {
            function S4() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }



        function getDateStr(aDate) {
            if(aDate == null || typeof(aDate) == "undefined"){
                return "";
            }
            var oDate = new Date(aDate),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth()+1,
                oDay = oDate.getDate();
            var oDate = oYear +'年'+ gzmd(oMonth) +'月'+ gzmd(oDay) + "日";
            return oDate;
        }


        /*返回格式化时间2018-08-08*/
        function formatDate(dateTime){
            if(dateTime == null || typeof(dateTime) == "undefined"){
                return "";
            }
            var oDate = new Date(dateTime),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth()+1,
                oDay = oDate.getDate(),
                oTime = oYear +'-'+ gzmd(oMonth) +'-'+ gzmd(oDay) ;
            return oTime;
        }

        /*返回格式化时间2018 08.08*/
        function formatTime(dateTime){
            if(dateTime == null || typeof(dateTime) == "undefined"){
                return "";
            }
            var oDate = new Date(dateTime),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth()+1,
                oDay = oDate.getDate(),
                oTime = oYear +' '+ gzmd(oMonth) +'.'+ gzmd(oDay) ;
            return oTime;
        }

        function gzmd(aStr) {
            if(aStr < 10){
                aStr = '0'+ aStr;
            }
            return aStr
        }

        /*返回年月日时分秒格式 2018-08-08 08:08:08 */
        function formatDateTime(dateTime){
            if(dateTime == null){
                return "";
            }
            if(typeof(dateTime)=="undefined"){
                return "";
            }
            var oDate = new Date(dateTime),
                oYear = oDate.getFullYear(),
                oMonth = oDate.getMonth()+1,
                oDay = oDate.getDate(),
                oHour = oDate.getHours(),
                oMin = oDate.getMinutes(),
                oSen = oDate.getSeconds(),
                oTime = oYear +'-'+ gzmd(oMonth) +'-'+ gzmd(oDay)
                    +' '+ gzmd(oHour) +':'+ gzmd(oMin) +':'+gzmd(oSen);//最后拼接时间

            return oTime;
        }


        return {
            cutString:cutString,
            isBlank:isBlank,
            getUUID:getUUID,
            formatDateTime:formatDateTime,
            formatDate:formatDate,
            formatTime:formatTime,
        }
    })
})();



