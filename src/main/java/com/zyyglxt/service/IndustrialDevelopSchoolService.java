package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopSchool;
    /**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
public interface IndustrialDevelopSchoolService{


    int deleteByPrimaryKey(Integer itemid,String itemcode);

    int insert(IndustrialDevelopSchool record);

    int insertSelective(IndustrialDevelopSchool record);

    IndustrialDevelopSchool selectByPrimaryKey(Integer itemid,String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopSchool record);

    int updateByPrimaryKey(IndustrialDevelopSchool record);

}
