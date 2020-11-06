package com.zyyglxt.config.handler;

import com.alibaba.fastjson.JSON;
import com.zyyglxt.dao.UserDOMapper;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.permissionsUtil.JsonResult;
import com.zyyglxt.permissionsUtil.ResultTool;
import com.zyyglxt.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Description: 登出成功处理逻辑
 */
@Component
public class CustomizeLogoutSuccessHandler implements LogoutSuccessHandler {
    @Autowired
    UserDOMapper userDOMapper;

    @Override
    public void onLogoutSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        UserUtil userUtil = new UserUtil();
        UserDO userDO = new UserDO();
        userDO.setState("出");
        userDO.setItemid(Integer.parseInt(userUtil.getUser().get("itemid")));
        userDO.setItemcode(userUtil.getUser().get("itemcode"));

        userDOMapper.updateByPrimaryKeySelective(userDO);
        JsonResult result = ResultTool.success();
        httpServletResponse.setContentType("text/json;charset=utf-8");
        httpServletResponse.getWriter().write(JSON.toJSONString(result));
    }
}
