package com.zyyglxt.dao;

import com.zyyglxt.dataobject.adviceDO;
import com.zyyglxt.dataobject.adviceDOKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface adviceDOMapper {
    int deleteByPrimaryKey(adviceDOKey key);

    int insert(adviceDO record);

    int insertSelective(adviceDO record);

    adviceDO selectByPrimaryKey(adviceDOKey key);

    int updateByPrimaryKeySelective(adviceDO record);

    int updateByPrimaryKey(adviceDO record);

    int delByDataCode(@Param("dataCode") String dataCode);

    adviceDO getByDataCode(@Param("dataCode") String dataCode);

    int updAdvice(String dataCode);
}