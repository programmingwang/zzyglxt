package com.zyyglxt.service;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.RoleDOKey;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:24
 * @Version 1.0
 */
@Service
public interface RoleService {

    int deleteByPrimaryKey(RoleDOKey key);

    int insert(RoleDO record);

    void insertSelective(RoleDO roleDO, List<ResourcesDO> resourcesDOList);

    RoleDO selectByPrimaryKey(RoleDOKey key);

    int updateByPrimaryKeySelective(RoleDO record);

    int updateByPrimaryKey(RoleDO record);

    List<RoleDO> selectAllRole();

    RoleDO selectByRoleType(Integer type);
}
