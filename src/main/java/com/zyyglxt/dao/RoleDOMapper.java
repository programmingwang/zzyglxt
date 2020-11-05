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

    int updateByPrimaryKeySelective(RoleDO record);

    int updateByPrimaryKey(RoleDO record);

    /**
     * 查询所有角色
     * @return
     */
    List<RoleDO> selectAllRole();

    /**
     * selectByRoleType
     * @param type
     * @return 角色信息
     */
    RoleDO selectByRoleType(Integer type);
}

