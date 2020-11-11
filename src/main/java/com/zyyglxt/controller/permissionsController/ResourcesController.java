package com.zyyglxt.controller.permissionsController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.*;

import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.ResourcesRoleRefService;
import com.zyyglxt.service.ResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
     *
     * @return
     */
    @LogAnnotation(logTitle = "添加权限", logLevel = "3")
    @RequestMapping(value = "/insertres", method = RequestMethod.POST)
    public ResponseData insertSelectiveRes(@RequestBody ResourcesDO resourcesDO) {
        resourcesService.insertSelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    @LogAnnotation(logTitle = "添加权限", logLevel = "3")
    @RequestMapping(value = "/insertrrr", method = RequestMethod.POST)
    public ResponseData insertSelectiveRrr(@RequestBody ResourcesRoleRefDO resourcesDO) {
        resRoleRefService.insertSelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 修改
     *
     * @param resourcesDO
     */
    @LogAnnotation(logTitle = "修改权限", logLevel = "2")
    @RequestMapping(value = "updateresources", method = RequestMethod.PUT)
    public ResponseData updateByPrimaryKeySelective(@RequestBody ResourcesDO resourcesDO) {
        resourcesService.updateByPrimaryKeySelective(resourcesDO);
        return new ResponseData(EmBusinessError.success);

    }

    /**
     * 删除
     *
     * @param resourcesDO
     */
    @LogAnnotation(logTitle = "删除权限", logLevel = "4")
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public ResponseData deleteByPrimaryKey(@RequestBody ResourcesDO resourcesDO) {
        resourcesService.deleteByPrimaryKey(resourcesDO);
        return new ResponseData(EmBusinessError.success);

    }

    /**
     * 查询所有权限
     */
    @LogAnnotation(logTitle = "查询所有权限", logLevel = "1")
    @RequestMapping(value = "/selectall", method = RequestMethod.GET)
    public ResponseData selectAllResources() {
        List<ResourcesDO> resourcesDOS = resourcesService.selectAllResources();
        return new ResponseData(EmBusinessError.success, resourcesDOS);

    }

    /**
     * 查询角色菜单
     */
    @LogAnnotation(logTitle = "查询角色菜单", logLevel = "1")
    @RequestMapping(value = "/selectrolemenu", method = RequestMethod.GET)
    public ResponseData selectRoleMenu(@RequestBody UserDO userDO) {
        List<ResourcesDO> resourcesDOS = resourcesService.SelectMenuByRoleCode(userDO);
        return new ResponseData(EmBusinessError.success, resourcesDOS);

    }

    /**
     * 查询角色权限
     */
    @LogAnnotation(logTitle = "查询角色权限", logLevel = "1")
    @RequestMapping(value = "/selectroleres", method = RequestMethod.GET)
    public ResponseData selectRoleResources(@RequestBody UserDO userDO) {
        List<ResourcesDO> resourcesDOS = resourcesService.SelectPermissionByRoleCode(userDO);
        return new ResponseData(EmBusinessError.success, resourcesDOS);

    }

    @RequestMapping(value = "/selectPres", method = RequestMethod.GET)
    public ResponseData selectPres() {
        List<ResourcesDO> resourcesDOS = resourcesService.selectPres();
        ResourcesRoleRefDO roleRefDO = new ResourcesRoleRefDO();
        roleRefDO.setRoleCode("c21ae6ed-b027-45fb-85d7-083bf0fd0c69");
        for (ResourcesDO aDo : resourcesDOS) {
            roleRefDO.setResourceCode(aDo.getItemcode());
            resRoleRefService.insertSelective(roleRefDO);
        }
        return new ResponseData(EmBusinessError.success);

    }
}
