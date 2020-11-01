package com.zyyglxt.service;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UserDto;

/**
 * @Author nongcn
 * @Date 2020/10/29 10:37
 * @Version 1.0
 */
public interface IUserService {

    void Register(UserDO userDO);
    void Login(String username, String password);
    void UpdatePassword(UserDto userDto);
    void Logout();
}
