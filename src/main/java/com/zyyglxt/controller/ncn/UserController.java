package com.zyyglxt.controller.ncn;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @Author nongcn
 * @Date 2020/10/29 11:30
 * @Version 1.0
 */
@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    IUserService userService;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void Register(@RequestBody UserDO userDO){
        userService.Register(userDO);
    }
}
