package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopSciAchiDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDO;
import com.zyyglxt.dataobject.IndustrialDevelopSciAchiDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IIndustrialDevelopSciAchiService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 9:11
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopSciAchiServiceImpl implements IIndustrialDevelopSciAchiService {

    @Resource
    IndustrialDevelopSciAchiDOMapper sciAchiDOMapper;

    @Resource
    ValidatorImpl validator;
    @Override
    public void addAchievement(IndustrialDevelopSciAchiDO record) {
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        record.setCreater("未定义");
        record.setUpdater("未定义");
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUID.randomUUID().toString());
        }
        sciAchiDOMapper.insertSelective(record);
    }

    @Override
    public void delAchievement(IndustrialDevelopSciAchiDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        sciAchiDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updAchievement(IndustrialDevelopSciAchiDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemupdateat(new Date());
        sciAchiDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void increaseVisitNum(IndustrialDevelopSciAchiDOKey key) {
        sciAchiDOMapper.updateVisitNumByItemidAndItemcode(key);
    }

    @Override
    public List<IndustrialDevelopSciAchiDO> getAchievement(String orgCode) {

        return sciAchiDOMapper.selectAll(orgCode);
    }

}



