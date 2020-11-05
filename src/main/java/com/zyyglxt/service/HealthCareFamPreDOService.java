package com.zyyglxt.service;

import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.error.BusinessException;

import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:24
 */
public interface HealthCareFamPreDOService {
    /*
    中医药名称添加、删除、修改、查询实现接口
   **/
    int insertSelective(HealthCareFamPreDO record) throws BusinessException;
    int deleteByPrimaryKey(HealthCareFamPreDOKey key);
    int updateByPrimaryKeySelective(HealthCareFamPreDO record) throws BusinessException;
    HealthCareFamPreDO selectByPrimaryKey(HealthCareFamPreDOKey key);
    List<HealthCareFamPreDO> selectAllHealthCareFamPre();//查询所有国医话健康所有数据
    int updateVisitNumHealthCareFamPre(HealthCareFamPreDOKey key);
}
