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
                ajaxUtil.myAjax(null,"/dict/getDictByCode",stringUtil.isBlank(param)?{code:code}:{code:code,param:param},function (data) {
                    if(ajaxUtil.success(data)){
                        var al = new Array();
                        $.each(data.data,function (k,v) {
                            al.push({id:v.code,text:v.value});
                        });
                        dictList[code] = al;
                    }
                },false)
            }
            return dictList[code];
        }

        function getCode(code, name) {
            if (dictList[code]== null){
                getDictByCode(code);
            }
            let list = dictList[code];
            for (const t of list){
                if (name == t.text){
                    return t.id
                }
            }
            return null;
        }

        function getName(code, id) {
            if (dictList[code] == null)
            {
                getDictByCode(code);
            }
            let list = dictList[code]
            for (const t of list){
                if (id == t.id){
                    return t.text
                }
            }
            return null
        }


        var DICT_LIST = {
            //展示状态
            "showStatus": "showStatus",
            //专家类别
            "expertType": "expertType",
            //科室
            "dept": "dept",
            //医院等级
            "hospitalLevel": "hospitalLevel",
            //中药功效分类
            "effectType": "effectType",
            //学科专业代码
            "subjectMajor": "subjectMajor",
            //网站数据状态
            "webStatus": "status",
            //科研项目数据状态
            "projectStatus": "projectStatus",
            //专家评审状态
            "exmaineStatus": "exmaineStatus",
            //轮播图位置
            "dataLocation": "dataLocation",
            //政策法规的文件类型
            "dataFileType": "dataFileType",
            //药材状态
            "medStatus": "medStatus",
            //机构类型
            "orgType": "orgType",
            //主管市区
            "areaAdmin":"areaAdmin",
            //用户角色
            "userRole":"userRole"
        }

        var dictList = {

        };


        return {
            getImportanceType:getImportanceType,
            getDictByCode:getDictByCode,
            DICT_LIST:DICT_LIST,
            getCode: getCode,
            getName: getName

        }
    })
})();
