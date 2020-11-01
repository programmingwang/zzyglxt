package com.zyyglxt.permissionsService.impl;

import com.zyyglxt.dao.RoleDOMapper;
import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.RoleDOKey;
import com.zyyglxt.permissionsService.RoleService;
import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.UUIDUtils;
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

    @Override
    public int deleteByPrimaryKey(RoleDOKey key) {
        return roleDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insert(RoleDO record) {
        return roleDOMapper.insert(record);
    }

    @Override
    public int insertSelective(RoleDO record) {
        record.setItemcode(UUIDUtils.getUUID());
        record.setItemcreateat(DateUtils.getDate());
        return roleDOMapper.insertSelective(record);
    }

    @Override
    public RoleDO selectByPrimaryKey(RoleDOKey key) {
        return roleDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(RoleDO record) {
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
