package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopSaleDrug;
import com.zyyglxt.error.BusinessException;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
public interface IndustrialDevelopSaleDrugService{


    int deleteByPrimaryKey(Integer itemid,String itemcode);

    int insert(IndustrialDevelopSaleDrug record)  throws BusinessException;;

    int insertSelective(IndustrialDevelopSaleDrug record);

    IndustrialDevelopSaleDrug selectByPrimaryKey(Integer itemid,String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopSaleDrug record)  throws BusinessException;;

    int updateByPrimaryKey(IndustrialDevelopSaleDrug record);

   List< IndustrialDevelopSaleDrug> selectAllSaleDrug(List<String> status);//查询所有售药记录信息

    int changeStatusToSaleDrug(IndustrialDevelopSaleDrug key, String status);

}
