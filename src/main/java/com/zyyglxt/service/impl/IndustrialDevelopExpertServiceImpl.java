package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopExpertDOMapper;
import com.zyyglxt.dao.IndustrialDevelopExpertRefDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDO;
import com.zyyglxt.dataobject.IndustrialDevelopExpertRefDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IIndustrialDevelopExpertService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 15:17
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopExpertServiceImpl implements IIndustrialDevelopExpertService {

    @Resource
    IndustrialDevelopExpertDOMapper developExpertDOMapper;

    @Resource
    IndustrialDevelopExpertRefDOMapper developExpertRefDOMapper;

    @Resource
    ValidatorImpl validator;

    @Override
    public void addExpert(IndustrialDevelopExpertDO record) {
        record.setCreater("未定义");
        record.setUpdater("未定义");
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        ValidatorResult result = validator.validate(record, ValidationGroups.Insert.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (record.getItemcode() == null || record.getItemcode().isEmpty()){
            record.setItemcode(UUID.randomUUID().toString());
        }
        developExpertDOMapper.insertSelective(record);
    }

    @Override
    public void delExpert(IndustrialDevelopExpertDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developExpertDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updExpert(IndustrialDevelopExpertDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater("未定义");
        record.setItemupdateat(new Date());
        developExpertDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<IndustrialDevelopExpertDO> getExperts() {
        return developExpertDOMapper.selectAll();
    }

    @Override
    public void addExpertRef(IndustrialDevelopExpertRefDO record) {
        if (record.getItemcode().isEmpty()) {
            record.setItemcode(UUID.randomUUID().toString());
        }
        record.setCreater("未定义");
        record.setUpdater("未定义");
        record.setItemcreateat(new Date());
        record.setItemupdateat(new Date());
        developExpertRefDOMapper.insertSelective(record);
    }

    @Override
    public void delExpertRef(IndustrialDevelopExpertRefDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developExpertRefDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updExpertRef(IndustrialDevelopExpertRefDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater("未定义");
        record.setItemupdateat(new Date());
        developExpertRefDOMapper.updateByPrimaryKeySelective(record);
    }
}
