package com.zyyglxt.dao;

import com.zyyglxt.dataobject.adviceDO;
import com.zyyglxt.dataobject.adviceDOKey;

public interface adviceDOMapper {
    int deleteByPrimaryKey(adviceDOKey key);

    int insert(adviceDO record);

    int insertSelective(adviceDO record);

    adviceDO selectByPrimaryKey(adviceDOKey key);

    int updateByPrimaryKeySelective(adviceDO record);

    int updateByPrimaryKey(adviceDO record);
}