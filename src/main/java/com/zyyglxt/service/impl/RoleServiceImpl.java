package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ResourcesRoleRefDOMapper;
import com.zyyglxt.dao.RoleDOMapper;
import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.ResourcesRoleRefDO;
import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.RoleDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;

import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;

import com.zyyglxt.service.RoleService;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:25
 * @Version 1.0
 */
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    ResourcesRoleRefDOMapper resRoleRefDOMapper;
    @Autowired
    private ValidatorImpl validator;

    @Override
    public int deleteByPrimaryKey(RoleDOKey key) {
        return roleDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insert(RoleDO record) {
        return roleDOMapper.insert(record);
    }

    @Override
    public void insertSelective(RoleDO roleDO, List<ResourcesDO> resourcesDOList) {
        ValidatorResult result = validator.validate(roleDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        String uuid = UUIDUtils.getUUID();
        roleDO.setItemcode(uuid);
        roleDOMapper.insertSelective(roleDO);
        //分配resources
        if (resourcesDOList.size()!=0){
            ResourcesRoleRefDO resRoleRefDO = new ResourcesRoleRefDO();
            for (ResourcesDO aDo : resourcesDOList) {
                resRoleRefDO.setItemcode(UUIDUtils.getUUID());
                resRoleRefDO.setRoleCode(uuid);
                resRoleRefDO.setResourceCode(aDo.getItemcode());
                resRoleRefDOMapper.insertSelective(resRoleRefDO);
            }
        }
    }

    @Override
    public RoleDO selectByPrimaryKey(RoleDOKey key) {
        return roleDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(RoleDO record) {
        Integer roleType = record.getRoleType();
        RoleDO roleDO = roleDOMapper.selectByRoleType(roleType);
//        if (!=)
        return roleDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(RoleDO record) {
        return roleDOMapper.deleteByPrimaryKey(record);
    }

    @Override
    public List<RoleDO> selectAllRole() {
        return roleDOMapper.selectAllRole();
    }

    @Override
    public RoleDO selectByRoleType(Integer type) {
        return roleDOMapper.selectByRoleType(type);
    }
}
