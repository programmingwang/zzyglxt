package com.zyyglxt.validator;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

@Data
public class ValidatorResult {
    //校验结果是否有错误
    private boolean hasErrors = false;

    //存放错误信息的MAP
    private Map<String,String> errorMsgMap = new HashMap<>();

    //true说明有error，false说明没有error
    public boolean isHasErrors(){
        return hasErrors;
    }

    //实现通用的通过格式化字符串信息获取错误结果的msg方法
    public String getErrMsg(){
       return StringUtils.join(errorMsgMap.values().toArray(),",");
    }
}
