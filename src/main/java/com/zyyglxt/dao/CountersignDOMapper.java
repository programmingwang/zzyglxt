package com.zyyglxt.dao;

import com.zyyglxt.dataobject.CountersignDO;
import com.zyyglxt.dataobject.CountersignDOKey;

public interface CountersignDOMapper {
    int deleteByPrimaryKey(CountersignDOKey key);

    int insert(CountersignDO record);

    int insertSelective(CountersignDO record);

    CountersignDO selectByPrimaryKey(CountersignDOKey key);

    int updateByPrimaryKeySelective(CountersignDO record);

    int updateByPrimaryKey(CountersignDO record);
}