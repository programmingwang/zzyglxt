package com.zyyglxt.util;

import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * @Author nongcn
 * @Date 2020/11/10 14:17
 * @Version 1.0
 */
public class ContextUtil {

    public static UserSessionDto getAppContext(HttpServletRequest request){
        HttpSession session = request.getSession();
        UserSessionDto userSessionDto = (UserSessionDto) session.getAttribute("user");
        if (ObjectUtil.isNull(userSessionDto)){
            return null;
        }else {
            return userSessionDto;
        }
    }
}
