package com.zyyglxt.config.handler;

import com.alibaba.fastjson.JSON;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.permissionsUtil.JsonResult;
import com.zyyglxt.permissionsUtil.ResultTool;
import com.zyyglxt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * @Description: 登录成功处理逻辑
 */
@Component
public class CustomizeAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        //更新用户表上次登录时间、更新人、更新时间等字段
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDO userDo = userService.selectByName(userDetails.getUsername());
        userDo.setItemupdateat(new Date());
        userDo.setUpdater(userDo.getUsername());
        userService.updateByPrimaryKeySelective(userDo);

        //返回json数据
        JsonResult result = ResultTool.success();
        httpServletResponse.setContentType("text/json;charset=utf-8");
        httpServletResponse.getWriter().write(JSON.toJSONString(result));
    }
}
