package com.zyyglxt.controller.permissionsController;

import com.zyyglxt.dataobject.*;

import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
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
    public ResponseData insertSelective(ResourcesDO resourcesDO){
        resourcesService.insertSelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 修改
     * @param resourcesDO
     */
    @RequestMapping(value = "updateresources", method = RequestMethod.PUT)
    public ResponseData updateByPrimaryKeySelective(ResourcesDO resourcesDO){
        resourcesService.updateByPrimaryKeySelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);

    }

    /**
     * 删除
     * @param resourcesDO
     */
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public ResponseData deleteByPrimaryKey(ResourcesDO resourcesDO){
        resourcesService.deleteByPrimaryKey(resourcesDO);
        return new ResponseData(EmBusinessError.success);

    }

    /**
     * 查询所有权限
     */
    @RequestMapping(value = "/selectall", method = RequestMethod.GET)
    public ResponseData selectAllResources(){
        List<ResourcesDO> resourcesDOS = resourcesService.selectAllResources();
        return new ResponseData(EmBusinessError.success, resourcesDOS);

    }

    /**
     * 查询角色权限
     */
    @RequestMapping(value = "/selectroleres", method = RequestMethod.GET)
    public ResponseData selectRoleResources(@RequestBody UserDO userDO){
        List<ResourcesDO> resourcesDOS = resourcesService.SelectMenuByRoleCode(userDO);
        return new ResponseData(EmBusinessError.success, resourcesDOS);

    }
}
