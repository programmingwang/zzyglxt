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
            "userRole":"userRole",
            //科研项目专家提交状态
            "expertSubmitStatus":"expertSubmitStatus",
            //课题专家分配状态
            "distributionExpert" : "distributionExpert",
            //数据提交状态
            "topicStatus": "topicStatus",
            //审核状态
            "auditStatus": "auditStatus",
            //紧急程度
            "emergencyStatus":"emergencyStatus",
            //报告审核状态
            "reportStatus":"reportStatus",
            //不公开理由
            "postReason":"postReason",
            //公平竞争审查
            "postFairDepartmentReview":"postFairDepartmentReview",
            //文号
            "postDocumentNum":"postDocumentNum",
            //公开方式
            "governerscounter":"postPublicWay",
            "postPublicWay":"postPublicWay",
            //会签审核状态
            "signstatus":"signstatus",
            //发文审核状态
            "postStatus":"postStatus",
            //审核状态-机构审核
            "orgAuditStatus": "orgAuditStatus",
            //时间状态
            "timeStatus":"timeStatus",
            //收文审核状态
            "receiptStatus":"receiptStatus",
            //专科级别
            "specialtyLevel":"specialtyLevel",
            //会签部门
            "parment":"signDepartment"
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
