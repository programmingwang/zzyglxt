package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTecSerOrgDto;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
public interface IndustrialDevelopTecSerOrgService{


    int deleteByPrimaryKey(Integer itemid,String itemcode);

    int insert(IndustrialDevelopTecSerOrg record);

    int insertSelective(IndustrialDevelopTecSerOrg record);

    IndustrialDevelopTecSerOrg selectByPrimaryKey(Integer itemid,String itemcode);

    IndustrialDevelopTecSerOrg selectByOrgcode(String orgCode);

    int updateByPrimaryKeySelective(IndustrialDevelopTecSerOrg record);

    int updateByPrimaryKey(IndustrialDevelopTecSerOrg record);

    List<IndustrialDevelopTecSerOrgDto> selectAll(String type);

    IndustrialDevelopTecSerOrg selectByOrgNameAndCode(String orgName, String orgCode);
}
