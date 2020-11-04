package com.zyyglxt.dao;

import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HealthCareChineseMedicineDOMapper {

    int deleteByPrimaryKey(@Param("key") HealthCareChineseMedicineDOKey key);

    int insert(HealthCareChineseMedicineDO record);

    int insertSelective(HealthCareChineseMedicineDO record);

    HealthCareChineseMedicineDO selectByPrimaryKey(HealthCareChineseMedicineDOKey key);

    int updateByPrimaryKeySelective(HealthCareChineseMedicineDO record);

    int updateByPrimaryKey(HealthCareChineseMedicineDO record);

    List<HealthCareChineseMedicineDO> selectAllHealthCareChineseMedicine();
}