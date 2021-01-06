package com.zyyglxt.service.impl;

import com.zyyglxt.dao.adviceDOMapper;
import com.zyyglxt.dataobject.adviceDO;
import com.zyyglxt.dataobject.adviceDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IAdviceService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @Author huangtao
 * @Date 2021/1/3 10:47
 * @Version 1.0
 */
@Service
public class AdviceServiceImpl implements IAdviceService {
    @Resource
    adviceDOMapper adviceMapper;

    @Resource
    ValidatorImpl validator;

    @Resource
    UsernameUtil usernameUtil;

    @Override
    public int deleteByPrimaryKey(adviceDOKey key) {
        return 0;
    }

    @Override
    public int insertSelective(adviceDO record) {
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUIDUtils.getUUID());
        }
        return adviceMapper.insertSelective(record);
    }

    @Override
    public adviceDO selectByPrimaryKey(adviceDOKey key) {
        return null;
    }

    @Override
    public void updAdvice(String dataCode) {
        ValidatorResult result = validator.validate(dataCode,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        adviceMapper.updAdvice(dataCode);
    }

    @Override
    public void delByDataCode(String dataCode) {
        ValidatorResult result = validator.validate(dataCode, ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        adviceMapper.delByDataCode(dataCode);
    }

    @Override
    public adviceDO getByDataCode(String dataCode) {
        return adviceMapper.getByDataCode(dataCode);
    }
}
