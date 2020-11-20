package com.zyyglxt.service.impl;

import com.zyyglxt.dao.IndustrialDevelopTopicDOMapper;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDO;
import com.zyyglxt.dataobject.IndustrialDevelopTopicDOKey;
import com.zyyglxt.dataobject.validation.ValidationGroups;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IIndustrialDevelopTopicService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * @Author lrt
 * @Date 2020/10/29 15:53
 * @Version 1.0
 **/
@Service
public class IndustrialDevelopTopicServiceImpl implements IIndustrialDevelopTopicService {

    @Resource
    IndustrialDevelopTopicDOMapper developTopicDOMapper;

    @Resource
    ValidatorImpl validator;

    @Override
    public void addTopic(IndustrialDevelopTopicDO record) {
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
        developTopicDOMapper.insertSelective(record);
    }

    @Override
    public void delTopic(IndustrialDevelopTopicDOKey key) {
        ValidatorResult result = validator.validate(key,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        developTopicDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public void updTopic(IndustrialDevelopTopicDO record) {
        ValidatorResult result = validator.validate(record,ValidationGroups.UpdateOrDelete.class);
        if (result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setUpdater("未定义");
        record.setItemupdateat(new Date());
        developTopicDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public List<IndustrialDevelopTopicDO> getTopics() {
        return developTopicDOMapper.selectAll();
    }
}
