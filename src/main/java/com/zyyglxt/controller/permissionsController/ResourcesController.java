package com.zyyglxt.controller.permissionsController;

import com.zyyglxt.dataobject.*;

import com.zyyglxt.service.ResourcesRoleRefService;
import com.zyyglxt.service.ResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 12:02
 * @Version 1.0
 */
@RestController
@RequestMapping("resources")
public class ResourcesController {
    @Autowired
    ResourcesService resourcesService;
    @Autowired
    ResourcesRoleRefService resRoleRefService;

    /**
     * 新增
     * @return
     */
    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public void insertSelective(ResourcesDO resourcesDO){
        resourcesService.insertSelective(resourcesDO);
    }

    /**
     * 修改
     * @param resourcesDO
     */
    @RequestMapping(value = "updateresources", method = RequestMethod.PUT)
    public void updateByPrimaryKeySelective(ResourcesDO resourcesDO){
        resourcesService.updateByPrimaryKeySelective(resourcesDO);
    }

    /**
     * 删除
     * @param resourcesDO
     */
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public void deleteByPrimaryKey(ResourcesDO resourcesDO){
        resourcesService.deleteByPrimaryKey(resourcesDO);
    }

    /**
     * 查询所有权限
     */
    @RequestMapping(value = "/selectall", method = RequestMethod.GET)
    public List<ResourcesDO> selectAllResources(){
        return resourcesService.selectAllResources();
    }

    /**
     * 查询角色权限
     */
    @RequestMapping(value = "/selectroleres", method = RequestMethod.GET)
    public List<ResourcesDO> selectRoleResources(@RequestBody UserDO userDO){
        return resourcesService.SelectMenuByRoleCode(userDO);
    }
}
