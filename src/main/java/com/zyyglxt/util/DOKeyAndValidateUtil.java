package com.zyyglxt.util;


import com.zyyglxt.dao.ChineseCulturalDOMapper;
import com.zyyglxt.dataobject.ChineseCulturalDO;
import com.zyyglxt.dataobject.ChineseCulturalDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Author:wangzh
 * Date: 2020/11/2 11:00
 * Version: 1.0
 */

@Component
public class DOKeyAndValidateUtil{

    public static int updateUtil(ChineseCulturalDO record, ValidatorImpl validator, ChineseCulturalDOMapper chineseCulturalDOMapper) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        ChineseCulturalDOKey key = new ChineseCulturalDOKey();
        key.setItemid(record.getItemid());
        key.setItemcode(record.getItemcode());
        record.setUpdater("");
        record.setItemupdateat(new Date());
        return chineseCulturalDOMapper.updateByPrimaryKeySelective(key,record);
    }

}
