package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopOffDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopOffDO;
import com.zyyglxt.dataobject.IndustrialDevelopOffDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IIndustrialDevelopOffService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 17:35
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopOffServiceImpl implements IIndustrialDevelopOffService {
    @Resource
    IndustrialDevelopOffDOMapper developOffDOMapper;
    @Resource
    UsernameUtil usernameUtil;
    @Resource
    ValidatorImpl validator;

    @Override
    public void addOff(IndustrialDevelopOffDO record) {
        record.setCreater(usernameUtil.getOperateUser());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUID.randomUUID().toString());
        }
        developOffDOMapper.insertSelective(record);
    }

    @Override
    public void updOff(IndustrialDevelopOffDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater(usernameUtil.getOperateUser());
        record.setItemupdateat(new Date());
        developOffDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public void delOff(IndustrialDevelopOffDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developOffDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public List<IndustrialDevelopOffDO> getOff() {
        return developOffDOMapper.selectAll();
    }
}
