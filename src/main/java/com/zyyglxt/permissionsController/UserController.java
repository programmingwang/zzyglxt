package com.zyyglxt.permissionsController;

import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.dataobject.UserDOKey;
import com.zyyglxt.dataobject.UserRoleRefDOKey;
import com.zyyglxt.permissionsService.UserRoleRefService;
import com.zyyglxt.permissionsService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    UserRoleRefService userRoleRefService;

    /**
     * 根据主键删除用户
     * @return 操作结果信息
     */
    @RequestMapping(value = "/deletebykey",method = RequestMethod.DELETE)
    public void deleteUserByPrimaryKey(UserDOKey userDOKey){
        UserRoleRefDOKey userRoleRefDOKey = new UserRoleRefDOKey();
        userRoleRefService.deleteByPrimaryKey(userRoleRefDOKey);
        userService.deleteByPrimaryKey(userDOKey);
    }

    /**
     * 添加用户
     * @param userDO
     * @return 添加结果信息
     */
    @RequestMapping(value = "/insertus",method = RequestMethod.POST)
    public void insertUserSelective(UserDO userDO){
        userService.insertSelective(userDO);
    }

    /**
     * 根据用户主键查询用户
     * @param key
     * @return user和查询结果
     */
    @RequestMapping(value = "/selectbykey",method = RequestMethod.GET)
    public UserDO selectUserByPrimaryKey(UserDOKey key){
        return userService.selectByPrimaryKey(key);
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
    public void updateUserByPrimaryKeySelective(UserDO userDO){
        userService.updateByPrimaryKeySelective(userDO);
    }
}
