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
     * 根据电话号码来修改密码
     *
     * @param userDto
     */
    @RequestMapping(value = "upwd", method = RequestMethod.PUT)
    public void UpdatePassword(UserDto userDto) {
        // 验证手机号是否正确
        if (MobileUtil.checkPhone(userDto.getMobilePhone())) {
            // 验证密码输入是否为空
            if (StringUtils.isEmpty(userDto.getPassword()) ||
                    StringUtils.isEmpty(userDto.getNewPassword()) ||
                    StringUtils.isEmpty(userDto.getCheckNewPassword())) {
                System.out.println("密码输入不能为空，请重新输入！");
            } else {
                // 验证输入的新密码与输入的原密码是否一致
                if (userDto.getPassword().equals(userDto.getNewPassword())) {
                    System.out.println("原密码与新密码一致，请重新输入新密码！");
                } else {
                    // 验证两次输入的新密码是否一致
                    if (userDto.getNewPassword().equals(userDto.getCheckNewPassword())) {
                        userService.UpdatePassword(userDto);
                    } else {
                        System.out.println("两次输入的新密码不一致，请重新输入！");
                    }
                }
            }
        } else {
            System.out.println("手机号码不正确！");
        }
    }
}
