package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ResourcesRoleRefDO;
import com.zyyglxt.dataobject.ResourcesRoleRefDOKey;
import org.springframework.stereotype.Repository;

@Repository
public interface ResourcesRoleRefDOMapper {

    int deleteByPrimaryKey(ResourcesRoleRefDOKey key);

    int insert(ResourcesRoleRefDO record);

    int insertSelective(ResourcesRoleRefDO record);

    ResourcesRoleRefDO selectByPrimaryKey(ResourcesRoleRefDOKey key);

    int updateByPrimaryKeySelective(ResourcesRoleRefDO record);

    int updateByPrimaryKey(ResourcesRoleRefDO record);

    ResourcesRoleRefDO selectByResCode(String itemcode);
}