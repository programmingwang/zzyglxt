(function() {
    define('ajaxUtil', ['jquery','objectUtil','stringUtil','alertUtil'], function(jquery, objectUtil,stringUtil,alertUtil) {


        var successCode = 88888;
        var notLoggedInCode= 20001;


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
            var _setting =
                {
                    url: url,
                    async: (async == undefined) ? true : async,
                    type: type,
                    dataType: "json"
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
            _setting.error = function (data) {
                if(data.responseJSON.msg){
                    alertUtil.error(data.responseJSON.msg);
                }else{
                    alertUtil.error(data.responseJSON.message);
                }

                console.log("请求失败URI："+ url);
            };
            _setting.complete = function (XMLHttpRequest) {
                if (aButton != null) {
                    aButton.removeAttr("disabled");
                }
            };

            $.ajax(_setting);
        }

        function fileAjax(dataCode, file, uploader,uploaderCode){
            var formData = new FormData();
            formData.append("dataCode",dataCode);
            formData.append("file",file);
            formData.append("itemcode",stringUtil.getUUID());
            formData.append("uploader",uploader);
            formData.append("uploaderCode",uploaderCode);
            $.ajax({
                url:"/file/upload",
                type:'POST',
                data: formData,
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,   // jQuery不要去设置Content-Type请求头
                async: false,
                success:function(data){
                    if(data && data.code == successCode){}else{
                        alertUtil.error(data.msg);
                    }
                },
                error: function(data){
                    alertUtil.error(data.msg)
                }
            });
        }

        function deleteFile(dataCode){
            $.ajax({
                url:"/file/delete?dataCode="+dataCode,
                type:'GET',
                processData: false,   // jQuery不要去处理发送的数据
                contentType: false,   // jQuery不要去设置Content-Type请求头
                success:function(data){
                    if(data && data.code == successCode){
                        alertUtil.success(data.msg);
                    }else{
                        alertUtil.error(data.msg);
                    }
                },
                error: function(data){
                    alertUtil.error(data.msg)
                }
            });
        }

        function updateFile(dataCode, file, uploader,uploaderCode){
            deleteFile(dataCode);
            fileAjax(dataCode, file, uploader, uploaderCode);
        }









        return {
            success:success,
            notLoggedIn:notLoggedIn,
            myAjax:myAjax,
            fileAjax: fileAjax,
            successCode:successCode,
            deleteFile: deleteFile,
            updateFile: updateFile
        }
    })
})();