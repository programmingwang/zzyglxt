package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Mapper
public interface IndustrialDevelopChiMedMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insert(IndustrialDevelopChiMed record);

    int insertSelective(IndustrialDevelopChiMed record);

    IndustrialDevelopChiMed selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopChiMed record);

    int updateByPrimaryKey(IndustrialDevelopChiMed record);
}