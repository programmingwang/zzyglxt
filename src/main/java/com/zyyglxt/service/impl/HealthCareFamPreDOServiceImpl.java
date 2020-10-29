package com.zyyglxt.service.impl;

import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.service.HealthCareFamPreDOService;
import org.springframework.stereotype.Service;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:25
 */
@Service
public class HealthCareFamPreDOServiceImpl implements HealthCareFamPreDOService {
    /*
      中医药名称添加、删除、修改、查询实现方法
  **/
    @Override
    public int insertSelective(HealthCareFamPreDO record) {
        return 0;
    }

    @Override
    public int deleteByPrimaryKey(HealthCareFamPreDOKey key) {
        return 0;
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(HealthCareFamPreDO record) {
        return 0;
    }

    @Override
    public HealthCareFamPreDO selectByPrimaryKey(HealthCareFamPreDOKey key) {
        return null;
    }
}
