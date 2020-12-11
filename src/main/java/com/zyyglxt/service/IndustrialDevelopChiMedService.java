package com.zyyglxt.service;

import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.OrganizationDO;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopChiMedDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/6 20:00
 * @Version 1.0
 **/
public interface IndustrialDevelopChiMedService {


    int deleteByPrimaryKey(Integer itemid, String itemcode);

    int insert(IndustrialDevelopChiMed record);

    int insertSelective(IndustrialDevelopChiMed record);

    IndustrialDevelopChiMed selectByPrimaryKey(Integer itemid, String itemcode);

    int updateByPrimaryKeySelective(IndustrialDevelopChiMed record);

    int updateByPrimaryKey(IndustrialDevelopChiMed record);

    List<IndustrialDevelopChiMedDto> selectAll( String type);

    IndustrialDevelopChiMedDto selectByOrgCode();

    IndustrialDevelopChiMed selectByOrgNameAndCode(String orgName, String orgCode);
}
