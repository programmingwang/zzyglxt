package com.zyyglxt.controller.permissionsController;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.RoleDO;
import com.zyyglxt.dataobject.RoleDOKey;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:32
 * @Version 1.0
 */
@RestController
@RequestMapping("role")
public class RoleController {
    @Autowired
    RoleService roleService;

    /**
     * 添加角色
     * @param roleDO
     * @return 添加结果信息
     */
    @RequestMapping(value = "/insertrole", method = RequestMethod.POST)
    public ResponseData insertRoleSelective(@RequestBody RoleDO roleDO, @RequestBody ArrayList<ResourcesDO> resourcesDOList){
        roleService.insertSelective(roleDO, resourcesDOList);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新角色信息
     * @param roleDO
     * @return
     */
    @RequestMapping(value = "/updaterole", method = RequestMethod.PUT)
    public ResponseData updateRoleSelective(RoleDO roleDO){
        roleService.updateByPrimaryKeySelective(roleDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 删除角色
     * @param key
     * @return
     */
    @RequestMapping(value = "/deleterole", method = RequestMethod.DELETE)
    public ResponseData deleteRoleByPrimaryKey(RoleDOKey key){
        roleService.deleteByPrimaryKey(key);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 查询所有角色
     * @return
     */
    @RequestMapping(value = "/allroles", method = RequestMethod.GET)
    public ResponseData selectAllRoles(){
        List<RoleDO> roles = roleService.selectAllRole();
        return new ResponseData(EmBusinessError.success, roles);
    }
}
