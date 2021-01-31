package com.zyyglxt.dao;

import com.zyyglxt.dataobject.CountersignDO;
import com.zyyglxt.dataobject.CountersignDOKey;
import org.springframework.stereotype.Component;

@Component
public interface CountersignDOMapper {
    int deleteByPrimaryKey(CountersignDOKey key);

    int insert(CountersignDO record);

    int insertSelective(CountersignDO record);

    CountersignDO selectByPrimaryKey(CountersignDOKey key);

    CountersignDO selectByItemcode(String itemcode);

    int updateByPrimaryKeySelective(CountersignDO record);

    int updateByPrimaryKey(CountersignDO record);

}