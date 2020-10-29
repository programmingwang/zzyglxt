package com.zyyglxt.service.impl;

import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.service.HealthSciKnowDOService;
import org.springframework.stereotype.Service;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:28
 */
@Service
public class HealthSciKnowDOServiceImpl implements HealthSciKnowDOService {

    @Override
    public int insertSelective(HealthSciKnowDO record) {
        return 0;
    }

    @Override
    public int deleteByPrimaryKey(HealthSciKnowDOKey key) {
        return 0;
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(HealthSciKnowDO record) {
        return 0;
    }

    @Override
    public HealthSciKnowDO selectByPrimaryKey(HealthSciKnowDOKey key) {
        return null;
    }
}
