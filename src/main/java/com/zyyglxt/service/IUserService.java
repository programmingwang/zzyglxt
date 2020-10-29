package com.zyyglxt.service;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;
import org.springframework.stereotype.Service;

/**
 * @Author nongcn
 * @Date 2020/10/29 10:37
 * @Version 1.0
 */
public interface IUserService {

    void Register(UserDO userDO);

    void Login(String username, String password);
}
