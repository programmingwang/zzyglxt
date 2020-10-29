package com.zyyglxt.service;

import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:27
 */
public interface HealthSciKnowDOService {

    int insertSelective(HealthSciKnowDO record);
    int deleteByPrimaryKey(HealthSciKnowDOKey key);
    int updateByPrimaryKeyWithBLOBs(HealthSciKnowDO record);
    HealthSciKnowDO selectByPrimaryKey(HealthSciKnowDOKey key);
}
