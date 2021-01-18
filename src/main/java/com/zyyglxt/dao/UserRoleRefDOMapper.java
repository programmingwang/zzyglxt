package com.zyyglxt.dao;
import org.apache.ibatis.annotations.Param;

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

    UserRoleRefDO selectByUserCode(String itemcode);

    int deleteByUserCode(@Param("userCode")String userCode);


}
