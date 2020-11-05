package com.zyyglxt.controller.permissionsController;

import com.zyyglxt.dataobject.*;

import com.zyyglxt.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/28 0028 21:42
 * @Version 1.0
 */

@RestController
@RequestMapping("user")
public class UserRoleController {
    @Autowired
    UserService userService;

    /**
     * 根据主键删除用户
     * @return 操作结果信息
     */
    @RequestMapping(value = "/deletebykey",method = RequestMethod.DELETE)
    public void deleteUserByUsername(@RequestBody UserDO userDO){
        userService.deleteUserByUsername(userDO);
    }

    /**
     * 添加用户
     * @param userDO
     * @return 添加结果信息
     */
    @RequestMapping(value = "/insertuser",method = RequestMethod.POST)
    public void insertUserSelective(@RequestBody UserDO userDO){
        userService.insertUserSelective(userDO);
    }

    /**
     * 查询所有用户
     * @return user和查询结果
     */
    @RequestMapping(value = "/alluser",method = RequestMethod.GET)
    public List<UserDO> selectAllUser(){
        List<UserDO> users = userService.selectAllUser();
        return users;
    }

    /**
     * 更新用户信息
     * @param userDO
     * @return
     */
    @RequestMapping(value = "/updateuser",method = RequestMethod.PUT)
    public void updateUserByPrimaryKeySelective(@RequestBody UserDO userDO){
        userService.updateByPrimaryKeySelective(userDO);
    }
}
