package com.zyyglxt.service;

import com.zyyglxt.common.Result;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UpdatePwdDto;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.error.BusinessException;

/**
 * @Author nongcn
 * @Date 2020/10/29 10:37
 * @Version 1.0
 */
public interface IUserService {

    int Register(UserDto userDto) throws BusinessException;

    Result Login(String username, String password);

    Result UpdatePassword(UpdatePwdDto updatePwdDto);

    Result Logout();
}
