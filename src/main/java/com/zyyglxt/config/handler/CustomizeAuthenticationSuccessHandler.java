package com.zyyglxt.config.handler;

import com.alibaba.fastjson.JSON;
import com.zyyglxt.dao.RoleDOMapper;
import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UserSessionDto;
import com.zyyglxt.util.JsonResult;
import com.zyyglxt.util.ResultTool;
import com.zyyglxt.service.UserService;
import com.zyyglxt.util.UserUtil;
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
import java.util.HashMap;
import java.util.Map;

/**
 * @Description: 登录成功处理逻辑
 */
@Component
public class CustomizeAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    UserService userService;
    @Autowired
    RoleDOMapper roleDOMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException {
        //更新用户表上次登录时间、更新人、更新时间等字段
        User userDetails = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDO userDo = userService.selectByName(userDetails.getUsername());
        Map<String,String> map = new HashMap<>();
        UserUtil userUtil = new UserUtil();
        map.put("username", userDo.getUsername());
        map.put("itemid", String.valueOf(userDo.getItemid()));
        map.put("itemcode", userDo.getItemcode());

        userUtil.setUser(map);// 将username、itemid、itemcode存到session

        userDo.setState("入");
        userDo.setItemid(Integer.parseInt(map.get("itemid")));
        userDo.setItemcode(map.get("itemcode"));
        userService.updateByPrimaryKeySelective(userDo);

        RoleDO roleDO = roleDOMapper.selectByUserid(userDo.getItemcode());

        UserSessionDto userSessionDto = new UserSessionDto();

        userSessionDto.setUsername(userDo.getUsername());
        userSessionDto.setRolename(roleDO.getRoleName());
        userSessionDto.setItemid(Integer.parseInt(map.get("itemid")));
        userSessionDto.setItemcode(userDo.getItemcode());
        httpServletRequest.getSession().setAttribute("user", userSessionDto);

//        super.onAuthenticationSuccess(httpServletRequest, httpServletResponse, authentication);
        //返回json数据
        JsonResult result = ResultTool.success(userSessionDto);
        httpServletResponse.setContentType("text/json;charset=utf-8");
        httpServletResponse.getWriter().write(JSON.toJSONString(result));
    }
}
