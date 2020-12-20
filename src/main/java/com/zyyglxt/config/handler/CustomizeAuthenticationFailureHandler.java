package com.zyyglxt.config.handler;

import com.alibaba.fastjson.JSON;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.util.JsonResult;
import com.zyyglxt.util.ResultTool;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Description: 登录失败处理逻辑
 */
@Component
public class CustomizeAuthenticationFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        //返回json数据
        JsonResult result = null;
        if (e instanceof BadCredentialsException) {
            //密码错误
            result = ResultTool.fail(EmBusinessError.USER_CREDENTIALS_ERROR);
        }else if (e instanceof InternalAuthenticationServiceException) {
            if ("用户不存在".equals(e.getMessage())) {
                //用户不存在
                result = ResultTool.fail(EmBusinessError.USER_ACCOUNT_NOT_EXIST);
            } else if (e.getMessage().contains("审核未通过")){
                result = ResultTool.fail(EmBusinessError.AUDIT_NOT_PASSED);
            } else if (e.getMessage().contains("机构未注册")){
                result = ResultTool.fail(EmBusinessError.ORG_NOT_REGISTER);
            } else {
                result = ResultTool.fail(EmBusinessError.UNKNOWN_ERROR);
            }
        }else{
            //其他错误
            result = ResultTool.fail(EmBusinessError.fail);
        }
        httpServletResponse.setContentType("text/json;charset=utf-8");
        httpServletResponse.getWriter().write(JSON.toJSONString(result));
    }
}
