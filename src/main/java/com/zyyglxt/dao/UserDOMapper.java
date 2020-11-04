package com.zyyglxt.dao;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;

import java.util.List;

public interface UserDOMapper {

    int deleteByPrimaryKey(UserDOKey key);

    int insert(UserDO record);

    int insertSelective(UserDO record);

    UserDO selectByPrimaryKey(UserDOKey key);

    UserDO selectByUsernameAndPassword(String username, String password);

    UserDO selectByUsername(String username);

    UserDO selectByMobilePhone(String mobilePhone);

    int updateByPrimaryKeySelective(UserDO record);

    int updateByPrimaryKeyWithBLOBs(UserDO record);

    int updateByPrimaryKey(UserDO record);

    int updatePasswordByMobilePhone(String password, String mobilePhone);

    int updatePasswordByUserName(String password, String username);

    int updateStateByUserName(String state, String username);

    /*
     * 查询所有用户
     * @return List<UserDO>
     */
    List<UserDO> selectAllUser();

    /**
     * 根据用户名删除用户
     * @param username
     * @return
     */
    int deleteByUsername(String username);
}
