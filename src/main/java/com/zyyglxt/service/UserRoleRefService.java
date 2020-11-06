package com.zyyglxt.service;

import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dataobject.UserRoleRefDOKey;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 14:51
 * @Version 1.0
 */
public interface UserRoleRefService {

    int deleteByPrimaryKey(UserRoleRefDOKey key);

    int insertSelective(UserRoleRefDO record);

    UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key);

    int updateByPrimaryKeySelective(UserRoleRefDO record);

    int updateByKeySelective(UserRoleRefDO record);

    UserRoleRefDO selectByUserCode(String itemcode);
}
