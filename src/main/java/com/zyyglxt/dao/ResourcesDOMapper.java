package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.ResourcesDOKey;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourcesDOMapper {

    int deleteByPrimaryKey(ResourcesDOKey key);

    int insert(ResourcesDO record);

    int insertSelective(ResourcesDO record);

    ResourcesDO selectByPrimaryKey(ResourcesDOKey key);

    int updateByPrimaryKeySelective(ResourcesDO record);

    int updateByPrimaryKey(ResourcesDO record);

    List<ResourcesDO> selectAllResources();

    List<ResourcesDO> SelectMenuByRoleCode(String itemcode);

    List<ResourcesDO> selectListByPath(String requestUrl);
}