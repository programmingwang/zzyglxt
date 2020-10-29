package com.zyyglxt.permissionsService.impl;

import com.zyyglxt.dao.ResourcesRoleRefDOMapper;
import com.zyyglxt.dataobject.ResourcesRoleRefDO;
import com.zyyglxt.dataobject.ResourcesRoleRefDOKey;
import com.zyyglxt.permissionsService.ResourcesRoleRefService;
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

    @Override
    public int deleteByPrimaryKey(ResourcesRoleRefDOKey key) {
        return rRRMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insertSelective(ResourcesRoleRefDO record) {
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
}
