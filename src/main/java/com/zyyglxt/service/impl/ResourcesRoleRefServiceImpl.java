package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ResourcesRoleRefDOMapper;
import com.zyyglxt.dataobject.ResourcesRoleRefDO;
import com.zyyglxt.dataobject.ResourcesRoleRefDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.ResourcesRoleRefService;

import com.zyyglxt.util.DateUtils;

import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:59
 * @Version 1.0
 */
@Service
public class ResourcesRoleRefServiceImpl implements ResourcesRoleRefService {
    @Autowired
    ResourcesRoleRefDOMapper rRRMapper;
    @Autowired
    private ValidatorImpl validator;

    @Override
    public int deleteByPrimaryKey(ResourcesRoleRefDOKey key) {
        return rRRMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insertSelective(ResourcesRoleRefDO record) {
        ValidatorResult result = validator.validate(record);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        record.setItemcode(UUIDUtils.getUUID());
        return rRRMapper.insertSelective(record);
    }

    @Override
    public ResourcesRoleRefDO selectByPrimaryKey(ResourcesRoleRefDOKey key) {
        return rRRMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(ResourcesRoleRefDO record) {
        return rRRMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public ResourcesRoleRefDO selectByResCode(String itemcode) {
        return rRRMapper.selectByResCode(itemcode);
    }
}
