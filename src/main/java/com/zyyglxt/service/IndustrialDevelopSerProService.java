package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopSerPro;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
public interface IndustrialDevelopSerProService{


    int deleteByPrimaryKey(Integer itemid,String itemcode);

    int insert(IndustrialDevelopSerPro record);

    int insertSelective(IndustrialDevelopSerPro record);

    IndustrialDevelopSerPro selectByPrimaryKey(Integer itemid,String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopSerPro record);

    int updateByPrimaryKey(IndustrialDevelopSerPro record);

    List<IndustrialDevelopSerPro> selectAll();

    List<IndustrialDevelopSerPro> selectByorgcode();

}
