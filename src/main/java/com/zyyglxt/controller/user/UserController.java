package com.zyyglxt.controller.user;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dto.UserDto;
import com.zyyglxt.service.IUserService;
import com.zyyglxt.util.MobileUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author nongcn
 * @Date 2020/10/29 11:30
 * @Version 1.0
 */
@RestController
@RequestMapping(value = "user")
public class UserController {

    @Autowired
    IUserService userService;

    /**
     * 用户注册，接收前段传递的数据，到service层
     *
     * @param userDO
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void Register(UserDO userDO) {
        userService.Register(userDO);
    }

    /**
     * 用户登录，接收前段传递的数据，到service层
     *
     * @param userDto
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public void Login(UserDto userDto) {
        userService.Login(userDto.getUsername(), userDto.getPassword());
    }

    /**
     * 用户登出
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void Logout() {
        userService.Logout();
    }

    /**
     * 根据电话号码来修改密码
     *
     * @param userDto
     */
    @RequestMapping(value = "upwd", method = RequestMethod.PUT)
    public void UpdatePassword(UserDto userDto) {
        userService.UpdatePassword(userDto);
    }
}
