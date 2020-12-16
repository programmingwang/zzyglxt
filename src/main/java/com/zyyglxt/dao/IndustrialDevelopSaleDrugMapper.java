package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HealthCareChineseMedicineDO;
import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Mapper
public interface IndustrialDevelopSaleDrugMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insert(IndustrialDevelopSaleDrug record);

    int insertSelective(IndustrialDevelopSaleDrug record);

    IndustrialDevelopSaleDrug selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopSaleDrug record);

    int updateByPrimaryKey(IndustrialDevelopSaleDrug record);
/*通过orgCode查询所有售药记录*/
    List< IndustrialDevelopSaleDrug> selectAllSaleDrug( @Param("status") String status, @Param("orgCode") String orgCode);

    int changeStatusToSaleDrug(@Param("key")IndustrialDevelopSaleDrug key,@Param("status") String status);

}