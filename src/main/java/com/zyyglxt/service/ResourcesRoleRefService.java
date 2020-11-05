package com.zyyglxt.service;

import com.zyyglxt.dataobject.ResourcesRoleRefDO;
import com.zyyglxt.dataobject.ResourcesRoleRefDOKey;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:58
 * @Version 1.0
 */
public interface ResourcesRoleRefService {

    int deleteByPrimaryKey(ResourcesRoleRefDOKey key);

    int insertSelective(ResourcesRoleRefDO record);

    ResourcesRoleRefDO selectByPrimaryKey(ResourcesRoleRefDOKey key);

    int updateByPrimaryKeySelective(ResourcesRoleRefDO record);

    ResourcesRoleRefDO selectByResCode(String itemcode);
}
