package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.HospDto;
import com.zyyglxt.dto.industrialDevelop.AuditDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopChiMedDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSchoolDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTecSerOrgDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/16 10:07
 * @Version 1.0
 **/
public interface AuditMapper {
    List<AuditDto> getAllChiMed();

    List<AuditDto> getAllChiMedByCity(String city);

    List<AuditDto> getAllChiMedByType(String type);

    List<AuditDto> getAllTecOrg();

    List<AuditDto> getAllTecOrgByCity(String city);

    List<AuditDto> getAllTecOrgByType(String type);

    List<AuditDto> getAllSchool();

    List<AuditDto> getAllSchoolByCity(String city);

    List<AuditDto> getAllHospital();

    List<AuditDto> getAllHospitalByCity(String city);

    IndustrialDevelopChiMedDto getDetailChiMed(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    IndustrialDevelopTecSerOrgDto getDetailTecSerOrg(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    IndustrialDevelopSchoolDto getDetailSchool(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    HospDto getDetailHospital(@Param("itemid") Integer itemid, @Param("itemcode") String itemcode);

    int changeChiMedStatus(AuditDto record);

    int changeTecSerOrgStatus(AuditDto record);

    int changeHospitalStatus(AuditDto record);

    int changeSchoolStatus(AuditDto record);

    int changeUserStatus(String orgCode);
}
