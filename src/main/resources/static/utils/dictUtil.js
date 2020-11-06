(function() {
    define('dictUtil', ['jquery','ajaxUtil','objectUtil','stringUtil'], function(jquery,ajaxUtil,objectUtil,stringUtil) {



        function getImportanceType(aType) {
            var aVal = "";
            switch (aType) {
                case "1": aVal = '<span class="importanceType-veryUrgent">非常紧急</span>'; break;
                case "2": aVal = '<span class="importanceType-urgent">紧急</span>'; break;
                case "3": aVal = '<span class="importanceType-generalUrgent">一般</span>'; break;
                case "4": aVal = '<span class="importanceType-plan">计划</span>'; break;
                case "5": aVal = '<span class="importanceType-longtime">长期</span>'; break;
            }
            return aVal;
        }



        function getDictByCode(code,param,noCache) {
            if(dictList[code] == null || !stringUtil.isBlank(noCache)){
                ajaxUtil.myAjax(null,"/api/dict/getDictByCode",stringUtil.isBlank(param)?{code:code}:{code:code,param:param},function (data) {
                    if(ajaxUtil.success(data)){
                        console.log(data);
                        var al = new Array();
                        $.each(data.data,function (k,v) {
                            al.push({id:k,text:v});
                        });
                        dictList[code] = al;
                    }

                },false)
            }
            console.log(dictList[code]);
            return dictList[code];
        }


        var DICT_LIST = {
            "PROJECT_LIST":"projectList",
            "Module_LIST":"moduleList",
            "pm_ImportanceType":"pm_ImportanceType",
        }

        var dictList = {

        };


        return {
            getImportanceType:getImportanceType,
            getDictByCode:getDictByCode,
            DICT_LIST:DICT_LIST,

        }
    })
})();