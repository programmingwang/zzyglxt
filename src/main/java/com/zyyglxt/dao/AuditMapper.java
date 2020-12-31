package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.industrialDevelop.AuditDto;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/16 10:07
 * @Version 1.0
 **/
public interface AuditMapper {
    List<IndustrialDevelopChiMed> getAllChiMed();

    List<IndustrialDevelopChiMed> getAllChiMedByCity(String city);

    List<IndustrialDevelopChiMed> getAllChiMedByType(String type);

    List<IndustrialDevelopTecSerOrg> getAllTecOrg();

    List<IndustrialDevelopTecSerOrg> getAllTecOrgByCity(String city);

    List<IndustrialDevelopTecSerOrg> getAllTecOrgByType(String type);

    List<IndustrialDevelopSchool> getAllSchool();

    List<IndustrialDevelopSchool> getAllSchoolByCity(String city);

    List<HospDO> getAllHospital();

    List<HospDO> getAllHospitalByCity(String city);

    IndustrialDevelopChiMed getDetailChiMed(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);

    IndustrialDevelopTecSerOrg getDetailTecSerOrg(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);

    IndustrialDevelopSchool getDetailSchool(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);

    HospDO getDetailHospital(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);

    int changeChiMedStatus(AuditDto record);

    int changeTecSerOrgStatus(AuditDto record);

    int changeHospitalStatus(AuditDto record);

    int changeSchoolStatus(AuditDto record);

    int changeUserStatus(String orgCode);
}
