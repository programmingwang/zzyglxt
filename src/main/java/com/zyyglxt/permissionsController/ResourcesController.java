package com.zyyglxt.permissionsController;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.ResourcesDOKey;
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

    /**
     * 新增
     * @return
     */
    @RequestMapping(value = "insert", method = RequestMethod.POST)
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
     * @param resourcesDOKey
     */
    @RequestMapping(value = "delete", method = RequestMethod.DELETE)
    public void deleteByPrimaryKey(ResourcesDOKey resourcesDOKey){
        resourcesService.deleteByPrimaryKey(resourcesDOKey);
    }

    /**
     * 查询所有
     */
    @RequestMapping(value = "selectall", method = RequestMethod.GET)
    public List<ResourcesDO> selectAllResources(){
        List<ResourcesDO> resourcesDOS = resourcesService.selectAllResources();
        return resourcesDOS;
    }
}
