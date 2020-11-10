package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.dataobject.HealthSciKnowDO;
import com.zyyglxt.dataobject.HealthSciKnowDOKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HealthSciKnowDOMapper {

    int deleteByPrimaryKey(@Param("key") HealthSciKnowDOKey key);

    int insert(HealthSciKnowDO record);

    int insertSelective(HealthSciKnowDO record);

    HealthSciKnowDO selectByPrimaryKey(HealthSciKnowDOKey key);

    int updateByPrimaryKeySelective(HealthSciKnowDO record);

    int updateByPrimaryKeyWithBLOBs(HealthSciKnowDO record);

    int updateByPrimaryKey(HealthSciKnowDO record);

    List<HealthSciKnowDO> selectAllHealthSciKnow();//查询所有科普知识所有数据

    int updateVisitNumHealthSciKnow(HealthSciKnowDOKey key);
}