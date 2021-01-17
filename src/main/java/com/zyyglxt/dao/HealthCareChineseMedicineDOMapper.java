package com.zyyglxt.dao;

import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.HealthCareChineseMedicineDOKey;
import com.zyyglxt.dto.HealthCareChineseMedicineDto;
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

    int changeStatusToMedicine(@Param("key") HealthCareChineseMedicineDOKey key , @Param("status") String chineseMedicineStatus);//中医药数据状态

    List<HealthCareChineseMedicineDto> selectAllHealthCareChineseMedicine(@Param("chineseMedicineStatus") String chineseMedicineStatus);
}