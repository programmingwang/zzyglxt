package com.zyyglxt.service;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:21
 * @Version 1.0
 */

public interface UserService {

    void deleteUserByUsername(UserDO userDO);

    int insert(UserDO record);

    void insertUserSelective(UserDO record);

    UserDO selectByPrimaryKey(UserDOKey key);

    void updateByPrimaryKeySelective(UserDO userDO);

    int updateByPrimaryKeyWithBLOBs(UserDO record);

    int updateByPrimaryKey(UserDO record);

    List<UserDO> selectAllUser();

    int deleteByUsername(String username);

    UserDO selectByName(String username);

}
