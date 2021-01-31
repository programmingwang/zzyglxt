package com.zyyglxt.dao;

import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.RoleDOKey;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleDOMapper {

    int deleteByPrimaryKey(RoleDOKey key);

    int insert(RoleDO record);

    int insertSelective(RoleDO record);

    RoleDO selectByPrimaryKey(RoleDOKey key);

    RoleDO selectByRoleName(String roleName);

    int updateByPrimaryKeySelective(RoleDO record);

    int updateByPrimaryKey(RoleDO record);

    List<RoleDO> selectAllRole();

    RoleDO selectByRoleType(Integer type);

    RoleDO selectByUserid(String itemcode);
}

