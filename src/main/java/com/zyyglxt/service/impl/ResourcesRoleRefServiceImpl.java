package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ResourcesRoleRefDOMapper;
import com.zyyglxt.dataobject.ResourcesRoleRefDO;
import com.zyyglxt.dataobject.ResourcesRoleRefDOKey;
import com.zyyglxt.service.ResourcesRoleRefService;
import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.UUIDUtils;
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
        record.setItemcode(UUIDUtils.getUUID());
        record.setItemcreateat(DateUtils.getDate());
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
