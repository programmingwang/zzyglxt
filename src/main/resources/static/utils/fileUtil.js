(function() {
    define('fileUtil', ['jquery','objectUtil','stringUtil','alertUtil','ajaxUtil'], function(jquery, objectUtil,stringUtil,alertUtil,ajaxUtil) {

        function handleFile(isUpdate, itemcode, file) {
            // 如果当前是新增或者图片没有修改那么就不修改文件了
            // 如果当前是修改并且不是原来的那张图片，那么就修改,并且要删除原来的那一张图片
            if(!isUpdate){
                ajaxUtil.fileAjax(itemcode,file, "admin","qeqweasd");
            }else if(isUpdate && file != null){
                ajaxUtil.myAjax(null,"/file/delete?dataCode="+itemcode,null,function (data) {
                    if(!ajaxUtil.success(data)){
                        return alertUtil.error("文件删除失败,可能是文件损坏或不存在了");
                    }
                },false,"","get");
                var fileUUID = stringUtil.getUUID();
                console.log(itemcode);
                console.log(fileUUID);
                ajaxUtil.fileAjax(itemcode,file,fileUUID ,"admin","qeqweasd");
            }
        }

        function handleFiles(isUpdate, itemcode, files) {
            // 如果当前是新增或者图片没有修改那么就不修改文件了
            // 如果当前是修改并且不是原来的图片，那么就修改,并且要删除原来的图片+
            if(!isUpdate){
                for (var i = 0; i < files.length; i++){
                    ajaxUtil.fileAjax(itemcode,files[i], "admin","qeqweasd");
                }
            }else if(isUpdate && files.length != 0){
                ajaxUtil.myAjax(null,"/file/delete?dataCode="+itemcode,null,function (data) {
                    if(!ajaxUtil.success(data)){
                        return alertUtil.error("文件删除失败，可能是文件已经损坏或不存在了");
                    }
                },false,"","get");
                for (var i = 0; i < files.length; i++){
                    ajaxUtil.fileAjax(itemcode, files[i], stringUtil.getUUID(),"admin","qeqweasd");
                }
            }
        }


        return {
            handleFile: handleFile,
            handleFiles: handleFiles,
        }
    })
})();