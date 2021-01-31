package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopMedMat;
import com.zyyglxt.dto.StatusDto;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
public interface IndustrialDevelopMedMatService{


    int deleteByPrimaryKey(Integer itemid,String itemcode);

    int insert(IndustrialDevelopMedMat record);

    int insertSelective(IndustrialDevelopMedMat record);

    IndustrialDevelopMedMat selectByPrimaryKey(Integer itemid,String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopMedMat record);

    int updateByPrimaryKey(IndustrialDevelopMedMat record);

    List<IndustrialDevelopMedMat> selectMedMatByORGCode();

    int updateStatus(StatusDto statusDto);
}
