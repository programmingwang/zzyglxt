package com.zyyglxt.dao;

import com.zyyglxt.dataobject.UserRoleRefDO;
import com.zyyglxt.dataobject.UserRoleRefDOKey;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRefDOMapper {

    int deleteByPrimaryKey(UserRoleRefDOKey key);

    int insert(UserRoleRefDO record);

    int insertSelective(UserRoleRefDO record);

    UserRoleRefDO selectByPrimaryKey(UserRoleRefDOKey key);

    int updateByPrimaryKeySelective(UserRoleRefDO record);

    int updateByKeySelective(UserRoleRefDO record);

    int updateByPrimaryKey(UserRoleRefDO record);

    /**
     * 根据user_code查询
     * @param itemcode
     * @return
     */
    UserRoleRefDO selectByUserCode(String itemcode);
}
