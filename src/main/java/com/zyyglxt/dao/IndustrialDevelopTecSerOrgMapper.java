package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTecSerOrgDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
   *@Author lrt
   *@Date 2020/11/6 20:00
   *@Version 1.0
**/
@Mapper
public interface IndustrialDevelopTecSerOrgMapper {
    int deleteByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int insert(IndustrialDevelopTecSerOrg record);

    int insertSelective(IndustrialDevelopTecSerOrg record);

    IndustrialDevelopTecSerOrg selectByPrimaryKey(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    IndustrialDevelopTecSerOrgDto selectByOrgcode(@Param("orgCode") String orgCode);

    int updateByPrimaryKeySelective(IndustrialDevelopTecSerOrg record);

    int updateByPrimaryKey(IndustrialDevelopTecSerOrg record);

    List<IndustrialDevelopTecSerOrg> selectAll(@Param("type") String type);

    IndustrialDevelopTecSerOrg selectByOrgNameAndCode(@Param("orgName") String orgName, @Param("orgCode")String orgCode);
}
