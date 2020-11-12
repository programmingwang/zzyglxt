package com.zyyglxt.service;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.ResourcesDOKey;
import com.zyyglxt.dataobject.UserDO;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:58
 * @Version 1.0
 */
public interface ResourcesService {

    void deleteByPrimaryKey(ResourcesDO resourcesDO);

    int insert(ResourcesDO record);

    void insertSelective(ResourcesDO record);

    ResourcesDO selectByPrimaryKey(ResourcesDOKey key);

    int updateByPrimaryKeySelective(ResourcesDO record);

    int updateByPrimaryKey(ResourcesDO record);

    List<ResourcesDO> selectAllResources();

    List<ResourcesDO> SelectMenuByRoleCode(UserDO userDO);

    List<ResourcesDO> selectListByPath(String requestUrl);

    List<ResourcesDO> SelectPermissionByRoleCode(UserDO userDO);

    List<ResourcesDO> selectPres();
}
