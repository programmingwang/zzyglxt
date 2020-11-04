package com.zyyglxt.dao;

import com.zyyglxt.dataobject.ApplicationDO;
import com.zyyglxt.dataobject.ApplicationDOKey;

public interface ApplicationDOMapper {
    int deleteByPrimaryKey(ApplicationDOKey key);

    int insert(ApplicationDO record);

    int insertSelective(ApplicationDO record);

    ApplicationDO selectByPrimaryKey(ApplicationDOKey key);

    int updateByPrimaryKeySelective(ApplicationDO record);

    int updateByPrimaryKey(ApplicationDO record);
}