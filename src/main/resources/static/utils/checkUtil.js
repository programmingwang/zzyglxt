//校验类工具

(function () {
    define("checkUtil",["jquery"],function (jquery) {
        // 验证身份证
        function isCardNo(card) {
            var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            return pattern.test(card);
        }

        function isNullStr(str) {
            if(str == null || str == ""){
                return true;
            }
        }

        //验证数字
        function isNumber(card) {
            var pattern = /^[0-9]*$/;
            return pattern.test(card);
        }

        //验证电话
        function isTel(card) {
            var pattern = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            return pattern.test(card);
        }

        // 验证手机号
        function isPhoneNo(phone) {
            var pattern = /^1[3456789]\d{9}$/;
            return pattern.test(phone);
        }

        //验证座机和手机号
        function regxTest (val) {
            let phone = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))[0-9]{8}$/;
            let ring = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
            return phone.test(val) || ring.test(val);
        }


        function isEmail(aEM){
            var myreg = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            return myreg.test(aEM);
        }

        //6位 数字、英文
        function vailPasswrod(aPass){
            var myRegex = new RegExp("^(?=.{6,})((?=.*[A-Z])|(?=.*[a-z])|(?=.*[0-9])).*$", "g");
            if(myRegex.test(aPass)){
                return true;
            }else{
                return false;
            }
        }
        //校验用户名（6-12位数字和字母的结合）
        function vailUsername(aPass){
            var myRegex = new RegExp("^(?=.{6,})((?=.*[A-Z])|(?=.*[a-z])|(?=.*[0-9])).*$", "g");
            if(myRegex.test(aPass)){
                return true;
            }else{
                return false;
            }
        }

        //验证是否是日期
        function isDate(date){
            return (new Date(date).getDate()==date.substring(date.length-2));
        }

        return{
            isCardNo:isCardNo,
            isNumber:isNumber,
            isTel:isTel,
            isPhoneNo:isPhoneNo,
            regxTest:regxTest,
            isEmail:isEmail,
            vailPasswrod:vailPasswrod,
            isDate:isDate,
            vailUsername:vailUsername,
            isNullStr:isNullStr
        }
    })
})()