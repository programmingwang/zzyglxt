package com.zyyglxt.permissionsController;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.ResourcesDOKey;
import com.zyyglxt.dataobject.ResourcesRoleRefDO;
import com.zyyglxt.dataobject.ResourcesRoleRefDOKey;
import com.zyyglxt.permissionsService.ResourcesRoleRefService;
import com.zyyglxt.permissionsService.ResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
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
        ResourcesRoleRefDOKey resRoleRefDOKey = new ResourcesRoleRefDOKey();
        ResourcesRoleRefDO resRoleRefDO = resRoleRefService.selectByResCode(resourcesDO.getItemcode());
        resRoleRefDOKey.setItemid(resRoleRefDO.getItemid());
        resRoleRefDOKey.setItemcode(resRoleRefDO.getItemcode());
        resRoleRefService.deleteByPrimaryKey(resRoleRefDOKey);
        ResourcesDOKey resourcesDOKey = new ResourcesDOKey();
        resourcesDOKey.setItemid(resourcesDO.getItemid());
        resourcesDOKey.setItemcode(resourcesDO.getItemcode());
        resourcesService.deleteByPrimaryKey(resourcesDOKey);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "/selectall", method = RequestMethod.GET)
    public List<ResourcesDO> selectAllResources(){
        List<ResourcesDO> resourcesDOS = resourcesService.selectAllResources();
        return resourcesDOS;
    }
}
