package com.zyyglxt.service;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:21
 * @Version 1.0
 */

public interface UserService {

    void deleteUserByUsername(UserDto userDtO);

    int insert(UserDO record);

    void insertUserSelective(UserDO record) ;

    UserDO selectByPrimaryKey(UserDOKey key);

    void updateByPrimaryKeySelective(UserDO userDO);

    void resetPassword(UserDO userDO);

    int updateByPrimaryKeyWithBLOBs(UserDO record);

    int updateByPrimaryKey(UserDO record);

    List<UserDO> selectAllUser(String itemcode, String username);

    List<UserDO> selectAllUser3(String itemcode, String username);

    int deleteByUsername(String username);

    UserDO selectByName(String username);

}
