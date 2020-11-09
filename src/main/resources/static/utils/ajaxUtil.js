(function() {
    define('ajaxUtil', ['jquery','objectUtil','stringUtil'], function(jquery, objectUtil,stringUtil) {


        var successCode = "88888";
        var notLoggedInCode= "100900";


        function success(data) {
            if(objectUtil.isEmptyObject(data)){
                return false;
            }
            if(stringUtil.isBlank(data.code)){
                return false;
            }
            if(successCode == data.code){
                return true;
            }else{
                return false;
            }
        }

        function notLoggedIn(data) {
            if(objectUtil.isEmptyObject(data)){
                return false;
            }
            if(stringUtil.isBlank(data.code)){
                return false;
            }
            if(notLoggedInCode == data.code){
                return true;
            }else{
                return false;
            }
        }

        function myAjax(aButton, url, param, fun, async, isReqJson, type="post") {
            console.log(!objectUtil.strIsBlank(isReqJson));
            var _setting =
                {
                    url: url,
                    async: (async == undefined) ? true : async,
                    type: type,
                    dataType: "json",
                }

            if (!objectUtil.strIsBlank(isReqJson)) {
                _setting.contentType = "application/json;charset=utf-8";
                _setting.data = JSON.stringify(param);
            }else{
                _setting.data = param;
            }


            _setting.beforeSend = function () {
                if (aButton != null) {
                    aButton.attr({"disabled": "disabled"});
                }
            };
            _setting.success = function (data) {
                try{
                    if(!objectUtil.isEmptyObject(data)){
                        if(notLoggedInCode == data.code){
                            window.location.href = "/userLogin";
                        }
                    }
                    fun(data);
                }catch (e) {

                }finally {
                    if (aButton != null) {
                        aButton.removeAttr("disabled");
                    }
                }
            };
            _setting.error = function () {
                console.log("请求失败URI："+ url);
            };
            _setting.complete = function (XMLHttpRequest) {
                if (aButton != null) {
                    aButton.removeAttr("disabled");
                }
            };

            $.ajax(_setting);
        }









        return {
            success:success,
            notLoggedIn:notLoggedIn,
            myAjax:myAjax
        }
    })
})();