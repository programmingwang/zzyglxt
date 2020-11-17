package com.zyyglxt.service;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.industrialDevelop.AuditDto;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/16 9:20
 * @Version 1.0
 **/
public interface IAuditService {

    List<AuditDto> getAll();

    List<AuditDto> getAllByType(String type);

    IndustrialDevelopChiMed getDetailChiMed(Integer itemid, String itemcode);

    IndustrialDevelopTecSerOrg getDetailTecSerOrg(Integer itemid, String itemcode);

    IndustrialDevelopSchool getDetailSchool(Integer itemid, String itemcode);

    HospDO getDetailHospital(Integer itemid, String itemcode);


}
