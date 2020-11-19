package com.zyyglxt.service;

import com.zyyglxt.dto.HospDto;
import com.zyyglxt.dto.industrialDevelop.AuditDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopChiMedDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSchoolDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTecSerOrgDto;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/16 9:20
 * @Version 1.0
 **/
public interface IAuditService {

    List<AuditDto> getAll();

    List<AuditDto> getAllByType(String type);

    IndustrialDevelopChiMedDto getDetailChiMed(Integer itemid, String itemcode);

    IndustrialDevelopTecSerOrgDto getDetailTecSerOrg(Integer itemid, String itemcode);

    IndustrialDevelopSchoolDto getDetailSchool(Integer itemid, String itemcode);

    HospDto getDetailHospital(Integer itemid, String itemcode);

    int changeChiMedStatus(AuditDto record);

    int changeTecSerOrgStatus(AuditDto record);

    int changeSchoolStatus(AuditDto record);

    int changeHospitalStatus(AuditDto record);


}
