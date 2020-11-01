package com.zyyglxt.permissionsService.impl;

import com.zyyglxt.dao.ResourcesDOMapper;
import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.ResourcesDOKey;
import com.zyyglxt.permissionsService.ResourcesService;
import com.zyyglxt.permissionsUtil.DateUtils;
import com.zyyglxt.permissionsUtil.UUIDUtils;
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

    @Override
    public int deleteByPrimaryKey(ResourcesDOKey key) {
        return resourcesDOMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insert(ResourcesDO record) {
        return resourcesDOMapper.insert(record);
    }

    @Override
    public int insertSelective(ResourcesDO record) {
        record.setItemcode(UUIDUtils.getUUID());
        record.setItemcreateat(DateUtils.getDate());
        return resourcesDOMapper.insertSelective(record);
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
        return resourcesDOMapper.selectAllResources();
    }
}
