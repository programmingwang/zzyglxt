package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ResourcesDOMapper;
import com.zyyglxt.dao.ResourcesRoleRefDOMapper;
import com.zyyglxt.dao.RoleDOMapper;
import com.zyyglxt.dataobject.*;

import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.MenuTreeUtil;
import com.zyyglxt.permissionsUtil.UUIDUtils;
import com.zyyglxt.service.ResourcesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:58
 * @Version 1.0
 */
@Service
public class ResourcesServiceImpl implements ResourcesService {
    @Autowired
    ResourcesDOMapper resourcesDOMapper;
    @Autowired
    RoleDOMapper roleDOMapper;
    @Autowired
    ResourcesRoleRefDOMapper resourcesRoleRefDOMapper;

    @Override
    public void deleteByPrimaryKey(ResourcesDO resourcesDO) {
        //
        ResourcesRoleRefDOKey resRoleRefDOKey = new ResourcesRoleRefDOKey();
        ResourcesRoleRefDO resRoleRefDO = resourcesRoleRefDOMapper.selectByResCode(resourcesDO.getItemcode());
        resRoleRefDOKey.setItemid(resRoleRefDO.getItemid());
        resRoleRefDOKey.setItemcode(resRoleRefDO.getItemcode());
        resourcesRoleRefDOMapper.deleteByPrimaryKey(resRoleRefDOKey);
        //
        ResourcesDOKey resourcesDOKey = new ResourcesDOKey();
        resourcesDOKey.setItemid(resourcesDO.getItemid());
        resourcesDOKey.setItemcode(resourcesDO.getItemcode());
        resourcesDOMapper.deleteByPrimaryKey(resourcesDOKey);
    }

    @Override
    public int insert(ResourcesDO record) {
        record.setItemcode(UUIDUtils.getUUID());
        return resourcesDOMapper.insert(record);
    }

    @Override
    public void insertSelective(ResourcesDO record) {
        record.setItemcode(UUIDUtils.getUUID());
        resourcesDOMapper.insertSelective(record);
    }

    @Override
    public ResourcesDO selectByPrimaryKey(ResourcesDOKey key) {
        return resourcesDOMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(ResourcesDO record) {
        record.setItemupdateat(DateUtils.getDate());
        return resourcesDOMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(ResourcesDO record) {
        return resourcesDOMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<ResourcesDO> selectAllResources() {
        List<ResourcesDO> resourcesDOS = resourcesDOMapper.selectAllResources();
        MenuTreeUtil menuTreeUtil = new MenuTreeUtil(resourcesDOS, null);
        List<ResourcesDO> treeGridList = menuTreeUtil.buildTreeGrid();
        return treeGridList;
    }

    @Override
    public List<ResourcesDO> SelectMenuByRoleCode(UserDO userDO) {
        Integer type = userDO.getType();
        RoleDO roleDO = roleDOMapper.selectByRoleType(type);
        List<ResourcesDO> resourcesDOS = resourcesDOMapper.SelectMenuByRoleCode(roleDO.getItemcode());
        MenuTreeUtil menuTreeUtil = new MenuTreeUtil(resourcesDOS, null);
        List<ResourcesDO> treeGridList = menuTreeUtil.buildTreeGrid();
        return treeGridList;
    }

}
