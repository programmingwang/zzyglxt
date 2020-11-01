package com.zyyglxt.permissionsController;

import com.zyyglxt.dataobject.*;
import com.zyyglxt.permissionsService.RoleService;
import com.zyyglxt.permissionsService.UserRoleRefService;
import com.zyyglxt.permissionsService.UserService;
import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.UUIDUtils;
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
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    UserRoleRefService userRoleRefService;
    @Autowired
    RoleService roleService;

    /**
     * 根据主键删除用户
     * @return 操作结果信息
     */
    @RequestMapping(value = "/deletebykey",method = RequestMethod.DELETE)
    public void deleteUserByUsername(@RequestBody UserDO userDO){
        //删除用户角色关系
        UserRoleRefDOKey userRoleRefDOKey = new UserRoleRefDOKey();
        UserRoleRefDO userRoleRefDO = userRoleRefService.selectByUserCode(userDO.getItemcode());
        userRoleRefDOKey.setItemid(userRoleRefDO.getItemid());
        userRoleRefDOKey.setItemcode(userRoleRefDO.getItemcode());
        userRoleRefService.deleteByPrimaryKey(userRoleRefDOKey);
        //删除用户
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        userService.deleteByPrimaryKey(userDOKey);
    }

    /**
     * 添加用户
     * @param userDO
     * @return 添加结果信息
     */
    @RequestMapping(value = "/insertuser",method = RequestMethod.POST)
    public void insertUserSelective(@RequestBody UserDO userDO){
        //添加用户
        userService.insertSelective(userDO);
        //分配角色
            //查询角色role_code
        RoleDO roleDO = roleService.selectByRoleType(userDO.getType());
        UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
        userRoleRefDO.setRoleCode(roleDO.getItemcode());
        userRoleRefDO.setUserCode(userDO.getItemcode());
        userRoleRefService.insertSelective(userRoleRefDO);
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
        UserDOKey userDOKey = new UserDOKey();
        userDOKey.setItemid(userDO.getItemid());
        userDOKey.setItemcode(userDO.getItemcode());
        UserDO userDO1 = userService.selectByPrimaryKey(userDOKey);
        //更新用户信息
        userService.updateByPrimaryKeySelective(userDO);
        //更新角色
        if (!userDO1.getType().equals(userDO.getType())&& userDO.getType()!=null ){
            RoleDO roleDO = roleService.selectByRoleType(userDO.getType());
            UserRoleRefDO userRoleRefDO = new UserRoleRefDO();
            //获取需要更新的userRoleRefDO
            UserRoleRefDO userRoleRefDO1 = userRoleRefService.selectByUserCode(userDO.getItemcode());
            userRoleRefDO.setItemid(userRoleRefDO1.getItemid());
            userRoleRefDO.setItemcode(userRoleRefDO1.getItemcode());
            userRoleRefDO.setRoleCode(roleDO.getItemcode());
            userRoleRefDO.setUserCode(userDO.getItemcode());
            userRoleRefService.updateByPrimaryKeySelective(userRoleRefDO);
        }
    }
}
