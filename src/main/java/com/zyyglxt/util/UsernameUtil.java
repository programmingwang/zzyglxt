package com.zyyglxt.util;

import com.zyyglxt.dto.UserSessionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Author:wangzh
 * Date: 2020/11/14 10:15
 * Version: 1.0
 */
@Component
public class UsernameUtil {
    @Autowired
    private HttpServletRequest request;

    public String getOperateUser(){
        UserSessionDto user = (UserSessionDto) request.getSession().getAttribute("user");
        return user.getUsername();
    }

}
