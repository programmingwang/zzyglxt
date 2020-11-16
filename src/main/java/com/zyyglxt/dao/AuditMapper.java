package com.zyyglxt.dao;

import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/16 10:07
 * @Version 1.0
 **/
public interface AuditMapper {
    List<IndustrialDevelopChiMed> getAllChiMed();

    List<IndustrialDevelopChiMed> getAllChiMedByType(String type);

    List<IndustrialDevelopTecSerOrg> getAllTecOrg();

    List<IndustrialDevelopTecSerOrg> getAllTecOrgByType(String type);

    List<IndustrialDevelopSchool> getAllSchool();

    List<HospDO> getAllHospital();

    IndustrialDevelopChiMed getDetailChiMed(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);

    IndustrialDevelopTecSerOrg getDetailTecSerOrg(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);

    IndustrialDevelopSchool getDetailSchool(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);

    HospDO getDetailHospital(@Param("itemid") Integer itemid,@Param("itemcode") String itemcode);
}
