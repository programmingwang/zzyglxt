package com.zyyglxt.service;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UserDto;

/**
 * @Author nongcn
 * @Date 2020/10/29 10:37
 * @Version 1.0
 */
public interface IUserService {

    Result Register(UserDO userDO);
    Result Login(String username, String password);
    Result UpdatePassword(UserDto userDto);
    Result Logout();
}
