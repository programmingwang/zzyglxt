package com.zyyglxt.dao;

import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dataobject.UserRoleRefDOKey;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRefDOMapper {

    int deleteByPrimaryKey(UserRoleRefDOKey key);

    int insert(UserRoleRefDO record);

    int insertSelective(UserRoleRefDO record);

    UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key);

    int updateByPrimaryKeySelective(UserRoleRefDO record);

    int updateByKeySelective(UserRoleRefDO record);

    int updateByPrimaryKey(UserRoleRefDO record);

    UserRoleRefDO selectByUserCode(String itemcode);

    List<UserRoleRefDO> getPlatRole();
}
