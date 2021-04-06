package com.zyyglxt.dao;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface UserDOMapper {

    int deleteByPrimaryKey(UserDOKey key);

    int insert(UserDO record);

    int insertSelective(UserDO record);

    UserDO selectByPrimaryKey(UserDOKey key);

    UserDO selectByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    UserDO selectByUsername(String username);

    UserDO selectByMobilePhone(String mobilePhone);

    int updateByPrimaryKeySelective(UserDO record);

    int updateByPrimaryKeyWithBLOBs(UserDO record);

    int updateByPrimaryKey(UserDO record);

    int updatePasswordByMobilePhone(@Param("password") String password, @Param("mobilePhone") String mobilePhone);

    int updatePasswordByUserName(@Param("password") String password, @Param("username") String username);

    int updateStateByUserName(@Param("state") String state, @Param("username") String username);

    List<UserDO> selectAllUser(String itemcode, String username);

    List<UserDO> selectAllUser2(String itemcode, String username, String orgCode);

    List<UserDO> selectAllUser3(String itemcode, String username);

    int deleteByUsername(String username);
}
