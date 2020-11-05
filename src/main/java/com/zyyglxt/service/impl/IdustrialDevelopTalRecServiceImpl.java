package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTalRecDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOWithBLOBs;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IIndustrialDevelopTalRecService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 16:51
 * @Version 1.0
 **/
@Service
public class IdustrialDevelopTalRecServiceImpl implements IIndustrialDevelopTalRecService {
    @Resource
    IndustrialDevelopTalRecDOMapper developTalRecDOMapper;

    @Resource
    ValidatorImpl validator;
    @Override
    public void addTalRec(IndustrialDevelopTalRecDOWithBLOBs record) {
        record.setCreater("未定义");
        record.setUpdater("未定义");
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUID.randomUUID().toString());
        }
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());

        developTalRecDOMapper.insertSelective(record);
    }

    @Override
    public void delTalRec(IndustrialDevelopTalRecDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developTalRecDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updTalRec(IndustrialDevelopTalRecDOWithBLOBs record) {
        record.setUpdater("未定义");
        record.setItemupdateat(new Date());
        developTalRecDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<IndustrialDevelopTalRecDOWithBLOBs> getTalRecs() {
        return developTalRecDOMapper.selectAll();
    }
}
