package com.zyyglxt.service.impl;

import com.zyyglxt.dao.AuditMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.industrialDevelop.AuditDto;
import com.zyyglxt.service.IAuditService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/16 9:21
 * @Version 1.0
 **/
@Service
public class AuditServiceImpl implements IAuditService {
    @Resource
    AuditMapper auditMapper;

    @Override
    public List<AuditDto> getAll() {
        List<AuditDto> resList = new ArrayList<>();
        List<IndustrialDevelopChiMed> chiMedList = auditMapper.getAllChiMed();
        List<IndustrialDevelopTecSerOrg> tecSerOrgList = auditMapper.getAllTecOrg();
        List<IndustrialDevelopSchool> schoolList = auditMapper.getAllSchool();
        List<HospDO> hospDOList = auditMapper.getAllHospital();

        convertChiMed(chiMedList, resList);

        convertTecSerOrg(tecSerOrgList,resList);

        convertSchool(schoolList,resList);

        convertHospital(hospDOList, resList);
        return resList;
    }

    @Override
    public List<AuditDto> getAllByType(String type) {
        List<AuditDto> resList = new ArrayList<>();
        switch (type) {
            case "tec":
            case "lab":
            case "tour":
                List<IndustrialDevelopTecSerOrg> tecSerOrgList = auditMapper.getAllTecOrgByType(type);
                convertTecSerOrg(tecSerOrgList, resList);
                break;
            case "plant":
            case "process":
            case "sale":
            case "produce":
                List<IndustrialDevelopChiMed> chiMedList = auditMapper.getAllChiMedByType(type);
                convertChiMed(chiMedList, resList);
                break;
            case "school":
                List<IndustrialDevelopSchool> schoolList = auditMapper.getAllSchool();
                convertSchool(schoolList, resList);
                break;
            case "hospital":
                List<HospDO> hospDOList = auditMapper.getAllHospital();
                convertHospital(hospDOList, resList);
                break;
        }
        return resList;
    }

    @Override
    public IndustrialDevelopChiMed getDetailChiMed(Integer itemid, String itemcode) {
        return auditMapper.getDetailChiMed(itemid,itemcode);
    }

    @Override
    public IndustrialDevelopTecSerOrg getDetailTecSerOrg(Integer itemid, String itemcode) {
        return auditMapper.getDetailTecSerOrg(itemid,itemcode);
    }

    @Override
    public IndustrialDevelopSchool getDetailSchool(Integer itemid, String itemcode) {
        return auditMapper.getDetailSchool(itemid,itemcode);
    }

    @Override
    public HospDO getDetailHospital(Integer itemid, String itemcode) {
        return auditMapper.getDetailHospital(itemid,itemcode);
    }

    public void convertChiMed(List<IndustrialDevelopChiMed> source, List<AuditDto> target)
    {
        for (IndustrialDevelopChiMed item: source)
        {
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item,obj);
            target.add(obj);
        }
    }

    public void convertTecSerOrg(List<IndustrialDevelopTecSerOrg> source, List<AuditDto> target)
    {
        for (IndustrialDevelopTecSerOrg item: source)
        {
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item,obj);
            target.add(obj);
        }
    }

    public void convertSchool(List<IndustrialDevelopSchool> source, List<AuditDto> target)
    {
        for (IndustrialDevelopSchool item: source){
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item,obj);
            obj.setType("school");
            target.add(obj);
        }
    }

    public void convertHospital(List<HospDO> source, List<AuditDto> target)
    {
        for (HospDO item : source){
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item,obj);
            obj.setAddressCity(item.getHospitalAddressCity());
            obj.setName(item.getHospitalName());
            obj.setStatus(item.getHospitalStatus());
            obj.setType("hospital");
            target.add(obj);
        }
    }
}
