package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSchoolDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Mapper
public interface IndustrialDevelopSchoolMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insert(IndustrialDevelopSchool record);

    int insertSelective(IndustrialDevelopSchool industrialDevelopSchool);



    IndustrialDevelopSchool selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopSchool record);

    int updateByPrimaryKey(IndustrialDevelopSchool record);

    List<IndustrialDevelopSchool> selectAll();

    IndustrialDevelopSchool selectByorgcode(String orgcode);
}
