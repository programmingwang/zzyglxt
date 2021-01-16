package com.zyyglxt.service;

import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import com.zyyglxt.error.BusinessException;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/10/29 14:27
 */
public interface HealthSciKnowDOService {

    int insertSelective(HealthSciKnowDO record) ;//科普知识数据的添加
    int deleteByPrimaryKey(HealthSciKnowDOKey key);//科普知识数据的删除
    int updateByPrimaryKeySelective(HealthSciKnowDO record) ;//科普知识数据的修改
    HealthSciKnowDO selectByPrimaryKey(HealthSciKnowDOKey key);//通过id以及code查询某一条科普知识数据
    List<HealthSciKnowDO> selectAllHealthSciKnow(String scienceKnowledgeStatus);//查询所有科普知识所有数据
    int updateVisitNumHealthSciKnow(HealthSciKnowDOKey key);
    int changeStatusToSciKnow(HealthSciKnowDOKey key, String scienceKnowledgeStatus);//科普知识数据状态

}

